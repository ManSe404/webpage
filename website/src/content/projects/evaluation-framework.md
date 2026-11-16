---
title: LLM Evaluation Framework
category: Generative AI
summary: One shared way to measure the team's chatbots and agents — retrieval, correctness and safety on a golden set — so a change ships on a number, not on a demo that looked fine.
order: 3
org: ExpertGroup
period: 2026 — Present
impact:
  - One golden-set format for every chatbot and agent
  - Retrieval scored by document ID before any LLM judge
  - Ragas metrics rebuilt on DeepEval, in code the team owns
  - Judge prompts in English and Serbian, with a local judge model checked against human labels
stack:
  - Python
  - DeepEval
  - Ollama
  - Pydantic
  - Azure DevOps
metrics:
  - label: Role
    value: Lead & product owner
  - label: Scope
    value: Every team chatbot & agent
  - label: Stage
    value: Research done · building
---

## The problem

The team runs several LLM chatbots and agents — a knowledge assistant, a public-sector
assistant, an agent framework — and each was judged the same way: someone asked it
questions and decided it looked fine. That does not survive a model swap, a new chunker or
a rewritten prompt. Nobody can say whether the change helped, hurt, or quietly broke the
language nobody happened to test.

## The approach

I set the evaluation strategy and planned the work. The research ran first, before any
framework code:

- **Survey before building.** Evaluation and red-teaming tools — DeepEval, Ragas,
  promptfoo, Inspect, Giskard, garak, PyRIT, Langfuse and others — compared on one template,
  with every claim dated and sourced.
- **DeepEval as the proposed core**, with the Ragas metrics we need rebuilt as custom
  DeepEval metrics. Ragas has had no release since early 2026, carries an unpatched CVE, and
  drops rows that fail scoring from its averages without a word.
- **Deterministic first.** The first metrics are retrieval precision and recall by
  document ID and semantic similarity, which need no judge at all; factual correctness and
  noise sensitivity follow, sharing one claim-splitting module.
- **A judge you can trust** — a local model with structured output and an explicit
  timeout, prompts in English and Serbian (Latin and Cyrillic), and its agreement with
  people measured on a hand-labelled set.
- **Safety and standards.** OWASP LLM Top 10 and MITRE ATLAS mapped for red-teaming;
  ISO/IEC 42001, the NIST AI RMF and the EU AI Act mapped for the evidence the framework
  produces.

## The outcome

The research and the key decisions are done, and the first golden set is being built from
the team's own cases and public ones. The aim is one gate in CI that every chatbot passes
before a change ships.
