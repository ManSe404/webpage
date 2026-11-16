---
title: Mosaic — Document AI Bricks
category: Generative AI
featured: true
summary: Pipelines treat every document and question alike and never measure — Mosaic makes each a plan, keeps a brick only if it beats BM25, and runs document-buddy; still a prototype.
order: 20
org: Personal
period: 2026 — Present
impact:
  - Ahead of BM25 on law structure questions — 3 of 4 against 1
  - Each document and each question gets its own plan
  - The library under document-buddy, still a prototype
  - Serbian treated as the normal case — the eval has Serbian lookup, structure and catalog questions
stack:
  - Python
  - Pydantic
  - Qdrant
  - SQLite
  - FastAPI
  - RabbitMQ
  - pypdf
  - Microsoft Graph
metrics:
  - label: Stage
    value: Library, prototype
  - label: Eval
    value: 34 questions, 3,380 pages
  - label: Lookup, English
    value: 9 of 13 at top 1
---
