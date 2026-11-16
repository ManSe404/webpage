# Writing a project

A project is one Markdown file in `website/src/content/projects/`, and the frontmatter is the whole project:
the file has no body and the site has no page per project. The frontmatter fills a honeycomb cell and its
popup, on the home page and on `/projects/`, and the Projects panel of the home dashboard. The fields and their
types are in the [content model](../reference/data-model.md#projects); this guide is about where each one shows
and how to write it.

## Pick the template

| Template | Use it when | File |
|---|---|---|
| Lead card | the project has a `featured` position: it is listed in the Projects panel of the home dashboard | [templates/lead-card.md](templates/lead-card.md) |
| Project card | every other project | [templates/project-card.md](templates/project-card.md) |

The names come from the cards the home page used to have: a big card for featured projects and a smaller one for
the rest. Both cards are gone, and every project now shows the same fields in the same places, so the two
templates differ only in their example values and in their notes on `featured` and on how many stack items to
list. Whether to merge them into one is open ([roadmap 4](../roadmap.md#4-one-template-for-a-project)).

Copy the template to `website/src/content/projects/<id>.md`; the file name becomes the id, which makes the
popup's anchor `#<group>-<id>`. Fill it in, delete the comments, then run the [checks](#check-it). The
templates live here, outside the collection folder, because the collection loads every `.md` file in that
folder.

## Where a project shows up

| Place | Which projects | What it shows |
|---|---|---|
| Home page, Chosen work | the projects with a `home` rank, in that order (eight, strongest first, client work only) | a honeycomb cell with the title up to " — " and the category, coloured by field; choosing it opens the popup (below) |
| `/projects/` | every project in one honeycomb, clustered by field (AI, Data & analytics, then Software & research for every other category) and by `order` inside each | the same cell and popup; the field filter (from `category`) and the type-of-work filter (from `org`) hide cells |
| The popup | every project with a cell | category and full title; Project description (`summary`); Achieved result (the `Result` metric value, else the first `impact` line, left out with neither); Role & responsibilities (the `Role` metric value, left out without one); Tech stack (every `stack` item); Company / client ("org · with client · period"); "Visit project ↗" when `link` is set |
| Home dashboard, Projects panel | the projects with a `featured` position, in that order (six) | a numbered row with the title and "org · with client · category" that opens in place to the same five lines as the popup |
| Home dashboard, Roadmap panel | projects whose `period` runs to the present and that have a `Stage` metric | the title and the `Stage` value, under Building |

`order` sorts every place but the home page, where `home` sets the order. `featured` decides only the Projects
panel; it does not put a project in Chosen work on the home page, which shows exactly the projects with a `home`
rank.

Without JavaScript every popup shows as a list under its honeycomb, and each cell links to its entry.

## Lengths

No length limit is measured for the places a project shows today. The numbers that used to stand here were
measured on the big card and the small card of the earlier home page, which no longer exist; the templates keep
them in their comments as a rough guide, marked as measured on the earlier cards. Past any length nothing
breaks the build.

| Field | What to aim for | Where it came from |
|---|---|---|
| `title` | a short name before " — ": the cell shows only that part, in a hexagon about 150 px wide on a wide screen and at most 160 px on a phone, where a long name wraps | no limit measured for the cell; ≤ 38 (big card) and ≤ 29 (small card) were measured on the earlier cards |
| `summary` | one sentence | 150–200 (big card) and 130–180 (small card) were measured on the earlier cards; the popup shows it in full |
| `org` and `client` | as short as the names allow | ≤ 29 for "org · with client" was measured on the earlier small card; the popup shows the line in full |
| The result: the `Result` metric value, else the first `impact` line | one line | never measured |
| `impact` | ≤ 120 each | a writing limit, not a layout one; only the first line is shown, and only without a `Result` metric |
| `stack` | 6–8 for a featured project where it really uses that many, 4–8 for the rest | the popup shows every item |
| `metrics` | 2–3 | `Role`, `Result` and `Stage` are read by label; any other label is not shown anywhere |

**How the earlier limits were measured.** Each was the longest text, cut at a word boundary, that stayed within
its lines in every sample of the site's own project text placed into the real card, at 1440 px and on a 390 px
phone. The same method would give limits for the honeycomb cell; measuring them is open
([roadmap 4](../roadmap.md#4-one-template-for-a-project)).

## What a project must say

A popup is read in a few seconds, so it says three things before anything else: **what problem was solved**,
**what value it brought**, and **the result**, measured wherever it was measured: time saved, cost cut, errors
gone, people using it. What was built and with which tools come after, as the way the value came about.

- **`summary`** carries the problem and the value in one sentence, and the result too when it fits in a few
  words ("… with numbers people trust at half the capacity cost"). Shapes that work: *the problem, how it was
  solved, the value* or *what was built, for whom, so that the value*. The test: someone who reads only the
  popup can say what was wrong before and what is better now.
- **The result** is a `metrics` entry labelled `Result`, with a number where one exists ("Capacity cost cut by
  half"). The popup shows it as Achieved result. A result nobody measured is
  stated as what happened ("in daily use", "support load down"), never as an estimated number. No result yet
  means no `Result` entry; the first `impact` line then stands in, and with neither the line is left out.
- **`impact`** lines are results a reader can check, what changed for the people who used it, not the tools.
  Only the first is shown, and only when there is no `Result` entry, so the strongest one comes first.
- Problem and value have no fields of their own; the summary carries them. The case study that used to tell
  the problem, the approach and the outcome at length is gone with the project pages.

## Writing the fields

- **`title`**: put the short name first and the description after " — " ("Mosaic — Document AI Bricks" shows
  as Mosaic on its cell).
- **`summary`** is one sentence. YAML ends a plain value at `: ` (colon and space) and at ` #`, so use a dash
  instead or put the whole value in double quotes.
- **`period`** goes in quotes (`"2026"`, `"2025 — Present"`): an unquoted bare year is read as a number and fails
  the schema.
- **`order`** groups projects by employer, the current one first and personal projects last. Inserting a
  project means renumbering the ones after it. The home page's Chosen work shows only the projects with a `home` rank (1 is the first cell), in that order: strongest first, client work only, eight of them; give the new project a rank there only if it should replace one.
- **`org`** is the employer the work was delivered under; it also decides the type of work on `/projects/`
  (`Personal` and `Open source` are own work, `BioIRC` is research, everything else client work).
  **`client`** is the partner or end customer, and only where it can be named publicly.
- **`stack`** names tools, libraries and platforms a reader could look up: XGBoost, Azure Data Factory,
  LangGraph. Concepts such as RAG, AI agents, time series or telephony are not a stack; they belong in the
  summary. The most telling item goes first.
- **`category`** decides the honeycomb (see [where a project shows up](#where-a-project-shows-up)); reuse one
  that exists unless the project needs a new one. A new category lands under Software & research on
  `/projects/` and nowhere on the home page until `website/src/pages/index.astro` lists it.
- **`metrics`** are found by label, not by position. A `Role` entry ("Architect & tech lead") fills the
  popup's Role & responsibilities line and a `Result` entry its Achieved result line; leave either out and the
  popup leaves that line out (the result falls back to the first `impact` line). A `Stage` entry ("Library,
  prototype") lists a project whose period runs to the present in the Roadmap panel. Entries with any other
  label are not shown.
- **`link`** is a public URL only; it adds "Visit project ↗" to the popup.

## Check it

```bash
cd website && npm run check && npm run build && npm run preview
```

Open the home page and `/projects/` at 1440 px and at 390 px (the browser's device toolbar), look at the
project's cell and open its popup. If the project also changes a role's highlights, update the CV as the
[development guide](development.md#the-cv) describes.
