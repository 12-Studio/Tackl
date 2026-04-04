import type { RawApiTypes } from '@datocms/cma-client';

/**
 * Maps DatoCMS records to frontend routes used by the Web Previews plugin.
 * Fill in each model ID with your project-specific route pattern.
 */
export async function recordToWebsiteRoute(item: RawApiTypes.Item, _locale: string): Promise<string | null> {
	switch (item.__itemTypeId) {
		// TODO: Replace model IDs with your own from DatoCMS settings.
		// Example:
		// case 'YOUR_HOME_PAGE_MODEL_ID':
		// 	return '/';
		// case 'YOUR_BLOG_POST_MODEL_ID':
		// 	return `/blog/${item.attributes.slug}`;
		// case 'YOUR_PAGE_MODEL_ID':
		// 	return `/${item.attributes.slug}`;
		default:
			return null;
	}
}
