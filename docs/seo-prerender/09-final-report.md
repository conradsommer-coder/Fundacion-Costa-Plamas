# Final SEO Prerender Report and Decision

Task: `09-final-report-and-decision`  
Date: 2026-05-27

## Final Recommendation

Keep the Vite prerender approach for now.

The prerender path is good enough for the current public marketing site because it now produces route-specific HTML, route-specific metadata, canonical URLs, hreflang alternates, sitemap entries, and crawler-visible body content for all known public routes while preserving the existing React/Vite application.

A larger migration to Next.js, Vike, or Astro is not justified at this checkpoint. Reconsider a framework migration only if the site later needs server-driven pages, CMS-scale content operations, dynamic SEO at request time, strict React hydration, edge/server data loading, or host-level rendering features that static snapshots cannot provide.

## Before and After SEO State

Before this work, the production output was essentially a single-page app shell. Raw HTML contained the default Spanish home metadata and an empty React root, while route-specific titles, descriptions, canonicals, alternates, and page content appeared only after client JavaScript ran. Search engines that execute JavaScript could eventually understand the pages, but crawlers, link preview bots, and simpler indexing tools saw limited generic HTML.

After this work, the app has a shared route metadata manifest, static crawler artifacts, and prerendered route HTML for every known public route. Each generated route file includes meaningful content in `#root`, route-specific title and description tags, canonical URLs, language alternates, Open Graph/Twitter metadata, and the built SPA script so the existing app still mounts in the browser.

## Prerendered Routes

Total prerendered routes: 30.

| Route | Output |
| --- | --- |
| `/` | `dist/index.html` |
| `/es` | `dist/es/index.html` |
| `/en` | `dist/en/index.html` |
| `/nosotros` | `dist/nosotros/index.html` |
| `/es/nosotros` | `dist/es/nosotros/index.html` |
| `/en/about` | `dist/en/about/index.html` |
| `/programas` | `dist/programas/index.html` |
| `/es/programas` | `dist/es/programas/index.html` |
| `/en/programs` | `dist/en/programs/index.html` |
| `/historias` | `dist/historias/index.html` |
| `/es/historias` | `dist/es/historias/index.html` |
| `/en/stories` | `dist/en/stories/index.html` |
| `/donar` | `dist/donar/index.html` |
| `/es/donar` | `dist/es/donar/index.html` |
| `/en/donate` | `dist/en/donate/index.html` |
| `/contacto` | `dist/contacto/index.html` |
| `/es/contacto` | `dist/es/contacto/index.html` |
| `/en/contact` | `dist/en/contact/index.html` |
| `/historias/proteccion-palmar` | `dist/historias/proteccion-palmar/index.html` |
| `/es/historias/proteccion-palmar` | `dist/es/historias/proteccion-palmar/index.html` |
| `/en/stories/protecting-palmar` | `dist/en/stories/protecting-palmar/index.html` |
| `/historias/diagnostico-corazon` | `dist/historias/diagnostico-corazon/index.html` |
| `/es/historias/diagnostico-corazon` | `dist/es/historias/diagnostico-corazon/index.html` |
| `/en/stories/timely-heart-diagnosis` | `dist/en/stories/timely-heart-diagnosis/index.html` |
| `/historias/becas-uabcs` | `dist/historias/becas-uabcs/index.html` |
| `/es/historias/becas-uabcs` | `dist/es/historias/becas-uabcs/index.html` |
| `/en/stories/uabcs-scholarships` | `dist/en/stories/uabcs-scholarships/index.html` |
| `/historias/campana-vacunacion` | `dist/historias/campana-vacunacion/index.html` |
| `/es/historias/campana-vacunacion` | `dist/es/historias/campana-vacunacion/index.html` |
| `/en/stories/vaccination-campaign` | `dist/en/stories/vaccination-campaign/index.html` |

No manifest routes were skipped. Legacy Spanish aliases are still generated for compatibility, but they canonicalize to their `/es/...` equivalents.

## Build, Prerender, and QA Summary

Prior artifacts report these completed checks:

| Area | Result |
| --- | --- |
| TypeScript/lint | `npm run lint` passed in the later validation tasks. |
| Production build | `npm run build` passed with the system npm on `PATH`. Vite emitted the existing large chunk warning, but the build completed. |
| Static crawler artifacts | `public/sitemap.xml` and `public/robots.txt` were generated. Sitemap coverage is 30 routes. |
| Full prerender | `npm run prerender` generated 30 route files. |
| Route metadata | Generated HTML includes expected title, description, canonical, hreflang, Open Graph, Twitter, and article metadata where applicable. |
| Raw crawler HTML | Representative Spanish legacy, Spanish localized, and English localized routes passed raw HTML checks. |
| i18n determinism | Route language now wins over stored preference on initial startup when the URL maps to a known route. |
| Static file-resolution QA | All 30 generated route files exist and contain route-specific prerendered content plus the SPA module script. |

Known environment limit: the task runner blocks local server binding with `listen EPERM`, so browser prerender mode and live `npm run preview` direct-load tests could not run in this sandbox. The prerender command completed using the SSR snapshot fallback, and the static files were inspected directly. Follow-up HTTP checks should run in a normal local, CI, or staging environment.

## What This Preserves Compared With the Failed Next.js Migration

This approach preserves the current Vite React SPA architecture. It does not require changing page ownership to Next.js routes, moving files into a new app/pages structure, rewriting routing, or making every component safe for Node server rendering.

It also preserves the current visual implementation and client behavior: motion-heavy components, the existing React Router setup, i18n routing, Fundraise Up integration points, Cloudinary assets, and SPA navigation remain in place. The prerendered HTML improves crawler visibility without forcing a broad framework migration.

That matters because the site already works visually and interactively. The SEO issue was that raw HTML was too thin, not that the whole application needed a new framework.

## Remaining Limitations

This is still not the same as a true SSR or SSG framework.

- The app mounts with `createRoot`, so the client app remounts over the static snapshot instead of strict React hydration with `hydrateRoot`.
- Browser-based prerendering remains the preferred capture path, but it still needs verification outside this sandbox.
- Unknown or future routes require static-host fallback to `dist/index.html`; they will not automatically have route-specific raw HTML until added to the metadata manifest and prerendered.
- Production builds must set `SITE_URL` or `VITE_SITE_URL` so generated sitemap, robots, canonical, and alternate URLs use the live origin.
- Host-specific fallback config has not been committed because the deployment target is not known.
- Static snapshots cannot do per-request personalization, request-time data fetching, server redirects, or dynamic metadata generation.
- Legacy Spanish aliases are compatible and canonicalized, but they are still separate generated files rather than server redirects.
- Contact forms, donation embeds, language switching, clipboard behavior, and other interactive features still depend on the client SPA after load.

These limits are acceptable for the current marketing-site SEO goal. They would become more important if the project grows into a content platform with frequent publishing, dynamic data, or strict SSR requirements.

## Migration Decision

Decision: keep Vite prerender.

Do not retry Next.js immediately. Do not move to Vike or Astro immediately. Pause framework migration work unless a new requirement appears that static prerendering cannot satisfy.

Recommended next operational steps are deployment-focused:

1. Set `SITE_URL` or `VITE_SITE_URL` in the production build environment.
2. Run `npm run build` and `npm run prerender` for deployments.
3. Configure the selected static host to serve existing static files first and fall back unknown routes to `dist/index.html`.
4. Run live HTTP direct-load QA on staging for one Spanish legacy route, one `/es/...` route, one `/en/...` route, one story detail route, and one unknown fallback route.

## Stakeholder Explanation in Spanish

La opción de prerender con Vite resuelve el problema principal de SEO sin reconstruir el sitio desde cero. Antes, Google y otras herramientas veían principalmente una plantilla vacía y dependían de JavaScript para encontrar el contenido. Ahora, las páginas públicas importantes ya se generan como HTML con títulos, descripciones, enlaces canónicos, versiones por idioma y contenido visible.

Esto conserva el sitio actual, sus animaciones, navegación, donaciones e idioma, y evita el riesgo de otra migración grande a Next.js. Next.js, Astro o Vike podrían ser útiles más adelante si el sitio necesita contenido dinámico del servidor o una plataforma editorial más compleja. Para la necesidad actual, la recomendación es mantener Vite con prerender y validar el despliegue en staging.

## Prior Artifact Verification

All expected prior artifacts exist:

| Task | Artifact | Status |
| --- | --- | --- |
| `01` | `docs/seo-prerender/01-baseline-audit.md` | Present |
| `02` | `docs/seo-prerender/02-route-manifest.md` | Present |
| `03` | `docs/seo-prerender/03-seo-tags.md` | Present |
| `04` | `docs/seo-prerender/04-static-artifacts.md` | Present |
| `05` | `docs/seo-prerender/05-prerender-pilot.md` | Present |
| `06` | `docs/seo-prerender/06-prerender-coverage.md` | Present |
| `07` | `docs/seo-prerender/07-crawler-validation.md` | Present |
| `08` | `docs/seo-prerender/08-hosting-qa.md` | Present |

Missing or incomplete artifacts: none. Environment-limited QA is documented in tasks `05`, `06`, `07`, and `08`.

## Completion Report

- Final report path: `docs/seo-prerender/09-final-report.md`
- Final recommendation: keep Vite prerender; pause larger framework migration unless new SSR/SSG requirements appear.
- Number of prerendered routes: 30
- Missing or incomplete artifacts: none; live HTTP direct-load QA remains a deployment/staging follow-up because local server binding was blocked in the runner.
