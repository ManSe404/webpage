---
# LEAD CARD: the big card. A project gets it when it is one of the three lowest `order` values (the first
# row on /projects/) or when `featured: true` (the Selected work grid on the home page).
# Copy this file to website/src/content/projects/<id>.md, fill it in and delete these comments.
# Limits are characters, measured on the real card; docs/guides/writing-a-project.md says what breaks past each.
title: Name of the System                    # ≤ 38: two lines; ≤ 29 unless featured (it then also sits in the home page row)
category: Generative AI                      # reuse a category from the filter row on /projects/
summary: One sentence on what it is, for whom, and the one thing that sets it apart — the card and the page description both use it.   # 150–200; 150–180 unless featured
featured: false                              # true: also a big card on the home page
order: 1                                     # 1–3: the first row on /projects/
org: ExpertGroup                             # the employer; "org · with client" ≤ 40
# client: Partner                            # only where the partner or customer can be named publicly
period: "2026 — Present"                     # quoted, so a bare year stays text
impact:                                      # 3–4; the card shows the first three
  - First outcome, a fact a reader can check         # ≤ 65 each: two lines on the card
  - Second outcome, what changed for its users
  - Third outcome, the rule the system keeps
  - An optional fourth, shown on the case study page only   # ≤ 120
stack:                                       # 6–8 where true, most telling first; the card shows eight, then +N
  - Python
  - FastAPI
  - PostgreSQL
  - Docker
metrics:                                     # 2–3; the first value is the tag beside the category chip
  - label: Role
    value: Architect & builder               # category + this value ≤ 37: one line beside the chip
  - label: Stage
    value: In production
# link: https://example.com                  # public URL only
---

## The problem

<!-- 60–120 words. Who had the problem, what it cost them, and why the usual approach did not solve it. -->

## The approach

<!-- 150–250 words. One sentence on the idea that shaped the design, then three to five bullets, each a bold
     lead-in and one or two sentences. Say who did what: "I designed", "the team built". -->

## The outcome

<!-- 30–80 words. What runs now, for whom, and the stage stated plainly. No number you cannot show. -->
