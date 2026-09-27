# Client-supplied source photography

Originals as received, unedited. **Nothing in this folder is referenced by the
site yet** — `content/assets.ts` still points at Unsplash placeholders.

These were supplied via WhatsApp on 2026-09-27 and renamed from
`WhatsApp Image 2026-09-27 at …` to web-safe filenames. Spaces in a filename
have to be percent-encoded once the file is served from `/public`, so the
originals' names were not kept.

| File | What it shows | Usable? |
| --- | --- | --- |
| `natarajasana-mandapa.jpeg` | Natarajasana in front of a stone mandapa, soft morning light | **Best of the set.** Clean composition, real setting. Carries a `REDMI 10 PRIME / TEAM CYSS` watermark bottom-left that must be cropped out. |
| `demo-forward-fold.jpeg` | Standing forward fold at a demonstration, on interlocking mats | Harsh midday light, cluttered background. ⚠ Third-party faces. |
| `demo-headstand.jpeg` | Headstand at the same demonstration | Harsh midday light, cluttered background. ⚠ Third-party faces. |
| `collage-arm-balances.jpeg` | **A collage of three separate photos**, not a single image | Cannot be used as-is. Would need splitting into three files first. |

## ⚠ Before publishing any of these

1. **Consent.** `demo-forward-fold` and `demo-headstand` show spectators and
   officials who are not the client. Publishing recognisable faces needs those
   people's permission, not just the client's. Crop them out or use
   `natarajasana-mandapa` instead.

2. **Nothing here is evidence of anything.** `collage-arm-balances` contains
   banners naming an institution and a date. That is text in a photograph — it
   is not a qualification, an affiliation or a location, and none of it has been
   written into `siteConfig` or any page. Do not infer from it. Only facts the
   client states directly should appear on the site.

3. **Grading.** All four were shot on a phone in hard light. They will fight the
   dark theme unless graded — duotone or a warm low-key treatment — which is
   planned as part of the texture phase.

## Adding one to the site

Keep originals in this folder untouched. Put the edited, cropped, web-sized
version in `public/images/` (the parent), then point the relevant entry in
`src/content/assets.ts` at `/images/<name>` and set `isPlaceholder: false`.
