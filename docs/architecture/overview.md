# Architecture overview

A static site built with [Astro](https://astro.build/) from the `website/` folder. All content is read from files
at build time; the output is plain HTML and CSS with a few small inline scripts, published to GitHub Pages. The
pipeline is drawn in [build-and-deploy](../diagrams/build-and-deploy.md).

## Context

- **Source.** `website/` holds the Astro project. `files/` holds the CV source and its PDF, outside the build.
- **Build.** `astro build` renders every page once and writes `website/dist/`. Nothing runs on a server.
- **Hosting.** GitHub Pages serves the output as a project site: `astro.config.mjs` sets `site` to the GitHub
  Pages host and `base` to `/webpage`, the repository name.
- **Outside services.** Visitors' browsers load the fonts from Google Fonts (`Base.astro`). Links point to
  external profiles and DOIs; nothing else is fetched.

## Goals

- Content changes without touching a component: case studies are Markdown files, records are JSON and CSV.
- Numbers on the research page are computed from the publication list, so they cannot drift from it.
- A typo in content fails the build instead of rendering an empty page: every collection has a Zod schema.
- Works without JavaScript; animations respect `prefers-reduced-motion`.

## Constraints

- Every internal link and asset path must carry the `base` prefix. `withBase()` in `src/lib/url.ts` adds it, and
  `BASE_URL` is `/webpage/` in this configuration.
- No UI framework and no client-side router: Astro components only, with `astro` as the single runtime
  dependency.
- Moving to another repository name or a custom domain means changing `site` and `base` in `astro.config.mjs`.

## Building blocks

### Content (`website/src/content.config.ts`)

Four content collections, each with a schema (fields in [data-model](../reference/data-model.md)):

| Collection | Loader | Source |
|---|---|---|
| `projects` | `glob` over Markdown | `src/content/projects/*.md`: frontmatter plus the case-study body |
| `experience` | `file` | `src/data/experience.json` |
| `collaborations` | `file` | `src/data/collaborations.json` |
| `publications` | `file` with a CSV parser | `src/data/publications.csv`, parsed by `src/lib/csv.ts`; the id is a slug of year, venue and title |

`profile.json`, `skills.json` and `education.json` in `src/data/` are imported directly by the pages and
components that need them.

### Pages (`website/src/pages/`)

| Route | File | What it renders |
|---|---|---|
| `/` | `index.astro` | Hero, selected work (featured projects and four more), collaborations, career timeline, the three latest publications, skills with education and certifications, contact |
| `/projects/` | `projects/index.astro` | Every project by `order`, the first three as full cards and the rest compact, with a category filter that runs in the browser |
| `/projects/<id>/` | `projects/[...slug].astro` | One case study per Markdown file, with previous and next by `order` |
| `/research/` | `research.astro` | The publication list, works per year, research areas, and headline numbers computed from the list: works, total citations, h-index, first-author count |

### Layout and components

- `src/layouts/Base.astro`: the HTML shell for every page: title and description (from `profile.json` unless a
  page passes its own), canonical URL, Open Graph and Twitter card tags, a schema.org `Person` in JSON-LD, the
  fonts, navigation, footer and the scroll-reveal script.
- `src/components/`: `Hero`, `Section`, `ProjectCard`, `Collaborations`, `Timeline`, `SkillGrid`, `Contact`,
  `Nav`, `Footer`, and two canvas animations, `EcgTrace` and `NodeField`. See the [codebase map](../reference/codebase.md).
- `src/styles/global.css`: the shared styles and design tokens.

### Scripts in the browser

The only JavaScript is small inline scripts: the ECG canvas and the node field, scroll reveals, the hero's stat
counters, the navigation toggle and sticky state, and the project filter. Without JavaScript every element still
renders. The canvases stop drawing when off screen or when the tab is hidden.

## Runtime

There is no runtime beyond the browser. The flow that matters is check, build and deploy, all in
`.github/workflows/deploy-website.yml` ("Website (check + deploy)"), the only workflow:

| Event | What runs |
|---|---|
| Every pull request, whatever it touches | The build job: `npm ci`, `npm run check` (astro check), `npm run build`. Nothing is uploaded or deployed. |
| Push to `main` touching `website/` or the workflow | The same checks and build, then `website/dist` is uploaded as the Pages artifact and the deploy job publishes it to the `github-pages` environment. |
| Manual run (`workflow_dispatch`) | The same as a push to `main`. |

- `build` is a required check on `main`, which is why every pull request runs it: a pull request that skipped it
  could not be merged.
- The build job runs on Node 24, with the npm cache keyed on `website/package-lock.json`, in `website/`.
- The workflow's default permission is `contents: read`; only the deploy job gets `pages: write`,
  `id-token: write` and `actions: read`.
- Each job has a 10-minute timeout.
- Pull-request runs share one concurrency group per branch ref and a newer run cancels an older one. Every other
  run joins the `pages` group and is never cancelled midway, so Pages is not left half-published.

## Crosscutting

- **Build-time checks.** Schema errors in any collection fail the build. `Timeline.astro` prints a warning for
  every role marked `dateUnconfirmed` in `experience.json`, so a placeholder date is visible in every build log.
  `collaborations.json` has a `needsReview` flag for copy that still needs sign-off.
- **Accessibility.** A skip link to the main content, `aria-hidden` on decorative canvases with a text
  alternative for the ECG trace, and reduced motion honoured by every animation.
- **What is public.** Everything in the repository is published or readable on GitHub. `.gitignore` keeps agent
  and editor tooling, secrets and build output out.

## The CV

`files/cv/stefan-seman-cv.html` is the source of the CV; it mirrors the site data. It is rendered to PDF with
WeasyPrint, and the PDF is copied to `files/` and to `website/public/files/`, where `profile.json` links it. The
commands are in [development](../guides/development.md#the-cv).

## Earlier version

The hand-written site this replaced is not in the working tree; it is kept at the `v1-legacy` tag.

## Open

- WeasyPrint is not declared anywhere in the repository; which version renders the CV is not recorded.
- There are no tests: CI type-checks and builds, nothing more.
