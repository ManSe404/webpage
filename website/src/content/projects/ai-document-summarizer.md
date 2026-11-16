---
title: AI-Powered Document Summarizer
category: Generative AI
summary: Summaries and key points across large multi-document sets, built on an agentic graph RAG architecture that keeps context together where fixed-size chunking breaks it.
featured: true
order: 11
org: 404 Solutions
client: Provectus
period: 2024 — Present
impact:
  - Faster turnaround on document-heavy review processes
  - Key points surfaced automatically rather than found by hand
  - Consistent output across large, mixed-format document sets
  - Context held across chunk boundaries instead of lost to fixed-window splitting
stack:
  - Python
  - AWS Bedrock
  - Step Functions
  - S3
  - AWS SAM
  - LangChain
  - LlamaIndex
  - Docker
metrics:
  - label: Architecture
    value: Agentic Graph RAG
  - label: Scope
    value: Multi-document
  - label: Sectors
    value: Insurance · Manufacturing · Biomedicine
---

## The problem

High-growth companies accumulate documents faster than anyone can read them. The
bottleneck was never storage — establishing what a set of documents actually said meant a
person working through it one file at a time, which made document-heavy steps the slowest
part of delivery.

## The approach

Three distinct jobs, because "summarize this" turns out to be several different problems:

- **Document summarization** — condensing one document without losing the detail that made
  it worth reading.
- **Point-of-interest extraction** — pulling out the items that matter to a given workflow,
  rather than producing prose someone still has to mine.
- **Multi-document summarization** — synthesizing across a set, so the output reflects the
  collection rather than a pile of per-file summaries.

All three share one failure mode: chunking. Splitting documents into fixed windows to fit a
context limit is convenient for retrieval and destructive for meaning — a clause separated
from the condition qualifying it, a figure from its table. Flat vector search compounds it,
because similarity rewards redundancy: the same point restated across five documents, and
the one contradicting it missed.

So retrieval is an **agentic graph RAG** architecture rather than a single-shot lookup.
Chunks are nodes in a graph preserving their relationships — to the section and document
they came from, and to the entities they share with chunks elsewhere. Retrieval traverses
those edges instead of ranking by distance alone, so a passage arrives carrying the context
that makes it mean what it means, and the agentic layer decides what to do next: expand
along a relationship, re-query, or stop. That is what makes multi-document summarization
something other than concatenation.

It runs serverless on AWS — S3, Step Functions, AWS SAM — and multi-tenant from the start,
serving organisations across insurance, manufacturing, and biomedical work, each with its
own document conventions.

## The outcome

Document-heavy stages stopped being the constraint on delivery. Reviewers start from
extracted points of interest and a synthesis across the whole set instead of page one of
file one — and because extraction is systematic, what surfaces no longer depends on who
happened to be reading.
