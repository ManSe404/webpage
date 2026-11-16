# Features

What the site offers a visitor and what it offers the person who maintains it, each row checked against the
code in `website/` and the workflow in `.github/workflows/`. Paths in the table are relative to `website/src/`
unless they start with another top-level folder.

| Feature | What you can do | Status | Where in code | Doc |
|---|---|---|---|---|
| Dashboard | Take in the whole profile in a few seconds: name, tagline and actions beside eight honeycomb cells (projects, years, papers, education, tools, in progress, 404 Solutions, contact), each with a count-up number computed from the data; pick a cell to open a panel and step through featured projects or roles, see research figures, education, the most used tools, what is in progress, the consultancy's partners or contact links; the ECG trace below | shipped; without JavaScript the cells link to their sections | `components/hive/HiveDashboard.astro`, `components/hive/HivePanels.astro`, `lib/dashboard.ts`, `components/EcgTrace.astro`, `components/NodeField.astro` | [overview](../../architecture/overview.md#layout-and-components) |
| 404 Solutions | See what the consultancy delivers: four services with the partners each was delivered with, then links to the partners and to contact | shipped; no prices and no booking link | `components/Consultancy.astro`, `data/consultancy.json` | |
| Selected work | See the featured case studies as big cards (role and employer, a Result box, summary, four tools) and four more as smaller ones, then open all projects | shipped | `pages/index.astro`, `components/ProjectCard.astro` | [writing a project](../../guides/writing-a-project.md) |
| Collaborations | See the delivery partners as cards with location, kind, description and tags | shipped | `components/Collaborations.astro`, `data/collaborations.json` | [data model](../../reference/data-model.md#collaborations) |
| Career timeline | Read every role newest first, with period, highlights and stack | shipped | `components/Timeline.astro`, `data/experience.json` | [data model](../../reference/data-model.md#experience) |
| Research preview | See the three most recent publications on the home page and open the research page | shipped | `pages/index.astro` | [overview](../../architecture/overview.md#pages-websitesrcpages) |
| Toolkit and education | See grouped skill chips, degrees and certifications | shipped | `components/SkillGrid.astro`, `pages/index.astro`, `data/skills.json`, `data/education.json` | [data model](../../reference/data-model.md#where-content-lives) |
| Contact | Write an email, open LinkedIn or GitHub, download the CV | shipped | `components/Contact.astro` | |
| Project index | See every project by `order` as one list (category, title, summary, employer and period, a tag on the featured ones) and narrow it by type of work and topic, with live counts | shipped; without JavaScript every row shows | `pages/projects/index.astro`, `components/ProjectRow.astro` | [overview](../../architecture/overview.md#pages-websitesrcpages) |
| Case studies | Read one project: summary, metrics, the case study, impact, stack, an outside link, previous and next | shipped | `pages/projects/[...slug].astro`, `content/projects/*.md` | [data model](../../reference/data-model.md#projects) |
| Research page | Read the publication list with DOI links, the works, citations, h-index and first-author counts computed from it, works per year, research areas, memberships and links to Google Scholar and ResearchGate | shipped | `pages/research.astro`, `data/publications.csv`, `lib/csv.ts` | [data model](../../reference/data-model.md#publications) |
| Navigation and footer | Move between Projects, 404 Solutions, Collaborations, Career, Research and Contact, see the current page underlined, download the CV, open the profiles; a toggle on narrow screens | shipped | `components/Nav.astro`, `components/Footer.astro` | |
| CV download | Download the CV as a PDF from the dashboard, the menu and the contact card | shipped; the PDF is rendered by hand with WeasyPrint | `website/public/files/stefan-seman-cv.pdf`, source `files/cv/stefan-seman-cv.html` | [development](../../guides/development.md#the-cv) |
| Sharing and search | Get a title, description, canonical URL, Open Graph and Twitter card and a schema.org `Person` on every page | shipped | `layouts/Base.astro` | [overview](../../architecture/overview.md#layout-and-components) |
| Accessibility and motion | Skip to the content, read everything without JavaScript, get no animation under reduced motion | shipped | `layouts/Base.astro`, `styles/global.css`, the canvas components | [overview](../../architecture/overview.md#crosscutting) |
| Content as validated files | Change what the site says by editing Markdown, JSON or CSV; a value that breaks a schema fails the build | shipped | `content.config.ts` | [ADR 0001](../../adr/0001-content-as-data-files.md) |
| Placeholder-date warning | See a build warning for every role whose start date is marked unconfirmed | shipped | `components/Timeline.astro` | [data model](../../reference/data-model.md#experience) |
| Review flag for collaborations | Mark a collaboration's copy as not signed off | partial: the flag is stored but nothing reads it, so a flagged card is published without a warning | `content.config.ts` (`needsReview`) | [roadmap F3](../../roadmap.md#f3-make-the-review-flag-do-something) |
| Checks and deploy | Get `astro check` and a build on every pull request; a merge into `main` that touches `website/` or the workflow deploys to GitHub Pages | shipped | `.github/workflows/deploy-website.yml` | [ADR 0002](../../adr/0002-every-pull-request-runs-the-required-build.md), [diagram](../../diagrams/build-and-deploy.md) |
| Plain-text profile | Reuse a text summary of the site data elsewhere | shipped, kept by hand | `files/stefan_context.txt` | [codebase](../../reference/codebase.md) |
| Section rail | Jump between home-page sections from a rail at the side | planned | | [roadmap 1](../../roadmap.md#1-section-rail-on-the-home-page) |
| Mobile design | Use a layout made for phones | planned | | [roadmap 2](../../roadmap.md#2-a-mobile-design-of-its-own) |
| Project templates | Start a new project from the lead-card or the project-card template, with the character limits each card holds | partial: nothing checks the limits; three home page row titles and the partner lines on small cards run long by choice | `docs/guides/templates/` | [writing a project](../../guides/writing-a-project.md) |
| Project redesign | Read redesigned project cards and pages | partial: the list and the big card are redesigned, the case-study page is not | `components/ProjectRow.astro`, `components/ProjectCard.astro` | [roadmap 3](../../roadmap.md#3-projects-redesigned-the-cv-follows) |

## For visitors

The home page opens with a dashboard to take in at a glance, then tells the story from top to bottom: selected
work, 404 Solutions, collaborations, the career, three
recent publications, the toolkit and contact. Each section is an anchor the menu links to. Two pages go deeper:
`/projects/` lists every case study with a category filter, and `/research/` holds the full publication list
with the numbers derived from it. The CV is one download from any page.

## For the maintainer

Everything the site says is a file under `website/src/`: one Markdown file per case study, JSON for the
profile, career, collaborations, skills and education, and a CSV of publications. The content collections in
`content.config.ts` validate those files, so a broken field stops the build instead of shipping an empty
block. A pull request is checked and built before it can merge; merging into `main` publishes. The CV and the
plain-text profile in `files/` mirror the site data by hand.

## Planned

The next items are in the [roadmap](../../roadmap.md), together with the fixes the code needs first.
