# Content model

Everything the site says comes from files under `website/src/`. The collections and their schemas are in
`website/src/content.config.ts`; a value that breaks a schema fails the build.

## Where content lives

| What | Where | Read by |
|---|---|---|
| Name, headline, tagline, contact, links, years of experience, CV path | `src/data/profile.json` | `Base.astro`, `hive/HiveDashboard`, `Nav`, `Footer`, `Contact`, `research.astro` |
| Career timeline | `src/data/experience.json` (collection `experience`) | `Timeline`, newest first |
| Collaborations | `src/data/collaborations.json` (collection `collaborations`) | `Collaborations` |
| 404 Solutions section | `src/data/consultancy.json` (no schema): section head, services with the partners each was delivered with | `Consultancy`, `index.astro` |
| Skills | `src/data/skills.json` | `SkillGrid` |
| Degrees, certifications, memberships | `src/data/education.json` | `index.astro`, `research.astro` |
| Publications | `src/data/publications.csv` (collection `publications`) | `index.astro`, `research.astro` |
| Project case studies | `src/content/projects/*.md` (collection `projects`) | `index.astro`, `projects/index.astro`, `projects/[...slug].astro` |
| Portrait | `src/assets/portrait.jpg` | `hive/HiveDashboard`, optimised by `astro:assets` |
| CV PDF, favicon, social image | `public/files/`, `public/images/` | copied as is into the build |

`profile.json`, `skills.json` and `education.json` have no schema; they are imported as JSON and TypeScript
infers their shape. `stats` in `profile.json` holds one typed number, the years of experience; every other number
on the home dashboard is computed from the collections (`src/lib/dashboard.ts`). `phone` and `languages` in
`profile.json` are not read by any page or component.

## Collections

### `projects`

| Field | Type | Default | Meaning |
|---|---|---|---|
| `title` | string | required | |
| `category` | string | required | Becomes a filter on `/projects/` |
| `summary` | string | required | One sentence for the cards and the page description |
| `featured` | boolean | `false` | A big card in Selected work on the home page |
| `order` | number | `99` | Sort position everywhere; the three lowest are the big cards leading `/projects/`; previous and next on a case study |
| `period` | string | none | |
| `org` | string | none | The employer the work was delivered under |
| `client` | string | none | The partner or end customer, where it can be named publicly |
| `impact` | list of strings | empty | The first three on a big card; all on the case study |
| `stack` | list of strings | empty | The first eight on a big card, the first five on a regular card on the home page; all on the case study |
| `metrics` | list of `{label, value}` | empty | The first value is the tag on a big card; all on the case study |
| `link` | URL | none | |

The Markdown body is the case study. The file name is the id and the URL: `src/content/projects/<id>.md` becomes
`/projects/<id>/`. Which card shows which field, the character limits and the two templates to start from are in
[Writing a project](../guides/writing-a-project.md).

### `experience`

`role`, `company`, `start`, `end` (null while current), `current`, `dateUnconfirmed` (prints a build warning
while set), `summary`, `highlights`, `stack`.

### `collaborations`

`name`, `via` (omitted when the engagement was direct), `location`, `kind`, `description`, `tags`,
`needsReview` (meant to mark copy that still needs sign-off; no component reads it yet, so a flagged card is
published as usual, see [roadmap F3](../roadmap.md#f3-make-the-review-flag-do-something)).

### `publications`

One CSV row per work, with the header `year,title,venue,type,topic,role,citations,url`. A field containing a
comma is wrapped in double quotes. `role` defaults to `Co-author`; `First author` earns the highlight chip.
`citations` defaults to 0. `url` may be empty. The research page computes the works count, total citations,
h-index, first-author count, works per year and research areas from this file alone.
