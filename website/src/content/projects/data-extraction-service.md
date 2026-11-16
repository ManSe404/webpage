---
title: Data Extraction Service
category: Data Engineering
summary: An Azure extraction and transformation platform orchestrating the whole path — raw ingestion, classification, embedding generation, and self-service Power BI reporting business users could run themselves.
order: 20
org: Optimal Systems GmbH
period: 2021 — 2022
impact:
  - One orchestrated path from raw intake to reporting, not a chain of handoffs
  - Self-service analytics through Power BI, so questions stopped queuing behind the data team
  - Embedding-based representation supporting similarity, not just exact match
stack:
  - Python
  - FastAPI
  - Azure Data Factory
  - Synapse
  - Data Lake
  - Embeddings
  - ETL
  - Power BI
metrics:
  - label: Path
    value: Ingest → classify → report
  - label: Consumers
    value: Business users, self-serve
---

## The problem

Analytics work that stalled in the gap between raw data and a usable answer. Getting from
ingestion to a report meant a chain of separate steps, each owned by someone technical,
which turned every business question into a ticket routed through the data team. The
bottleneck was not capability — it was that nobody outside the team could reach the data
without help.

## The approach

An Azure-based extraction and transformation platform orchestrating the full path:

- **Raw ingestion** into the data lake as the single entry point, so there was one place
  where things arrived.
- **Classification** of incoming content, so downstream processing knew what it was
  handling rather than inferring it each time.
- **Embedding generation**, representing content in a form that supported similarity and
  retrieval rather than exact match alone.
- **ETL orchestration through Azure Data Factory and Synapse**, making intake to output one
  managed pipeline instead of a sequence of manual handoffs.
- **Power BI reporting** on the far end — the piece that turned the platform from an
  engineering artifact into something business users could serve themselves from.

## The outcome

One orchestrated path from raw intake to reporting, with self-service analytics at the end
of it. Questions stopped needing to be routed through the data team to get answered, which
is the only version of this that actually reduces load rather than relocating it.
