---
title: Co-Parenting App
category: Software Engineering
summary: A shared space for two separated parents — questions and agreements, a custody and activities calendar, the child's record and documents — where anything that concerns both needs the other parent's consent, and the database enforces it.
order: 24
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
  - Cloudflare Pages
metrics:
  - label: Stage
    value: Prototype + public demo
  - label: Licence
    value: MIT
  - label: Interface
    value: Serbian
---

## The problem

Two parents who care for a child separately have to coordinate — who has the child when,
which agreement was reached, what the doctor said, where the school certificate is — and
the usual tools either let one side rewrite history or put family and health data on a
server nobody set rules for. The app needed one rule above all: nobody changes alone
what concerns both.

## The approach

A static Astro + Svelte site with no backend of its own; the browser talks to Supabase —
Postgres, row-level security, functions, Storage — directly:

- **Rules in the database.** Nothing writes to a table directly. Every change goes
  through a database function that checks who is asking and whether they may: a calendar
  proposal cannot be accepted by the parent who made it, a resolved item cannot be
  changed, permanent deletion of a document needs both parents. Row-level security
  confines each parent to their family's data, and only after the MFA code when MFA is
  on.
- **Items and agreements** as a board, a list with filters and CSV export, and a
  history; closing is proposed by one parent and confirmed by the other.
- **A calendar** — day, week, month, schedule — for custody (a regular pattern plus
  one-off changes) and recurring activities, where every edit, dragging included,
  becomes a proposal the other parent accepts or rejects.
- **The child's record** — school, health, contacts, sizes, activities, timetable (typed
  in, CSV or Excel, or a photo) — with every edit remembered as old, new and by whom.
- **Documents** in a private bucket, opened through a link valid for ten minutes, never
  replaced or deleted without both parents.
- **Accounts** with e-mail confirmation, TOTP MFA and optional Google sign-in; the first
  parent opens the family space and invites the other with a link that works once, for
  seven days, for that e-mail only.
- **Tests on both sides of the rule**: Vitest for the application rules, pgTAP for the
  database (the document rules alone have 30 checks), and a smoke run through headless
  Chrome with two accounts.

## The outcome

The first two phases were finished on 2026-11-04 and a
[demo without an account](https://manse404.github.io/co-parenting-app/?demo=1) runs on
sample data in the browser, with a switch between the two parent roles so the whole
flow — propose, consent, history — can be tried alone. A security review the same day
led to most of its fixes landing immediately. The README describes how to stand up a
private copy on Supabase and Cloudflare Pages, with a table that limits who may open a
family space. The interface is in Serbian.

Still ahead before real use: e-mail notifications (urgent ones at once, the rest once a
day), realtime updates so the other parent sees a change without refreshing, a production
Supabase project, and a privacy notice and account deletion before a copy is offered to
any other family.
