---
# PROJECT CARD: every project that is not in the dashboard's Projects panel. The name is left from the small card the home page used
# to have; every project now shows the same fields: a honeycomb cell and its popup (on the home page when it
# is among the chosen work, always on /projects/). The frontmatter is the whole project: there is no
# body and no project page. docs/guides/writing-a-project.md says where each field shows.
# Copy this file to website/src/content/projects/<id>.md, fill it in and delete these comments. No length is
# measured for the current layout; numbers marked "earlier card" were measured on cards that are gone.
title: Name of the System — What It Does      # the cell shows the part before " — "; ≤ 29 on the earlier small card
category: Data Engineering                   # data field: Data Engineering, Machine Learning; the home page shows the first three by order
summary: One sentence with the problem solved and the value it brought, then what was built — the popup's Project description.   # 130–180 on the earlier small card
# featured: 1                                # only for the six in the dashboard's Projects panel: their position (use lead-card.md)
order: 10                                    # sorts every place; projects are grouped by employer, personal ones last
org: 404 Solutions                           # the employer; "org · with client" in the popup; also decides the type of work on /projects/
# client: Partner                            # only where the partner or customer can be named publicly
period: "2025"                               # quoted, so a bare year stays text
impact:                                      # results a reader can check, not tools; only the first is shown, and only without a Result metric
  - First outcome, a fact a reader can check         # the strongest first: it stands in for the result; ≤ 120 each
  - Second outcome, what changed for its users
  - Third outcome, the rule the system keeps
stack:                                       # 4–8 tools you could look up, not concepts (no RAG, AI Agents, LLMs); most telling first; the popup shows all
  - Python
  - FastAPI
  - Docker
  - Azure
metrics:                                     # 2–3, found by label; Role, Result and Stage are shown, any other label is not
  - label: Role
    value: Lead engineer                     # the popup's Role & responsibilities; leave it out and the line is left out
  - label: Result
    value: Manual tagging cut                # the popup's Achieved result; measured, or what happened, never an estimate; only if it happened
# link: https://example.com                  # public URL only; adds "Visit project ↗" to the popup
---
