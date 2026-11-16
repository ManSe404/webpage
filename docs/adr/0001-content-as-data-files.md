# 0001. Content as data files, read at build time

- **Status:** Accepted
- **Date:** 2026-07-29 (the Astro rebuild, commit `a2b458f`)

## Context

The first site was hand-written HTML. Projects and contact details were written out in both `index.html` and
`projects.html`, and the two copies drifted apart. That was the main problem the rebuild set out to solve. The
publication list on the old site also had errors: one entry merged two separate papers.

## Decision

Rebuild the site as a static Astro project in `website/` whose content is data, not markup:

- one Markdown file per project case study in `website/src/content/projects/`;
- JSON for the career, collaborations, skills, education and profile in `website/src/data/`;
- a CSV of publications, `website/src/data/publications.csv`;
- content collections with schemas in `website/src/content.config.ts`, so a broken value fails the build
  instead of rendering an empty block;
- the research page computes the work count, total citations, h-index and first-author count from the CSV
  instead of typing them in.

The old site is kept at the `v1-legacy` tag, not in the working tree.

## Consequences

- Changing what the site says means editing a file; components stay untouched.
- A page that lists projects or publications cannot disagree with another page, because both read the same
  collection.
- Anything still typed in can drift: the hero stats in `profile.json`, the counts in the root `README.md`, the
  CV in `files/cv/` and `files/stefan_context.txt`, which mirror the data by hand (see the
  [roadmap](../roadmap.md)).
- `profile.json`, `skills.json` and `education.json` are imported directly, without a schema. TypeScript infers
  their shape, so a key that code uses and the file lacks fails `astro check`, but a wrong value does not.
