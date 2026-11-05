# flozit.com

The Flozit website: plain HTML and one stylesheet, served as-is by GitHub Pages from
`main`. There is no build step and no framework. Self-hosted fonts (`fonts/`, SIL Open
Font License). No trackers, analytics, cookies or outside scripts, and no forms: "Join
the beta" is a mailto link to support@flozit.com.

## Files

- `index.html`, `pricing/`, `privacy/`, `terms/`: the pages. Edit them by hand.
- `hero.js`: starts the hero background video after the page has loaded. Never on a phone, with
  reduced motion, or with Save-Data on; those visitors keep the poster. Runs nothing else.
- `media/`: the hero video (WebM and MP4), the poster and the photos, each as WebP and JPEG.
  Sources and credits: `docs/design/website-photos/` in the app repo (`credits.csv`). Resized copies only.
- `site.css`: the site's layout. Colours, sizes, spacing and corners come only from
  `tokens.css`; never write a raw colour in `site.css`.
- `tokens.css`, `tokens-dark.css` and `tokens.lock`: a copy of the Flozit app's design tokens, the
  dark-mode block of it as a `.theme-dark` class (the hero uses it), and the lock. Do not edit them by
  hand; `scripts/sync_tokens.py` writes all three.
- `about/`, `help/`, `faq/`, `early-access/`, `your-data/`: small redirect pages (meta
  refresh, canonical link and a plain link) for the old addresses. GitHub Pages has no
  server redirects.
- `img/`, `site.webmanifest`, `sitemap.xml`, `404.html`, `CNAME`.

## Deploy

Pushing to `main` publishes the site at once. Work on a branch, look at it locally
(for example `python -m http.server` in this folder), and merge to `main` only when
the page is ready to go live. The repo is public: never commit a secret.

## Sync the design tokens

The tokens live in the private app repo (`flozit/web/static/tokens.css`). To update the copy:

```
python scripts/sync_tokens.py [path to the app's tokens.css]
```

This copies the file to `tokens.css` and writes `tokens.lock` (source path, source commit,
SHA-256). Commit both. `python scripts/sync_tokens.py --check` fails if `tokens.css` was
edited by hand, or, when the app file exists on this machine, if the app's tokens have
changed since the last sync. A GitHub Action runs the lock check on every push; it cannot
see the private repo, so it checks the lock only. The default source path is in the
script.
