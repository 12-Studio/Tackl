// Pages & Headers
// ------------
// NOTE • The 404 page and the security headers from next.config.js — both
// fail quietly when broken, so they're checked here.
import { expect, test } from '@playwright/test';

test('unknown URLs get the styled 404 with a 404 status', async ({ page }) => {
	const response = await page.goto('/this-page-does-not-exist/');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
});

test('pages are served with the security headers', async ({ request }) => {
	const response = await request.get('/');
	const headers = response.headers();

	expect(headers['content-security-policy']).toContain("object-src 'none'");
	expect(headers['content-security-policy']).toContain("frame-ancestors 'self'");
	expect(headers['x-content-type-options']).toBe('nosniff');
	expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
	expect(headers['strict-transport-security']).toContain('max-age=');
});
