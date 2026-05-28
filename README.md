# Fundacion Costa Palmas

Next.js migration for the Fundacion Costa Palmas public site.

## Requirements

- Node.js 20 or newer
- npm

## Local Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

The site runs at `http://localhost:3000` by default. If port `3000` is unavailable, Next.js will suggest another port.

## Type Check

```sh
npm run typecheck
```

`npm run lint` is currently an alias for the same TypeScript check.

## Production Build

```sh
npm run build
```

This runs `next build --webpack` and produces the production output in `.next/`.

## Production Preview

After a successful build, run:

```sh
npm run preview
```

This starts `next start` against the existing `.next/` build output. Use it to verify direct access and browser refresh for public routes before deployment.

## Deployment

The app is ready for a standard Next.js hosting target such as Vercel.

Recommended deployment settings:

- Build command: `npm run build`
- Install command: `npm install` or `npm ci`
- Output: Next.js default `.next/`
- Node.js version: 20 or newer

Set `NEXT_PUBLIC_SITE_URL` to the production origin, for example `https://www.example.org`. Metadata, canonical URLs, sitemap entries, and robots output use this value. If it is not set, the app falls back to Vercel URL variables and then `http://localhost:3000`.

Before launch, run the production build and preview all public routes, including `/sitemap.xml` and `/robots.txt`.
