# Lighthouse

Every push and PR runs [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) (Lighthouse 13, desktop) against the production build. The build fails if the site drops below the floor a real, built site should hold. A barebones Tackl site scores 100 everywhere, which leaves headroom for real content, imagery and motion.

## The thresholds

They live in [`lighthouserc.js`](../lighthouserc.js):

| Category | Rule |
| --- | --- |
| Performance | fails below **90** |
| Best Practices | fails below **90** |
| SEO | fails below **100** |
| Agentic Browsing | fails unless **every applicable check passes**. Lighthouse shows this as a fraction, e.g. **3/3**. |
| Accessibility | warns below **90**, never fails. Automated contrast checks flag designs a person would pass. |

- **Best of three runs:** CI runners are noisy, so a single slow run doesn't fail the build. A real regression fails all three.
- **Changing a threshold:** edit its `minScore`, or switch `'error'` to `'warn'`. Do it on purpose, and say why in the PR.

## Agentic Browsing

This Lighthouse 13 category checks how usable the site is for AI agents. Three of its checks apply to a Tackl site:

- **Accessibility tree is well-formed:** semantic HTML and labels, which the kit already gets right.
- **Cumulative Layout Shift:** the page doesn't jump while it loads.
- **llms.txt follows recommendations:** `app/llms.txt/route.ts` serves `/llms.txt`, a Markdown summary of the site with an H1 and links. Keep it in step with the site's pages. With a CMS, fetch the pages and list them.

The WebMCP checks apply only once a site registers agent tools or has forms, and the `ai-catalog.json` check only when that file exists. Until then they're marked not applicable.

**Why there's an `overrides` entry in `package.json`:** Lighthouse CI 0.15 still bundles Lighthouse 12, which has no Agentic Browsing category. The override pins Lighthouse 13 under it. Drop the override once a Lighthouse CI release ships Lighthouse 13 itself.

## Run it locally

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000 bun run lighthouse
```

This builds the app, serves it, and audits `/` three times.

- **Why set `NEXT_PUBLIC_SITE_URL`?** Without it the site is deliberately `noindex` (see `src/config.ts`), so SEO fails. That's also why deploy previews show SEO 63, and it's expected there.
- **Report links** are printed at the end of the run. They point to temporary public storage and expire after 7 days.

## Netlify's Lighthouse plugin

Netlify's plugin still runs on every deploy and posts scores on the PR. Treat them as informational. The plugin audits the build output as static files rather than the running Next.js server, so its numbers can differ from the real site: it reported Best Practices 92 for a site that scores 100 when audited directly. The scores that count are Lighthouse CI's in GitHub Actions, and direct audits of the deployed URL.
