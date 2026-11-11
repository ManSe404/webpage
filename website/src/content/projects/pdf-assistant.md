---
title: PDF Assistant — Chat with One PDF
category: Generative AI
summary: Upload a PDF and ask; every answer cites the page it came from, and a click opens it. Underneath, a small experiment — each conversation draws a model, a retrieval depth and a memory size, and thumbs-up votes shift the draw. Frozen as a public demo.
order: 22
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
  - SQLAlchemy
  - Svelte
  - pdf.js
  - Qdrant
  - Pinecone
  - Supabase
  - Claude
  - OpenAI
  - Langfuse
  - Docker
metrics:
  - label: Stage
    value: Demo, frozen 2026-11-10
  - label: Upload
    value: PDFs up to 50 MB
---

## The problem

Question answering over a single document is the smallest useful RAG product, and the one
where a wrong answer is easiest to catch — if the page is right there. The second
question was which combination of model, number of retrieved chunks and amount of
conversation history people actually prefer, measured by their votes rather than by feel.

## The approach

- **Page-cited answers.** The PDF is split into chunks that remember their page; the
  prompt numbers the retrieved chunks, the model streams an answer with `[n]` references,
  and a click scrolls the PDF — rendered page by page as it comes into view — to that
  page. When nothing matches, the answer says the document does not state it.
- **The experiment.** When a conversation starts, one language model, one retrieval depth
  (3, 5 or 8 chunks) and one memory size are drawn, weighted by earlier votes:
  `(up + 1) / (up + down + 1)`, with a floor of 0.1 so a badly rated option never
  disappears entirely. One vote per answer, stored in the database, changeable and
  retractable — the original Redis counter rejected fractional votes and let the same
  answer be voted twice.
- **Swappable parts.** Claude, OpenAI, Azure and Foundry, or Ollama per model; Qdrant
  (embedded or server) or Pinecone with a namespace per PDF; SQLite or Postgres, with
  PDFs on disk or in Supabase Storage; optional Langfuse traces.
- **Accounts and operations.** bcrypt passwords, a session cookie, uploads up to 50 MB
  processed in the background and resumed after a restart, Alembic migrations, one
  Docker image.
- **Tests without the network** — scripted models, a keyword embedder, in-memory Qdrant,
  PDFs generated inside the test.

## The outcome

The application works and the
[interactive demo](https://manse404.github.io/pdf_assistant/demo/) runs in the browser
with pre-written answers over sample documents, including an "under the hood" panel that
shows each backend step — the draw and its probabilities, the rewritten follow-up, the
chunks found, the prompt budget and the trace.

As of 2026-11-10 the project is frozen as a demo. The experiment never ran in front of
real users, so there is no result saying which component wins; there is no OCR, so a
scanned PDF ends in an error by design; and the providers are verified only against a
fake transport. Everything that would come next — scans, folders, several documents, a
shared knowledge base — already exists in
[Document Buddy](/webpage/projects/document-buddy).
