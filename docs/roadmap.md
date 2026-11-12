# Roadmap

What comes next for the site, in priority order. Each item says what it changes, which parts of the code it
touches and what is still open. Status is one of `planned`, `in progress`, `done`.

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
