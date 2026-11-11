# Content model

Everything the site says comes from files under `website/src/`. The collections and their schemas are in
`website/src/content.config.ts`; a value that breaks a schema fails the build.

## Where content lives

| What | Where | Read by |
|---|---|---|
| Name, headline, summary, contact, links, hero stats, CV path | `src/data/profile.json` | `Base.astro`, `Hero`, `Nav`, `Footer`, `Contact`, `index.astro`, `research.astro` |
| Career timeline | `src/data/experience.json` (collection `experience`) | `Timeline`, newest first |
| Collaborations | `src/data/collaborations.json` (collection `collaborations`) | `Collaborations` |
| Skills | `src/data/skills.json` | `SkillGrid` |
| Degrees, certifications, memberships | `src/data/education.json` | `index.astro`, `research.astro` |
| Publications | `src/data/publications.csv` (collection `publications`) | `index.astro`, `research.astro` |
| Project case studies | `src/content/projects/*.md` (collection `projects`) | `index.astro`, `projects/index.astro`, `projects/[...slug].astro` |
| Portrait | `src/assets/portrait.jpg` | `Hero`, optimised by `astro:assets` |
| CV PDF, favicon, social image | `public/files/`, `public/images/` | copied as is into the build |

## Collections

### `projects`

| Field | Type | Default | Meaning |
|---|---|---|---|
| `title` | string | required | |
| `category` | string | required | Becomes a filter on `/projects/` |
| `summary` | string | required | One sentence for the card and the page description |
| `featured` | boolean | `false` | A larger card on the home page |
| `order` | number | `99` | Sort position everywhere, and previous and next on a case study |
| `period` | string | none | |
| `org` | string | none | The employer the work was delivered under |
| `client` | string | none | The partner or end customer, where it can be named publicly |
| `impact` | list of strings | empty | |
| `stack` | list of strings | empty | |
| `metrics` | list of `{label, value}` | empty | Shown on the case study |
| `link` | URL | none | |

The Markdown body is the case study. The file name is the id and the URL: `src/content/projects/<id>.md` becomes
`/projects/<id>/`.

### `experience`

`role`, `company`, `start`, `end` (null while current), `current`, `dateUnconfirmed` (prints a build warning
while set), `summary`, `highlights`, `stack`.

### `collaborations`

`name`, `via` (omitted when the engagement was direct), `location`, `kind`, `description`, `tags`,
`needsReview` (marks copy that still needs sign-off).

### `publications`

One CSV row per work, with the header `year,title,venue,type,topic,role,citations,url`. A field containing a
comma is wrapped in double quotes. `role` defaults to `Co-author`; `First author` earns the highlight chip.
`citations` defaults to 0. `url` may be empty. The research page computes the works count, total citations,
h-index, first-author count, works per year and research areas from this file alone.
