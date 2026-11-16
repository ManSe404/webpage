---
title: Supply Chain & Sales Forecasting
category: Machine Learning
summary: Gradient-boosted demand forecasts for wholesale distribution, per product group on the monthly planning cycle — built so planners trust the number enough to order against it.
order: 4
org: ExpertGroup
period: 2025 — Present
impact:
  - Procurement planned against forecast demand rather than last period's numbers
  - Forecasts produced at the grain planning actually happens on — product group, monthly
  - Gradient boosting chosen over deep sequence models for fit, training cost, and interpretability
  - Forecast movements explainable to planners, so the model gets used rather than overridden
stack:
  - Python
  - XGBoost
  - Time Series
  - Microsoft Fabric
  - Azure DevOps
metrics:
  - label: Role
    value: Team lead & delivery
  - label: Method
    value: Gradient-boosted trees
  - label: Grain
    value: Product group · monthly
  - label: Stage
    value: Delivered · in rollout
---

## The problem

Wholesale distribution runs on lead times. Ordering against last period's numbers works
right up until demand turns, and by then the correction is weeks out — supplier lead times
do not shorten because the forecast was wrong. The cost lands on both sides of the miss:
overstock ties up working capital in a warehouse, understock hands the sale to whoever did
have it on the shelf.

## The approach

I led the team and owned delivery. Three decisions shaped the work:

- **The grain** — forecasts at product-group level on a monthly cycle, because that is the
  grain procurement decisions are actually made at. Forecasting finer than the decision
  buys precision nobody can act on, and pays for it in noisier, sparser series.
- **The model** — gradient-boosted trees over engineered temporal features (lags, rolling
  statistics, calendar and seasonality effects) rather than a deep sequence model. On
  tabular business data at this scale it fits comparably or better, trains in a fraction of
  the time, and stays interpretable enough that a planner can see *why* a forecast moved.
- **Interpretability as a delivery requirement**, not a modelling preference — a planner
  who cannot explain a number will override it, and an overridden forecast changes nothing.

That last one is what makes a model part of the planning process instead of a dashboard
sitting next to it.

## The outcome

Delivered and in rollout, with procurement shifting from reacting to last period toward
planning against a forecast — at the grain, and on the cycle, that the planning already
ran on.
