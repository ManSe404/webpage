---
title: Document Chatbot That Talks to Data
category: Generative AI
summary: A chatbot over market research workbooks and decks that gets the numbers right — code computes every figure, the model plans and explains, and each number traces to its cell.
order: 1
org: ExpertGroup
period: "2026"
impact:
  - Every number computed in code, never by the language model
  - Each figure traceable to its workbook, sheet and cell
  - Incompatible data bases refused in code, never blended
  - One answer rendered as chat text, an editable PowerPoint slide and a spreadsheet
stack:
  - Python
  - FastAPI
  - RabbitMQ
  - PostgreSQL
  - Qdrant
  - Anthropic API
  - Azure OpenAI
  - python-pptx
metrics:
  - label: Role
    value: Architect & builder
  - label: Principle
    value: The model never computes a number
  - label: Stage
    value: Demo delivered · taken into the platform
---

## The problem

Market research arrives as Excel workbooks and slide decks from a data provider, each
with its own layout, and the people who read it want quick answers in numbers: a share, a
trend, a ranking against last year. A standard document chatbot reads those numbers out of
text chunks and lets the language model do the arithmetic. The answer sounds right and is
often wrong — a share summed across periods that do not add up, a weekly figure compared
with a monthly one, a percentage taken over the wrong base. In a management deck, a wrong
number is worse than no answer at all.

## The approach

I designed and built it knowledge-base first, around one rule that shaped everything else:
the language model never computes a number.

- **Two lanes.** Documents and slides go to a text lane — hybrid search with citations.
  Workbooks go to a fact lane: every sheet is profiled, checked for integrity, matched to a
  known layout and stored as typed facts, and periods the data does not define are
  quarantined rather than guessed.
- **Plan, compute, explain.** The model turns the question into a structured query, a
  deterministic engine computes the result, and the model then explains it — with a
  verifier checking every number in the explanation against the computed result before
  anyone sees it.
- **Methodology in code.** A question that would mix a weekly and a monthly base, or name a
  period the data does not hold, gets a clear refusal and the closest valid alternative,
  not a blended number.
- **One answer, many formats.** The stored answer renders as chat text, as an editable
  PowerPoint slide or deck with native charts and a methodology slide, and as CSV or XLSX
  backing tables — each reconciled against the same computed result.
- **Rights on numbers too.** The fact lane applies the user's document permissions, so a
  figure never comes from a file the user cannot open.

## The outcome

A working demo on real research files, where every figure can be checked down to the cell
it came from — and its core pieces were taken into the team's multi-tenant chat platform.
