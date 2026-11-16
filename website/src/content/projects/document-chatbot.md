---
title: RAG Document Chatbot
category: Generative AI
summary: The same internal questions kept absorbing support time — an enterprise RAG chatbot now answers them from the document estate, faster than asking around, the same way every time.
order: 14
org: Publicis Sapient
period: 2023 — 2024
impact:
  - Answers grounded in the document estate rather than in model recall
  - Consistency treated as a target — the same question answered the same way twice
  - Repetitive internal support load reduced rather than redirected
stack:
  - Python
  - Azure OpenAI
  - Azure AI Search
  - Azure Functions
  - FastAPI
  - Data Lake
  - Azure Pipelines
  - Docker
metrics:
  - label: Scope
    value: Built end to end
  - label: Tuned for
    value: Accuracy & consistency
---

## The problem

An organisation's document estate holds the answers to most internal questions, and it is
a terrible interface to them. People ask a colleague instead, which is why the same
questions absorb the same support capacity over and over. A chatbot only helps here if the
answers can be relied on — a fluent wrong answer moves the support load rather than
removing it, and costs trust on the way.

## The approach

Built the system end to end, with the effort concentrated where retrieval quality is
actually decided:

- **Optimized ingestion pipelines** feeding the retrieval layer, since how documents enter
  the index determines more about answer quality than the query-time logic does.
- **Retrieval over the document estate** through Azure AI Search, grounding answers in
  source material rather than in what the model happened to memorise.
- **LLM evaluation** aimed at accuracy and consistency instead of fluency — the same
  question should get the same answer twice, which is not something a model gives you for
  free.
- **Fine-tuning** applied where evaluation showed the gap was in the model rather than in
  what retrieval was returning.

## The outcome

Faster access to answers people could actually rely on, and a reduction in the repetitive
support load that had been quietly absorbing internal teams' time.
