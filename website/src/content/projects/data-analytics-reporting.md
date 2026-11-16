---
title: Data Analytics & Reporting
category: Data Engineering
summary: Every new report meant another fragile dataflow — one Fabric lakehouse now feeds finance, sales, marketing and operations, with numbers people trust at half the capacity cost.
order: 5
org: ExpertGroup
period: 2026 — Present
impact:
  - Fabric capacity cost cut by 50 % by optimizing how the platform uses it
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
  - label: Result
    value: Capacity cost cut by half
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

The rebuild rescued reporting that was failing quietly. The new platform is in production
with numbers people trust: the finance model moved first and the other reports follow it
across from the old workspace, and optimizing the Fabric capacities cut their cost by half.
