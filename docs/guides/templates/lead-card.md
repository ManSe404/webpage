---
# LEAD CARD: for a project with `featured: true`, which the home dashboard lists in its Projects panel. The
# name is left from the big card the home page used to have; every project now shows the same fields: a
# honeycomb cell and its popup (on the home page when it is among the chosen work, always on /projects/),
# plus the Projects panel when featured. The frontmatter is the whole project: there is no body
# and no project page. docs/guides/writing-a-project.md says where each field shows.
# Copy this file to website/src/content/projects/<id>.md, fill it in and delete these comments. No length is
# measured for the current layout; numbers marked "earlier card" were measured on cards that are gone.
title: Name of the System — What It Does      # the cell shows the part before " — "; ≤ 38 on the earlier big card
category: Generative AI                      # AI field: Generative/Agentic/Conversational AI, Computer Vision; the home page shows the first five by order
summary: One sentence with the problem solved and the value it brought, then what was built — the popup's Project description.   # 150–200 on the earlier big card
featured: false                              # set true for the project this template is for: it is then listed in the Projects panel
order: 1                                     # sorts every place; the home page shows the first five AI and first three data projects
org: ExpertGroup                             # the employer; "org · with client · period" in the popup; also decides the type of work on /projects/
# client: Partner                            # only where the partner or customer can be named publicly
period: "2026 — Present"                     # quoted, so a bare year stays text; "— Present" with a Stage metric lists it as in progress
impact:                                      # results a reader can check, not tools; only the first is shown, and only without a Result metric
  - First outcome, a fact a reader can check         # the strongest first: it stands in for the result; ≤ 120 each
  - Second outcome, what changed for its users
  - Third outcome, the rule the system keeps
stack:                                       # 6–8 tools you could look up, not concepts (no RAG, AI Agents, LLMs); most telling first; the popup shows all, the Projects panel four, then +N
  - Python
  - FastAPI
  - PostgreSQL
  - Docker
metrics:                                     # 2–3, found by label; Role, Result and Stage are shown, any other label is not
  - label: Role
    value: Architect & builder               # the popup's Role & responsibilities; leave it out and the line is left out
  - label: Result
    value: Review time cut by half             # the popup's Achieved result and the panel's Result; measured, or what happened, never an estimate; only if it happened
# link: https://example.com                  # public URL only; adds "Visit project ↗" to the popup and the panel
---
