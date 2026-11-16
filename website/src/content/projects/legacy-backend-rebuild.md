---
title: Backend Build & System Discovery
category: Software Engineering
summary: Nobody knew exactly what an old production system did — system discovery turned that into a specification, and the backend built to it replaced the old one without incidents.
order: 10
org: 404 Solutions
client: Q Agency
impact:
  - The new backend replaced the old one without incidents, delivered on time
  - System discovery written down as a specification the client still uses
  - Built to the specification rather than to assumptions, and easier to change than the old one
stack:
  - Python
  - FastAPI
  - PostgreSQL
  - Docker
metrics:
  - label: Starting point
    value: Undocumented system
  - label: Scope
    value: Discover · specify · build
---

## The problem

Replacing part of a system that has been running for years starts with a question the
documentation cannot answer: what does it do today? Documented behaviour and real
behaviour drift apart over time, and the gaps are where the risk sits — the edge case some
downstream process has quietly depended on for years. Build against the documentation
alone and you ship a system that is correct according to a description nobody has checked.

## The approach

Delivered the system discovery and the backend build for one of Q Agency's enterprise
clients, in that order on purpose:

- **System discovery first**, establishing what the existing system does before changing
  any part of it — the prerequisite for replacing anything safely.
- **A written specification**, so there was something concrete to build and test against
  rather than a shared assumption.
- **The new backend built to the specification**, not to what the old system was supposed
  to have been doing.

## The outcome

The new backend replaced the old one without incidents and on time, and it is easier to
change. The client kept the specification and still uses it — the part that stays useful
long after the migration is finished.
