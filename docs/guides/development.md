# Development

## The loop

`npm run dev` in `website/` reloads on every change. Content lives under `website/src/` (see the
[content model](../reference/data-model.md)); changing what the site says should not need a component.

Before a commit, run what CI runs on every pull request:

```bash
cd website && npm run check && npm run build
```

Watch the build output for `[timeline] UNCONFIRMED DATE` warnings: they name roles in `experience.json` whose
start date is still a placeholder.

## Add a project

Add a Markdown file to `website/src/content/projects/`. The frontmatter follows the `projects` schema in
`website/src/content.config.ts` (fields in the [content model](../reference/data-model.md#projects)); the body is
the case study. The route, the card, the filter counts and the previous and next links follow from it. `order`
sets the position; `featured: true` gives it a large card on the home page.

## Add a publication

Append a row to `website/src/data/publications.csv` with the columns
`year,title,venue,type,topic,role,citations,url`. Wrap any field that contains a comma in double quotes. Set
`role` to `First author` for the highlight chip. Refresh the `citations` column now and then; the research page
recomputes every number from the file.

## The CV

`files/cv/stefan-seman-cv.html` is the source and mirrors the site data, so a change in `website/src/data/` or in
a case study usually needs the same change there. The comment at the top of the file gives the commands, run from
the repository root:

```bash
weasyprint files/cv/stefan-seman-cv.html files/cv/out.pdf
cp files/cv/out.pdf "files/CV Stefan Seman.pdf"
cp files/cv/out.pdf website/public/files/stefan-seman-cv.pdf
```

The research figures in the CV come from Google Scholar, not from a hand-kept count; check the profile before
changing them.

## Conventions

- Internal links and asset paths go through `withBase()` from `website/src/lib/url.ts`.
- No UI framework and no client-side router; a script stays small and inline in its component, works without
  JavaScript and respects `prefers-reduced-motion`.
- The repository is the public site and nothing else: `.gitignore` keeps agent and editor tooling, secrets and
  local environment files out.

## Documents

A change updates the documents it makes wrong in the same commit: the [architecture](../architecture/overview.md),
the [diagram](../diagrams/build-and-deploy.md) when the workflow changes, and the pages under
[reference](../reference/).
