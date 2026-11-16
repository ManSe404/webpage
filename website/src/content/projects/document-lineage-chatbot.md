---
title: Document Chatbot with Live Lineage
category: Generative AI
featured: true
summary: A high-precision multilingual chatbot over a living document set — every answer traceable to its source passage, with the index updated in real time as documents change.
order: 7
org: 404 Solutions
client: ExpertGroup
period: 2025 — Present
impact:
  - Every answer traceable back to the exact source passage behind it
  - Document edits reach retrieval at once, with no reindex cycle
  - Declines rather than guesses — precision over coverage
  - Consistent answers across languages from one shared source of truth
stack:
  - Python
  - FastAPI
  - LangChain
  - Qdrant
  - RabbitMQ
  - Azure AI Foundry
  - Azure DevOps
  - Docker
metrics:
  - label: Role
    value: Team lead & delivery
  - label: Retrieval
    value: Grounded, with lineage
  - label: Languages
    value: Multilingual
---

## The problem

Most document chatbots quietly assume two things that were not true here: that the
documents sit still, and that a plausible answer is good enough. This one had to work
against a corpus being edited while people were querying it, and in a setting where a
confidently wrong answer was worse than no answer at all. Multilingual made both harder —
the same question asked in two languages has to reach the same source material and come
back with the same answer, not two differently-shaped guesses.

## The approach

I led the team and owned the delivery. The design pushed correctness into the structure
rather than relying on prompt discipline:

- **Lineage on every answer**, surfaced in real time — a response carries the passages it
  was derived from, so a reader can check the claim instead of trusting it. This is the
  difference between an answer that is useful and one that is defensible.
- **Real-time upsert**, so creating or editing a document updates what retrieval sees
  immediately. No overnight reindex, no window where the assistant confidently cites a
  version that no longer exists.
- **Precision over recall**, tuned so the system returns less rather than returning
  something shaky, and declines outright when the source material does not cover the
  question.
- **One corpus, many languages**, so multilingual support is a retrieval and generation
  concern rather than a separate stack per language drifting out of sync.

## The outcome

Users get answers they can verify at the point of reading, against documents that are
current as of the moment they asked — and the failure mode, when it comes, is an honest
"not covered" rather than a fluent invention.
