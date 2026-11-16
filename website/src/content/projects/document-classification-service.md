---
title: Document Classification Service
category: Software Engineering
summary: Containerized microservices on Azure handling document extraction, automated categorization, and structured storage — where consistent labeling mattered as much as the manual effort saved.
order: 19
org: Valcon Netherlands
period: 2022 — 2023
impact:
  - Manual tagging effort cut substantially
  - Taxonomy applied the same way every time, which human tagging cannot guarantee
  - Classified output landed queryable rather than back in a folder
stack:
  - Python
  - ML Classification
  - Flask
  - REST API
  - Azure
  - Docker
metrics:
  - label: Architecture
    value: Containerized microservices
  - label: Gain
    value: Effort and consistency
---

## The problem

Documents arriving continuously and needing to be categorised before anything else could
happen to them. Done by hand it is slow — and, less obviously, inconsistent. Human taggers
drift over time and disagree with each other, so a taxonomy applied manually is never
quite the same taxonomy twice. That inconsistency is the more expensive problem, because
it is invisible: nothing downstream can tell a mislabelled document from a correct one.

## The approach

An end-to-end document processing service on Azure:

- **Extraction**, pulling content out of documents as they arrived and in whatever shape
  they arrived in.
- **ML classification**, applying the taxonomy automatically rather than prompting someone
  to choose from a dropdown.
- **Structured storage**, so classified output landed somewhere queryable instead of back
  in a folder with a better name.
- **Containerized microservices behind a REST API**, sized for scalable intake rather than
  for a fixed expected volume, so a spike in arrivals was a scaling event rather than a
  backlog someone had to work through afterwards.

## The outcome

Manual tagging effort dropped substantially, and labeling became consistent — a model
applies the same taxonomy the same way every time, which is the guarantee a human process
cannot make no matter how careful the humans are.
