---
title: Mission Control
category: Agentic AI
summary: A local dashboard for long Claude Code runs — every step, subagent and error, live across all sessions — with missions whose checks, run outside the session, decide what is done.
order: 24
org: Personal
period: 2026 — Present
impact:
  - '"Done" moves from the session''s own account of the work to commands that run on each new commit'
  - Several participants on one mission compared by checks passed, time to green, commits, steps, tokens and skills loaded
  - Every session on the machine visible in one place, Codex CLI sessions included
  - Read-only by design — it never changes a transcript, a session or a repository
stack:
  - Python
  - FastAPI
  - SvelteKit
  - TypeScript
  - SQLite
  - Claude Code
  - Codex CLI
  - Git
metrics:
  - label: Stage
    value: Works locally, not published
  - label: Reads
    value: Claude Code + Codex transcripts
---
