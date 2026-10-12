#!/bin/sh
# Commit editor for this repo (core.editor, set by scripts/git-setup.sh).
# After the commit prompt (.husky/prepare-commit-msg) has written the
# message, there's nothing to edit — skip the editor. Everything else
# (amends, merges, a prompt-less commit) opens your usual editor.
marker="$(git rev-parse --git-dir)/tackl-message-ready"
if [ -f "$marker" ]; then
	rm -f "$marker"
	exit 0
fi

editor="$(git config --global --get core.editor || true)"
[ -n "$editor" ] || editor="${VISUAL:-${EDITOR:-vi}}"
exec sh -c "$editor \"\$@\"" "$editor" "$@"
