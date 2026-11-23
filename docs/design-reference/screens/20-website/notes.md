# 20. The website, refined from the Nov 4 rebuild (home, About, pricing, privacy, terms)

Designed 2026-11-12 for Chris. The base is the Nov 4 rebuild (`docs/reference/current-site/`, the
flozit-site branch `site/rebuild`): its layout, its header and footer, its video hero with the portal
mock at the right, and its sections, refined onto the locked palette (option B light, option A dark),
the app's type and corners and Lucide icons, and restructured around the Value Equation. The research
behind it is `research.md`. `docs/reference/old-site/` was ignored on purpose.

Files: `index.html` (the home page), `site.css`, `media/` (the hero video, poster and two reserved
photos), `img/` (product screens cropped from the design renders), `credits.csv` (every clip and
photo with its source and licence). Renders at 1440 and 390 like the reference shots, light and dark,
motion on (the video playing, shot 2.5s in) and reduced motion: `index--desktop-1440--motion-on.png`
and so on. The three test headlines render at 1440 light as `index--desktop-1440--motion-on.png`
(headline C, the default), `index--a--…` and `index--b--…`; `?state=a|b` switches them in the file. Renders are dark only.

## Decisions (Chris, 2026-11-12, after the side-by-side)

- Dark for everyone: the site always shows option A's dark look; there is no light mode on the site.
- Headline C: For custom builders tired of chasing homeowners for selections and signatures.
- The wordmark is Red Hat Display 800 with the logo at its left, on the site and across the brand.
- An About page (`about.html`) with a tab in the header: A note from me, three promises, the final call.
- The slogan Make work flow sits under the wordmark in the footer and as the About eyebrow.
- The page was too wordy: cut by about a third (short headlines, one line per cost, three bullets per
  outcome, one paragraph per answer). The sections and their order are unchanged.

## The home page, in the Value Equation order

1. **Hero (Nov 4 video hero kept).** Eyebrow: For custom builders building 4 to 10 homes a year.
   Headline C is the default since 2026-11-12. A: Custom builders: your buyers pick, sign and stay on schedule. Flozit does the
   chasing. B: Selections in on time. Change orders signed from their phone. Move-in on schedule. C: For
   custom builders tired of chasing homeowners for selections and signatures. One line on how (one
   page per home with your name on it; picks, signatures and the weekly update from their phone), one
   main button (Request beta access, with the line [CONFIRM] reply within one business day) and a
   quiet second one (See how it works, Three steps, two minutes to read). The portal mock at the right
   as on Nov 4, on the palette.
2. **The three-fact band** under the hero: [CONFIRM] per month, every home included; [CONFIRM
   GUARANTEE]; Homeowners need no app and no password. Three columns on a computer, three short lines
   on a phone.
3. **The cost of chasing.** Three concrete costs, no statistics: the late tile pick that holds the
   crew and every trade behind them; the unsigned change order you can't bill and the closing you
   can't promise; the photo texted at nine at night, an evening given to a job that was done for the
   day.
4. **What changes.** Three before-and-after pairs, each with a real product screen on a phone: the
   pick page, a change order signed from the phone, the homeowner's home page with this week on site.
5. **How it works (likelihood).** Three steps with a real screen each (setup step 1, add a homeowner,
   Needs You), then a labelled spot for the product walkthrough video (two to three minutes, to be
   recorded), then three labelled, empty quote spots. No quote is written until it is real.
6. **How soon (time delay).** Day one ([CONFIRM] minutes for the first home), the first decision, the
   first Friday ([CONFIRM] builders in the beta saw this in their first week).
7. **What you stop doing (effort).** Reminders, the app walkthrough, the Friday update, and the
   evenings: the question that used to arrive at nine at night has an answer before it is asked.
8. **What you get (the offer stack).** Four outcomes, each with the features that deliver it listed
   under it: selections picked on time; change orders signed from their phone; homeowners who stop
   texting you for updates; move-in on the date promised.
9. **The beta.** [CONFIRM GUARANTEE] and [CONFIRM BETA SPOTS] in labelled slots, no deadline, no
   scarcity line; Request beta access with its line.
10. **Before you ask.** My homeowners won't use another app; I already use Buildertrend; I don't have
    time to set it up; What does it cost ([CONFIRM]).
11. **The final call** repeats headline A with one button and its line.

## The video hero

`<video muted loop playsinline autoplay preload="metadata" poster>` with the webm and mp4 sources
from Nov 4 (Pexels 6473925, 12 seconds, 541 KB and 369 KB; the poster is 43 KB and shows at once,
also as an `<img>` under the video so the frame is never blank). One pause button, bottom right,
44px, which becomes Play. A dark gradient overlay (62% at the left, lighter at the right) so the white
copy passes AA over any frame. Under `prefers-reduced-motion: reduce` the video and the button are
not shown and the poster stays. Unlike Nov 4, the loop also plays on phones; the file is small enough.

## Type and readability

Inter, 17px body on every width, 1.55 line height, no line wider than 70 characters (`--measure`),
headings balanced, one idea per section, 96px between sections on a computer and 64px on a phone.
No popups, no chat bubble, no carousel, no cookie banner (the site sets no cookies; see research.md).
Motion: one 600ms rise on the hero copy and the mock, the hero loop, and the FAQ chevron; all off under
reduced motion.

## Copy rules checked

Every sentence read once: no quotation marks anywhere (the generator checks), no it's-not-A-it's-B
lines (checked), no numbers that are not real or a [CONFIRM] placeholder, no wording lifted from the
eight sites studied. Every button has a line under it saying what happens next.

## Removed or merged from Nov 4

- What it replaces became The cost of chasing (same slot, concrete costs instead of a crossed-out list).
- The six-part features grid became the offer stack: the same parts, filed under the outcome each one
  delivers, with 3D walkthrough and builder-wide export left out until they ship.
- A note from me moved out of the home page for now (the founder line stays in the final call's
  neighbourhood only as the Johnson City line in the hero); it returns on the about page.
- The beta form became a button with a line and a mailto, as the Nov 4 site's Join the beta did; the
  form is a separate decision.
- Gold eyebrows, the yellow wordmark and the navy plate are gone (palette); corners are 12px and 10px.

## Pricing, privacy, terms and the beta button (Chris, 2026-11-12, after the approval)

- **Approved as they stand:** the home page (headline C, dark) and the About page. Dark only is intended.
- **Pricing** (`pricing.html`), in the Value Equation order: the outcome line first, then What you
  get (the same four outcomes and their parts as the home page), then the price: Free during the beta
  with [CONFIRM BETA SPOTS], and after the beta [CONFIRM] a month with [CONFIRM GUARANTEE] and a
  [CONFIRM] beta-price promise; three questions; the final call.
- **Privacy and terms** (`privacy.html`, `terms.html`): the frame only, restyled onto the dark site
  frame: the title, a Last updated [CONFIRM DATE] line, a section list at the left (a wrapping row on
  a phone) and one labelled placeholder block per section. The real text comes later in one pass with
  the website copy. Sections: privacy has nine, terms has ten.
- **Beta sign-up:** no separate website page and no mailto. Every Request beta access button links to
  the app's own beta sign-up (`https://app.flozit.com/sign-up`, the 19-redesign sign-in area's 95:
  email, a code, then the beta list check), with the line under it: Your email, a code, then the beta
  list check. [CONFIRM] reply within one business day.
- Renders for every page at 1440 and 390, dark; the home page also with reduced motion and the two
  other headlines.

## The live beta spots counter (Chris, 2026-11-12)

A small chip beside every Request beta access button (header, hero, The beta, the final call, pricing):
a dot and one line, 7 of 10 beta spots left. The number is live from the app; the design files show
7, 3 and 0 as examples. Three states, all dark, desktop 1440 and phone 390:

- **Spots left** (`index.html`, `pricing.html`): grey chip, green dot, 7 of 10 beta spots left.
- **Last spots** (`?state=last`, 3 or fewer): the chip takes the accent tint and the accent dot, the
  text goes to 600. No red, no timer, no deadline. 3 of 10 beta spots left.
- **Full** (`?state=full`): the button reads Beta is full and is the secondary style, linking to
  mailto:support@flozit.com; the chip reads All 10 beta spots are taken; the line under it reads Email
  support@flozit.com and you are first in line for the next round.
- **No count** (`?state=nocount`, the count failed to load): the chip is simply absent. The button and
  its line stand alone and the layout is complete without it: the chip is an inline element after the
  button, so nothing shifts and nothing is reserved for it.

On a computer the chip sits to the right of the button (`.btn-row`); the header carries a smaller
28px chip and hides it on a phone. On a phone the button is full width and the chip centres under it,
above the what-happens-next line. The rules are the `.spots` block at the end of `site.css`. Renders:
`index[--last|--full|--nocount]--…` and the same for `pricing`.

## Open questions for Chris

- The [CONFIRM] values: price, guarantee, beta spots, reply time, setup minutes, first-week builders.
- The privacy and terms text, with the website copy pass.

## Copy pass (Chris approved, 2026-11-18)

The home page copy is rewritten around the pain and what Flozit does about it. The same wording is applied on About and Pricing.

- Hero headline: Stop chasing homeowners for picks and signatures. Headlines a and b stay as test variants.
- Line under every Request beta access button: Your email, a code, then a password. You're in. Sign-up is open, capped at 10 spots, so the beta list check is gone.
- Price: Free during the beta. After the beta, [CONFIRM] per month.
  - Every home included now shows only where it is marked [CONFIRM]: the pricing card, the pricing FAQ and the flat amount line.
- What chasing costs you: four costs instead of three.
- What changes: four solutions, each with a real screen (pick, sign, homeowner home, Needs You), plus the late selection fee tip.
- New scope band after How it works: The beta covers the homeowner side of the job, from selections to close-out. Next up: estimates, budgets and warranty.
- Weekly update, everywhere: A weekly update drafted from your daily logs, on the day you choose. Nothing sends until you approve it. Friday is gone.
- Reminders no longer say they come from your own Gmail, because Gmail is optional.
  - How it works step 3 now says under your name and business.
  - About's No tracking card now says Homeowner emails go out under your name and business.
- Two new FAQs:
  - Where do homeowner replies go?
  - Do I need to connect Gmail?
- Result line above the closing: Selections in on time. Changes signed before the work. Move-in on the date promised.
- Closing headline: Your homeowners pick, sign and stay on schedule. This is on all three pages.
- Fixes:
  - Pricing showed the raw text {beta_cta()} in the beta card. It is now the real button, spots chip and next-step line.
  - The 1px sideways scroll at 390 came from the phone header. Fixed, and checked on all five pages at 390.
- Renders, all dark at 1440 and 390:
  - Every page in the default, last, full and nocount states.
  - Headlines a and b on the home page.
  - Reduced motion on the home page.
- Still open: the product screens in img/ were cropped before the change order wording. home-phone.png still reads Sign the change, and sign-phone.png reads A change from Mark. They need re-cropping from the current renders.
