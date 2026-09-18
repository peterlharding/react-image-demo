# React Image Demo

A simple React web application demonstrating some ways of working with images: displaying one, animating it, cropping it, and uploading one of your own to crop.
It uses TypeScript, Vite, React Router, and React Bootstrap.

## Getting started

Requires Node 22.22 or later (see `.nvmrc`).

```sh
npm install
cp setup/env.template .env   # optional: set HOST and APP_PORT for the dev server
npm start                    # http://localhost:3000 unless .env says otherwise
```

Shell environment variables override `.env`, for example `APP_PORT=3001 npm start`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` / `npm run dev` | Dev server with hot reload on `HOST`:`APP_PORT` (default port 3000) |
| `npm run build` | Type-check and build the production bundle into `dist/` |
| `npm run preview` | Serve the production bundle on port 4173 |
| `npm run lint` | ESLint, failing on any warning |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests (Playwright) against the production build |
| `npm run check` | All of the above, as run before a release |

The first time you run the end-to-end tests, install the browser with `npx playwright install chromium`.

## Releases

See [RELEASING.md](RELEASING.md) and [CHANGELOG.md](CHANGELOG.md).
