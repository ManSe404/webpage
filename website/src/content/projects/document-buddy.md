---
title: Document Buddy — Chatbot over Your Own Documents
category: Generative AI
summary: A self-hosted RAG chatbot template — sign-in, chat with sources, and a knowledge base that accepts PDF, Word, text or whole folders — built around a page-quality gate and vision OCR, because the text layer of a real document estate lies.
order: 21
org: Personal
period: 2025 — 2026
link: https://manse404.github.io/document-buddy/demo/
impact:
  - Scans, broken fonts and empty text layers caught by a quality gate before they poison the index
  - Vision OCR applied only to the pages that need it, not to the whole estate
  - Provider chosen per job — chat, embedding and OCR can each go to OpenAI, Azure, Claude or a local Ollama
  - Serbian documents, Cyrillic included, handled as the normal case
stack:
  - Python
  - FastAPI
  - RabbitMQ
  - PostgreSQL
  - Qdrant
  - MinIO
  - React
  - TypeScript
  - Claude
  - OpenAI
  - Ollama
  - Docker
metrics:
  - label: Stage
    value: Working prototype + demo
  - label: Workflows
    value: 4 document types
  - label: Quality gate
    value: 41 regression cases
---

## The problem

RAG over a real document estate fails on the documents, not on the model. Scans have no
text layer; PDFs set in an old YU font extract `Óãîâîð` where the page says `Уговор`;
Word tables flatten into nonsense. An earlier version treated any page with 40 characters
as text, and junk went into the index that no question would ever hit — invisible until
an answer cited it. The template exists to keep a chatbot over such documents simple: a
new component enters only when the existing ones cannot solve the problem.

## The approach

A shared knowledge base with private conversations, split into a FastAPI API, a RabbitMQ
ingestion worker and a React front end:

- **Triage and a document map.** Every upload is profiled page by page, with a quality
  score per page, before anything is embedded. Four workflows cover the cases that behave
  differently: text sections, PDF pages, Word sections and scanned PDFs.
- **A page-quality gate** with 41 regression cases, carried over from
  [Mosaic](/webpage/projects/mosaic), that sends scans and broken pages to vision OCR and
  lets clean pages through untouched.
- **Follow-up rewriting**, so "and the deposit?" becomes a standalone question before
  retrieval.
- **Providers behind three interfaces** — chat, embedding, page reading — each
  configurable separately: OpenAI, Azure OpenAI and Foundry, Claude through the API or
  Foundry, or Ollama for documents that must not leave the machine.
- **Folders, statuses and reprocessing**, so an estate can be added as a whole and a
  failed document retried without touching the rest.
- **Tests without Docker** — SQLite and an in-memory Qdrant — and a Docker compose for
  the whole application.

## The outcome

Everything in the architecture plan is built, and the
[interactive demo](https://manse404.github.io/document-buddy/demo/) runs in the browser
with no server and no keys: it adds a folder of five sample documents, shows the triage,
the document map and the OCR of a scanned and a broken page, then chats with sources.

What it is not yet: proven live with cloud models. Claude and OpenAI are exercised only
through tests with a fake HTTP transport; the Ollama path is the only one verified end to
end, with vision OCR run once through a cloud-hosted model (2026-11-04). RabbitMQ can
redeliver a document after a consumer timeout and process it twice, hybrid search and
tracing are on the later list, and the repository is private under a PolyForm
Noncommercial licence. The open decision is whether it becomes Mosaic's first consumer
or stays a standalone showcase.
