#!/usr/bin/env bash
# Install and dispatch the MM-01 asset export workflow.
#
# Why this script exists:
#   The rasters under content/ are derived from the SVG masters, and one
#   renderer must own them. The API path MM-01 uses can write text but not
#   binaries, and it refuses to write under .github/workflows/. So the workflow
#   has to be installed once by someone who can push to the repository.
#
# What it does:
#   1. installs content/qa/tools/export-assets.yml as .github/workflows/export-assets.yml
#   2. commits and pushes it
#   3. dispatches it once
#
# The workflow then re-exports every raster from its master with the MM-01
# visual QA harness and commits the result with the built-in token. It never
# publishes, never uploads and never runs on a schedule.
#
# Run it from a checkout of the repository, on a machine that can push:
#   bash content/qa/tools/install-export-workflow.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE="$HERE/export-assets.yml"
TARGET=".github/workflows/export-assets.yml"

echo "MM-01 asset export installer"
echo "  source: content/qa/tools/export-assets.yml"
echo "  target: $TARGET"
echo

if [ ! -f "$SOURCE" ]; then
  echo "ERROR: $SOURCE not found. Run this from a checkout of the repository." >&2
  exit 1
fi

command -v git >/dev/null 2>&1 || { echo "ERROR: git is required." >&2; exit 1; }
command -v gh  >/dev/null 2>&1 || { echo "ERROR: the GitHub CLI (gh) is required to dispatch the workflow." >&2; exit 1; }

mkdir -p .github/workflows
cp "$SOURCE" "$TARGET"
git add "$TARGET"

if git diff --cached --quiet -- "$TARGET"; then
  echo "The workflow is already installed; nothing to commit for it."
else
  git commit -m "Add MM-01 asset export workflow"
  git push
  echo "Pushed the workflow."
fi

echo
echo "Dispatching the export..."
gh workflow run export-assets.yml -f reason="MM-01 asset export"

cat <<'MSG'

Done. To watch it:
  gh run list --workflow export-assets.yml --limit 1
  gh run watch

To verify the rasters landed and are correct:
  git pull
  node content/qa/tools/visual-qa.mjs
  echo $?

Exit 0 means every asset passed, including the export drift check.
A non-zero exit prints the exact asset and the exact reason.
MSG
