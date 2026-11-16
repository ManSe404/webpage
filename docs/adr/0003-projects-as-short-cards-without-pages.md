# 0003. Projects as short cards, without project pages

- **Status:** Accepted
- **Date:** 2026-11-16 (pull request #14)
- **Amends:** [ADR 0001](0001-content-as-data-files.md), which describes one Markdown file per project case study.

## Context

Every project had a case-study page at `/projects/<id>/`: about 300 words under "The problem", "The approach"
and "The outcome", reached from a card. The owner found the pages too long for what a visitor reads, and
pointed at a portfolio where every project answers the same five short questions on one slide: what it is,
what it achieved, the role, the tools, and for whom. The home page had also grown to more than ten thousand
pixels at desktop width.

## Decision

A project is its frontmatter only. It shows as a cell in a honeycomb (the home page's Chosen work and the
groups on `/projects/`), and choosing a cell opens a short popup below the honeycomb with five lines: the
summary, the result (the `Result` metric, else the first `impact` line), the `Role` metric, the stack, and
the employer with partner and period, plus the project's outside `link` when it has one. There are no
`/projects/<id>/` pages; the Markdown bodies were removed and stay in git history. A popup has its own
address, `#<group>-<id>`, so one project can still be linked.

## Consequences

- The site builds three pages: the home page, `/projects/` and `/research/`. A project has no page of its own
  for search engines or link previews; a link to a project lands on its popup.
- What a reader learns about a project is limited to five short lines, so the summary, the result and the
  role carry the weight; a measured `Result` metric matters more than before.
- Frontmatter that no component shows any more (impact lines after the first, most metrics) stays in the files
  until a later change uses or drops it.
- Without JavaScript the popups show as a list under each honeycomb, so the text is never out of reach.
- ADR 0001 still holds: content stays in data files read at build time; only its "case study" body is gone.
