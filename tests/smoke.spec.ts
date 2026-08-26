// Smoke Test
// ------------
// NOTE • The minimum honest check: the homepage renders, shows its heading,
// and the console stays clean. Hydration crashes, broken providers and
// bundling mistakes all fail here before anything subtler gets a chance.
import { expect, test } from '@playwright/test';

test('homepage renders without console errors', async ({ page }) => {
	const errors: string[] = [];
	page.on('console', message => {
		if (message.type() === 'error') errors.push(message.text());
	});
	page.on('pageerror', error => errors.push(error.message));

	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();

	expect(errors).toEqual([]);
});
