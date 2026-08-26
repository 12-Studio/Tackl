// Playwright Configuration
// ------------
// NOTE • One smoke test keeps `bun run test` honest — it boots the real
// production build and fails on anything broken enough to show at first
// paint. Grow suites in tests/ as the project grows.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	timeout: 60_000,
	use: {
		baseURL: 'http://localhost:3000',
		// NOTE • Sandboxed environments (agent containers, locked-down CI) often
		// ship a system Chromium instead of allowing downloads — point
		// PLAYWRIGHT_CHROMIUM_PATH at it to skip `playwright install` entirely
		...(process.env.PLAYWRIGHT_CHROMIUM_PATH && {
			launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH },
		}),
	},
	webServer: {
		// CI builds in an earlier step; locally, build fresh so the test
		// always exercises what would actually ship
		command: process.env.CI ? 'bun run start' : 'bun run build && bun run start',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
		timeout: 180_000,
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
