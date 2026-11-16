# 0004. Project popups show no dates

- **Status:** Accepted
- **Date:** 2026-11-16
- **Amends:** [ADR 0003](0003-projects-as-short-cards-without-pages.md), whose popup ends with "the employer with partner and period".

## Context

The popup's last line read "org · with client · period". The owner did not want dates there: the career on the
dashboard and the CV already date every role, and a project's period next to its employer invited comparing
the two, for example consulting work that began before a role started.

## Decision

The Company / client line shows the employer and the partner only ("404 Solutions · with ExpertGroup"). `period`
stays in each project file: it decides whether a project is in progress (with a `Stage` metric) and it can come
back in a view that needs it.

## Consequences

- No date shows on a project anywhere on the site; the career and the CV carry the dates.
- A wrong or missing `period` no longer shows to a visitor, so only the in-progress list depends on it.
