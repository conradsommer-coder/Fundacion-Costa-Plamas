import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const manifestPath = resolve(projectRoot, 'src/seo/routeMetadata.ts');
const publicDir = resolve(projectRoot, 'public');
const sitemapPath = resolve(publicDir, 'sitemap.xml');
const robotsPath = resolve(publicDir, 'robots.txt');
const localFallbackSiteUrl = 'http://localhost:4173';

const getConfiguredSiteUrl = () => {
  const rawSiteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL || localFallbackSiteUrl;
  const withProtocol = /^[a-z][a-z\d+\-.]*:\/\//i.test(rawSiteUrl)
    ? rawSiteUrl
    : `https://${rawSiteUrl}`;
  const parsedUrl = new URL(withProtocol);

  parsedUrl.hash = '';
  parsedUrl.search = '';
  parsedUrl.pathname = parsedUrl.pathname.replace(/\/+$/, '');

  return parsedUrl.toString().replace(/\/+$/, '');
};

const toAbsoluteUrl = (siteUrl, routePath) => new URL(routePath, `${siteUrl}/`).toString();

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

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

const assertValidRoutes = (routes) => {
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error('routeMetadataManifest did not export any sitemap routes.');
  }

  routes.forEach((route) => {
    if (!route.path?.startsWith('/')) {
      throw new Error(`Invalid route path for sitemap: ${route.path}`);
    }
    if (!Number.isFinite(route.priority)) {
      throw new Error(`Invalid sitemap priority for ${route.path}`);
    }
    if (!route.changeFrequency) {
      throw new Error(`Missing sitemap changeFrequency for ${route.path}`);
    }
  });
};

const buildSitemapXml = (routes, siteUrl) => {
  const entries = routes.map((route) => {
    const alternateLinks = Object.entries(route.alternatePaths ?? {})
      .map(([language, alternatePath]) => (
        `    <xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(toAbsoluteUrl(siteUrl, alternatePath))}" />`
      ))
      .join('\n');

    return [
      '  <url>',
      `    <loc>${escapeXml(toAbsoluteUrl(siteUrl, route.path))}</loc>`,
      alternateLinks,
      `    <changefreq>${escapeXml(route.changeFrequency)}</changefreq>`,
      `    <priority>${route.priority.toFixed(2)}</priority>`,
      '  </url>',
    ].filter(Boolean).join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    entries,
    '</urlset>',
    '',
  ].join('\n');
};

const buildRobotsTxt = (siteUrl) => [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
].join('\n');

const main = async () => {
  const siteUrl = getConfiguredSiteUrl();
  const routes = await loadRouteMetadataManifest();
  assertValidRoutes(routes);

  await mkdir(publicDir, { recursive: true });
  await writeFile(sitemapPath, buildSitemapXml(routes, siteUrl), 'utf8');
  await writeFile(robotsPath, buildRobotsTxt(siteUrl), 'utf8');

  console.log(`Generated public/sitemap.xml with ${routes.length} routes using ${siteUrl}`);
  console.log('Generated public/robots.txt');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
