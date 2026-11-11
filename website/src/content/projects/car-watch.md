---
title: Car Watch — Used-Car Price Watch
category: Machine Learning
summary: A personal tool that collects used-car ads from a Serbian marketplace into a local SQLite database — through a Chrome extension reading the pages you open yourself, never a scraper — and flags ads priced below what similar cars cost, with an out-of-fold gradient-boosting fair-price model.
order: 25
org: Personal
period: 2023 — 2026
link: https://github.com/ManSe404/car_scraper
impact:
  - Price history and days listed per ad, market statistics per model, and ads flagged below their expected price
  - Nothing bypasses the site's protection — the extension reads the site's own page data in your browser session and stops for 12 hours when the site refuses
  - Only car fields leave the browser; seller names, contacts and photos never do
  - Nothing listens on a network port — the host runs per message over stdin/stdout, the UI only while you start it
stack:
  - Python
  - scikit-learn
  - SQLite
  - FastAPI
  - Jinja
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

## The problem

What is a used car really worth, and when does an ad's price drop? The marketplace shows
a price today and nothing about yesterday. The original 2023 scraper (requests and
BeautifulSoup) answered that until the site moved to Next.js behind a Cloudflare
challenge; the honest replacement is to read the pages in your own browser, as the site
serves them to you, and not to work around the protection.

## The approach

Two parts joined by Chrome's native messaging, so nothing has to be running beforehand:

- **A Chrome extension** (WXT, TypeScript, Zod) that reads the Next.js page data of every
  search and ad page you open, keeps the car fields only through an allow-list, and hands
  them to the host. A pinned worker tab runs the planned collection inside your session:
  a full pass over the site every seven days (about 3,000 search pages, split into price
  bands because the site stops paging deep lists), up to 600 ad pages a day for details,
  one request every three to four seconds with jitter, and a 12-hour stop when the site
  answers 403, 429, 503 or a challenge page.
- **A Python host** that Chrome starts per message over stdin/stdout — only this
  extension's id may call it — which stores ads, price and status sightings and details
  in SQLite and hands out the next work. Raw captures are emptied after 30 days; parsed
  ads and sightings stay.
- **A fair-price model**: gradient boosting on log price, with out-of-fold predictions so
  every ad's expected price comes from a model trained without that ad. Retrained when a
  full pass finishes; a desktop notification fires when a stored ad drops in price.
- **A web UI** on 127.0.0.1 only, in Serbian, with seven pages — ads, one ad with its
  price chart, market per brand and model, deals below expected price, model comparison
  by year and budget, searches, and collection runs.
- **Tests on both sides of one contract.** The extension's tests turn fictional
  site-shaped pages — deliberately containing a seller name, phone and address — into
  fixture files the Python tests read, so a change on either side fails a test and the
  tests also prove that personal data is dropped. The host is tested as a real program
  with a framed message on stdin, the way Chrome starts it.

## The outcome

The whole flow runs — capture, planned collection, storage, revaluation, UI — on Linux
with Chrome or Chromium. It is and stays a personal tool: the site's terms forbid
republishing ad content, so the data is never shared, and the code is under PolyForm
Noncommercial. The first full pass over the site has not completed yet (it stalled at
about a third), so the fair-price model has not been trained on a complete market
snapshot, and there is no report on its prediction error.
