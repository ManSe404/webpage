---
# LEAD CARD: the big card in the Selected work grid on the home page, for a project with `featured: true`.
# It shows the category, a line "role · org · with client", the title, a Result box, the summary and the
# first four stack items. Copy this file to website/src/content/projects/<id>.md, fill it in and delete
# these comments. The big card's character limits are to be re-measured on the new card: the numbers below
# were measured on the earlier one, and docs/guides/writing-a-project.md says what breaks past each.
title: Name of the System                    # ≤ 38 on the earlier card, to be re-measured; ≤ 29 when featured is false (the home page row)
category: Generative AI                      # the chip at the top; reuse a category from the filter row on /projects/
summary: One sentence with the problem solved and the value it brought, then what was built — the card and the page description both use it.   # 150–200 on the earlier card, to be re-measured
featured: false                              # true: a big card in Selected work on the home page; false: no big card anywhere
order: 1                                     # sorts the project in every list, Selected work included
org: ExpertGroup                             # the employer; on the card after the role: "role · org · with client"
# client: Partner                            # only where the partner or customer can be named publicly
period: "2026 — Present"                     # quoted, so a bare year stays text
impact:                                      # 3–4 results a reader can check, not tools; the card shows no list, but without a Result metric the first line is its Result box
  - First outcome, a fact a reader can check         # the strongest first: it stands in for the result
  - Second outcome, what changed for its users
  - Third outcome, the rule the system keeps
  - An optional fourth, shown on the case study page only   # ≤ 120 each on the case study page
stack:                                       # 6–8 tools you could look up, not concepts (no RAG, AI Agents, LLMs); most telling first; the card shows four, then +N
  - Python
  - FastAPI
  - PostgreSQL
  - Docker
metrics:                                     # 2–3, found by label; all of them are listed on the case study page
  - label: Role
    value: Architect & builder               # opens the line above the title; leave it out and the line shows only org and client
  - label: Result
    value: Review time cut by half             # the card's Result box; measured, or what happened, never an estimate; only if it happened
# link: https://example.com                  # public URL only
---

## The problem

<!-- 60–120 words. Who had the problem, what it cost them, and why the usual approach did not solve it. -->

## The approach

<!-- 150–250 words. One sentence on the idea that shaped the design, then three to five bullets, each a bold
     lead-in and one or two sentences. Say who did what: "I designed", "the team built". -->

## The outcome

<!-- 30–80 words. What runs now, for whom, and the stage stated plainly. No number you cannot show. -->
