import 'server-only';

import type { LivePerspective } from 'next-sanity/live';

import { sanityFetch } from './live.server';

type FetchSanityOptions = {
	stega?: boolean;
	perspective?: LivePerspective;
};

export const fetchSanity = async <T>(
	query: string,
	params?: Record<string, unknown>,
	options?: FetchSanityOptions,
): Promise<T> => {
	const { data } = await sanityFetch({
		query,
		params,
		stega: options?.stega,
		perspective: options?.perspective,
	});
	return data as T;
};

/** Published content only — use in metadata and static params. */
export const fetchSanityPublished = async <T>(
	query: string,
	params?: Record<string, unknown>,
): Promise<T> =>
	fetchSanity<T>(query, params, { perspective: 'published', stega: false });
