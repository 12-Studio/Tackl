// Lighthouse CI
// ------------
// NOTE • The floor a real, built site should hold, checked on desktop. A
// barebones Tackl site scores 100 everywhere, so there's headroom for real
// content. Run locally with `bun run lighthouse`.
// NOTE • SEO needs NEXT_PUBLIC_SITE_URL at build time — without it the site
// is deliberately noindex (see src/config.ts). CI sets it.
// NOTE • Best of three runs — CI runners are noisy, a real regression fails
// every run. Accessibility warns rather than fails — automated contrast
// checks flag designs a person would pass.
// NOTE • Agentic Browsing needs Lighthouse 13 — package.json `overrides`
// pins it under @lhci/cli, which still bundles 12.
module.exports = {
	ci: {
		collect: {
			url: ['http://localhost:3000/'],
			startServerCommand: 'bun run start',
			startServerReadyPattern: 'Ready in',
			numberOfRuns: 3,
			settings: {
				preset: 'desktop',
			},
		},
		assert: {
			assertions: {
				'categories:performance': ['error', { minScore: 0.8 }],
				'categories:accessibility': ['warn', { minScore: 0.9 }],
				'categories:best-practices': ['error', { minScore: 0.9 }],
				'categories:seo': ['error', { minScore: 1 }],
				// NOTE • Shown as a fraction in Lighthouse (e.g. 3/3) — every audit that
				// applies must pass
				'categories:agentic-browsing': ['error', { minScore: 1 }],
			},
		},
		upload: {
			// NOTE • Public, temporary (7-day) report links in the CI log
			target: 'temporary-public-storage',
		},
	},
};
