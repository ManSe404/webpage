---
# PROJECT CARD: every project outside the first row of /projects/ that is not featured. On /projects/ the
# compact card shows category, title, org and summary; on the home page the first four projects that are not
# featured get a card with five stack chips as well. The case study page shows every field.
# Copy this file to website/src/content/projects/<id>.md, fill it in and delete these comments.
# Limits are characters, measured on the real card; docs/guides/writing-a-project.md says what breaks past each.
title: Name of the System                    # ≤ 42: two lines on /projects/; ≤ 29 for the four in the home page row
category: Data Engineering                   # reuse a category from the filter row on /projects/
summary: One sentence on what it is, for whom, and what it changed — the card and the page description both use it.   # 130–180
featured: false                              # true makes it a big card on the home page: use lead-card.md
order: 10                                    # 4 and up; projects are grouped by employer, personal ones last
org: 404 Solutions                           # the employer; "org · with client" ≤ 29
# client: Partner                            # only where the partner or customer can be named publicly
period: "2025"                               # quoted, so a bare year stays text
impact:                                      # 3–4, shown on the case study page only
  - First outcome, a fact a reader can check         # ≤ 120 each
  - Second outcome, what changed for its users
  - Third outcome, the rule the system keeps
stack:                                       # 4–8, most telling first; the home page card shows five
  - Python
  - FastAPI
  - Docker
  - Azure
metrics:                                     # 2–3, shown on the case study page only
  - label: Role
    value: Lead engineer
  - label: Stage
    value: In production
# link: https://example.com                  # public URL only
---

## The problem

<!-- 50–100 words. Who had the problem, what it cost them, and why the usual approach did not solve it. -->

## The approach

<!-- 100–200 words. One sentence on the idea that shaped the design, then three to five bullets, each a bold
     lead-in and one or two sentences. Say who did what: "I designed", "the team built". -->

## The outcome

<!-- 30–60 words. What runs now, for whom, and the stage stated plainly. No number you cannot show. -->
