---
title: Data Analytics & Reporting
category: Data Engineering
summary: Finance, sales, marketing and operations reporting for a retail and hospitality group, rebuilt as a medallion lakehouse on Microsoft Fabric with one shared semantic layer.
order: 5
org: ExpertGroup
period: 2026 — Present
impact:
  - Every source lands raw first, then moves through bronze, silver and gold layers
  - Reports keep their names and measures, so the switch asks nothing new of their users
  - Changes reach production through Git, pull requests and a DEV-to-PROD deployment pipeline
  - Data quality checks and an operations monitor run beside the reports
stack:
  - Microsoft Fabric
  - Power BI
  - PySpark
  - Azure Data Lake
  - Python
  - Azure DevOps
metrics:
  - label: Role
    value: Team lead & delivery
  - label: Architecture
    value: Medallion · Direct Lake
  - label: Domains
    value: Finance · sales · marketing · ops
---

## The problem

The group's reporting had grown one source at a time — point of sale, ERP and finance,
reservations, marketing and social channels — each with its own dataflow, notebook and
Import model. It worked until it did not: refreshes failed quietly, a change meant editing
production directly, and every new report added one more path to keep alive.

## The approach

The team rebuilt it as a platform rather than a collection of reports:

- **Raw first.** Every source lands unchanged in the data lake, which becomes the system of
  record; bronze, silver and gold lakehouses then clean, conform and model it.
- **One semantic layer.** Direct Lake models sit on the gold layer as a facade with the
  same names and measures the reports already used, so reports move across without being
  rewritten and their users have nothing to relearn.
- **Pipelines by domain** — finance, sales, marketing, operations — with data quality
  checks and an operations monitor beside them.
- **Engineering discipline on a BI stack**: Git and pull requests, a shared library with
  tests, and a deployment pipeline from DEV to PROD instead of edits made in production.

## The outcome

The new platform is in production, with the finance model moved first and the other
reports following it across from the old workspace.
