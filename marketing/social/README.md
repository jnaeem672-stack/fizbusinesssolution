# FIZBS social media playbook (Facebook via Metricool)

This folder holds one JSON file per week of posts, plus `render.mjs`, which draws the post images.
Images are published on the website at `public/social/<week>/<slug>.jpg`, so Metricool can fetch them by URL.

## Where posts go

- Network: **Facebook only** for now (page "fis business solution", Metricool brand id `7347569`).
  Instagram @fisbusiness992 is not connected yet; do not add Instagram until the owner connects it.
- Time: **22:00 Asia/Karachi** (20:00 Saudi, 18:00 UK in summer time).
- Volume: **5 posts a week, Monday to Friday**. The Metricool free plan allows about 20 scheduled posts a month.
  If Metricool returns a plan or limit error, stop and report it; do not delete existing posts to make room.

## Google Business Profile (one update a week)

- Every **Wednesday at 16:00 Asia/Karachi**, schedule one Google Business Profile text update in Metricool:
  providers `[{"network":"gmb"}]`, `gmbData: {"type":"publication"}`, no media needed, text up to 1,500 characters.
- Do **not** put phone numbers in Google Business Profile text; point people to the website instead.
- Use a different topic each week (a service, the price calculator, a free guide, the samples page, the PhD guide).

## Weekly analytics report (read only)

Before preparing posts, pull the last 7 days from Metricool `getAnalyticsDataByMetrics` (brand `7347569`):
- Google Ads: totals `GAEV01` impressions, `GAEV02` spent, `GAEV03` clicks, `GAEV04` conversions; campaigns `GACA01,GACA03,GACA04,GACA05,GACA07,GACA09,GACA10`;
  keywords `GAKW02,GAKW03,GAKW04,GAKW05,GAKW07,GAKW09,GAKW10,GAKW12`.
- Google Business Profile: `GMEV18` search reach, `GMEV19` maps reach, `GMEV21` website clicks, `GMEV22` call clicks, `GMEV25` messages; search keywords `GMKW01,GMKW02`.
- Facebook: `FBEV17` followers, `FBEV47` followers gained, `FBEV12` post impressions, `FBEV10` interactions.

Write a short report: what changed versus the previous week, top keywords by spend, keywords that spend but bring no conversions,
the words people search to find the Business Profile, Facebook growth, and 3 practical recommendations.
**Never change anything in Google Ads** (campaigns, budgets, bids, keywords, negatives, conversion settings). Recommendations only;
the owner makes Google Ads changes himself. If Metricool has no data yet, say so instead of guessing.

## Weekly content mix (rotate, do not repeat a topic used in the last 4 week files)

1. Monday: a study tip taken from one of the website's blog guides (`src/content/blog/*.ts`), linking to that guide.
2. Tuesday: a service spotlight (one service page from `src/content/landing/`), linking to that page.
3. Wednesday: an offer or "how it works" post (prices, 50/50 payment, first-order discount, WhatsApp).
4. Thursday: a postgraduate topic (research proposals, PhD admission, supervisor emails), linking to the related page or guide.
5. Friday: an **Arabic** post for Saudi students (RTL design, `ar: true`), linking to `fizbusinessolutions.com/ar` or an `/ar/...` page.

## Facts you may use (nothing else)

- FIZ Business Solutions (FIZBS), helping students since 2015; 10,000+ students supported; 350+ research projects; 115+ subjects.
- Experts are Master's and PhD qualified.
- Prices (for 7+ day deadlines): assignments and essays £20 per 1,000 words; dissertations £30 per 1,000 words, maximum £350;
  proofreading £12 (undergraduate), £15 (postgraduate), £18 (PhD) per 1,000 words. Urgent: +25% for 3 to 6 days, +50% within 48 hours.
- 10% off the first order. Volume discounts: 10% for 8,000+ words, 15% for 15,000+ words (discounts do not stack).
- Payment: 50% to start and 50% on completion, by UK bank transfer (GBP) or Saudi bank transfer (SAR).
- WhatsApp: +971 54 380 0388. Website: fizbusinessolutions.com.
- PhD packages: £120, £250, £450.
- Dates, deadlines and university details only if they are already on the website's PhD page, with "check the official page".

## Rules (must follow)

- No fake reviews, testimonials, ratings, statistics or claims. No guarantees of grades or results.
- Never say "plagiarism-free", "zero AI", "AI-free", "free revisions", "100% original" or similar.
- Do not use the words "coaching" or "ethical". Do not use em dashes or en dashes.
- Do not post student results or grade screenshots until the owner confirms the students' consent.
- Keep captions friendly and short (60 to 120 words), end with the website link and WhatsApp, then 5 to 8 hashtags.
- Only add files under `public/social/` and `marketing/social/`. Never change website code.

## Steps for a new week

1. Read the previous week files in this folder to avoid repeating topics. Check Metricool `getScheduledPosts`
   for brand `7347569` for the target week; if posts already exist for a day, skip that day.
2. Create `marketing/social/<YYYY-MM>-<DD>-week.json` (copy the structure of `2026-10-week1.json`): for each post set
   `date`, `slug`, `caption`, `image` (`https://fizbusinessolutions.com/social/<week-folder>/<slug>.jpg`) and `design`.
3. Render the images:
   ```bash
   mkdir -p /tmp/social && cd /tmp/social && npm init -y >/dev/null
   npm install playwright@1.56 @fontsource/cairo@5.0.18 --silent   # Chromium is preinstalled at /opt/pw-browsers
   node <repo>/marketing/social/render.mjs <repo>/marketing/social/<week>.json <repo>/public/social/<week-folder>
   ```
   Fix any post that prints "WARNING: content too long". Look at every image before publishing.
4. Commit and push only the new files (`git add public/social marketing/social`), with the repo's usual author
   (`jnaeem672-stack <jnaeem672@gmail.com>`). Hostinger deploys in a few minutes.
5. Schedule each post with Metricool `createScheduledPost` (blogId `7347569`, providers `[{"network":"facebook"}]`,
   `facebookData: {"type":"POST"}`, `autoPublish: true`, the image URL in `media`, alt text in `mediaAltText`).
   If the image is not live yet, wait 3 minutes and try again.
6. Save the Metricool `id` and `uuid` of each post in the week file, commit and push.
