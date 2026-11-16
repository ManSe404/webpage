---
title: Slingshot — Enterprise AI Assistant
category: Generative AI
summary: Answers on code, the roadmap and hard tasks were spread across repositories, Jira and Confluence — one enterprise assistant reaches them all, in daily use and speeding onboarding.
order: 13
org: Publicis Sapient
period: 2023 — 2024
impact:
  - Carried from POC through MVP to delivered product
  - One assistant over code, documentation, Jira and Confluence, in daily use
  - Engineers' time saved and onboarding faster
  - Secure retrieval that respects existing access boundaries
stack:
  - Python
  - Azure OpenAI
  - LangChain
  - Milvus
  - Redis
  - PostgreSQL
  - KubeFlow
  - Grafana
metrics:
  - label: Scope
    value: Internal code + docs
  - label: Stage
    value: POC → MVP → product
---

## The problem

Engineers were losing time re-discovering things the organisation already knew — how a
service was wired, why a config existed, where a pattern was already implemented, what was
next on the roadmap. A general-purpose assistant could not help, because the answers lived
in private code, internal documentation, Jira and Confluence.

## The approach

I worked on the copilot across its full lifecycle — first as **Sage**, later renamed
**Slingshot** — delivering the proof of concept, the MVP, and the successive updates
through to the shipped product. That meant owning the RAG architecture, the data
pipelines, and the model tuning:

- **Secure retrieval** across internal code, documentation, Jira and Confluence, with access controls enforced at
  retrieval time — a user's results never include sources they could not otherwise open.
- **Beyond lookup**: help with the roadmap and with hard engineering tasks, not only with
  finding where something lives.
- **Response grounding**, so answers cite and depend on retrieved internal context
  rather than the model's own priors.
- **Data pipelines** keeping the index current as code and documentation moved.
- **Model tuning** to fit the assistant to internal terminology and conventions.
- **Grafana instrumentation** so retrieval and response quality were observable in
  production, not inferred.

## The outcome

The assistant became the entry point into internal knowledge and work, in daily use: less
time spent hunting for how things work, faster onboarding for new people, and answers
anchored to the organisation's own sources. Getting
it past the prototype stage came down to solving the two things that usually stop these
systems: access control and grounding.
