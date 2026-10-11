# Lighthouse

A barebones Tackl site scores **100 in every Lighthouse category**. CI holds it there: every push and PR runs [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) against the production build, and the build fails if any category drops below 100. A regression shows up in the PR that caused it.

## Run it locally

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000 bun run lighthouse
```

This builds the app, serves it, audits `/` three times on the desktop preset, and fails if the best run scores below 100 in any category.

- **Why set `NEXT_PUBLIC_SITE_URL`?** Without it the site is deliberately `noindex` (see `src/config.ts`), so the SEO check fails. That's exactly why deploy previews show SEO 63, and it's expected there.
- **Report links** are printed at the end of the run. They point to temporary public storage and expire after 7 days.

## The rules

They live in [`lighthouserc.js`](../lighthouserc.js):

| Category | Rule |
| --- | --- |
| Performance | error below 100 |
| Accessibility | error below 100 |
| Best Practices | error below 100 |
| SEO | error below 100 |

- **Best of three runs:** CI runners are noisy, so a single slow run doesn't fail the build. A real regression fails all three.
- **Desktop preset:** the mobile preset's throttling on shared runners swings a point or two from run to run.
- **Loosening a rule:** lower its `minScore`, or switch `'error'` to `'warn'`. Do it on purpose, per project, when a real feature (a WebGL scene, a heavy embed) earns the cost.

## Netlify's Lighthouse plugin

Netlify's plugin still runs on every deploy and posts scores on the PR. Treat them as informational. The plugin audits the build output as static files rather than the running Next.js server, so its numbers can differ from the real site: it reported Best Practices 92 for a site that scores 100 when audited directly. The scores that count are Lighthouse CI's in GitHub Actions, and direct audits of the deployed URL.
