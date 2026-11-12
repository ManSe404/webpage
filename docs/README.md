# Documentation

This repository is a personal portfolio and research website, a static Astro site in `website/` published to
GitHub Pages.

Read in this order:

| # | Document | What it answers | Status | Last checked |
|---|---|---|---|---|
| 1 | [product/vision.md](product/vision.md) | Why the site exists, for whom, what it is not | current | 2026-11-11 |
| 2 | [roadmap.md](roadmap.md) | What comes next, in priority order, and what is still open | current | 2026-11-12 |
| 3 | [guides/setup.md](guides/setup.md) | How to install, run and build it | current | 2026-11-11 |
| 4 | [architecture/overview.md](architecture/overview.md) | How it is built: content, pages, components, CI and deploy | current | 2026-11-11 |
| 5 | [diagrams/build-and-deploy.md](diagrams/build-and-deploy.md) | How content becomes the published site | current | 2026-11-11 |
| 6 | [reference/data-model.md](reference/data-model.md) | Where each piece of content lives and its fields | current | 2026-11-11 |
| 7 | [reference/codebase.md](reference/codebase.md) | Where each part lives in the code | current | 2026-11-11 |
| 8 | [guides/development.md](guides/development.md) | The dev loop, adding a project or a publication, the CV | current | 2026-11-11 |

`website/README.md` is the short guide next to the code: commands and where content lives.

**Layout.** `product/` says why and what, `roadmap.md` what comes next, `architecture/` how it is built,
`diagrams/` holds the Mermaid diagram, `reference/` what exists and can be checked against the code, `guides/`
how to do things. A change updates the documents it makes wrong in the same commit.

## Open

- `website/README.md` says a failing pull-request check "blocks nothing yet"; the workflow now calls `build` a
  required check on `main` (see [the architecture overview](architecture/overview.md#runtime)).
