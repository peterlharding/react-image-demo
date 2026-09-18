# Changelog

All notable changes to React Image Demo are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Per-release detail lives in the [`release_notes/`](release_notes/) folder.

## [Unreleased]

### Changed

- Rewritten in TypeScript with strict type checking.
- Built with Vite instead of Create React App (`react-scripts` 4 and webpack 4), which no longer ran on current Node without `--openssl-legacy-provider`.
  `npm start` and `npm run dev` start the dev server; `npm run build` writes to `dist/`.
- Upgraded to React 19, React Router 8 (data router), react-bootstrap 2 with Bootstrap 5.3, and react-image-crop 11.
- The two crop pages share one cropping component instead of two copies of the same code.
- Cropped downloads are saved at the source image's full resolution rather than at on-screen size scaled by the display's pixel ratio.
- A crop selection, and its preview, appear as soon as an image loads, centred on the image, rather than only after the first drag.
- Uploaded images are read through object URLs, released when replaced or when leaving the page, instead of being held as data URLs.
- Navigation links are defined once and shared by the nav bar and footer.
- The dev server's address comes from `HOST` and `APP_PORT` in a local, untracked `.env` (template in `setup/env.template`) or the shell, defaulting to port 3000.
  `.env` is no longer committed.
- Requires Node 22.22 or later.

### Added

- A brand link in the nav bar, a collapsible nav bar on narrow screens, and highlighting of the current page.
- A not-found page for unknown routes.
- Unit tests (Vitest and Testing Library) and end-to-end tests (Playwright, desktop and mobile) against the production build.
- `npm run lint`, `npm run typecheck`, and `npm run check`, which runs every check.
- `package-lock.json` is now committed, so installs are reproducible.

### Fixed

- The footer no longer covers the bottom of the page; it sits below the content.
- Page content is no longer double-indented by nested containers.
- The nav bar used a Bootstrap 4 class (`mr-auto`) that has no effect in Bootstrap 5.
- The file input and buttons use Bootstrap styling instead of unstyled browser controls.
- Downloading a crop no longer leaks an object URL.

### Removed

- The unused `react-crop` and `web-vitals` dependencies, and the `.jshint` configuration.

[Unreleased]: https://github.com/peterlharding/react-image-demo/commits/main
