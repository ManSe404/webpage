---
title: Document Data Extractor Service
category: Software Engineering
summary: Extraction and classification services built from scratch — deep learning over unstructured text, delivered to production by a team of six I led and mentored.
order: 17
org: Valcon Netherlands
period: 2022 — 2023
impact:
  - Production-ready extraction services built from the ground up, not prototyped
  - Deep learning over unstructured text where keyword rules could not reach
  - Extraction and classification separately deployable and independently scalable
  - Team of 6 engineers led and mentored through delivery
stack:
  - Python
  - PyTorch
  - Embeddings
  - Flask
  - Azure Data Factory
  - Synapse
  - Data Lake
  - ETL
  - Docker
metrics:
  - label: Role
    value: Design owner · led team of 6
  - label: Scope
    value: Built from scratch
---

## The problem

Unstructured documents carrying the data a business actually runs on, and no way to get at
it except by reading them. Extracting it reliably is a machine learning problem; exposing
it as a service other systems can depend on is an engineering one. Most efforts solve the
first, demo well, and stop — which leaves the organisation with a proof that it is
possible and nothing it can use.

## The approach

Built the extraction and classification services from scratch and led the team that
delivered them:

- **Deep learning over unstructured text**, with embedding-based representations doing the
  work that keyword and rule-based matching could not.
- **Document processing microservices**, designed so extraction and classification were
  separately deployable and could scale independently of each other.
- **ETL into Synapse and the data lake**, so extracted output landed somewhere downstream
  systems could actually consume rather than in a service's own storage.
- **A team of six led and mentored through delivery**, with me owning the design and
  carrying it to production instead of handing over a prototype.

## The outcome

Production services, built from the ground up and delivered — which is the distinction
that matters here, since the hard part of extraction is never making it work once. It is
making it work every time, on documents nobody anticipated.
