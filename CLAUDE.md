# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small Vite + React 19 + TypeScript app demonstrating ways of working with images: a static display, a CSS spin animation, cropping a bundled image, and uploading then cropping a user image.
Uses React Router 8 (data router), react-bootstrap 2 / Bootstrap 5.3, and react-image-crop 11.

- **`RELEASING.md`** is the release process (semver, `CHANGELOG.md`, `release_notes/<version>.md`, annotated `v<version>` tags, `Release <version>` commits, `feat:`/`fix:`/`docs:`… prefixes).
  Follow it exactly.
- **`CHANGELOG.md` is hand-edited here.** There is no generator, so add to `## [Unreleased]` as part of each change.

## Commands

```sh
npm start                  # dev server on HOST/APP_PORT from .env, default localhost:3000 (strictPort)
npm run check              # lint + typecheck + unit tests + build + e2e: run before calling work done
npm run lint               # eslint, --max-warnings 0, type-aware (strictTypeChecked)
npm run typecheck          # tsc -b over tsconfig.app.json (src) and tsconfig.node.json (configs, e2e)
npm test                   # vitest run (jsdom)
npx vitest run src/lib/crop.test.ts          # one unit test file
npm run test:e2e           # playwright: builds, serves dist on 4173, runs desktop + mobile projects
npx playwright test -g "uploads" --project=desktop   # one e2e test
```

Node 22.22+ is required (React Router 8's minimum).
`vite.config.ts` reads `HOST` and `APP_PORT` from `.env` (gitignored; copy `setup/env.template`) or the shell, which wins over `.env`.
The `Makefile` (`make install`, `make run`, `make chk-env`) reads the same two keys.
They have no `VITE_` prefix, so they never reach client code.
The e2e run ignores them and always uses `127.0.0.1:4173`.
Playwright needs `npx playwright install chromium` once.

## Architecture

- `src/main.tsx` creates the browser router from `src/app/routes.ts`; tests use `createMemoryRouter(routes)` with the same route table.
- `src/app/App.tsx` is the layout route: `NavBar`, `<main>` with `<Outlet />`, `Footer`, in a `min-vh-100` flex column so the footer sits below content.
- `src/app/navigation.ts` is the single list of nav links, rendered by both `NavBar` and `Footer`; a new page means a route in `routes.ts`, an entry in `navigation.ts`, and an export in `src/components/index.ts`.
- Pages render inside the layout's `Container`; do not wrap them in another one.

### Cropping

`CropWorkbench` is shared by `ImageCrop` (bundled image) and `ImageUploadAndCrop` (object URL from a file input, revoked when replaced or on unmount).
It holds the selection as a percent crop (`onChange`) and the finished selection as a pixel crop in displayed CSS pixels (`onComplete`).
`src/lib/crop.ts` scales that to the source's natural pixels and draws it at full resolution onto the preview `<canvas>`, which CSS shrinks to the on-screen selection size; the download exports that canvas as PNG.
The initial selection is set in the `<img>` `onLoad`, so a new upload resets it.
