# Content model

Everything the site says comes from files under `website/src/`. The collections and their schemas are in
`website/src/content.config.ts`; a value that breaks a schema fails the build.

## Where content lives

| What | Where | Read by |
|---|---|---|
| Name, headline, tagline, contact, links, years of experience, CV path | `src/data/profile.json` | `Base.astro`, `hive/HiveDashboard` (and its panels), `Nav`, `Footer`, `Contact`, `research.astro` |
| Career | `src/data/experience.json` (collection `experience`) | `hive/JourneyBoard` (the career board); `hive/HiveDashboard` (the role count and first year on the Years cell, current roles under In progress, the summary of the 404 Solutions role in its panel) |
| Collaborations | `src/data/collaborations.json` (collection `collaborations`) | `hive/HivePanels`: the 404 Solutions panel shows the name, kind, location and description of the entry whose `name` starts with a partner's name from the projects; an entry that matches no partner is not shown anywhere |
| 404 Solutions services | `src/data/consultancy.json` (no schema) | `hive/HivePanels` reads `services` only (title, area, `deliveredWith`, description); `section`, `partners` and `links` are left from the removed 404 Solutions section and nothing reads them |
| Architecture diagrams | `src/data/architectures.json` (no schema): the two lab diagrams, their steps, side boxes, details, tools and synthetic sample rows | `lab/ArchitectureLab`, `lab/ArchDiagram` |
| Skills | `src/data/skills.json` | `hive/HivePanels`: the skill groups in the Tools panel |
| Degrees, certifications, memberships | `src/data/education.json` | `hive/HiveDashboard` (degrees in progress, and the Education panel through `hive/HivePanels`), `hive/JourneyBoard` (degrees on the Education track, certifications in the strip below), `research.astro` (memberships) |
| Publications | `src/data/publications.csv` (collection `publications`) | `hive/HiveDashboard`, `research.astro` |
| Projects | `src/content/projects/*.md` (collection `projects`), frontmatter only | `index.astro` and `projects/index.astro`, both through `hive/ProjectHive`; `hive/HiveDashboard` (counts, featured projects, tools, 404 Solutions partners, what is in progress) |
| Portrait | `src/assets/portrait.jpg` | `hive/HiveDashboard`, optimised by `astro:assets` |
| CV PDF, favicon, social image | `public/files/`, `public/images/` | copied as is into the build |

`profile.json`, `consultancy.json`, `skills.json` and `education.json` have no schema; they are imported as JSON
and TypeScript infers their shape. `stats` in `profile.json` holds one typed number, the years of experience;
every other number on the home dashboard is computed from the collections (`src/lib/dashboard.ts`). `phone` and `languages` in
`profile.json` are not read by any page or component.

## Collections

### `projects`

| Field | Type | Default | Meaning |
|---|---|---|---|
| `title` | string | required | In full in the popup; a honeycomb cell shows only the part before ` — ` |
| `category` | string | required | Shown on the cell and in the popup; decides the field: the home page's Chosen work takes AI projects (Generative AI, Agentic AI, Conversational AI, Computer Vision) and data projects (Data Engineering, Machine Learning), and any other category is not on the home page; `/projects/` has one honeycomb for each of the two and puts every other category under Software & research; a category matching "AI" or "Vision" colours the cell as AI |
| `summary` | string | required | One sentence: the popup's Project description |
| `featured` | positive integer | none | Position in the Projects panel of the home dashboard (the Projects cell), 1 first; a project without it is not in that panel. Set by hand; six today. It does not put a project in a honeycomb |
| `order` | number | `99` | Sort position everywhere except the home page |
| `home` | positive integer | none | Position in the home page's Chosen work honeycomb, 1 first; a project without it is not on the home page. Set by hand: strongest first, client work only |
| `period` | string | none | Closes the popup's Company / client line; a period that runs to the present, with a `Stage` metric, lists the project under In progress |
| `org` | string | none | The employer the work was delivered under; decides the type of work on `/projects/` (`Personal` and `Open source` are own work, `BioIRC` is research, the rest client work), the client and own counts on the Projects cell, and the 404 Solutions projects and partners |
| `client` | string | none | The partner or end customer, where it can be named publicly; shown as "with client" |
| `impact` | list of strings | empty | Only the first line is shown, as the project's result when there is no `Result` metric; the other lines are not shown anywhere |
| `stack` | list of strings | empty | All in the popup; counted for the Tools cell and panel |
| `metrics` | list of `{label, value}` | empty | Read by label: `Role` fills the popup's Role & responsibilities line, `Result` the popup's Achieved result, `Stage` the In progress panel; any other label is not shown anywhere |
| `link` | URL | none | "Visit project ↗" in the popup |

A project file has no Markdown body and no page of its own: the popup is its whole description. The file name
is the id; it makes the popup's anchor, `#<group>-<id>`, where the group is the honeycomb's id: `work` on the
home page, `ai`, `data` and `software` on `/projects/`. Where each field shows and the two templates to start from are in
[Writing a project](../guides/writing-a-project.md).

### `experience`

`role`, `company`, `start`, `end` (null while current), `current`, `dateUnconfirmed` (the career board prints a
build warning while set), `summary`, `highlights`, `stack`.

The career board puts a role on the Research & biomedicine track when `company` is one of three names listed in
`JourneyBoard.astro` (University of Belgrade, BioIRC — Bioengineering R&D Center, Sport and Recreation Center
Obliqus) and on AI & software otherwise; the era follows the year of `start`. A card opens the first three
`highlights`. `summary` is shown only for the 404 Solutions role, in its panel, and `stack` is not shown by any
component. A degree in `education.json` without a `period` is placed as 2017, shown as "Before 2018".

### `collaborations`

`name`, `via` (omitted when the engagement was direct), `location`, `kind`, `description`, `tags`,
`needsReview` (meant to mark copy that still needs sign-off; no component reads it yet, so a flagged description
is published as usual, see [roadmap F3](../roadmap.md#f3-make-the-review-flag-do-something)). The 404 Solutions
panel reads `name`, `kind`, `location` and `description`; `via` and `tags` are not shown.

### `publications`

One CSV row per work, with the header `year,title,venue,type,topic,role,citations,url`. A field containing a
comma is wrapped in double quotes. `role` defaults to `Co-author`; `First author` earns the highlight chip.
`citations` defaults to 0. `url` may be empty. The research page computes the works count, total citations,
h-index, first-author count, works per year and research areas from this file alone.
