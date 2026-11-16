---
title: Multilingual Document QA Chatbot
category: Generative AI
summary: A retrieval-augmented assistant answering questions over a document set in the user's own language — deliberately contained in scope, led and delivered end to end by the team.
order: 2
org: ExpertGroup
period: 2025 — Present
impact:
  - Answers straight from the documents, no more read-and-search
  - Answers grounded in the source material rather than model recall
  - Built, delivered, and deployed end to end by the team I led
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
  - label: Languages
    value: Multilingual
  - label: Architecture
    value: Grounded RAG
---

## The problem

A body of documents that people needed answers out of, not a reading list. The scope was
narrower than a general assistant — question in, grounded answer out — but the language
requirement was not negotiable: it had to work in the languages its users actually write
in, not work in English and be translated at the edges.

That constraint does more than it looks like it does. Retrieval quality in
morphologically rich, comparatively lower-resource languages is not what it is in English,
and the gap shows up exactly where you would rather it did not — in whether the right
passage comes back at all.

## The approach

I led the team and owned the core logic through to delivery and deployment. The system is
deliberately simple, and the simplicity is the decision:

- **Grounded retrieval** over the document set, so answers come from the source material
  rather than from model recall.
- **Multilingual retrieval quality** as the main engineering effort, because that is
  where this system fails if it fails at all.
- **Scope held down on purpose** — where the [lineage
  chatbot](/webpage/projects/document-lineage-chatbot) needed live updates and traceability,
  this one needed to be dependable and finished.
- **Delivered and deployed** by the team, rather than handed over as something that worked
  on someone's machine.

## The outcome

A working assistant, in production, that answers in the language its users actually speak
— and one that stayed small enough to stay maintainable.
