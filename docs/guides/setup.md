# Setup

## Prerequisites

- Node and npm. CI builds on Node 24; `website/README.md` asks for Node 22 or newer locally.
- Optional, for the CV only: [WeasyPrint](https://weasyprint.org/).

No settings or secrets: the site has no environment variables. `site` and `base` in `website/astro.config.mjs`
are the only deployment settings.

## Install and run

```bash
cd website
npm install
npm run dev        # http://localhost:4321/webpage
```

The `/webpage` prefix comes from `base` in `astro.config.mjs`; the dev server serves the site under it, as GitHub
Pages does.

## Build what CI builds

```bash
cd website
npm ci
npm run check      # astro check: types in .astro and .ts files
npm run build      # static output in website/dist
npm run preview    # serve the built output
```
