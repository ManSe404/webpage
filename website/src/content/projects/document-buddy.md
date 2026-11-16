---
title: Document Buddy — Your Documents
category: Generative AI
summary: A self-hosted chatbot over your own PDFs, Word files and folders, with a page-quality gate and vision OCR, because the text layer of a real document estate lies.
order: 22
org: Personal
period: 2025 — 2026
impact:
  - Scans, broken fonts and empty text layers caught by a quality gate before they poison the index
  - Vision OCR applied only to the pages that need it, not to the whole estate
  - Provider chosen per job — chat, embedding and OCR can each go to OpenAI, Azure, Claude or a local Ollama
  - Serbian documents, Cyrillic included, handled as the normal case
stack:
  - Python
  - FastAPI
  - Mosaic
  - Qdrant
  - PostgreSQL
  - RabbitMQ
  - React
  - Ollama
metrics:
  - label: Stage
    value: Working prototype + demo
  - label: Workflows
    value: 4 document types
  - label: Quality gate
    value: 41 regression cases
---
