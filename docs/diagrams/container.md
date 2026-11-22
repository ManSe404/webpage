# Containers

The parts of the repository and where each one runs. There is one deployable, the Astro project in
`website/`; the CV is rendered from `files/cv/` by the build job, with the phone number from a secret.

```mermaid
flowchart TB
    subgraph repo["Repository"]
        direction TB
        content["Content<br/>website/src/content/projects/*.md,<br/>website/src/data/*.json, publications.csv"]
        astro["Astro project<br/>website/: pages, components, layout,<br/>styles, content.config.ts"]
        public["Static files<br/>website/public/: favicon, social image"]
        cvsrc["CV source<br/>files/cv/: HTML, fonts, render.sh"]
        workflow["Workflow<br/>.github/workflows/deploy-website.yml"]
    end

    secret[("Secret CV_PHONE")]
    actions["GitHub Actions<br/>job build: npm ci, render the CV (WeasyPrint),<br/>astro check, astro build<br/>job deploy: main only"]
    pages["GitHub Pages<br/>serves website/dist"]
    browser["Visitor's browser<br/>HTML, CSS, small inline module scripts"]

    content --> astro
    public --> astro
    cvsrc --> actions
    secret --> actions
    workflow --> actions
    astro --> actions
    actions -- "Pages artifact from website/dist" --> pages
    browser -- "HTTPS" --> pages
```

| Container | Technology | Runs where | Doc |
|---|---|---|---|
| Astro project | Astro 5, TypeScript, plain CSS | at build time, in GitHub Actions or locally | [overview](../architecture/overview.md) |
| Content | Markdown, JSON, CSV checked by Zod schemas | read at build time | [data model](../reference/data-model.md) |
| Workflow | GitHub Actions, Node 24, WeasyPrint 69.0 | on every pull request; on a push to `main` that touches `website/`, `files/cv/` or the workflow; on a manual run | [build and deploy](build-and-deploy.md) |
| Published site | static HTML and CSS | GitHub Pages | [overview](../architecture/overview.md#context) |
| CV | HTML rendered to PDF with WeasyPrint, phone number from the `CV_PHONE` secret | in the build job; locally with `files/cv/render.sh` | [development](../guides/development.md#the-cv) |
