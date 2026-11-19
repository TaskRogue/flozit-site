# flozit.com

The Flozit website: plain HTML and one stylesheet, served as-is by GitHub Pages from
`main`. There is no build step and no framework. Self-hosted fonts (`fonts/`, SIL Open
Font License). No trackers, analytics, cookies or outside scripts. The pages are built from
Claude Design's 20-website (`docs/design/screens/20-website/` in the app repo) and are dark
for everyone (`<html class="theme-dark">`). Every Request beta access button links to the
app's sign-up, https://app.flozit.com/sign-up.

## Files

- `index.html`, `about/`, `pricing/`, `privacy/`, `terms/`: the pages. Edit them by hand. The
  header, footer and beta button are repeated on every page; change them on all five.
- `hero.js`: starts the hero background video after the page has loaded. Never on a phone, upright or sideways, or a tablet, with
  reduced motion, or with Save-Data on; those visitors keep the poster (Chris, 2026-11-19). The `<video>` has no sources in the
  HTML and `preload="none"`; `hero.js` adds them only when it may play, so a phone never downloads the video file. `site.css`
  also hides the video and its pause button at 560px and under and on touch screens, and a desktop video pauses when the
  window narrows to that size. Runs nothing else.
- `fonts/red-hat-display/`: Red Hat Display, the wordmark's font (and the mock's HC plate), SIL OFL (`OFL.txt` beside it).
  Taken from the official Google Fonts repository (github.com/google/fonts, `ofl/redhatdisplay/RedHatDisplay[wght].ttf`,
  commit 105f8a8f), fixed at weight 800 and subset to the letters F l o z i t H C with kerning, as WOFF2 (1,160 bytes).
  The `@font-face` in `site.css` has a matching `unicode-range`, so any other letter falls back to Inter. If the design sets
  more text in Red Hat Display, subset again from the same source with the new letters. Data only: nothing runs from it.
- `spots.js`: the live beta spots counter beside every Request beta access button. One GET to
  https://app.flozit.com/beta/spots (`{"cap": 10, "remaining": n}`, CORS for https://flozit.com
  only, no cookies sent) sets `html[data-beta]` to open, last (3 or fewer) or full (0: the button
  reads Beta is full and links to support@flozit.com). A failed, slow (over 3 seconds) or odd
  answer shows nothing, never a made-up number.
- `media/`: the hero video (WebM and MP4), the poster and the photos, each as WebP and JPEG.
  Sources and credits: `docs/design/website-photos/` and `docs/design/screens/20-website/credits.csv`
  in the app repo. Resized copies only. `media/screens/`: the product screens, as cropped by Claude
  Design (20-website `img/`); they are recaptured from the app, not edited here.
- `site.css`: the site's layout, copied from the design's stylesheet. Colours come only from
  tokens; never write a raw colour in `site.css`. Small sizes and spacings inside components
  (chips, the mock, the phone frame) are the design's own pixel values.
- `site-tokens.css`: the design's names for the tokens (`--page`, `--ink`, `--accent`, ...), each
  pointing at a `tokens.css` value, plus the website-only values the app has no token for: the
  hero's colours and overlays over the video, the mock's photo tiles, the shadows, and the two
  large section spacings (64px and 96px). Edited by hand.
- `menu.js`: closes the phone menu when a link in it is tapped, on Escape and on a tap outside.
  The menu works without it.
- `tokens.css`, `tokens-dark.css` and `tokens.lock`: a copy of the Flozit app's design tokens, the
  dark-mode block of it as a `.theme-dark` class (every page uses it), and the lock. Do not edit them by
  hand; `scripts/sync_tokens.py` writes all three.
- `help/`, `faq/`, `early-access/`, `your-data/`: small redirect pages (meta
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
