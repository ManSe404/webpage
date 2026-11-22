#!/usr/bin/env bash
# Renders the CV to PDF with WeasyPrint.
#
# The phone number is not in the repository: it comes from CV_PHONE (in CI the
# repository secret of that name, locally files/cv/.env, see .env.example) and
# is filled into the {{CV_PHONE}} and {{CV_PHONE_TEL}} placeholders of the HTML.
#
# Usage: bash files/cv/render.sh [output.pdf]
#   default output: website/public/files/stefan-seman-cv.pdf (not committed)
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
out="${1:-$(cd "$here/../.." && pwd)/website/public/files/stefan-seman-cv.pdf}"

if [[ -z "${CV_PHONE:-}" && -f "$here/.env" ]]; then
  set -a
  # shellcheck source=/dev/null
  . "$here/.env"
  set +a
fi

if [[ -z "${CV_PHONE:-}" ]]; then
  echo "render.sh: CV_PHONE is not set (copy files/cv/.env.example to files/cv/.env)" >&2
  exit 1
fi
if [[ ! "$CV_PHONE" =~ ^\+[0-9][0-9\ ]{6,20}$ ]]; then
  echo "render.sh: CV_PHONE must look like +381 00 000 0000" >&2
  exit 1
fi

tel="${CV_PHONE// /}"
html="$(sed -e "s/{{CV_PHONE_TEL}}/${tel}/g" -e "s/{{CV_PHONE}}/${CV_PHONE}/g" "$here/stefan-seman-cv.html")"
if [[ "$html" == *"{{"* ]]; then
  echo "render.sh: a {{...}} placeholder is left in the HTML" >&2
  exit 1
fi

mkdir -p "$(dirname "$out")"
printf '%s\n' "$html" | weasyprint --base-url "$here/" - "$out"
echo "render.sh: wrote $out"
