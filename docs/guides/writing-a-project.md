# Writing a project

A project is one Markdown file in `website/src/content/projects/`: the frontmatter fills the cards, the body is
the case study page. The fields and their types are in the [content model](../reference/data-model.md#projects);
this guide is about what fits on the cards.

## Pick the template

| Template | Use it when | File |
|---|---|---|
| Lead card | the project is one of the three lowest `order` values (the first row on `/projects/`), or it has `featured: true` (a big card on the home page) | [templates/lead-card.md](templates/lead-card.md) |
| Project card | every other project | [templates/project-card.md](templates/project-card.md) |

Copy the template to `website/src/content/projects/<id>.md`; the file name becomes the URL `/projects/<id>/`.
Fill it in, delete the comments, then run the [checks](#check-it). The templates live here, outside the
collection folder, because the collection loads every `.md` file in that folder.

## Where a project shows up

| Place | Which projects | Card | What the card shows |
|---|---|---|---|
| `/projects/`, first row | the three lowest `order` values | big, three across | category, first metric value, title, org and client, summary, first three impact lines, first eight stack items |
| `/projects/`, the grid | every other project | compact, up to four across | category, title, org and client, summary |
| Home page, Selected work | every `featured: true` project | big, two across | as the first row on `/projects/` |
| Home page, the row below it | the four lowest `order` values among projects that are not featured | regular, up to four across | category, title, org and client, summary, first five stack items |
| `/projects/<id>/` | every project | the case study page | every field and the body |

`order` and `featured` are separate switches. A lead project that is not featured is also one of the four in
the home page row below Selected work, so it has to fit the project card limits for the title and the summary
as well: a title of at most 29 characters and a summary of 150 to 180.

## Limits

Characters, spaces included. Past a limit nothing breaks the build; the card grows a line, and because cards in
a row share one height, the whole row grows with it.

| Field | Lead card | Project card | Past the limit |
|---|---|---|---|
| `title` | ≤ 38 | ≤ 42 on `/projects/`; ≤ 29 for the four in the home page row | a third line; "Multilingual Document QA Chatbot" (32) already takes three in the home page row |
| `org` and `client`, shown as "org · with client" | ≤ 40 | ≤ 29 | the line wraps; "404 Solutions · with Provectus" is 30 and already wraps on the compact card |
| `summary` | 150–200 | 130–180 | shorter leaves the card emptier than its neighbours; longer makes every card in the row taller |
| `category` + first `metrics` value | ≤ 37 together | not shown | the tag beside the category chip wraps to two lines |
| `impact`, first three | ≤ 65 each | not shown on the card | three lines per bullet, and the lists of the three lead cards stop lining up |
| `impact` on the case study page | ≤ 120 each | ≤ 120 each | a writing limit, not a layout one |
| `stack` | 6–8 where the project really uses that many; the card shows eight, then +N | 4–8; the home page card shows five | the extra items show only on the case study page. In the first row on `/projects/` the summary absorbs any difference below it, so the impact lists line up only when the three stacks fill the same number of chip rows |
| `metrics` | 2–3 | 2–3 | |
| Body | 250–450 words | 180–350 words | a writing limit, not a layout one |

**How the layout limits were measured.** Each limit is the longest text, cut at a word boundary, that stayed
within its lines in every sample of the site's own project text placed into the real card. The widths were
1440 px, which stands for every window from 1280 px up because the page stops widening at 1180 px, and a
390 px phone. The numbers are the worst case, so a few characters more often still fit: go over only after you
have looked at the page. Between about 1120 and 1280 px the first row on `/projects/` is narrower (down to
330 px a card), and a lead title has room for about 34 characters on two lines. When the card styles in
`website/src/components/ProjectCard.astro` or the grids in `website/src/pages/` change, the limits change with
them.

## What a card must say

A card is read in a few seconds, so it says three things before anything else: **what problem was solved**,
**what value it brought**, and **the result**, measured wherever it was measured: time saved, cost cut, errors
gone, people using it. What was built and with which tools come after, as the way the value came about.

- **`summary`** carries the problem and the value in one sentence, and the result too when it fits in a few
  words ("… with numbers people trust at half the capacity cost"). Shapes that work: *the problem, how it was
  solved, the value* or *what was built, for whom, so that the value*. The test: someone who reads only the
  card can say what was wrong before and what is better now.
- **The result** is also a `metrics` entry labelled `Result` on the case study page, with a number where one
  exists ("Capacity cost cut by half"). A result nobody measured is stated as what happened ("in daily use",
  "support load down"), never as an estimated number. No result yet means no `Result` entry.
- **`impact`** lines are results a reader can check, what changed for the people who used it, not the tools.
  On a big card the first three are the value, so they come first.
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
- **`category`** becomes a filter on `/projects/`; reuse one from the filter row unless the project needs a
  new one.
- **The first `metrics` value** is the tag on a big card, so make it the one fact a reader should see first:
  the role, the stage or the scope.
- **The body** has three sections, as every case study does: The problem, The approach, The outcome. Say who
  did what ("I designed", "the team built") and state the stage plainly.

## Check it

```bash
cd website && npm run check && npm run build && npm run preview
```

Open `/projects/` and the home page at 1440 px and at 390 px (the browser's device toolbar) and look at the
row the project sits in. If the project also changes a role's highlights, update the CV as the
[development guide](development.md#the-cv) describes.
