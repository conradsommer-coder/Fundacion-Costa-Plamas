import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = resolve(projectRoot, 'dist');
const manifestPath = resolve(projectRoot, 'src/seo/routeMetadata.ts');
const distIndexPath = resolve(distDir, 'index.html');
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://fundacioncostapalmas.org').replace(/\/+$/, '');
const port = Number(process.env.PRERENDER_PORT || 4179);

const routeExpectedText = {
  home: {
    es: 'Construyendo Futuro',
    en: 'Building the Future',
  },
  about: {
    es: 'Nosotros',
    en: 'About Us',
  },
  programs: {
    es: 'Nuestros Programas',
    en: 'Our Programs',
  },
  stories: {
    es: 'Historias de Impacto',
    en: 'Impact Stories',
  },
  donate: {
    es: 'Tu generosidad transforma vidas',
    en: 'Your generosity transforms lives',
  },
  contact: {
    es: 'Contáctanos',
    en: 'Contact Us',
  },
};

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const toAbsoluteUrl = (path) => new URL(path, `${siteUrl}/`).toString();

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const routeOutputPath = (routePath) => {
  if (routePath === '/') {
    return distIndexPath;
  }

  return resolve(distDir, `.${routePath}`, 'index.html');
};

const getExpectedText = (metadata) => {
  if (metadata.isStoryDetailPage) {
    return metadata.title.split(' | ')[0];
  }

  return routeExpectedText[metadata.routeKey]?.[metadata.language];
};

const assertUniqueRoutes = (routes) => {
  const pathOwners = new Map();
  const outputOwners = new Map();

  for (const route of routes) {
    if (pathOwners.has(route.path)) {
      throw new Error(`Duplicate route path in manifest: ${route.path}`);
    }
    pathOwners.set(route.path, route);

    const outputPath = routeOutputPath(route.path);
    const outputOwner = outputOwners.get(outputPath);
    if (outputOwner) {
      throw new Error(`Conflicting prerender output for ${route.path} and ${outputOwner.path}: ${outputPath}`);
    }
    outputOwners.set(outputPath, route);

    if (!route.isLegacySpanishAlias && route.canonicalPath !== route.path) {
      throw new Error(`Canonical path mismatch for ${route.path}: ${route.canonicalPath}`);
    }

    if (!getExpectedText(route)) {
      throw new Error(`Missing prerender content check for ${route.path}`);
    }
  }
};

const getAppShellHtml = (html) => {
  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.lastIndexOf('</body>');

  if (rootStart === -1 || bodyEnd === -1) {
    return html;
  }

  const rootContentStart = rootStart + '<div id="root">'.length;
  const rootEnd = html.lastIndexOf('</div>', bodyEnd);

  if (rootEnd === -1 || rootEnd < rootContentStart) {
    return html;
  }

  return `${html.slice(0, rootContentStart)}</div>${html.slice(rootEnd + '</div>'.length)}`;
};

const readDistAppShell = async () => getAppShellHtml(await readFile(distIndexPath, 'utf8'));

const getConfiguredChromePath = () => {
  if (process.env.CHROME_PATH) {
    return process.env.CHROME_PATH;
  }

  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    'google-chrome',
    'chromium',
    'chromium-browser',
    'chrome',
  ];

  return candidates.find((candidate) => candidate.includes(sep) ? existsSync(candidate) : candidate);
};

const loadRouteMetadataManifest = async () => {
  const source = await readFile(manifestPath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: manifestPath,
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString('base64')}`;
  const manifestModule = await import(moduleUrl);

  return manifestModule.routeMetadataManifest;
};

const createStaticServer = (indexHtml) => {
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? '/', `http://127.0.0.1:${port}`);
      const decodedPath = decodeURIComponent(requestUrl.pathname);
      const normalizedPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
      const requestedFile = normalizedPath === '/'
        ? ''
        : normalizedPath.replace(/^[/\\]+/, '');
      const staticPath = resolve(distDir, requestedFile);

      if (!staticPath.startsWith(distDir)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
      }

      const fileStat = requestedFile ? await stat(staticPath).catch(() => null) : null;
      if (fileStat?.isFile()) {
        const contentType = mimeTypes.get(extname(staticPath)) ?? 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(await readFile(staticPath));
        return;
      }

      if (fileStat?.isDirectory()) {
        const directoryIndexPath = join(staticPath, 'index.html');
        const directoryIndexStat = await stat(directoryIndexPath).catch(() => null);

        if (directoryIndexStat?.isFile()) {
          response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          response.end(await readFile(directoryIndexPath));
          return;
        }
      }

      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(indexHtml);
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(error instanceof Error ? error.message : String(error));
    }
  });

  return new Promise((resolveServer, rejectServer) => {
    server.once('error', rejectServer);
    server.listen(port, '127.0.0.1', () => resolveServer(server));
  });
};

const dumpRouteDom = (chromePath, routePath) => new Promise((resolveDump, rejectDump) => {
  const url = `http://127.0.0.1:${port}${routePath}`;
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--disable-background-networking',
    '--no-first-run',
    '--no-default-browser-check',
    '--no-sandbox',
    '--hide-scrollbars',
    '--virtual-time-budget=5000',
    '--dump-dom',
    url,
  ]);

  let stdout = '';
  let stderr = '';

  chrome.stdout.setEncoding('utf8');
  chrome.stderr.setEncoding('utf8');
  chrome.stdout.on('data', (chunk) => {
    stdout += chunk;
  });
  chrome.stderr.on('data', (chunk) => {
    stderr += chunk;
  });
  chrome.once('error', rejectDump);
  chrome.once('close', (code) => {
    if (code !== 0) {
      rejectDump(new Error(`Chrome exited with ${code} for ${routePath}\n${stderr}`));
      return;
    }

    resolveDump(stdout.startsWith('<!DOCTYPE html>') ? stdout : `<!DOCTYPE html>\n${stdout}`);
  });
});

const assertIncludes = (html, pattern, message) => {
  if (!pattern.test(html)) {
    throw new Error(message);
  }
};

const assertRouteHtml = (html, metadata) => {
  const expectedText = getExpectedText(metadata);

  assertIncludes(
    html,
    new RegExp(`<title>${escapeRegExp(metadata.title)}</title>`),
    `Missing route title for ${metadata.path}`,
  );
  assertIncludes(
    html,
    new RegExp(`<meta name="description" content="${escapeRegExp(metadata.description)}"`),
    `Missing route description for ${metadata.path}`,
  );
  assertIncludes(
    html,
    new RegExp(`<link rel="canonical" href="${escapeRegExp(toAbsoluteUrl(metadata.canonicalPath))}"`),
    `Missing route canonical URL for ${metadata.path}`,
  );
  assertIncludes(
    html,
    new RegExp(`<meta property="og:title" content="${escapeRegExp(metadata.title)}"`),
    `Missing route Open Graph title for ${metadata.path}`,
  );
  assertIncludes(
    html,
    new RegExp(`<meta property="og:description" content="${escapeRegExp(metadata.description)}"`),
    `Missing route Open Graph description for ${metadata.path}`,
  );
  assertIncludes(
    html,
    new RegExp(`<meta property="og:url" content="${escapeRegExp(toAbsoluteUrl(metadata.canonicalPath))}"`),
    `Missing route Open Graph URL for ${metadata.path}`,
  );
  assertIncludes(
    html,
    new RegExp(escapeRegExp(expectedText)),
    `Missing meaningful route content for ${metadata.path}`,
  );
  assertIncludes(
    html,
    /<script[^>]+type="module"[^>]+src="\/assets\/[^"]+\.js"/,
    `Missing built SPA module script for ${metadata.path}`,
  );
};

const removeExistingSeoTags = (html) => html
  .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
  .replace(/\s*<meta\s+name="description"[^>]*>/gi, '')
  .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
  .replace(/\s*<link\s+rel="alternate"[^>]*>/gi, '')
  .replace(/\s*<meta\s+property="(?:og:[^"]+|article:[^"]+)"[^>]*>/gi, '')
  .replace(/\s*<meta\s+name="twitter:[^"]+"[^>]*>/gi, '');

const buildSeoHead = (metadata) => {
  const canonicalUrl = toAbsoluteUrl(metadata.canonicalPath);
  const alternateLanguage = metadata.language === 'es' ? 'en' : 'es';
  const ogLocale = metadata.language === 'es' ? 'es_MX' : 'en_US';
  const alternateOgLocale = alternateLanguage === 'es' ? 'es_MX' : 'en_US';
  const ogType = metadata.isStoryDetailPage ? 'article' : 'website';
  const defaultImage = 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292722/SANTIAGO_CLEANUP-39_nf45u6.jpg';
  const defaultImageAlt = 'Fundación Costa Palmas community program in Cabo del Este';
  const articleTags = metadata.isStoryDetailPage
    ? [
      '    <meta property="article:author" content="Fundación Costa Palmas">',
      '    <meta property="article:section" content="Historias de Impacto">',
    ]
    : [];

  return [
    `    <title>${escapeHtml(metadata.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(metadata.description)}">`,
    `    <link rel="canonical" href="${escapeHtml(canonicalUrl)}">`,
    `    <link rel="alternate" hreflang="es" href="${escapeHtml(toAbsoluteUrl(metadata.alternatePaths.es))}">`,
    `    <link rel="alternate" hreflang="en" href="${escapeHtml(toAbsoluteUrl(metadata.alternatePaths.en))}">`,
    `    <link rel="alternate" hreflang="x-default" href="${escapeHtml(toAbsoluteUrl(metadata.alternatePaths.es))}">`,
    '    <meta property="og:site_name" content="Fundación Costa Palmas">',
    `    <meta property="og:type" content="${escapeHtml(ogType)}">`,
    `    <meta property="og:title" content="${escapeHtml(metadata.title)}">`,
    `    <meta property="og:description" content="${escapeHtml(metadata.description)}">`,
    `    <meta property="og:url" content="${escapeHtml(canonicalUrl)}">`,
    `    <meta property="og:image" content="${escapeHtml(defaultImage)}">`,
    `    <meta property="og:image:alt" content="${escapeHtml(defaultImageAlt)}">`,
    `    <meta property="og:locale" content="${escapeHtml(ogLocale)}">`,
    `    <meta property="og:locale:alternate" content="${escapeHtml(alternateOgLocale)}">`,
    ...articleTags,
    '    <meta name="twitter:card" content="summary_large_image">',
    `    <meta name="twitter:title" content="${escapeHtml(metadata.title)}">`,
    `    <meta name="twitter:description" content="${escapeHtml(metadata.description)}">`,
    `    <meta name="twitter:image" content="${escapeHtml(defaultImage)}">`,
    `    <meta name="twitter:image:alt" content="${escapeHtml(defaultImageAlt)}">`,
  ].join('\n');
};

const injectPrerenderedHtml = (indexHtml, metadata, appHtml) => {
  const withoutSeoTags = removeExistingSeoTags(indexHtml);
  const withLanguage = withoutSeoTags.replace(/<html([^>]*)\slang="[^"]*"/i, `<html$1 lang="${metadata.language}"`);
  const withSeoHead = withLanguage.replace(
    /(<meta\s+name="viewport"[^>]*>)/i,
    `$1\n${buildSeoHead(metadata)}`,
  );
  const visibleAppHtml = appHtml.replace(/\sstyle="[^"]*opacity:0;?[^"]*"/g, '');

  return withSeoHead.replace('<div id="root"></div>', `<div id="root">${visibleAppHtml}</div>`);
};

const renderWithBrowser = async (indexHtml, routes, chromePath) => {
  const server = await createStaticServer(indexHtml);
  const renderedRoutes = [];

  try {
    for (const route of routes) {
      const html = await dumpRouteDom(chromePath, route.path);
      assertRouteHtml(html, route);
      renderedRoutes.push({ route, html, mode: 'browser' });
    }
  } finally {
    server.close();
  }

  return renderedRoutes;
};

const renderWithSsrFallback = async (indexHtml, routes) => {
  const { createServer: createViteServer } = await import('vite');
  const viteServer = await createViteServer({
    appType: 'custom',
    logLevel: 'silent',
    resolve: {
      alias: {
        'react-router-dom': 'react-router',
      },
    },
    ssr: {
      noExternal: ['react-router'],
    },
    server: {
      middlewareMode: true,
      hmr: false,
    },
  });
  const renderedRoutes = [];

  try {
    const { renderRoute } = await viteServer.ssrLoadModule('/scripts/prerender-ssr-entry.tsx');

    for (const route of routes) {
      const appHtml = await renderRoute({
        path: route.path,
        language: route.language,
      });
      const html = injectPrerenderedHtml(indexHtml, route, appHtml);
      assertRouteHtml(html, route);
      renderedRoutes.push({ route, html, mode: 'ssr-fallback' });
    }
  } finally {
    await viteServer.close();
  }

  return renderedRoutes;
};

const main = async () => {
  const chromePath = getConfiguredChromePath();
  const indexHtml = await readDistAppShell();
  const routes = await loadRouteMetadataManifest();
  assertUniqueRoutes(routes);
  let renderedRoutes;

  if (chromePath) {
    try {
      renderedRoutes = await renderWithBrowser(indexHtml, routes, chromePath);
    } catch (error) {
      console.warn(`Browser prerender unavailable (${error instanceof Error ? error.message : String(error)}). Falling back to SSR snapshot mode.`);
    }
  } else {
    console.warn('Chrome or Chromium not found. Falling back to SSR snapshot mode.');
  }

  if (!renderedRoutes) {
    renderedRoutes = await renderWithSsrFallback(indexHtml, routes);
  }

  for (const { route, html, mode } of renderedRoutes) {
    const outputPath = routeOutputPath(route.path);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');

    console.log(`Prerendered ${route.path} -> ${pathToFileURL(outputPath).pathname.replace(`${pathToFileURL(projectRoot).pathname}/`, '')} (${mode})`);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
