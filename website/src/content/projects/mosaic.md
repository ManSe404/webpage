---
title: Mosaic — Document AI Bricks
category: Generative AI
featured: true
summary: A Python library of composable document-AI bricks — parsers, outlines, chunkers, indexes, retrievers, answerers — where the pipeline and the question are both plans written as data, and every brick has an eval number to beat.
order: 19
org: Personal
period: 2026 — Present
impact:
  - One pipeline per document, not one for all — a Cyrillic scan and an article-numbered law get different plans
  - A question is a plan too, so the retrieval strategy is chosen per question instead of hard-coded
  - Every brick measured against a BM25 baseline on the same 34 questions before it is kept
  - Serbian treated as the normal case — the eval has Serbian lookup, structure and catalog questions
stack:
  - Python
  - pydantic
  - BM25
  - SQLite
  - pypdf
  - Qdrant
  - RabbitMQ
  - FastAPI
  - Microsoft Graph
metrics:
  - label: Stage
    value: Library, prototype
  - label: Eval
    value: 34 questions, 3,380 pages
  - label: Lookup, English
    value: 9 of 13 at top 1
---

## The problem

Every document-AI project I have worked on grew its own ingestion pipeline, and those
pipelines fail in the same three ways. One pipeline for every document, so a Cyrillic PDF
with a broken text layer goes to the same parser as a clean report, two-column papers lose
their citations, and a law whose page mixes several articles is chunked by page. One
retrieval technique for every question — RAG, GraphRAG or an agent, written into the
code — so "which document says this" and "what does article 12 refer to" get the same
treatment. And no measurement, so nobody knows whether the second version was better than
the first. Frameworks such as LangChain, LlamaIndex and Haystack solve composition, but
the recipe still lives in code and they know nothing about these documents.

## The approach

Mosaic is a library, not an application: `import mosaic` needs only pydantic, there is no
server, queue or database inside the package, and a project picks the bricks it wants.

- **Plans as data.** A pipeline is a `Plan` — detect, parse, outline, chunk, index —
  written as plain data and run by the package. A question is a plan too, so a project
  can route one question through BM25 and the next through a reference expander and an
  LLM answerer without changing code.
- **Contracts between bricks.** Eleven documented contracts — artifacts, plan, catalog
  card, sources and sync, LLM — define the shapes bricks agree on, so a parser, chunker
  or answerer can be swapped without touching its neighbours.
- **A knowledge base built from the bricks.** `KnowledgeBase` wires a source (a folder,
  or SharePoint through the Graph `delta` API), a daily sync of new, changed and deleted
  documents, a catalog card per document with access rights, and questions scoped by
  that catalog and answered with a citation to the page.
- **A unit chosen per document.** The `kb` recipe cuts article-numbered documents by
  section and books by page, and follows "član N" references between articles — the
  eval showed that neither unit alone wins on both kinds of document.
- **An eval before a feature.** 34 hand-written questions over books and laws, in
  English and Serbian, and a page-level BM25 baseline that every later brick has to
  beat — run with no model and no infrastructure.

An older generation — a RabbitMQ ingestion worker with recipe replay and a page-quality
gate with 41 regression cases, and a FastAPI service with grounded chat — sits beside the
package and does not yet use the new knowledge-base path.

## The outcome

A working core: 176 brick tests, 33 worker tests and 27 service tests pass, and six of
the seven design claims have their first evidence. On the eval of 2026-11-10 the `kb`
recipe keeps the book numbers — English lookup 9 of 13 at top 1, 10 at top 10 — and
takes the gains on laws, where structure questions reach 3 of 4 at top 5 against 1 at
page level; catalog questions are 5 of 5 at top 1. Serbian lookup is 3 of 6 at top 1,
and the inflection problem in the tokenizer is still open — one of the reasons Mosaic
exists.

It is a prototype, honestly: the sample is small and the rules were tuned on the same
documents, so the numbers show direction, not proof. The BM25 index lives in memory,
there is no vector index yet, and no outside project consumes the package — the
[document chatbot template](/webpage/projects/document-buddy) is the intended first
consumer. The product it is aimed at is a company knowledge base over SharePoint with
access rights, followed by a nightly insights assistant built from the same bricks. The
repository is private.
