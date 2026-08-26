// Imports
// ------------
import type { MetadataRoute } from 'next';
import { isSiteUrlConfigured, siteUrl } from '@/config';

// Robots
// ------------
// NOTE • Served at /robots.txt. Non-production deploys (Netlify sets
// CONTEXT to deploy-preview / branch-deploy) are blocked from indexing so
// staging URLs never leak into search results — as is any deploy still on
// the changeme.com fallback (NEXT_PUBLIC_SITE_URL unset).
const isProduction = !process.env.CONTEXT || process.env.CONTEXT === 'production';

const robots = (): MetadataRoute.Robots => {
	if (!isProduction || !isSiteUrlConfigured) {
		return {
			rules: { userAgent: '*', disallow: '/' },
		};
	}

	return {
		rules: { userAgent: '*', allow: '/' },
		sitemap: `${siteUrl}/sitemap.xml`,
	};
};

// Exports
// ------------
export default robots;
