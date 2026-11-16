---
title: Co-Parenting App
category: Software Engineering
summary: A shared space for separated parents — agreements, a custody calendar, the child's record — where anything concerning both needs the other's consent, enforced in the database.
order: 25
org: Open source
period: 2026 — Present
link: https://github.com/ManSe404/co-parenting-app
impact:
  - Nobody changes alone what concerns both — closing an agreement, any calendar change and permanent deletion need the other parent's consent, in the database, not only in the UI
  - No server of its own — a static site talks to Postgres directly, with row-level security and database functions doing the checking
  - Every change to the child's record kept as old value, new value and who changed it
  - The child's name is never shown anywhere; photos are redrawn before upload so they carry no location or device data
stack:
  - Astro
  - Svelte
  - TypeScript
  - Supabase
  - PostgreSQL
  - pgTAP
  - Vitest
  - GitHub Pages
metrics:
  - label: Stage
    value: Prototype + public demo
  - label: Licence
    value: MIT
  - label: Interface
    value: Serbian
---
