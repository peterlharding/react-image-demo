# Releasing React Image Demo

This document describes the release process for React Image Demo.
Follow these steps for every release so that the version number, changelog, release notes, and git tag stay in sync.

## Versioning

The project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html): `MAJOR.MINOR.PATCH`.

- MAJOR: incompatible or sweeping changes.
- MINOR: new, backward-compatible features.
- PATCH: backward-compatible bug fixes only.

## Where versions live

- `version` in `package.json` (and the matching entries in `package-lock.json`).
- `CHANGELOG.md` at the repo root, following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
- `release_notes/<version>.md`, one user-facing file per release.
- The git tag `v<version>` (annotated).

## Release steps

1. **Pick the version number** based on the nature of the changes (see Versioning above).

2. **Bump the version** without letting npm commit or tag, so the release commit carries everything together:

   ```sh
   npm version <version> --no-git-tag-version
   git diff package.json package-lock.json   # expect only the version fields to change
   ```

3. **Cut the changelog.** In `CHANGELOG.md`:
   - Move the items under `## [Unreleased]` into a new `## [<version>] - YYYY-MM-DD` section (today's date).
   - Leave a fresh, empty `## [Unreleased]` at the top.
   - Add a `See [release_notes/<version>.md](release_notes/<version>.md) for details.` line under the new heading.
   - Update the link references at the bottom of the file: point `[Unreleased]` at `compare/v<version>...HEAD` and add a `[<version>]` tag link.

4. **Write the release notes** at `release_notes/<version>.md`.
   Use the existing files as a template: a short intro, Highlights, any Fixed section, and Under the hood.

5. **Run every check** and confirm there are no warnings and no failures:

   ```sh
   npm run check   # lint, typecheck, unit tests, production build, end-to-end tests
   ```

   Do not cut a release on a failing or flaky suite.
   Fix the test or the code first, even when the failure looks unrelated to what the release contains.

6. **Commit** the version bump, changelog, and release notes together:

   ```sh
   git add -A
   git commit -m "Release <version>"
   ```

7. **Tag** the release with an annotated tag:

   ```sh
   git tag -a v<version> -m "React Image Demo <version>"
   ```

8. **Push** the commit and the tag:

   ```sh
   git push origin main
   git push origin v<version>
   ```

9. **(Optional) Publish a GitHub release** from the tag, using the matching release notes as the body:

   ```sh
   gh release create v<version> --title "React Image Demo <version>" \
     --notes-file release_notes/<version>.md
   ```

   Treat creating a release as a one-shot.
   If the repository has immutable releases enabled, a release cannot be amended, and deleting it leaves the tag name reserved, so it cannot be recreated.
   Get the notes right first.

## Commit conventions

Use a short prefix on commit messages so history is easy to scan.

- `Release <version>` for the single commit that cuts a release (step 6 above).
- `feat: <summary>` for a new feature, `fix: <summary>` for a bug fix.
- `refactor: <summary>` for restructuring that does not change behaviour.
- `docs: <summary>` for documentation and process changes that are not part of a release.
- `test: <summary>` for test-only changes.
- `build: <summary>` for build tooling, dependencies, and configuration.

Documentation or process changes (this file, README, CLAUDE.md) are committed on their own with a `docs:` message rather than being folded into a release commit.

## Notes

- `CHANGELOG.md` is maintained by hand; there is no generator.
  Add to `## [Unreleased]` as part of each change, not only at release time.
- Tags are annotated (`git tag -a`) so they carry a message and tagger, and can be verified and listed with release metadata.
- Keep one commit per release (`Release <version>`) so each tag anchors to a distinct, accurate point in history.
- Build output goes to `dist/`, which is gitignored. Nothing it produces is committed.
