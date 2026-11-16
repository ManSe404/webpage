---
title: Role Skill Packs for Claude Code
category: Agentic AI
featured: true
summary: Ask an assistant to review a repository and you get estimates lost in a transcript — these Claude Code skills count with scripts, end in one page, and save review time at work.
order: 21
org: Open source
period: 2026 — Present
link: https://github.com/ManSe404/claude-role-skills
impact:
  - Numbers come from scripts with fixed output, so two runs of a skill give the same counts
  - Every skill ends in a fixed-section HTML page, not a transcript — readable, shareable, comparable with the last run
  - A hook guard enforces each skill's "Never" list — changes and network access ask first, personal data is stripped from output
  - Tested against twelve fictional projects with planted bugs, flaws and conflicts
stack:
  - Claude Code
  - Python
  - pytest
  - ruff
  - mypy
  - uv
  - GitHub Actions
  - HTML
metrics:
  - label: Scope
    value: 10 packs · 50 skills
  - label: Licence
    value: MIT
  - label: Fixtures
    value: 12 fictional projects
---

## The problem

Ask an assistant in chat to review a repository and you get estimated numbers, a result
that lives only in the transcript, and a different shape every time. Nothing stops it
from editing the repository or printing personal data while it works, and there is no
way to measure whether a skill does better than the assistant without it. The repeated
jobs of a role — mapping an unknown codebase, deciding whether a brief needs RAG or an
agent, reviewing a data platform before a release — deserve a fixed procedure, fixed
counting and a fixed output.

## The approach

A public Claude Code plugin marketplace with one pack per role: software engineering (10
skills), data engineer (7), data scientist (5), AI architect, data architect, data
analyst and software architect (4 each), cloud architect (3) and solutions architect (2),
which joins the specialists' pages into one solution and names every conflict between
them. A tenth pack, workflows (7), chains the skills of the others for a whole job, such as
taking over a repository or shipping a change, each step reading the previous step's page.

- **Claude writes the content, a script draws the page.** A skill fills a JSON file and
  a shared renderer turns it into one HTML file with the fonts inlined and nothing
  fetched from the network. Graphs are clickable, architecture blocks play request flows
  step by step and show where untrusted text enters, and decision blocks show the options
  against the factors that ruled each one out.
- **Scripts do the counting** — inventories, import graphs, coverage ranking, corpus
  sizes, cost at volume, table lineage from SQL and dbt, data profiles — with fixed
  output.
- **A hook guard in every skill.** The parts of a skill's "Never" list that a program can
  check are enforced by Claude Code: a write outside the pages folder or a shell command
  that changes files asks first, so does going online, and the twelve skills that read
  data files refuse a file whose header names a personal column and strip e-mail
  addresses, IBANs and JMBGs from what Claude sees.
- **Fixtures with planted problems.** Twelve made-up projects — among them an order service with a
  real bug and a production log, an AI support prototype with a corpus in English and
  Serbian, a data platform, a .NET, TypeScript and Python system, Azure and AWS estates in
  Terraform, a client brief with contradicting specialist pages, a sales analytics
  project — against which the scripts are tested and the example pages are produced.
- **Evals per pack** through `claude plugin eval`, and a selection check that loads every
  pack and asks whether Claude picks the right skill among all 50.

## The outcome

Installed with one command and in daily use: codebase maps across nine work repositories,
code audits and change reviews on [Mosaic](/webpage/projects/mosaic), an
architecture-evolution plan for [Mission Control](/webpage/projects/mission-control). The
repository is MIT-licensed with 37 test files, and the fixtures are fictional down to
the last invoice, except the public cloud list prices.

The tests, linters and type checks run in CI on every pull request. What is still missing
is the proof: the eval runs — about 80 cents a case — have not been collected into a
published table showing how much a skill beats plain Claude. That is next.
