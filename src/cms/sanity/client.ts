/**
 * Executes a Sanity GROQ query with error handling and environment config injection.
 *
 * Wraps a `next-sanity` client configured from NEXT_PUBLIC_SANITY_PROJECT_ID /
 * NEXT_PUBLIC_SANITY_DATASET. Returns `null` on failure instead of throwing so a
 * missing document never crashes a route.
 *
 * @template T - The expected shape of the response data.
 * @param {string} query - The GROQ query string to execute.
 * @param {object} [params] - Optional GROQ params (e.g., { slug }).
 * @returns {Promise<T | null>} The response data from Sanity, or `null` if the request fails.
 *
 * @example
 * ```ts
 * import { fetchContent, GET_HOME } from '@cms';
 *
 * const data = await fetchContent<{ pageTitle: string }>(GET_HOME);
 * ```
 */

// Imports
// ------------
import { createClient } from 'next-sanity';

// SECTION • Client
// NOTE • useCdn true = fast cached reads; switch to false (or use a token +
// perspective: 'previewDrafts') when wiring live preview / draft mode.
// The 'placeholder' fallback keeps builds working before a project is
// linked — fetchContent guards against it at call time.
export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-06-01',
	useCdn: true,
});

// Exports
// ------------
export const fetchContent = async <T = any>(query: string, params?: Record<string, any>): Promise<T | null> => {
	try {
		// NOTE • Fail loudly (but non-fatally) when the project isn't configured
		const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
		if (!projectId || projectId === 'CHANGE_ME') {
			console.error(
				'Sanity project id is missing. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.'
			);
			return null;
		}

		return await client.fetch<T>(query, params ?? {});
	} catch (error: any) {
		console.error('Sanity request failed:', error);

		// Return null instead of throwing to prevent app crash
		return null;
	}
};
