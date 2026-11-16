# 0002. Every pull request runs the required build

- **Status:** Accepted
- **Date:** 2026-11-11 (commit `9790350`, pull request #3)

## Context

The workflow `.github/workflows/deploy-website.yml` used to run only on pushes to `main`, so a broken
frontmatter field or a type error was first caught by the deploy. Pull requests then got the same checks, at
first only when they touched `website/` or the workflow.

`main` accepts changes only through a pull request, and `build` became a required check there. With the paths
filter, a pull request that touched only `docs/` or the README never ran `build`; its required check stayed
pending and the pull request could never be merged.

## Decision

- The `pull_request` trigger has no paths filter: every pull request runs `npm ci`, `npm run check` and
  `npm run build` in the job `build`, and nothing is uploaded or deployed.
- The `push` trigger on `main` keeps its paths filter (`website/**` and the workflow itself), so merging a
  documentation change does not redeploy the site.

## Consequences

- Every pull request, including a documentation-only one, waits for the build before it can merge.
- The required check matches the job by name: renaming `build` in the workflow means updating the rule on
  GitHub in the same change, or every pull request stays blocked.
- A push to `main` that only changes `docs/`, `files/` or the README leaves the published site as it is.
