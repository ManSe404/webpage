# Context

Who uses the site and what it touches outside itself. The site is static: after the deploy nothing of it runs
except the small scripts in the visitor's browser.

```mermaid
flowchart LR
    visitor(["Visitor<br/>client, employer, collaborator, researcher"])
    owner(["Owner<br/>edits content through pull requests"])

    site["Portfolio site<br/>static pages on GitHub Pages,<br/>project site under /webpage"]

    github["GitHub<br/>repository, pull requests,<br/>Actions, Pages"]
    fonts["Google Fonts<br/>font stylesheet and files"]
    profiles["Outside profiles and papers<br/>LinkedIn, GitHub, Google Scholar,<br/>ResearchGate, DOIs, project links"]

    visitor -- "reads pages, downloads the CV" --> site
    visitor -- "loads fonts" --> fonts
    visitor -- "follows links" --> profiles
    owner -- "pull request, merge into main" --> github
    github -- "builds and publishes" --> site
```

Nothing on the site sends data anywhere: there are no forms, no analytics and no requests from page scripts.
The email link opens the visitor's own mail client.
