// Cookie Consent
// ------------
// NOTE • The CookieBar is production-only, which is what `bun run test`
// builds. Covers the choice, its persistence before first paint, and
// withdrawing consent from the settings.
import { expect, test } from '@playwright/test';

const consentAttribute = () => document.documentElement.getAttribute('data-cookie-consent');

test('stores a per-category choice and hides the banner for returning visitors', async ({ page }) => {
	await page.goto('/');
	const banner = page.getByRole('region', { name: 'We use cookies!' });
	await expect(banner).toBeVisible();

	await banner.getByRole('button', { name: 'Let me choose' }).click();
	await expect(banner.getByRole('checkbox', { name: /Analytics/ })).not.toBeChecked();
	await banner.getByRole('checkbox', { name: /Analytics/ }).check();
	await banner.getByRole('button', { name: 'Save Choices' }).click();

	await expect(banner).toBeHidden();
	expect(await page.evaluate(consentAttribute)).toBe('analytics');

	await page.reload();
	await expect(banner).toBeHidden();
	expect(await page.evaluate(consentAttribute)).toBe('analytics');
});

test('Accept Necessary grants nothing optional', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Accept Necessary' }).click();
	expect(await page.evaluate(consentAttribute)).toBe('necessary');
});

test('withdrawing consent from the settings clears cookies and reloads', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Accept All' }).click();
	await page.evaluate(() => {
		// biome-ignore lint/suspicious/noDocumentCookie: simulating a tracking cookie
		document.cookie = '_ga=test;path=/';
		window.dispatchEvent(new Event('tackl:cookie-settings'));
	});

	const banner = page.getByRole('region', { name: 'We use cookies!' });
	await expect(banner).toBeVisible();
	await banner.getByRole('checkbox', { name: /Marketing/ }).uncheck();
	await Promise.all([page.waitForEvent('load'), banner.getByRole('button', { name: 'Save Choices' }).click()]);

	expect(await page.evaluate(consentAttribute)).toBe('analytics');
	expect(await page.evaluate(() => document.cookie)).not.toContain('_ga');
});
