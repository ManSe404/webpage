# stefanseman.dev — portfolio (Astro rebuild)

Dark, AI/bioengineering-themed portfolio. Content is data-driven: markdown case
studies, JSON records, and a CSV of publications all feed the pages at build time
through Astro content collections.

## Commands

```bash
npm install     # once
npm run dev     # local dev at http://localhost:4321/webpage
npm run build   # static output to dist/
npm run preview # serve the built output
npm run check   # type-check .astro and .ts files
```

## Where content lives

Everything editable is under `src/` — you should not need to touch a component to
change what the site says.

| What | Where | Notes |
| --- | --- | --- |
| Name, bio, links, hero stats | `src/data/profile.json` | Drives hero, footer, contact, JSON-LD |
| Career timeline | `src/data/experience.json` | Sorted newest-first automatically |
| Collaborations | `src/data/collaborations.json` | `needsReview: true` marks unconfirmed copy |
| Skills | `src/data/skills.json` | Grouped chips in the Stack section |
| Education, certs, memberships | `src/data/education.json` | |
| Publications | `src/data/publications.csv` | Also generates the "output by year" bars |
| Project case studies | `src/content/projects/*.md` | Frontmatter + markdown body |

### Adding a project

Drop a new `.md` file into `src/content/projects/`:

```markdown
---
title: Thing I Built
category: Generative AI      # becomes a filter on /projects
summary: One sentence for the card.
featured: false              # true -> larger card on the home page
order: 12                    # controls sort position
impact:
  - What changed as a result
stack:
  - Python
metrics:                     # optional, shown on the detail page
  - label: Scope
    value: Enterprise
---

## The problem
...
```

The route, the card, the filter counts, and the prev/next links all update
automatically. Frontmatter is schema-validated in `src/content.config.ts` — a
typo fails the build rather than silently rendering an empty page.

### Adding a publication

Append a row to `src/data/publications.csv`. Columns:
`year,title,venue,type,topic,role,citations,url`. Wrap any field containing a
comma in double quotes. Set `role` to `First author` to earn the highlight chip.

The research page derives *everything* from this file — the list, the per-year
bar chart, and the headline stats (work count, total citations, h-index, and
first-author count are all computed, never hardcoded). Refresh the `citations`
column periodically and the numbers above it update themselves.

## Deployment

`.github/workflows/deploy-website.yml` is the only workflow:

| Event | What runs |
| --- | --- |
| Every pull request | `npm ci`, `npm run check`, `npm run build` as the job `build` |
| Push to `main` touching `website/` or the workflow | the same checks, then `website/dist` is deployed to GitHub Pages |
| Manual dispatch | the same as a push to `main` — redeploys the current `main` |

`main` takes changes only through a pull request, and `build` is a required
check there, so a pull request whose build fails cannot be merged. The job
name is what the rule matches: renaming `build` in the workflow means updating
the rule on GitHub too.

CI builds on Node 24 (set in the workflow); use Node 22 or newer locally.

`astro.config.mjs` sets `base: '/webpage'` to match the repository name. If the
repo is renamed or moved to a custom domain, update `site` and `base` there.

## Notes

- No UI framework and no client-side router — the only JavaScript is the ECG
  canvas, the node field, scroll reveals, the stat counters, and the nav/filter
  toggles. All of it degrades gracefully without JS.
- Every animation respects `prefers-reduced-motion`, and the canvases stop
  rendering when off-screen or when the tab is hidden.
