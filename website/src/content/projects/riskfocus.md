---
title: RiskFocus — Risk Summarizer
category: Generative AI
summary: Multi-document risk extraction that shows where documents reinforce, qualify or contradict each other, with every finding traceable back to its source.
order: 12
org: 404 Solutions
client: Provectus
period: 2024 — Present
impact:
  - Connections drawn across documents, not just within them
  - Traceable lineage from every finding back to its source
  - Risk factors managed per line of business
stack:
  - Python
  - LangChain
  - AWS Lambda
  - ECS
  - S3
  - AWS Bedrock
  - Step Functions
metrics:
  - label: Domain
    value: Risk assessment
  - label: Lineage
    value: Multi-document
---

## The problem

Risk rarely sits inside a single document. It emerges from how documents relate — an
exposure named in one file, qualified in a second, contradicted by a third. Extracting
each document in isolation misses exactly the thing an assessor needs, and a summary
nobody can trace back to a source is a summary nobody can defend.

## The approach

RiskFocus shares its foundations with the [document
summarizer](/webpage/projects/ai-document-summarizer) but targets a different problem —
risk extraction across a document set, and the relationships within it:

- **Multi-document risk extraction**, identifying risk-relevant content across a whole
  set rather than file by file.
- **Connections between documents**, surfacing where they reinforce, qualify, or
  contradict one another — the part that isn't visible from any single file.
- **Data lineage**, so every element traces back to the document it came from. Without
  this, an assessor cannot defend a conclusion.
- **Risk factor management by line of business**, letting each business line define the
  factors relevant to it instead of sharing one flat taxonomy.
- **Knowledge-base-backed prompts**, grounding generation in curated domain knowledge
  rather than leaving the model to improvise risk language.
- **Q&A workflows** for guided decision-making, so assessors could interrogate the
  evidence instead of only reading a static summary.

Delivered on AWS with Bedrock for inference, Step Functions for orchestration, and
Lambda plus ECS for the processing tiers.

## The outcome

Assessors moved from reading generated summaries to working with them — following any
statement back to its source, seeing how the documents relate to each other, tuning the
risk lens to their own line of business, and asking follow-up questions against the
underlying evidence.
