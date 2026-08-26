// Site Configuration
// ------------
// NOTE • The canonical site URL — single source for metadataBase (SEO),
// sitemap.xml and robots.txt. Set NEXT_PUBLIC_SITE_URL per environment;
// the fallback keeps local builds working.
export const isSiteUrlConfigured = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://changeme.com').replace(/\/+$/, '');

// NOTE • Deploying on the fallback would publish canonical/OG URLs pointing
// at changeme.com — warn loudly, and the site layout flips robots to noindex
// until the real URL is set.
if (!isSiteUrlConfigured && process.env.NODE_ENV === 'production') {
	console.warn(
		'⚠ NEXT_PUBLIC_SITE_URL is not set — metadata falls back to https://changeme.com and robots is forced to noindex. Set it per environment before going live.'
	);
}
