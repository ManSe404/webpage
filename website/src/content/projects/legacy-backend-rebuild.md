---
title: System Discovery & Backend Rebuild
category: Software Engineering
summary: Recovered what an undocumented production system actually did, specified it, and rebuilt the backend against that specification — delivered for an enterprise client through Q Agency.
order: 10
org: 404 Solutions
client: Q Agency
impact:
  - Undocumented system behaviour recovered and written down as a specification
  - Backend rebuilt against observed behaviour rather than against assumptions
  - The specification outlives the migration that produced it
stack:
  - Python
  - FastAPI
  - PostgreSQL
  - Docker
metrics:
  - label: Starting point
    value: Undocumented system
  - label: Scope
    value: Recover · specify · rebuild
---

## The problem

Replacing part of a system that has been running for years means first answering a
question nobody can answer from the documentation: what does it actually do? Documented
behaviour and real behaviour diverge over time, and the gaps are exactly where the risk
sits — the undocumented edge case that some downstream process has quietly depended on for
years. Rebuild against the documentation and you ship a system that is correct according
to a description nobody has validated.

## The approach

Delivered the discovery and backend work for one of Q Agency's enterprise clients, in
that order deliberately:

- **Behaviour recovery first**, establishing what the existing system really did before
  changing any part of it — the prerequisite for replacing anything safely.
- **Specification from observation**, writing the recovered behaviour down so there was
  something concrete to build against and test against, rather than a shared assumption.
- **Backend rebuilt against the specification**, not against what the old system was
  supposed to have been doing.

## The outcome

The client got a backend built on a validated understanding of its own predecessor — and
they kept the specification, which is the part that stays useful long after the migration
is finished.
