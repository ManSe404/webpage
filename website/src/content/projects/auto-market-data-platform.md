---
title: Automotive Market Data Platform
category: Data Engineering
summary: Production databases and web-scraped market data combined into one normalized analytical layer, so downstream teams stopped re-deriving the same joins and disagreeing.
order: 15
org: Publicis Sapient
period: 2023 — 2024
impact:
  - Single normalized view across sources that shared no schema
  - Normalisation decided once, centrally, instead of differently by each analyst
  - Analytics-ready data downstream teams could query without preprocessing it first
stack:
  - Python
  - Databricks
  - Azure Data Factory
  - Azure Data Lake
  - Playwright
  - Selenium
  - BeautifulSoup
  - FastAPI
metrics:
  - label: Sources
    value: Production DBs · web scraping
  - label: Output
    value: Normalized analytical layer
---

## The problem

Auto market analytics needed a view across sources that had nothing in common: production
databases with their own schemas and their own conventions, and web-scraped market data
with no schema at all. Every analyst who wanted a question answered was re-deriving the
same joins and the same normalisation before they could start — and quietly making
different choices while doing it, which meant two people could answer the same question
differently and both be defensible.

## The approach

A multi-source ingestion and normalisation pipeline on Azure:

- **Production database ingestion**, pulling structured internal sources on a schedule
  rather than on request.
- **Web scraping** for external market data that existed nowhere else in usable form.
- **A centralized data lake** as the landing zone, keeping raw inputs intact and separate
  from anything derived from them, so a normalisation decision could be revisited without
  re-collecting.
- **Processing and normalisation through Databricks and Python**, turning heterogeneous
  raw input into one consistent analytical layer.
- **Azure Data Factory orchestration**, so ingestion ran as a managed schedule instead of
  a set of scripts someone had to remember to run.

## The outcome

Downstream teams query a single normalized view instead of assembling one themselves — and
because the normalisation happens once in a known place, the answers people get are
consistent with each other rather than a function of who ran the query.
