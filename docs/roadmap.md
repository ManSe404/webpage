# Roadmap

What comes next for the site, in priority order. Each item says what it changes, which parts of the code it
touches and what is still open. Status is one of `planned`, `in progress`, `done`.

Fixes come first: they are small, independent of the numbered items, and correct something the code does
wrong. The numbered items after them are the planned work.

| # | Fix | Status |
|---|---|---|
| F1 | [Featured cards cut off on phones](#f1-featured-cards-cut-off-on-phones) | done |
| F2 | [Hero numbers from the publication list](#f2-hero-numbers-from-the-publication-list) | done |
| F3 | [Make the review flag do something](#f3-make-the-review-flag-do-something) | planned |
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
| 3 | [Projects redesigned, the CV follows](#3-projects-redesigned-the-cv-follows) | in progress |
| 4 | [One template for a project](#4-one-template-for-a-project) | done |
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
  section markers along the top or bottom edge); how the dashboard, with the ECG trace and the node field, behaves on
  a small screen; how the project cards read with one hand.
- **Check:** widths from 360 to 430 px, no horizontal scrolling, touch targets large enough to hit.

## 3. Projects redesigned, the CV follows

Rework how projects look: the cards on the home page and on `/projects`, and the case-study pages
`/projects/<slug>`. The project Markdown files in `website/src/content/projects/` are rewritten where the new
design needs it. The CV source `files/cv/stefan-seman-cv.html` mirrors the site data, so it takes the same
structure and wording.

- **Done:** `/projects/` is one list with type-of-work and topic filters (`components/ProjectRow.astro`), and the
  big card in Selected work follows the redesign concept: role and employer, a Result box, four tools
  (`components/ProjectCard.astro`).
- **Open:** the case-study page; re-measuring the big card's character limits; a measured `Result` metric for
  each featured project (all six fall back to their first impact line today).
- **Check the numbers that describe other repositories** while the files are rewritten: a case study that
  counts something in another project (packs, skills, tests) is typed in and goes stale when that project
  moves on. The code comments that count projects (`pages/index.astro`, `pages/projects/index.astro`,
  `components/ProjectCard.astro`) go with it.

## 4. One template for a project

Done as two templates, one per card type: `docs/guides/templates/lead-card.md` for the big cards and
`docs/guides/templates/project-card.md` for the rest. Each carries every field of the `projects` collection and
the three case study sections, with the character limits measured on the real cards.
[Writing a project](guides/writing-a-project.md) explains which card shows which field and what breaks past
each limit.

- **Open:** every project fits its card, with two exceptions kept by choice: three titles in the home page row
  take three lines there (Document Chatbot That Talks to Data, Multilingual Document QA Chatbot, Supply Chain &
  Sales Forecasting), and the partner lines "404 Solutions · with …" wrap on the small cards.
  They are brought in line as part of item 3, and the limits change if item 3 changes the cards.
- **Open:** nothing checks the limits. A build warning, in the style of the `[timeline] UNCONFIRMED DATE`
  warning, would name each field over its limit.
- **Open:** whether the CV entries get a template of their own as well.

## 5. CV and LinkedIn brought in line

After items 3 and 4, bring the CV (the HTML source and both PDFs, see the
[development guide](guides/development.md#the-cv)) and the LinkedIn profile in line with the site content, as
needed. LinkedIn is edited by hand; nothing in this repository writes to it.
