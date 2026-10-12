#!/bin/sh
# Runs from `prepare` (on bun install): points this repo's core.editor at
# scripts/commit-editor.sh, so the commit prompt replaces the editor.
# Repo-local only — global Git config and shell aliases are untouched.
# Falls back to vi in a checkout that doesn't have the script (worktrees
# share this config, and an older branch may not have it yet).
git rev-parse --git-dir >/dev/null 2>&1 || exit 0
git config core.editor 'sh -c '\''f="$(git rev-parse --show-toplevel)/scripts/commit-editor.sh"; [ -f "$f" ] && exec sh "$f" "$@"; exec vi "$@"'\'' commit-editor'
