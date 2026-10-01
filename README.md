# flozit.com

The Flozit website: plain HTML, one stylesheet, self-hosted fonts. No trackers,
analytics, cookies or outside scripts.

The pages are built by the generator in Flozit's private code repo,
`tools/site/build.py` (checked out next to this repo). This repo holds pages
only. The generator reads `variants.json` here and
the policy text from the code repo's `docs/` (privacy and your-data pages, text
unchanged).

## Build

From the code repo, with its generator branch checked out (`site/generator`
until it is merged):

```
py -3 tools/site/build.py
```

This rewrites `index.html` (variant a), `b/index.html` (and any other
variant), `privacy/`, `your-data/` and `early-access/`. Edit `style.css`
directly; the build does not touch it.

## Create a variant

1. In `variants.json`, copy the `"a"` block and give it a new short name in
   lowercase letters or digits, for example `"c"`.
2. Change what the test is about: `headline`, `subline`, `cta_label`,
   `cta_scale` (button size: 1.0 is normal, 1.1 is ten percent larger) or the
   order of `sections` (`how`, `get`, `control`, `gmail`, `band`; the hero
   always comes first).
3. Build. The variant appears at `/c/`, with `noindex` and a canonical link to
   the home page, so search engines only ever see `/`.
4. Send that variant's traffic to `https://flozit.com/c/` (an ad, an email
   link). The home page `/` is always the default (`"default"` in
   `variants.json`).

## Read the results

Every "Get early access" button carries its variant (`early-access/?v=c`), and
the early-access page puts it in the email subject:

- variant a: `Flozit early access`
- any other variant: `Flozit early access (c)`

To count, search the support mailbox for each subject, for example
`subject:"Flozit early access (c)"`, and compare with how many visitors you sent
to each version. Someone who edits the subject, or writes to
support@flozit.com directly, is not counted.

## Switch to sign-up later

In `variants.json`, set `cta.href` to `https://app.flozit.com/signup` (and
`cta_label` to `Get started` in each variant), then build. Every button then
links to `https://app.flozit.com/signup?v=<variant>`. That one setting is the
only change.

## Photo

`images/agent.webp`: a square WebP under 150 KB. It shows square on desktop and
4:3 on phones, framed from the top.
