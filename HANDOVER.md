# Divine Comics — Project Handover

_Last updated: 2026-09-03_

Everything you need to pick this up from a different laptop / another Claude Code session.

---

## Live everything

| What | URL |
|---|---|
| Live site | https://divine-comics.vercel.app |
| GitHub repo | https://github.com/Ayushx-11/divine-comics |
| Vercel project | `divine-comics` (piyushs-projects-5f310246) |
| Latest commit | `e6acc49` — "Footer tagline: India's Leading Comics Magazine" |

The source of truth is GitHub. The local working folder is disposable — a `git clone` reproduces it exactly.

---

## What this project is

A **static multi-page marketing/pre-order site** for **Divine Comics** (imprint of Comics Today), pitching *Shatrubodh — Six Lives, One Empire on the Edge*.

- Pure HTML / CSS / JS — **no build step, no bundler, no framework**.
- 5 pages: `index.html` (home), `characters.html`, `comics.html`, `shop.html`, `about.html`.
- Deploys to Vercel as a static site (no `package.json`, no serverless functions).

Design language:
- Cream ivory ground (`#f5efe3`-ish), deep ink typography, single accent red for the Divine Comics flag mark.
- **Dual-logo header** on every page: `COMICS TODAY` wordmark + thin divider + Divine Comics flag mark.
- **Rich footer banner** with the tagline **"India's Leading Comics Magazine"** and the line _"Stories carved in grit, blood, and legacy."_ over a subtle red glow, followed by a 4-column footer (Brand · Explore · Contact · Support us).

---

## Setup on a new laptop

Prereqs: Git, Node (any recent LTS), Vercel CLI (`npm i -g vercel`), a browser.

```bash
# 1. Clone
git clone https://github.com/Ayushx-11/divine-comics.git
cd divine-comics

# 2. Preview locally (any static server works — pick one)
npx serve .          # opens on http://localhost:3000
# or
python -m http.server 5180

# 3. Link the local folder to the existing Vercel project
vercel link
#   Select scope: piyushs-projects-5f310246
#   Link to existing project? Yes
#   Project name: divine-comics
```

Vercel CLI login: `vercel login` — pick GitHub, authorize the account that owns `Ayushx-11/divine-comics` and the Vercel project.

Git identity (only needed once per fresh clone, otherwise commits fail with "unable to auto-detect email"):

```bash
git config user.name  "Divine Comics"
git config user.email "divine@comicstoday.in"
```

---

## Deploy flow

```bash
# make changes, then:
git add -A
git commit -m "your message"
git push

# deploy the same code to production:
vercel deploy --prod --yes
```

Vercel is **not** wired to auto-deploy on push in this setup — deployments are triggered manually with `vercel deploy --prod --yes`. Expect ~10s deploys (it's static). The `Aliased:` line in the output confirms `divine-comics.vercel.app` is pointing at the new deployment.

---

## What shipped in the last session (5 commits, newest first)

1. `e6acc49` — Footer tagline: **India's Leading Comics Magazine** (was "A Divine Comics Publication")
2. `a1ac14b` — **Dual-logo header** (Comics Today + Divine flag) + **redesigned footer** with brand banner
3. `77fbdbc` — Fix mobile hero: image visible, type scales, no horizontal overflow
4. `f12e9cf` — Add `COMICS TODAY` header logo + split-stage cinematic hero
5. `968a250` — Lighten palette to cream + split monolith into 5-page site

All applied across every page (index, characters, comics, shop, about).

---

## Known state / open items

- **No auto-deploy on push.** If you push to GitHub, you still need `vercel deploy --prod --yes` to push it live. If you want CI-style auto-deploy, connect the GitHub repo to the Vercel project in the Vercel dashboard.
- **Browser cache** bites often — after every deploy do `Ctrl + Shift + R` (or check in an incognito window) before deciding the change didn't land.
- **Divine Comics flag mark** currently uses `images/logo.jpg`. If replaced, keep the same filename or update all 5 pages.
- **UPI QR / pre-order links** in the footer should be reviewed before any public launch — they were placed as part of the redesign; confirm the QR image and destination.
- **Git line-endings** warn `LF → CRLF` on Windows every commit — cosmetic, safe to ignore. To silence, `git config core.autocrlf true`.

Nothing is currently in-progress. Working tree was clean at handover time.

---

## Notes for the next Claude Code session

- Working folder on a new machine will be wherever you cloned to (e.g. `~/dev/divine-comics`). Not the Newsletter folder.
- The site has **no `package.json`** and no build — do not try to `npm run build` or `npm install`. Any static file server works for preview.
- If you're asked to "preview it," use `npx serve .` or the equivalent — the Claude Code preview tool config in the original `Newsletter/.claude/launch.json` was for that separate workspace, not this repo.
- The Comics Today parent brand's own site + rules live in a **separate** repo (`comics-today-app`, Next.js + Supabase — see the Newsletter memory index). This Divine Comics site is standalone and unrelated to that codebase.
- Style tokens and layout live inline in each page and in the site's stylesheet — no design system package. Changes to shared bits (header, footer) need to be repeated across all 5 pages, or refactored to a shared partial if the site grows.

---

## If something looks wrong on the new laptop

1. `git status` — should be clean, on `main`, up to date with `origin/main`.
2. `git log --oneline -5` — top line should be `e6acc49 Footer tagline: India's Leading Comics Magazine` (or newer).
3. `curl -s https://divine-comics.vercel.app | grep footer__banner-tag` — should return the "India's Leading Comics Magazine" tag line.
4. If the live site differs from local: run `vercel deploy --prod --yes` from the repo root, wait for `Aliased:`, then hard-refresh the browser.
