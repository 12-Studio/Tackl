// Site Configuration
// ------------
// NOTE • The canonical site URL — single source for metadataBase (SEO),
// sitemap.xml and robots.txt. Set NEXT_PUBLIC_SITE_URL per environment;
// the fallback keeps local builds working.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://changeme.com').replace(/\/+$/, '');
