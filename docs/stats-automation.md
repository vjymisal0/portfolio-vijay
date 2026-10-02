# Stats automation (npm downloads + merged PRs)

A daily job refreshes `lib/generated/stats.json`, commits it, and pushes to
`master`. Netlify auto-deploys on push.

- `scripts/update-stats.mjs` (`npm run stats:update`) fetches:
  - npm last-month downloads for every package in `lib/data.ts`
  - your newly merged upstream PRs from the GitHub search API
  It only writes `stats.json` when something changed (ignoring `updatedAt`),
  so an unchanged day produces no commit.
- `scripts/update-stats.sh` runs `git pull --rebase`, then the script above.
  If `stats.json` changed, it commits only that file and pushes it.
- `lib/data.ts` merges the JSON in at build time. Hand-written entries are
  never rewritten by the script.

## 1. Create the GitHub token

GitHub → Settings → Developer settings → Personal access tokens →
**Fine-grained tokens** → Generate new token:

- Resource owner: `vjymisal0`
- Expiration: up to 1 year (set a reminder to rotate it)
- Repository access: **Only select repositories** → `portfolio-vijay`
- Repository permissions: **Contents: Read and write** (Metadata: Read-only
  is added automatically). Nothing else.

The token can also read public data, which is all the PR search and repo
language lookups need. The npm downloads API is public, so no npm token is
needed.

## 2. VM setup

```bash
# Node 20.12+ (for --env-file) and git
node -v && git --version

git clone https://github.com/vjymisal0/portfolio-vijay.git ~/portfolio-vijay
cd ~/portfolio-vijay
npm ci
cp .env.example .env && chmod 600 .env
nano .env          # paste GITHUB_TOKEN; adjust GIT_BRANCH / NOTIFY_WEBHOOK_URL if needed

npm run stats:update          # dry check: updates stats.json locally, no git
git checkout lib/generated/stats.json   # discard it if you don't want to keep it
bash scripts/update-stats.sh  # full run: pull, update, commit, push
```

Commits are authored as `vjymisal0 <misalvijay153@gmail.com>`. To override,
set `GIT_AUTHOR_NAME` / `GIT_AUTHOR_EMAIL` in the environment.

The token is passed to git through an inline credential helper that reads it
from the environment. It is never written to `.git/config`, never put on a
command line, and never logged. `.env` is git-ignored.

### NOTIFY_WEBHOOK_URL (optional)

`update-stats.sh` sends **one message per run**. It contains:
- whether stats.json was updated and pushed (with the commit link), or no
  change, or the failed step plus the last log lines
- total npm downloads with the change since the last run
- per-package downloads, with deltas
- the new PRs that were added

Running `npm run stats:update` on its own sends just the data summary.

The body is `{"content": "...", "text": "..."}`:
- Discord: a channel webhook URL (uses `content`).
- Slack: an incoming-webhook URL (uses `text`).
- Telegram: `https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>`
  (uses `text`). The URL contains the bot token, so keep it only in `.env`.

## 3a. Schedule with cron

`crontab -e`, then add this line for daily at 03:00 (server time):

```cron
0 3 * * * /bin/bash /home/ubuntu/portfolio-vijay/scripts/update-stats.sh >> $HOME/stats-cron.log 2>&1
```

The script adds the usual node paths and nvm itself. If node lives somewhere
else, add `PATH=...` above the line. Check the log with
`tail -n 30 ~/stats-cron.log`.

## 3b. Schedule with n8n (alternative)

Workflow: **Schedule Trigger** (daily 03:00) → **Execute Command** →
**IF** (exit code ≠ 0) → notification node (Telegram / email / Discord).

- Execute Command: `bash /home/ubuntu/portfolio-vijay/scripts/update-stats.sh 2>&1; echo "EXIT=$?"`
  - Turn on the node's *Continue On Fail* setting, or use the trailing echo,
    so a failure still reaches the IF node.
  - IF condition: `{{ $json.stdout }}` does not contain `EXIT=0`, or
    `{{ $json.exitCode }}` ≠ 0 when not using the echo.
  - Notification body: `{{ $json.stdout }}`.
- In n8n 2.x the Execute Command node is disabled by default. Enable it by
  removing `n8n-nodes-base.executeCommand` from `NODES_EXCLUDE`.
- **n8n in Docker:** the command runs *inside the container*, which has no
  repo, no git credentials, and a different node. Either:
  1. Mount the repo, e.g. `- /home/ubuntu/portfolio-vijay:/repos/portfolio-vijay`
     in `docker-compose.yml`, and use that path. The container still needs
     git, bash, and Node 20.12+; the stock n8n image is Alpine with node but
     without git. You may also need `git config --global --add safe.directory`
     because of differing UIDs. Or:
  2. (simpler) Use an **SSH** node pointed at the VM host (credentials stored
     in n8n) running the same `bash /home/ubuntu/portfolio-vijay/scripts/update-stats.sh`.
     The SSH node returns `code`/`stdout`, so branch on `code ≠ 0`.

## 4. Correcting an auto-added PR

Auto entries are guessed. `kind` comes from the conventional-commit prefix
(`fix` → fix, `feat` → feature, `test` → tests, `docs` → docs,
`chore`/`refactor`/`style`/`perf`/`build`/`ci` → cleanup; no prefix → keyword
guess, else cleanup). `techs` is the repo's primary language.

To fix one:
1. Copy the entry from `lib/generated/stats.json` into `handContributions` in
   `lib/data.ts`, in date order. Drop `"auto": true` and edit `kind`/`techs`/`title`.
2. Commit. Hand-written entries win over auto entries with the same `url`, and
   the next run removes the duplicate from `stats.json`.

There is no blocklist yet. A PR you don't want shown would need one, so ask
before adding it.

## Exit codes

- `0`: success, whether or not anything changed.
- non-zero: missing token, GitHub auth failure, search API error, or git
  failure. A single npm package failing is *not* fatal; it keeps its previous
  value and is listed in the summary.
