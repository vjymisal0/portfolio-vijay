#!/usr/bin/env bash
# Daily stats refresh: pull, regenerate lib/generated/stats.json, commit + push
# if it changed. Vercel deploys on push. Sends ONE notification per run to
# NOTIFY_WEBHOOK_URL (if set): the data summary plus the git result, or the error.
#
# Auth: GITHUB_TOKEN from .env is passed to git via an inline credential helper
# that reads it from the environment. Nothing is written to .git/config, and
# the token never appears on a command line or in this log.
set -euo pipefail

log() { printf '[%s] %s\n' "$(date -u '+%Y-%m-%d %H:%M:%S UTC')" "$*"; }

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# cron has a minimal PATH; pick up nvm / usual locations for node + npm.
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
if [ -s "$HOME/.nvm/nvm.sh" ] && ! command -v npm >/dev/null 2>&1; then
  # shellcheck disable=SC1091
  . "$HOME/.nvm/nvm.sh" >/dev/null
fi

if [ ! -f .env ]; then
  log "ERROR: $REPO_ROOT/.env not found (cp .env.example .env and fill it in)"
  exit 1
fi

# Read only the keys we need from .env (no `source`, so stray syntax can't run).
env_get() { grep -E "^$1=" .env | tail -n1 | cut -d= -f2- | sed -e 's/^["'\'']//' -e 's/["'\'']$//'; }
GITHUB_TOKEN="$(env_get GITHUB_TOKEN)"
GIT_BRANCH="$(env_get GIT_BRANCH)"; GIT_BRANCH="${GIT_BRANCH:-master}"
NOTIFY_WEBHOOK_URL="$(env_get NOTIFY_WEBHOOK_URL)"
export GITHUB_TOKEN NOTIFY_WEBHOOK_URL

# POST a message to the webhook via node (keeps the URL, which may contain a
# bot token, out of process arguments and logs).
notify() {
  [ -n "$NOTIFY_WEBHOOK_URL" ] || return 0
  NOTIFY_TEXT="$1" node -e '
    const t = process.env.NOTIFY_TEXT
    fetch(process.env.NOTIFY_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: t, text: t, disable_web_page_preview: true }) })
      .then(async (r) => { if (!r.ok) console.error("[warn] notify HTTP " + r.status + ": " + (await r.text()).slice(0, 200)) })
      .catch((e) => console.error("[warn] notify failed: " + e.message))' || true
}

OUT="$(mktemp)"; trap 'rm -f "$OUT"' EXIT
STEP="startup"
on_error() {
  local code=$?
  log "FAILED during: $STEP (exit $code)"
  notify "❌ Portfolio stats job FAILED during: $STEP (exit $code)

$(tail -n 15 "$OUT" 2>/dev/null)

Log: ~/stats-cron.log on the VM"
  exit "$code"
}
trap on_error ERR

STEP="config check"
if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN is empty in .env" > "$OUT"; false
fi

# git wrapper: clears any configured credential helpers, then answers with the
# token from $GITHUB_TOKEN (single-quoted so the shell here doesn't expand it).
authgit() {
  git -c credential.helper= \
      -c 'credential.helper=!f() { echo username=x-access-token; echo "password=$GITHUB_TOKEN"; }; f' \
      "$@"
}

log "repo: $REPO_ROOT (branch $GIT_BRANCH)"

STEP="branch check"
current="$(git rev-parse --abbrev-ref HEAD)"
if [ "$current" != "$GIT_BRANCH" ]; then
  echo "checked out '$current', expected '$GIT_BRANCH'" > "$OUT"; false
fi

STEP="git pull --rebase"
log "$STEP"
authgit pull --rebase --quiet origin "$GIT_BRANCH" >"$OUT" 2>&1

STEP="npm run stats:update"
log "$STEP"
NOTIFY_DEFER=1 npm run --silent stats:update 2>&1 | tee "$OUT"
SUMMARY="$(grep -v "^\[warn\] skipping" "$OUT" || true)"

if git diff --quiet -- lib/generated/stats.json && \
   [ -z "$(git ls-files --others --exclude-standard -- lib/generated/stats.json)" ]; then
  log "stats.json unchanged, nothing to commit"
  notify "ℹ️ Portfolio: no changes today, nothing pushed.

$SUMMARY"
  exit 0
fi

STEP="git commit"
log "committing lib/generated/stats.json"
git add -- lib/generated/stats.json
git -c user.name="${GIT_AUTHOR_NAME:-vjymisal0}" \
    -c user.email="${GIT_AUTHOR_EMAIL:-misalvijay153@gmail.com}" \
    commit --quiet -m "chore(stats): daily npm + PR refresh" -- lib/generated/stats.json >"$OUT" 2>&1

STEP="git push"
log "pushing to origin/$GIT_BRANCH"
authgit push --quiet origin "HEAD:$GIT_BRANCH" >"$OUT" 2>&1
SHA="$(git rev-parse HEAD)"
log "done: ${SHA:0:7}"

REMOTE="$(git remote get-url origin | sed -e 's#\.git$##' -e 's#^git@github.com:#https://github.com/#')"
notify "✅ Portfolio updated and pushed. Vercel is deploying.
Commit: $REMOTE/commit/${SHA:0:7}

$SUMMARY"
