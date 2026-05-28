<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/400b3daf-de38-409c-a4f2-37c99246421f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build and deploy

Set the deployment origin before production builds so generated sitemap, robots, canonical, and Open Graph URLs match the live site:

```sh
export SITE_URL=https://your-domain.example
npm run build
npm run prerender
```

Deploy the generated `dist/` directory. The static host should serve prerendered `index.html` files for known route directories first, then rewrite unknown application routes to `/index.html` so React Router can handle the SPA fallback.
