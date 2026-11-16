---
title: Document Data Extraction & Classification
category: Machine Learning
summary: Data extracted from invoices and labeled by ML text classification, so every field lands in its right place in the database — with the classification models evaluated and tuned.
order: 18
org: Optimal Systems GmbH
period: 2021 — 2022
impact:
  - Invoice data placed in its database fields by label, not typed in by hand
  - Each extracted piece of text labeled by ML classification, so it goes to the right place
  - Classification models evaluated and tuned before they were trusted with real invoices
stack:
  - Python
  - scikit-learn
  - PyTorch
  - spaCy
  - Tesseract OCR
  - Docker
  - Azure
metrics:
  - label: Documents
    value: Invoices
  - label: Task
    value: Extract · classify · store
  - label: Role
    value: Data scientist
---

## The problem

Invoices arrive as documents, but the business needs their contents as data, each value in
its own place in the database. Reading and retyping them does not scale, and a value put in
the wrong field is worse than a missing one, because nothing downstream notices.

## The approach

- **Extraction** of the data from each invoice.
- **Text labeling by ML classification**, deciding what each extracted piece of text is, so
  the system knows where it belongs.
- **Placement in the database**, every labeled value written to its field.
- **Model evaluation and hyperparameter tuning**, with testing and validation, so the
  classifiers were measured before anyone relied on them.

## The outcome

Invoice data reaching the database by its labels rather than by hand, with classification
models whose accuracy had been tested and tuned rather than assumed.
