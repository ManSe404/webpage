# Codebase map

```text
README.md                     the profile, the featured projects, how the repository is laid out
.gitignore                    keeps agent and editor tooling, secrets, build output and local environment files out
.github/workflows/
  deploy-website.yml          checks and builds every pull request; deploys to Pages on a push to main or a manual run
files/
  cv/stefan-seman-cv.html     source of the CV, rendered to PDF with WeasyPrint
  CV Stefan Seman.pdf         the rendered CV
  stefan_context.txt          plain-text summary of the site data, for reuse elsewhere; kept by hand
website/                      the Astro project
  .gitignore                  node_modules, dist and .astro
  astro.config.mjs            site, base (/webpage), trailing slash, directory build format
  package.json                scripts dev, build, preview, check; astro as the only runtime dependency
  package-lock.json           the lockfile CI installs from with npm ci
  tsconfig.json               Astro's strict TypeScript settings
  README.md                   commands, where content lives, how to add a project or a publication
  public/
    files/                    the CV PDF the site links
    images/                   favicon and the Open Graph image
  src/
    content.config.ts         the four content collections and their schemas
    content/projects/         one Markdown case study per project
    data/                     profile, experience, collaborations, consultancy, skills, education (JSON); publications (CSV)
    assets/                   images optimised at build time (the portrait)
    layouts/Base.astro        HTML shell: meta tags, JSON-LD, fonts, navigation, footer, scroll reveal
    pages/
      index.astro             home page
      projects/index.astro    all projects as one list with type-of-work and topic filters
      projects/[...slug].astro one page per case study
      research.astro          publications and the numbers derived from them
    components/
      hive/HiveDashboard.astro home dashboard: name, actions, eight honeycomb cells with count-up numbers, the ECG trace
      hive/HivePanels.astro   the panel each cell opens: steppers through featured projects and roles, research, education, tools, in progress, 404 Solutions, contact
      Section.astro           section wrapper with eyebrow, title and lede
      ProjectCard.astro       project card: big (Selected work) or regular (the row below it); a compact variant is kept but unused
      ProjectRow.astro        one row of the /projects/ list
      Collaborations.astro    collaboration cards
      Consultancy.astro       the 404 Solutions services, from data/consultancy.json
      Timeline.astro          career timeline; warns about unconfirmed dates
      SkillGrid.astro         grouped skill chips
      Contact.astro           contact channels
      Nav.astro               menu (Projects, Collaborations, Career, Research, Contact), CV download, mobile toggle
      Footer.astro            footer links
      EcgTrace.astro          animated ECG trace on a canvas
      NodeField.astro         animated node-and-edge field behind the dashboard
    lib/
      url.ts                  withBase(): prefixes paths with the configured base
      dashboard.ts            reduces the collections to the dashboard's numbers and panels (h-index, tool use, what is in progress); also used by research.astro
      csv.ts                  small RFC 4180 CSV parser for publications.csv
    styles/global.css         shared styles and design tokens
docs/                         this documentation
  README.md                   the index and reading order
  product/                    vision.md, features/README.md (the feature catalogue)
  roadmap.md                  fixes and planned work
  architecture/overview.md    how the site is built
  diagrams/                   context, container, build and deploy (Mermaid)
  adr/                        the decisions and why
  reference/                  this map and the content model
  guides/                     setup and development
```

Generated and not committed: `website/node_modules/`, `website/dist/`, `website/.astro/`.

Entry points: the four files under `website/src/pages/`, one route each (the case-study file makes one route per
project).
