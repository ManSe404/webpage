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

Copy one of the two templates into `website/src/content/projects/<id>.md`: the lead card for the three lowest
`order` values and for `featured: true` projects, the project card for the rest.
[Writing a project](writing-a-project.md) says which card shows which field and how many characters each one
holds. The frontmatter follows the `projects` schema in `website/src/content.config.ts` (fields in the
[content model](../reference/data-model.md#projects)); the body is the case study. The route, the card, the
filter counts and the previous and next links follow from it.

## Add a publication

Append a row to `website/src/data/publications.csv` with the columns
`year,title,venue,type,topic,role,citations,url`. Wrap any field that contains a comma in double quotes. Set
`role` to `First author` for the highlight chip. Refresh the `citations` column now and then; the research page
recomputes every number from the file. The hero stats in `website/src/data/profile.json` and the counts in the
root `README.md` are typed in, so update them by hand until
[roadmap F2](../roadmap.md#f2-hero-numbers-from-the-publication-list) is done.

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
the [diagrams](../diagrams/) when the workflow or the parts change, the
[feature catalogue](../product/features/README.md) when a feature is added or changes status, and the pages
under [reference](../reference/). A new decision gets an ADR in [adr](../adr/); an accepted ADR is not edited,
a new one supersedes it.
