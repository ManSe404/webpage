---
title: Voice-Enabled Support Chatbot
category: Conversational AI
summary: A telephone-based voice support system covering the full conversational loop — speech-to-text, intent recognition, dialogue state, and speech back — architected around availability from the start.
order: 18
org: Valcon Netherlands
period: 2022 — 2023
impact:
  - The complete conversational loop handled over telephony, not a partial demo
  - Dialogue state held across turns rather than restarting every utterance
  - High availability treated as a design constraint, not a deployment concern
stack:
  - Python
  - Azure Speech Services
  - Azure LUIS
  - Azure Bot Service
  - Telephony
  - Docker
metrics:
  - label: Channel
    value: Telephony
  - label: Scope
    value: Full conversational loop
---

## The problem

A support line is the interface of last resort — people call it because the other channels
already failed them, which means they arrive with low patience and a real problem.
Automating it means handling the entire conversational loop over telephony, where the
constraints are unforgiving: audio quality is far below a headset microphone, callers
interrupt and talk over prompts, and a dropped call is worse than never having automated
anything.

## The approach

Built the system end to end, across every stage of the loop:

- **Speech-to-text** over telephony audio — a materially harder input than clean recorded
  speech, and the stage everything downstream inherits its errors from.
- **Intent recognition and entity extraction** through Azure LUIS, turning what the caller
  said into what the caller wanted.
- **Dialogue flow management**, holding state across turns so a conversation progresses
  instead of restarting at every utterance.
- **Text-to-speech** back to the caller, closing the loop in the same channel it opened in.
- **Telephony integration and high availability** as first-class design constraints rather
  than operational afterthoughts — a support line that drops calls fails at the only thing
  it exists to do.

## The outcome

A working end-to-end voice interaction over the phone, built from the beginning around the
assumption that availability was the requirement everything else had to fit around rather
than something to add once the conversation worked.
