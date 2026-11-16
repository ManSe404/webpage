---
title: Telephone Voice Assistant
category: Conversational AI
summary: Callers reach a support line once every other channel has failed them — a voice assistant now handles those calls around the clock, taking support load off the team.
order: 17
org: Valcon Netherlands
period: 2022 — 2023
impact:
  - Support calls handled by the assistant around the clock, taking load off the team
  - Dialogue state held across turns rather than restarting every utterance
  - High availability treated as a design constraint, not a deployment concern
stack:
  - Python
  - Azure Speech Services
  - Azure LUIS
  - Azure Bot Service
  - Azure Cognitive Services
  - Docker
metrics:
  - label: Channel
    value: Telephony
  - label: Scope
    value: Full conversational loop
  - label: Result
    value: Support load down
---
