---
title: PDF Assistant — Chat with One PDF
category: Generative AI
summary: Ask one PDF questions and every answer cites the page it came from, while thumbs-up votes steer the model and retrieval settings of later chats — frozen as a public demo.
order: 23
org: Personal
period: 2024 — 2026
link: https://github.com/ManSe404/pdf_assistant
impact:
  - Answers anchored to a page number, with the PDF beside the chat and a click that scrolls to the source
  - The RAG configuration treated as an experiment users vote on, not a setting someone guessed
  - A 2024 Flask + LangChain version that could not start, rebuilt in 2026 as FastAPI + Svelte without LangChain
  - Serbian interface
stack:
  - Python
  - FastAPI
  - SvelteKit
  - pdf.js
  - Qdrant
  - Pinecone
  - Supabase
  - Langfuse
metrics:
  - label: Stage
    value: Demo, frozen 2026-11-10
  - label: Upload
    value: PDFs up to 50 MB
---
