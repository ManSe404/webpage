# Roadmap

What comes next for the site, in priority order. Each item says what it changes, which parts of the code it
touches and what is still open. Status is one of `planned`, `in progress`, `done`.

Fixes come first: they are small, independent of the numbered items, and correct something the code does
wrong. The numbered items after them are the planned work.

| # | Fix | Status |
|---|---|---|
| F1 | [Featured cards cut off on phones](#f1-featured-cards-cut-off-on-phones) | done |
| F2 | [Hero numbers from the publication list](#f2-hero-numbers-from-the-publication-list) | done |
| F3 | [Make the review flag do something](#f3-make-the-review-flag-do-something) | dropped |
| F4 | [Upgrade Astro](#f4-upgrade-astro) | planned |

## F1. Featured cards cut off on phones

The featured grid on the home page has a minimum column width of 420 px
(`grid-template-columns: repeat(auto-fit, minmax(420px, 1fr))` in `website/src/pages/index.astro`). On a
screen narrower than about 460 px the column is wider than the page, and `overflow-x: hidden` on `body` in
`website/src/styles/global.css` hides the overflow instead of letting it scroll: the right edge of every large
card, its text and its chips, is cut off.

- **Done:** the featured grid uses `minmax(min(420px, 100%), 1fr)`, the collaborations grid got the same guard,
  and the lead grid on `/projects/` is gone with the list (item 3). Measured with no horizontal overflow at 360,
  390, 768, 1024 and 1440 px on the home page, `/projects/`, a case study and `/research/`.
- **Since:** the featured grid, the collaborations grid, the list and the case-study pages are all gone with the
  hive redesign (item 3). The honeycombs take their cell width from the screen width on a phone; the new layout
  has not been measured for overflow the same way.

## F2. Hero numbers from the publication list

The hero stats "Peer-reviewed works" and "Citations" are typed into `website/src/data/profile.json`, while the
research page computes the same numbers from `website/src/data/publications.csv`. A new row or a citation
refresh changes the research page and leaves the home page behind. The counts in the root `README.md` are
typed in as well.

- **Done:** the hero gave way to the home dashboard, which counts works and citations from the publication
  list with the same helper as the research page (`website/src/lib/dashboard.ts`), and counts projects as client
  work and own work instead of a typed "Systems delivered". Only the years stay in `profile.json`.
- **Still typed:** the counts in the root `README.md`.

## F3. Make the review flag do something

- **Dropped:** the flag lived in `collaborations.json`, the partner descriptions of the 404 Solutions panel.
  The panel, `collaborations.json` and `consultancy.json` were removed: the consultancy's pitch belongs to
  the 404 Solutions site, and a second copy here had already drifted from it. The files are in git history.

## F4. Upgrade Astro

`website/package.json` asks for Astro `^5.13.0`. `npm audit` lists advisories against Astro and the build
tools it brings (Vite, sharp, Zod, SVGO) that are fixed only in a later Astro major. The output is static, so
most of them concern the machine that builds the site, not the visitor; the Astro cross-site scripting
advisory is about `define:vars`, which the site does not use.

- **Fix:** upgrade on a branch following Astro's upgrade guide, run `npm run check` and `npm run build`, and
  compare every page before and after.
- **Open:** whether to do it before item 3, so the redesign starts on the new version.

## Planned

| # | Item | Status |
|---|---|---|
| 1 | [Section rail on the home page](#1-section-rail-on-the-home-page) | planned |
| 2 | [A mobile design of its own](#2-a-mobile-design-of-its-own) | planned |
| 3 | [Projects redesigned, the CV follows](#3-projects-redesigned-the-cv-follows) | in progress |
| 4 | [One template for a project](#4-one-template-for-a-project) | done |
| 5 | [CV and LinkedIn brought in line](#5-cv-and-linkedin-brought-in-line) | later, as needed |

## 1. Section rail on the home page

A vertical line at the side of the home page with one marker per section. The marker of the section in view
lights up as the page scrolls; a click on a marker scrolls to its section.

- **Written for a longer page.** The item was planned when the home page had six sections (Work,
  Collaborations, Career, Research, Stack, Contact). Since the hive redesign it has the dashboard and two
  sections: Chosen work (`#work`) and Contact (`#contact` in `Contact.astro`); the career is the Career
  cell (`/#experience`) and the lab has its own page (`/lab/`). **Open:** whether a rail
  still earns its place on a page this short, and if it does, which markers it carries.
- **Touches:** `website/src/pages/index.astro`, a new component for the rail, `website/src/components/Nav.astro`.
- **The top menu changes with it.** 404 Solutions and Contact are in-page links today; 404 Solutions
  opens a dashboard panel (`components/hive/HiveDashboard.astro`). Open: which links stay in the
  top menu (for example only the pages: Projects, Research and the CV) and which the rail takes over.
- **Conventions that apply** ([development guide](guides/development.md#conventions)): no UI framework, a small
  inline script, plain anchor links so it works without JavaScript, smooth scrolling only without
  `prefers-reduced-motion`.

## 2. A mobile design of its own

On a phone the site is the desktop layout stacked into one column. The goal is a layout that is interesting on
a phone in its own right, in the same hive palette, not only one that fits.

- **Open:** what the section rail from item 1 becomes on a narrow screen (for example a thin bar with the
  section markers along the top or bottom edge); how the dashboard, with the ECG trace and the node field, behaves on
  a small screen; how the project honeycombs and their popups read with one hand.
- **Check:** widths from 360 to 430 px, no horizontal scrolling, touch targets large enough to hit.

## 3. Projects redesigned, the CV follows

Rework how projects look on the home page and on `/projects`. The project Markdown files in
`website/src/content/projects/` are rewritten where the new design needs it. The CV source
`files/cv/stefan-seman-cv.html` mirrors the site data, so it takes the same structure and wording.

- **Done:** projects are honeycombs whose cells open a short popup (description, result, role, stack, company
  and client, and the outside link): one on the home page, Chosen work (eight projects with a `home` rank), and one big honeycomb
  on `/projects/` with field and type-of-work filters (`components/hive/ProjectHive.astro`, `pages/projects/index.astro`).
  The popup is a project's whole description: the case-study pages and the Markdown body of every project file
  are removed, and so are the list, the big card and the Selected work section. The career is a timeline,
  newest first, in the dashboard's Career panel (`components/hive/HivePanels.astro`).
- **Open:** a measured `Result` metric for each project: two have one today and none of the six featured, so
  the rest show their first impact line as the result.
- **Open:** what to do with the frontmatter nothing shows any more: `impact` lines after the first, and
  `metrics` with a label other than `Role`, `Result` or `Stage` (such as Eval or Scope) were shown on the
  case-study page and are now read by nothing. Show them in the popup, or drop them from the files.
- **Open:** a link to one project. With JavaScript, `#<group>-<id>` does not open its popup, so no address
  points at a single project.
- **Check the numbers that describe other repositories** while the files are rewritten: a summary or an
  impact line that counts something in another project (packs, skills, tests) is typed in and goes stale when
  that project moves on.

## 4. One template for a project

Done as two templates, one per card type of the earlier home page: `docs/guides/templates/lead-card.md` for
featured projects and `docs/guides/templates/project-card.md` for the rest. Each carries every field of the
`projects` collection. [Writing a project](guides/writing-a-project.md) explains where each field shows.

- **Open:** whether the two become one. The big and small cards they were made for are gone with item 3, and
  every project now shows the same fields in the same places; the templates differ only in their notes on
  `featured` and on the number of stack items.
- **Open:** no length is measured for the places a project shows today. The character limits in the templates
  were measured on the earlier cards and are kept as a rough guide only. The honeycomb cell is the one place
  where length shows: it holds the title up to " — " in a hexagon about 150 px wide.
- **Open:** nothing checks lengths. A build warning, in the style of the `[timeline] UNCONFIRMED DATE` warning,
  would name each field over a limit once there is one.
- **Open:** whether the CV entries get a template of their own as well.

## 5. CV and LinkedIn brought in line

After items 3 and 4, bring the CV (the HTML source and both PDFs, see the
[development guide](guides/development.md#the-cv)) and the LinkedIn profile in line with the site content, as
needed. LinkedIn is edited by hand; nothing in this repository writes to it.
