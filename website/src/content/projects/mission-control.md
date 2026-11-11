---
title: Mission Control
category: Agentic AI
summary: A local dashboard for long Claude Code runs — every step, subagent, error and compaction, live, across all sessions on the machine — and missions, where "done" is decided by checks that run on every commit outside the session.
order: 23
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
  - SQLite
  - Svelte
  - TypeScript
  - Git
  - Claude Code
metrics:
  - label: Stage
    value: Works locally, not published
  - label: Reads
    value: Claude Code + Codex transcripts
---

## The problem

A long Claude Code session has no outside view. What it did, which subagents it started,
where it errored, when its context was compacted and how close it is to a usage limit
are all inside the transcript, and "done" at the end is the session's own claim. When two
people — or two skills — work on the same task, there is nothing to compare them with.

## The approach

- **A collector** reads every transcript once, then follows new lines; a full rescan
  every 30 seconds backs up the file watcher. SQLite holds short previews, not whole
  transcripts; opening a step reads the full text back from the file. Codex CLI sessions
  appear in the same views.
- **Missions.** A `mission.toml` names a goal, a branch, protected files and criteria,
  each with a shell command and a timeout. Checks run on every new commit of the branch
  in a copy made with `git archive` — no worktree, no checkout. The first run is the
  starting commit, so a check that already passes there proves nothing; commands are
  fixed when the mission starts, and editing the file or a protected path later is
  flagged. With a shared branch prefix, every branch under it is held to the same checks
  and the page compares them.
- **Projects and skills.** One page lists every repository under the projects root with
  its branch, uncommitted files and last session; another maps every skill Claude Code
  can load and how often each was used; a third reads the results `claude plugin eval`
  writes and compares skills with plain Claude, counting only checks on what was
  produced.
- **Security as a constraint.** The database holds excerpts of every session, so the
  server binds to 127.0.0.1, refuses other `Host` headers and creates the database
  readable by one user only. Missions start from the command line only — a web form that
  registers shell commands would let any website run them by posting to localhost.

## The outcome

It runs for me: sessions, missions with checks, projects and the skill map, with a
`mission` skill that starts a run from a repository. An architecture-evolution review on
2026-11-10 found the shape sound — one process per machine, two SQLite files, no cycles
across 16 modules — and laid out the steps that would let a colleague's branch be judged
on the same page.

It is not a product yet. There is no public repository, the first real mission with two
participants has not been run, the test suite is small (test code is 18% of the lines)
and runs by hand, and the transcript format is not a documented interface: record types
the parser has not seen are counted and shown, so a Claude Code update that changes the
format is visible rather than silent.
