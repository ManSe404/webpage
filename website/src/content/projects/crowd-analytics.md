---
title: Crowd Analytics & Movement Prediction
category: Computer Vision
featured: true
summary: Crowd movement prediction for a large-scale public event — forecasting where density is about to build so visitors can be routed around congestion instead of into it.
order: 6
org: 404 Solutions
period: 2026 — Present
impact:
  - Congestion forecast before it forms, not reported once it already has
  - Visitors steered toward quieter routes while there is still time to act
  - Operations given lead time to open paths, move staff, and stagger entry
  - Architected for a full event site from the outset, not a single venue
stack:
  - Python
  - PyTorch
  - Azure Machine Learning
  - Azure IoT Hub
  - Azure Event Hubs
  - Microsoft Fabric
  - Azure Data Lake
  - Docker
metrics:
  - label: Role
    value: Architect & technical lead
  - label: Stage
    value: In active development
  - label: Scale
    value: Full event site
---

## The problem

An event at this scale moves an enormous number of people through a single site,
continuously, for months. At that scale crowding stops being a comfort problem and becomes a safety and
throughput one — and by the time a bottleneck is visible on a dashboard, it has already
formed. Whoever is watching the screen is now managing a crush instead of preventing one.

## The approach

I am the architect and technical lead. The platform reads movement across the venue,
forecasts where density is about to build, and surfaces it early enough that someone can
still act on it:

- **Sensor ingestion at venue scale**, collecting feeds from across the site continuously
  rather than sampling and hoping the gaps did not matter.
- **A streaming pipeline rather than a batch one**, built on Azure — ingested in flight,
  processed as it arrives, and landed in storage the forecasting models train and serve
  against. There is no overnight window to catch up in.
- **Density forecasting** that predicts where crowding is about to build, instead of
  reporting where it already has.
- **Visitor-facing routing**, pointing people toward quieter routes and less congested
  attractions before they walk into a queue.
- **Operational lead time**, so staff can open a path, reposition, or stagger entry while
  those are still cheap decisions rather than emergency ones.

The governing constraint is latency against scale. A prediction is worth nothing if it
arrives after the movement it describes, and that single requirement drives most of the
architecture — what inference runs at the edge versus centrally, and what gets aggregated
before it crosses the network. Getting it wrong in either direction fails the same way: a
system that is accurate but late, or fast but wrong, is one nobody acts on.

## The outcome

In active development ahead of the event, with the architecture settled around a single
test — does the warning arrive early enough to change what happens next?
