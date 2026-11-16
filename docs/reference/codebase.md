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
    content/projects/         one Markdown file per project, frontmatter only
    data/                     profile, experience, collaborations, consultancy, skills, education (JSON); publications (CSV)
    assets/                   images optimised at build time (the portrait)
    layouts/Base.astro        HTML shell: meta tags, JSON-LD, fonts, navigation, footer, scroll reveal
    pages/
      index.astro             home page: dashboard, the Chosen work honeycomb, contact
      projects/index.astro    every project in one big honeycomb, with field and type-of-work filters
      research.astro          publications and the numbers derived from them
    components/
      hive/HiveDashboard.astro home dashboard: name, actions, eight honeycomb cells with count-up numbers, deep links that open a panel, the ECG trace
      hive/HivePanels.astro   the panel each cell opens: featured projects, the career timeline (newest first), research, education, tools and skills, in progress, 404 Solutions services and partners, contact
      hive/ProjectHive.astro  a honeycomb of projects with a popup per project; used by the home page and /projects/
      hive/ProjectDetails.astro one project's five-line description (summary, result, role, stack, company, link); the popups and the Projects panel rows
      lab/Lab.astro           the home page lab: two tabs, Signal processing and Architecture
      lab/SignalLab.astro     synthetic ECG-like signal, filter and peak detection with sliders, live numbers, donut
      lab/ArchitectureLab.astro data platform and AI system diagrams with a switch; draws each with lab/ArchDiagram.astro
      Section.astro           section wrapper with eyebrow, title and lede
      Contact.astro           contact channels
      Nav.astro               menu (Projects, Career, 404 Solutions, Research, Contact), CV download, mobile toggle
      Footer.astro            footer links
      EcgTrace.astro          animated ECG trace on a canvas
      NodeField.astro         animated node-and-edge field behind the dashboard
    lib/
      honeycomb.ts            honeycomb placement (cell position, row tracks, columns), shared by the dashboard and the project honeycombs, server and browser
      signal.ts               pure functions behind the signal lab: generation, filtering, peak detection, scoring, plot paths
      url.ts                  withBase(): prefixes paths with the configured base
      dashboard.ts            reduces the collections to the dashboard's numbers and panels (h-index, tool use, what is in progress, partners, a project's result and attribution); also used by research.astro, HivePanels, ProjectHive, ProjectDetails and projects/index.astro
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

Entry points: the three files under `website/src/pages/`, one route each: `/`, `/projects/` and `/research/`.
