---
title: Slingshot — AI Code Copilot
category: Generative AI
summary: An enterprise AI copilot taken from proof of concept through MVP to delivered product — grounded in internal code and documentation, with retrieval respecting existing access boundaries.
order: 14
org: Publicis Sapient
period: 2023 — 2024
impact:
  - Carried from POC through MVP to delivered product
  - Context-aware assistance over internal infrastructure and knowledge bases
  - Secure retrieval that respects existing access boundaries
stack:
  - Python
  - Redis
  - RAG
  - AI Agents
  - LangChain
  - Azure OpenAI
  - Azure DevOps
  - Grafana
  - Fine-Tuning
  - KubeFlow
  - Docker
  - PostgreSQL
  - Milvus
metrics:
  - label: Scope
    value: Internal code + docs
  - label: Stage
    value: POC → MVP → product
---

## The problem

Engineers were losing time re-discovering things the organisation already knew — how a
service was wired, why a config existed, where a pattern was already implemented. A
general-purpose assistant could not help, because the answers lived in private code and
internal documentation.

## The approach

I worked on the copilot across its full lifecycle — first as **Sage**, later renamed
**Slingshot** — delivering the proof of concept, the MVP, and the successive updates
through to the shipped product. That meant owning the RAG architecture, the data
pipelines, and the model tuning:

- **Secure retrieval** across internal code and docs, with access controls enforced at
  retrieval time — a user's results never include sources they could not otherwise open.
- **Response grounding**, so answers cite and depend on retrieved internal context
  rather than the model's own priors.
- **Data pipelines** keeping the index current as code and documentation moved.
- **Model tuning** to fit the assistant to internal terminology and conventions.
- **Grafana instrumentation** so retrieval and response quality were observable in
  production, not inferred.

## The outcome

The copilot became a working entry point into internal knowledge — engineers could ask
about infrastructure and get answers anchored to the organisation's own sources. Getting
it past the prototype stage came down to solving the two things that usually stop these
systems: access control and grounding.
