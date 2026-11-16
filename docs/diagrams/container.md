# Containers

The parts of the repository and where each one runs. There is one deployable, the Astro project in
`website/`; the CV in `files/` is built by hand on the owner's machine.

```mermaid
flowchart TB
    subgraph repo["Repository"]
        direction TB
        content["Content<br/>website/src/content/projects/*.md,<br/>website/src/data/*.json, publications.csv"]
        astro["Astro project<br/>website/: pages, components, layout,<br/>styles, content.config.ts"]
        public["Static files<br/>website/public/: CV PDF, favicon, social image"]
        cvsrc["CV source<br/>files/cv/stefan-seman-cv.html"]
        cvpdf["CV PDFs<br/>files/CV Stefan Seman.pdf,<br/>website/public/files/stefan-seman-cv.pdf"]
        workflow["Workflow<br/>.github/workflows/deploy-website.yml"]
    end

    weasy["WeasyPrint<br/>run by hand"]
    actions["GitHub Actions<br/>job build: npm ci, astro check, astro build<br/>job deploy: main only"]
    pages["GitHub Pages<br/>serves website/dist"]
    browser["Visitor's browser<br/>HTML, CSS, small inline module scripts"]

    content --> astro
    public --> astro
    cvsrc --> weasy --> cvpdf
    cvpdf -.->|copied into| public
    workflow --> actions
    astro --> actions
    actions -- "Pages artifact from website/dist" --> pages
    browser -- "HTTPS" --> pages
```

| Container | Technology | Runs where | Doc |
|---|---|---|---|
| Astro project | Astro 5, TypeScript, plain CSS | at build time, in GitHub Actions or locally | [overview](../architecture/overview.md) |
| Content | Markdown, JSON, CSV checked by Zod schemas | read at build time | [data model](../reference/data-model.md) |
| Workflow | GitHub Actions, Node 24 | on every pull request; on a push to `main` that touches `website/` or the workflow; on a manual run | [build and deploy](build-and-deploy.md) |
| Published site | static HTML and CSS | GitHub Pages | [overview](../architecture/overview.md#context) |
| CV | HTML rendered to PDF with WeasyPrint | by hand, outside CI | [development](../guides/development.md#the-cv) |
