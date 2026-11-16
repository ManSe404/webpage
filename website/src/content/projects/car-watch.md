---
title: Car Watch — Used-Car Prices
category: Machine Learning
summary: Used-car ads you browse on a Serbian marketplace, saved by a Chrome extension rather than a scraper, with ads flagged when priced below what similar cars cost.
order: 26
org: Personal
period: 2023 — 2026
link: https://github.com/ManSe404/car_watcher
impact:
  - Price history and days listed per ad, market statistics per model, and ads flagged below their expected price
  - Nothing bypasses the site's protection — the extension reads the site's own page data in your browser session and stops for 12 hours when the site refuses
  - Only car fields leave the browser; seller names, contacts and photos never do
  - Nothing listens on a network port — the host runs per message over stdin/stdout, the UI only while you start it
stack:
  - Python
  - scikit-learn
  - FastAPI
  - SQLite
  - TypeScript
  - WXT
  - Zod
  - Chrome Extensions
metrics:
  - label: Stage
    value: Personal tool
  - label: Full pass
    value: "~3,000 search pages every 7 days"
  - label: Licence
    value: PolyForm Noncommercial
---
