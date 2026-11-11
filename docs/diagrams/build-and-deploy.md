# Check, build and deploy

How the content files become the published site: Astro reads everything at build time, and the one GitHub Actions
workflow, `.github/workflows/deploy-website.yml`, checks every pull request and publishes `main` to GitHub Pages.

```mermaid
flowchart LR
    subgraph repo["Repository"]
        direction TB
        md["website/src/content/projects/*.md<br/>case studies"]
        json["website/src/data/*.json<br/>profile, experience, collaborations,<br/>skills, education"]
        csv["website/src/data/publications.csv"]
        src["website/src/pages, components,<br/>layouts, styles, assets"]
        pub["website/public/<br/>CV PDF, favicon, social image"]
    end

    subgraph actions["GitHub Actions: Website (check + deploy)"]
        direction TB
        trigger{{"any pull request, a push to main touching<br/>website/ or the workflow, or a manual run"}}
        build["build job, Node 24<br/>npm ci, npm run check, npm run build"]
        pr(["pull request: stops here"])
        artifact["upload website/dist<br/>as the Pages artifact"]
        deploy["deploy job<br/>actions/deploy-pages"]
        trigger --> build
        build -- "pull request" --> pr
        build -- "push to main or manual run" --> artifact --> deploy
    end

    pages["GitHub Pages<br/>project site under /webpage"]
    visitor(["Visitor's browser"])
    fonts["Google Fonts"]

    md --> build
    json --> build
    csv --> build
    src --> build
    pub --> build
    deploy --> pages
    visitor -- "HTML, CSS, small inline scripts" --> pages
    visitor -- "font stylesheet and files" --> fonts
```
