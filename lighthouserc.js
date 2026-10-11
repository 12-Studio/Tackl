// Lighthouse CI
// ------------
// NOTE • A barebones Tackl site scores 100 across the board, so anything less
// fails CI — a regression shows up in the PR that caused it, not in a
// Lighthouse run weeks later. Run locally with `bun run lighthouse`.
// NOTE • SEO needs NEXT_PUBLIC_SITE_URL at build time — without it the site
// is deliberately noindex (see src/config.ts). CI sets it.
// NOTE • Best of three desktop runs — CI runners are noisy, a real
// regression fails every run. Loosen a category by lowering its minScore or
// switching 'error' to 'warn'.
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
				'categories:performance': ['error', { minScore: 1 }],
				'categories:accessibility': ['error', { minScore: 1 }],
				'categories:best-practices': ['error', { minScore: 1 }],
				'categories:seo': ['error', { minScore: 1 }],
			},
		},
		upload: {
			// NOTE • Public, temporary (7-day) report links in the CI log
			target: 'temporary-public-storage',
		},
	},
};
