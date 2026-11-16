---
title: Document Processing Platform
category: Data Engineering
summary: ETL from raw intake in the data lake through Synapse, ML classification with a trained embedding layer, Power BI at the end — built from scratch on Azure by a team of six I led.
order: 16
org: Valcon Netherlands
period: 2022 — 2023
impact:
  - One orchestrated path from raw intake in the data lake to Power BI reports, instead of a chain of manual handoffs
  - ML classification on a trained embedding layer, applying the taxonomy the same way every time
  - Manual tagging effort cut substantially
  - Built from scratch and carried to production by a team of six I led and mentored
stack:
  - Python
  - PyTorch
  - Azure Data Factory
  - Synapse
  - Data Lake
  - Power BI
  - Flask
  - Docker
metrics:
  - label: Role
    value: Design owner · led team of 6
  - label: Path
    value: Intake → classify → report
  - label: Scope
    value: Built from scratch
---

## The problem

Documents carried the data the business ran on, and the only way to reach it was to read
them. Tagging them by hand was slow and, less obviously, inconsistent: people drift over
time and disagree with each other, so a taxonomy applied by hand is never quite the same
taxonomy twice. And even extracted data helped nobody while getting from intake to a report
took a chain of separate steps, each owned by someone in the data team.

## The approach

Built the platform from scratch and led the team of six that delivered it:

- **ETL from raw intake to reports.** Documents land raw in the data lake as the single
  entry point, and Azure Data Factory orchestrates the path through Synapse, so intake to
  output is one managed pipeline instead of a sequence of handoffs.
- **ML classification on a trained embedding layer**, doing the work that keyword and
  rule-based matching could not, and applying the taxonomy the same way every time.
- **Document processing microservices** for extraction and classification, containerized
  and separately deployable, so each could scale with intake on its own.
- **Power BI at the far end** — the part that turned the platform from an engineering
  artifact into something business users could serve themselves from.
- **Design ownership**: I owned the design and led and mentored six engineers through
  delivery to production rather than handing over a prototype.

## The outcome

Production services rather than a proof of concept: one path from raw document to report,
manual tagging cut substantially, labeling that stays consistent, and business questions
answered without a ticket to the data team.
