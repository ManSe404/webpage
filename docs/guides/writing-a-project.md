# Writing a project

A project is one Markdown file in `website/src/content/projects/`: the frontmatter fills the cards, the body is
the case study page. The fields and their types are in the [content model](../reference/data-model.md#projects);
this guide is about what fits on the cards.

## Pick the template

| Template | Use it when | File |
|---|---|---|
| Lead card | the project has `featured: true`: a big card in Selected work on the home page | [templates/lead-card.md](templates/lead-card.md) |
| Project card | every other project | [templates/project-card.md](templates/project-card.md) |

Copy the template to `website/src/content/projects/<id>.md`; the file name becomes the URL `/projects/<id>/`.
Fill it in, delete the comments, then run the [checks](#check-it). The templates live here, outside the
collection folder, because the collection loads every `.md` file in that folder.

## Where a project shows up

| Place | Which projects | Card | What the card shows |
|---|---|---|---|
| `/projects/` | every project, by `order` | a list row, filtered by type of work and topic | category, title, summary (two lines on wide screens, in full on a phone), "org · with client" and the period, an "On homepage" tag when featured |
| Home page, Selected work | every `featured: true` project | big, two across, one on a phone | category; a line with the `Role` metric value and "org · with client"; title; a Result box with the `Result` metric value, or the first `impact` line when there is none; summary; first four stack items, then +N |
| Home page, the row below it | the four lowest `order` values among projects that are not featured | regular, up to four across | category, title, org and client, summary, first five stack items |
| `/projects/<id>/` | every project | the case study page | every field and the body |

`order` sorts every list: the rows on `/projects/` and the home page row below Selected work. `featured` alone
decides the big card. A project that is not featured but has one of the four lowest `order` values sits in the
home page row, so it has to fit the project card limits there: a title of at most 29 characters and a summary
of 130 to 180.

## Limits

Characters, spaces included. Past a limit nothing breaks the build; the card grows a line, and because cards in
a row share one height, the whole row grows with it.

The big card was rebuilt after the lead card numbers below were measured: it lost the metric tag beside the
category chip and the impact list, and gained the role line and the Result box. Its character limits are to be
re-measured on the new card; until then the old numbers are a guide only, and a cell that says "to be
measured" has no number yet.

| Field | Lead card | Project card | Past the limit |
|---|---|---|---|
| `title` | ≤ 38, to be re-measured | ≤ 29 for the four in the home page row; the `/projects/` list has room for more | a third line; "Multilingual Document QA Chatbot" (32) already takes three in the home page row |
| `org` and `client`, shown as "org · with client" | on the big card after the `Role` value, as "role · org · with client": to be measured | ≤ 29 | the line wraps; on the big card it breaks between the role and the employer first, so a narrow card shows them on two lines |
| `summary` | 150–200, to be re-measured | 130–180 | shorter leaves the card emptier than its neighbours; longer makes every card in the row taller |
| The result: the `Result` metric value, else the first `impact` line | to be measured | not shown on the card | the Result box grows a line and pushes the summary down; the two cards of a row share one height, so the row grows with it |
| `impact` on the case study page | ≤ 120 each | ≤ 120 each | a writing limit, not a layout one |
| `stack` | 6–8 where the project really uses that many; the big card shows four, then +N | 4–8; the home page card shows five | the extra items show only on the case study page. Four long names ("Azure Machine Learning") take a second chip row on a narrow big card; the summary absorbs the difference, so the calls to action still line up across a row |
| `metrics` | 2–3; a `Role` entry fills the line above the title and a `Result` entry the Result box | 2–3 | |
| Body | 250–450 words | 180–350 words | a writing limit, not a layout one |

**How the layout limits were measured.** Each limit is the longest text, cut at a word boundary, that stayed
within its lines in every sample of the site's own project text placed into the real card. The widths were
1440 px, which stands for every window from 1280 px up because the page stops widening at 1180 px, and a
390 px phone. The numbers are the worst case, so a few characters more often still fit: go over only after you
have looked at the page. When the card styles in
`website/src/components/ProjectCard.astro` or the grids in `website/src/pages/` change, the limits change with
them. The big card has changed since: re-measure its column the same way, in the Selected work grid on the
home page at 1440 px and 390 px, and at about 960 px, the narrowest window that still shows two columns
(about 425 px a card).

## What a card must say

A card is read in a few seconds, so it says three things before anything else: **what problem was solved**,
**what value it brought**, and **the result**, measured wherever it was measured: time saved, cost cut, errors
gone, people using it. What was built and with which tools come after, as the way the value came about.

- **`summary`** carries the problem and the value in one sentence, and the result too when it fits in a few
  words ("… with numbers people trust at half the capacity cost"). Shapes that work: *the problem, how it was
  solved, the value* or *what was built, for whom, so that the value*. The test: someone who reads only the
  card can say what was wrong before and what is better now.
- **The result** is a `metrics` entry labelled `Result`, with a number where one exists ("Capacity cost cut by
  half"). The big card shows it in its Result box, and the case study page lists it with the other metrics. A
  result nobody measured is stated as what happened ("in daily use", "support load down"), never as an
  estimated number. No result yet means no `Result` entry; the box then shows the first `impact` line, and
  with neither it is left out.
- **`impact`** lines are results a reader can check, what changed for the people who used it, not the tools.
  The big card shows no impact list, but without a `Result` entry its first line is the card's result, so the
  strongest one comes first.
- Problem and value have no fields of their own. On the card the summary carries them; on the case study page
  The problem and The outcome do. A separate field would add lines to every small card and break the limits
  above.

## Writing the fields

- **`summary`** is one sentence and doubles as the page description for search and sharing. YAML ends a plain
  value at `: ` (colon and space) and at ` #`, so use a dash instead or put the whole value in double quotes.
- **`period`** goes in quotes (`"2026"`, `"2025 — Present"`): an unquoted bare year is read as a number and fails
  the schema.
- **`order`** groups projects by employer, the current one first and personal projects last. Inserting a
  project means renumbering the ones after it.
- **`org`** is the employer the work was delivered under. **`client`** is the partner or end customer, and only
  where it can be named publicly.
- **`stack`** names tools, libraries and platforms a reader could look up: XGBoost, Azure Data Factory,
  LangGraph. Concepts such as RAG, AI agents, time series or telephony are not a stack; they belong in the
  text. The most telling item goes first, because the big card shows four and the home page card five.
- **`category`** becomes a filter on `/projects/`; reuse one from the filter row unless the project needs a
  new one.
- **`metrics`** are found by label, not by position. On the big card a `Role` entry ("Architect & tech lead")
  opens the line above the title, before org and client, and a `Result` entry fills the Result box; leave
  either out and the card leaves that part out (the Result box falls back to the first `impact` line). Every
  entry, these two included, is listed on the case study page.
- **The body** has three sections, as every case study does: The problem, The approach, The outcome. Say who
  did what ("I designed", "the team built") and state the stage plainly.

## Check it

```bash
cd website && npm run check && npm run build && npm run preview
```

Open `/projects/` and the home page at 1440 px and at 390 px (the browser's device toolbar) and look at the
row the project sits in. If the project also changes a role's highlights, update the CV as the
[development guide](development.md#the-cv) describes.
