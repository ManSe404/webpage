# Portfolio website (Astro)

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
| Name, bio, links, years of experience | `src/data/profile.json` | Drives the home dashboard, footer, contact, JSON-LD; only the years are typed in, the dashboard computes the rest |
| Career | `src/data/experience.json` | The career timeline in the dashboard's Career panel, newest first |
| Skills | `src/data/skills.json` | Skill groups in the dashboard's Tools panel |
| Education, certs, memberships | `src/data/education.json` | Degrees and certifications in the Career panel, memberships on the research page |
| Publications | `src/data/publications.csv` | Also generates the "output by year" bars |
| Projects | `src/content/projects/*.md` | Frontmatter only: the popup is the whole project, with no body and no page of its own |

### Adding a project

Drop a new `.md` file into `src/content/projects/`:

```markdown
---
title: Thing I Built
category: Generative AI      # picks the field on the home page and the honeycomb on /projects
summary: One sentence for the popup.
# featured: 1                # position in the dashboard's Projects panel; omit for most projects
order: 12                    # controls sort position
impact:
  - What changed as a result # the first line stands in when there is no Result metric
stack:
  - Python
metrics:                     # optional, found by label: Role and Result show in the popup
  - label: Role
    value: Lead engineer
---
```

The file has no body: the honeycomb cell, its popup and the filter counts
update automatically, and there is no page per project. Start from a template
in `../docs/guides/templates/`; `../docs/guides/writing-a-project.md` says
where each field shows. Frontmatter is schema-validated in
`src/content.config.ts` — a typo fails the build rather than silently
rendering an empty block.

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
  canvas, the node field, scroll reveals, the dashboard's cells, panels and
  counters, the project honeycomb popups, and the nav and filter toggles.
  Without JS the pages still read, except the dashboard panels, which stay
  closed while their cells link to a page instead.
- Every animation respects `prefers-reduced-motion`, and the canvases stop
  rendering when off-screen or when the tab is hidden.
