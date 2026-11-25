# Putting site/rebuild live on flozit.com

Written 2026-11-23 as a plan only. Nothing in it has been done. flozit.com goes live only
after Chris's phone check and typed OK.

## Where the site is hosted

- **Host:** GitHub Pages, from the public repo `TaskRogue/flozit-site`, branch `main`, root
  folder. There is no build step: the files in `main` are the site. Pushing to `main` publishes
  within a minute or two.
- **Domain:** `flozit.com`, set by the `CNAME` file at the repo root (it reads `flozit.com`) and
  by the Custom domain field in the repo's Settings, Pages. The DNS records at the registrar
  already point `flozit.com` at GitHub Pages. Going live changes no DNS and no Pages setting.
- **The app** is separate: `app.flozit.com`, hosted on Railway from the private app repo. The
  website only links to it (the beta buttons) and reads one endpoint from it (the spots counter).
- **Jekyll:** GitHub Pages runs Jekyll on the repo. The pages need nothing from it; `_config.yml`
  at the root only lists what to keep out of the published site (`README.md`, `docs/`, `scripts/`,
  `tokens.lock`), and Jekyll skips dot and underscore paths by itself. Never add a `.nojekyll`
  file: it would switch the exclusions off and publish those files.
- **Checks on push:** one GitHub Action, `.github/workflows/tokens.yml`, runs
  `scripts/sync_tokens.py --check` on every push. It only confirms `tokens.css` matches
  `tokens.lock`; it does not deploy and does not block Pages.

## What changes when site/rebuild is merged

`site/rebuild` is 20 commits ahead of `main` and touches 68 files: 54 added, 10 changed, 4 removed.

- **Replaced:** the home page, the privacy and terms pages, the README.
- **New pages:** `/about/`, `/pricing/`, `404.html`.
- **Old addresses now redirect** (meta refresh, with a canonical link and a plain link,
  because Pages has no server redirects): `/help/` and `/faq/` to the home page (FAQ to `/#faq`),
  `/early-access/` to `/#beta`, `/your-data/` to `/privacy/#privacy-7`.
- **Removed:** the `/b/` headline variant, `variants.json`, `style.css`, `images/agent.webp`.
- **New assets:** `site.css`, `site-tokens.css`, `tokens.css`, `tokens-dark.css`, `tokens.lock`,
  `hero.js`, `spots.js`, `menu.js`, `site.webmanifest`, `sitemap.xml`, the fonts under `fonts/`,
  the hero video, poster, photos and product screens under `media/`, the icons under `img/`.
- **Outside links the new site depends on:** every Request beta access button goes to
  `https://app.flozit.com/sign-up`. The spots chip reads `GET https://app.flozit.com/beta/spots`
  and expects `{"cap": 10, "remaining": n}` with CORS allowing `https://flozit.com`. If either is
  missing the site still works: the button is an ordinary link, and the chip stays hidden.

## Before merging

1. Chris's phone check on the branch preview and the typed OK. The preview is the branch served
   locally (`python -m http.server` in the repo folder) or any static host of the branch; GitHub
   Pages serves only `main`.
2. On `site/rebuild`, confirm the tokens lock passes: `python scripts/sync_tokens.py --check`.
3. Confirm the app side is ready, from a browser:
   - `https://app.flozit.com/sign-up` opens the beta sign-up (on 2026-11-23 it returned 404).
   - `https://app.flozit.com/beta/spots` returns the JSON above with the CORS header for
     `https://flozit.com` (on 2026-11-23 it returned 404).
   The site can go live before these exist, since both fail safe, but the beta button would land
   on a 404 page.
4. Confirm the remaining `[CONFIRM]` placeholders are either filled in or accepted as they stand:
   price per month and the guarantee. (The mailing address was filled in and the setup-minutes
   line removed on 2026-11-25.) They show in the warning colour on the live site until replaced.
5. Note the commit `main` is on now, for the rollback: `git rev-parse main` (4368048 on
   2026-11-23).

## Going live

All of this is done by Chris or with Chris's typed OK, never by the website session on its own.

1. Fetch and merge, keeping the branch history so one commit can undo it:
   ```
   git fetch origin main site/rebuild
   git checkout main
   git merge --no-ff site/rebuild -m "Go live: the rebuilt flozit.com from site/rebuild"
   git push origin main
   ```
   Or open a pull request from `site/rebuild` into `main` on GitHub and merge it with a merge
   commit (not squash, not rebase), which is the same thing with a record.
2. Watch the Pages build: the repo's Actions tab shows a `pages build and deployment` run. It
   normally finishes in one to three minutes. Settings, Pages shows the live address and a
   green check once it is up.
3. Check the live site, in a private window so nothing is cached:
   - `https://flozit.com/`, `/about/`, `/pricing/`, `/privacy/`, `/terms/` load, dark, with the
     Inter and Red Hat Display fonts (no fallback font in the wordmark).
   - `/help/`, `/faq/`, `/early-access/`, `/your-data/` land on the new pages.
   - A made-up address shows the Flozit 404 page.
   - The files `_config.yml` keeps out of the site all return 404, not their contents:
     `https://flozit.com/README.md`, `https://flozit.com/docs/go-live.md`,
     `https://flozit.com/scripts/sync_tokens.py`, `https://flozit.com/tokens.lock`, and the dot
     folders Jekyll skips on its own, `https://flozit.com/.github/workflows/tokens.yml` and
     `https://flozit.com/.claude/agents/ui-reviewer.md`. If any of them opens, the Pages build
     ignored `_config.yml`; check that no `.nojekyll` file was added (never add one).
   - The hero video plays on a computer and stays a still image on a phone.
   - The spots chip shows a count, or nothing, never a placeholder number.
   - A Request beta access button opens the app's sign-up.
   - The browser's address bar shows the lock; HTTPS is enforced in Settings, Pages.
4. GitHub Pages sends `Cache-Control: max-age=600`, so a visitor who had the old site open can
   see it for up to ten minutes after the merge. That is normal; wait rather than re-push.
5. Afterwards: tag the release (`git tag site-2026-11-23 main && git push origin site-2026-11-23`),
   and delete `site/rebuild` only once the tag exists.

## Rolling back

If something is wrong on the live site, undo the merge rather than editing live:

1. Revert the merge commit on `main`. This keeps history and restores every file to what it was:
   ```
   git fetch origin main
   git checkout main
   git revert -m 1 <merge commit sha>
   git push origin main
   ```
   Pages rebuilds in one to three minutes and the old site is back. The DNS, the custom domain
   and HTTPS are untouched, so nothing else needs doing.
2. If the merge was a fast-forward with no merge commit, reset instead to the commit noted
   before merging, then force-push `main` only with Chris's OK:
   `git reset --hard 4368048 && git push --force-with-lease origin main`.
3. If only one thing is wrong (a link, a word), fix it on `site/rebuild`, check it, and merge
   again with the same steps. Never edit `main` directly.
4. If GitHub Pages itself fails to build (a red run in Actions), the previous deployment stays
   live until a build succeeds, so a bad push does not take the site down. Fix the build, or
   revert as in step 1.

## What is not part of going live

- Nothing in the app repo changes. The sign-up page and the spots endpoint are the app's work.
- No DNS, registrar, or Pages setting changes.
- No analytics or cookies are added; the site sets none.
