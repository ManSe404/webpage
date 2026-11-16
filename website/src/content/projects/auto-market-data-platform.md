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
