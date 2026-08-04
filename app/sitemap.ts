// Imports
// ------------
import type { MetadataRoute } from 'next';
import { siteUrl } from '@/config';

// Sitemap
// ------------
// NOTE • Served at /sitemap.xml. Static routes are listed by hand; with a
// CMS wired up, fetch slugs and spread them in:
//
// import { fetchContent } from '@cms';
//
// const pages = await fetchContent<{ allPages: { slug: string }[] }>(GET_SLUGS);
// ...(pages?.allPages ?? []).map(({ slug }) => ({
// 	url: `${siteUrl}/${slug}/`,
// 	lastModified: new Date(),
// })),
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	// NOTE • With `cacheComponents` on, uncached I/O (`new Date()` here) makes a
	// route dynamic. `use cache` keeps /sitemap.xml prerendered, pinning
	// lastModified to build time — swap it for a CMS timestamp when you wire
	// slugs in above, or drop the directive to regenerate per request.
	'use cache';

	return [
		{
			url: `${siteUrl}/`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	];
};

// Exports
// ------------
export default sitemap;
