# Roadmap

What comes next for the site, in priority order. Each item says what it changes, which parts of the code it
touches and what is still open. Status is one of `planned`, `in progress`, `done`.

Fixes come first: they are small, independent of the numbered items, and correct something the code does
wrong. The numbered items after them are the planned work.

| # | Fix | Status |
|---|---|---|
| F1 | [Featured cards cut off on phones](#f1-featured-cards-cut-off-on-phones) | planned |
| F2 | [Hero numbers from the publication list](#f2-hero-numbers-from-the-publication-list) | planned |
| F3 | [Make the review flag do something](#f3-make-the-review-flag-do-something) | planned |
| F4 | [Upgrade Astro](#f4-upgrade-astro) | planned |

## F1. Featured cards cut off on phones

The featured grid on the home page has a minimum column width of 420 px
(`grid-template-columns: repeat(auto-fit, minmax(420px, 1fr))` in `website/src/pages/index.astro`). On a
screen narrower than about 460 px the column is wider than the page, and `overflow-x: hidden` on `body` in
`website/src/styles/global.css` hides the overflow instead of letting it scroll: the right edge of every large
card, its text and its chips, is cut off.

- **Fix:** `minmax(min(420px, 100%), 1fr)`. The lead grid on `/projects/` (330 px in
  `website/src/pages/projects/index.astro`) needs the same guard: at 360 px it is 10 px wider than the page and
  its right margin shrinks to half the left. The other grids have smaller minimums and fit.
- **Check:** widths from 360 to 430 px, as item 2 asks.

## F2. Hero numbers from the publication list

The hero stats "Peer-reviewed works" and "Citations" are typed into `website/src/data/profile.json`, while the
research page computes the same numbers from `website/src/data/publications.csv`. A new row or a citation
refresh changes the research page and leaves the home page behind. The counts in the root `README.md` are
typed in as well.

- **Fix:** move the counting in `website/src/pages/research.astro` into a helper in `website/src/lib/` and let
  `Hero.astro` use it for those two stats; keep the years and the systems count in `profile.json`.
- **Open:** what "Systems delivered" counts. It is a typed number, and the project list also holds personal
  prototypes that were not delivered to anyone.

## F3. Make the review flag do something

`needsReview` in `website/src/data/collaborations.json` is in the schema, but no component reads it: a card
marked for review is published like any other, and the build does not say so. `dateUnconfirmed` on the
career timeline, by contrast, prints a warning on every build.

- **Fix:** warn in `Collaborations.astro` the way `Timeline.astro` does, or leave flagged cards out of the
  build, or drop the field.
- **Open:** which of the three.

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
| 3 | [Projects redesigned, the CV follows](#3-projects-redesigned-the-cv-follows) | planned |
| 4 | [One template for a project](#4-one-template-for-a-project) | planned |
| 5 | [CV and LinkedIn brought in line](#5-cv-and-linkedin-brought-in-line) | later, as needed |

## 1. Section rail on the home page

A vertical line at the side of the home page with one marker per section: Work, Collaborations, Career,
Research, Stack, Contact. The marker of the section in view lights up as the page scrolls; a click on a marker
scrolls to its section.

- **Touches:** `website/src/pages/index.astro` (sections `work`, `collaborations`, `journey`, `research`,
  `stack`, and `contact` in `Contact.astro`), a new component for the rail, `website/src/components/Nav.astro`.
- **The top menu changes with it.** Collaborations, Career and Contact are in-page links today
  (`/#collaborations`, `/#journey`, `/#contact`), the same jumps the rail makes. Open: which links stay in the
  top menu (for example only the pages: Projects, Research and the CV) and which the rail takes over.
- **Conventions that apply** ([development guide](guides/development.md#conventions)): no UI framework, a small
  inline script, plain anchor links so it works without JavaScript, smooth scrolling only without
  `prefers-reduced-motion`.

## 2. A mobile design of its own

On a phone the site is the desktop layout stacked into one column. The goal is a layout that is interesting on
a phone in its own right, in the same hive palette, not only one that fits.

- **Open:** what the section rail from item 1 becomes on a narrow screen (for example a thin bar with the
  section markers along the top or bottom edge); how the hero, with the ECG trace and the node field, behaves on
  a small screen; how the project cards read with one hand.
- **Check:** widths from 360 to 430 px, no horizontal scrolling, touch targets large enough to hit.

## 3. Projects redesigned, the CV follows

Rework how projects look: the cards on the home page and on `/projects`, and the case-study pages
`/projects/<slug>`. The project Markdown files in `website/src/content/projects/` are rewritten where the new
design needs it. The CV source `files/cv/stefan-seman-cv.html` mirrors the site data, so it takes the same
structure and wording.

- **Open:** the design itself. Layout changes are shown as before-and-after screenshots before they merge.
- **Check the numbers that describe other repositories** while the files are rewritten: a case study that
  counts something in another project (packs, skills, tests) is typed in and goes stale when that project
  moves on. The code comments that count projects (`pages/index.astro`, `pages/projects/index.astro`,
  `components/ProjectCard.astro`) go with it.

## 4. One template for a project

One template file with every field of the `projects` collection in `website/src/content.config.ts` (title,
category, summary, featured, order, period, org, client, impact, stack, metrics, link) and the three sections
every case study already has (The problem, The approach, The outcome), each with a line on what belongs there.
A new project starts as a copy of the template and is filled in.

- **Where:** outside `website/src/content/projects/`, because the collection loads every `.md` file in that
  folder.
- **Order:** together with item 3, so the template carries the new design; the existing projects are then
  checked against it.
- **Open:** whether the CV entries get a template of their own as well.

## 5. CV and LinkedIn brought in line

After items 3 and 4, bring the CV (the HTML source and both PDFs, see the
[development guide](guides/development.md#the-cv)) and the LinkedIn profile in line with the site content, as
needed. LinkedIn is edited by hand; nothing in this repository writes to it.
