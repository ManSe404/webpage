---
title: Agentic AI Platform
category: Agentic AI
summary: Board-meeting work split across many manual jobs in two languages, now one agent platform — briefings ready sooner, minutes faster, the whole process in one place.
featured: true
order: 8
org: 404 Solutions
client: WiserTech
period: 2024 — Present
impact:
  - Meeting preparation done by agents before anyone asks
  - English and Arabic throughout, translation keeping the layout
  - Spoken summaries, and minutes drawn from speech-to-text
  - Each topic read through expert personas — risks, sector impact, international benchmarks and recommendations
stack:
  - Python
  - LangGraph
  - Qwen & Gemma
  - FastAPI
  - Qdrant
  - RabbitMQ
  - PostgreSQL
  - Redis
metrics:
  - label: Architecture
    value: Graph-orchestrated agents
  - label: Languages
    value: English · Arabic
  - label: Scope
    value: The whole meeting cycle
---

## The problem

Preparing a board meeting means reading a pack of documents in two languages, agreeing an
agenda, briefing every participant and, afterwards, turning hours of discussion into
minutes and action items. Each of those is a different job, and single-shot prompting
falls apart on all of them: they are sequences of dependent steps, each of which can fail
or need to branch. That needs an architecture, not a longer prompt.

## The approach

I worked on the agentic backend of a platform for preparing and running board meetings,
where each job is its own agent or worker:

- **Chat over the meeting documents**, with citations, in English and Arabic.
- **Agenda building** from the board pack — items, sub-items and the pages each covers.
- **Pre-meeting summaries** per topic and per meeting, as text and as a spoken version, in
  confidential and public variants.
- **Insights per topic** through expert personas: risks, sector impact, international
  benchmarks and recommendations.
- **Reports with charts**, exported to PDF and Word.
- **Minutes and action items** from the meeting transcript, with participants' names
  corrected where speech-to-text mixes up Arabic letters.
- **Translation** between English and Arabic that keeps the layout of Word, PowerPoint,
  Excel and PDF files.

Orchestration graphs define how the agents hand off, branch and converge; the workers take
their jobs from a message queue, and every model call is traced.

## The outcome

One platform covering a meeting from the board pack to the minutes, in both languages:
briefings ready sooner, minutes faster after each meeting, and the whole process in one
place instead of a set of manual jobs.
Making orchestration an explicit graph rather than an implicit chain is what kept it
workable: when a flow goes wrong, the flow itself is a structure you can look at.
