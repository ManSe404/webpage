# 0005. The CV is rendered in CI with the phone number from a secret

- **Status:** Accepted
- **Date:** 2026-11-22

## Context

The phone number was in the repository five times: `profile.json` (read by no page), `files/stefan_context.txt`,
the CV source `files/cv/stefan-seman-cv.html` and two identical rendered PDFs, `files/CV Stefan Seman.pdf` and
`website/public/files/stefan-seman-cv.pdf`. The repository is public, so the number could be read and searched in
text on GitHub, not only in the CV the site offers. The owner wants the number in the CV a visitor downloads from
the site and nowhere else.

The CV was rendered by hand with WeasyPrint on the owner's machine, which has the Fira fonts installed system-wide;
GitHub's runners do not.

## Decision

- The CV source carries the placeholders `{{CV_PHONE}}` and `{{CV_PHONE_TEL}}`. `files/cv/render.sh` fills them
  from `CV_PHONE` and renders the PDF with WeasyPrint 69.0.
- The workflow renders the CV on every build, before `astro build`, with the repository secret `CV_PHONE`, and
  checks that the PDF embeds only the expected fonts. Pull requests without access to secrets (forks, Dependabot)
  render with a placeholder number; a push to `main` without the secret fails.
- No PDF of the CV is committed: `website/public/files/stefan-seman-cv.pdf` is build output and ignored, and the
  duplicate `files/CV Stefan Seman.pdf` is removed.
- The Fira Sans and Fira Mono files the CV uses ship in `files/cv/fonts/` (SIL OFL 1.1) and are loaded with
  `@font-face`, so the laptop and CI produce the same PDF.
- `phone` is removed from `profile.json` and from `files/stefan_context.txt`.

## Consequences

- The number exists only in the published CV and in the secret. Commits before this decision still contain it;
  removing it from history would need a force push to `main`, which the owner has not chosen, and the published
  CV shows it anyway.
- A change to `files/cv/` alone now deploys the site (the push filter includes `files/cv/**`).
- Rendering the CV locally needs `files/cv/.env` (from `.env.example`) or `CV_PHONE` in the environment, and
  WeasyPrint. Without it the dev server serves no CV PDF.
- The build installs WeasyPrint and its system libraries on every run, adding about a minute.
- The rendered CV was checked identical, pixel for pixel, to the PDF it replaces, also with no Fira installed on
  the machine.
