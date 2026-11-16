# Documentation

This repository is a personal portfolio and research website, a static Astro site in `website/` published to
GitHub Pages. Work on it continues: the [roadmap](roadmap.md) lists the fixes and the planned items.

Read in this order:

| # | Document | What it answers | Status | Last checked |
|---|---|---|---|---|
| 1 | [product/vision.md](product/vision.md) | Why the site exists, for whom, what it is not | current | 2026-11-16 |
| 2 | [product/features/README.md](product/features/README.md) | What the site offers, feature by feature, with status and where each lives in the code | current | 2026-11-16 |
| 3 | [roadmap.md](roadmap.md) | The fixes the code needs and what comes next, in priority order | current | 2026-11-16 |
| 4 | [guides/setup.md](guides/setup.md) | How to install, run and build it | current | 2026-11-16 |
| 5 | [architecture/overview.md](architecture/overview.md) | How it is built: content, pages, components, CI and deploy | current | 2026-11-16 |
| 6 | [diagrams/context.md](diagrams/context.md) | Who uses the site and what it touches outside itself | current | 2026-11-16 |
| 7 | [diagrams/container.md](diagrams/container.md) | The parts of the repository and where each one runs | current | 2026-11-16 |
| 8 | [diagrams/build-and-deploy.md](diagrams/build-and-deploy.md) | How content becomes the published site | current | 2026-11-16 |
| 9 | [reference/data-model.md](reference/data-model.md) | Where each piece of content lives and its fields | current | 2026-11-16 |
| 10 | [reference/codebase.md](reference/codebase.md) | Where each part lives in the code | current | 2026-11-16 |
| 11 | [guides/development.md](guides/development.md) | The dev loop, adding a project or a publication, the CV | current | 2026-11-16 |
| 12 | [guides/writing-a-project.md](guides/writing-a-project.md) | The two project templates, which card shows which field, and how many characters each holds | current | 2026-11-16 |
| 13 | [adr/0001-content-as-data-files.md](adr/0001-content-as-data-files.md) | Why content is Markdown, JSON and CSV read at build time | accepted | 2026-11-16 |
| 14 | [adr/0002-every-pull-request-runs-the-required-build.md](adr/0002-every-pull-request-runs-the-required-build.md) | Why every pull request builds the site, even a docs-only one | accepted | 2026-11-16 |

`website/README.md` is the short guide next to the code: commands and where content lives.

**Layout.** `product/` says why and what, `roadmap.md` what comes next, `architecture/` how it is built,
`diagrams/` holds the Mermaid diagrams, `adr/` the decisions, `reference/` what exists and can be checked
against the code, `guides/` how to do things. A change updates the documents it makes wrong in the same
commit.
