/**
 * Executes a DatoCMS Content Delivery API query with error handling and environment token injection.
 *
 * Wraps the DatoCMS `executeQuery` method, automatically injecting the API token
 * from the `NEXT_DATOCMS_API_TOKEN` environment variable. It provides robust error handling, logging
 * authentication issues and response errors, and returns `null` on failure instead of throwing.
 *
 * @template T - The expected shape of the response data.
 * @param {string} query - The GraphQL query string to execute.
 * @param {object} [options] - Optional options to pass to the DatoCMS client (e.g., variables, preview).
 * @returns {Promise<T | null>} The response data from DatoCMS, or `null` if the request fails.
 *
 * @example
 * ```ts
 * import { fetchContent, GET_HOME } from '@cms';
 *
 * const data = await fetchContent<{ page: { pageTitle: string } }>(GET_HOME);
 * ```
 */

// Imports
// ------------
import { executeQuery } from '@datocms/cda-client';

// Exports
// ------------
export const fetchContent = async <T = unknown>(
	query: string,
	options?: Record<string, unknown>
): Promise<T | null> => {
	try {
		// NOTE • Fail loudly (but non-fatally) when the token is missing or unset
		const token = process.env.NEXT_DATOCMS_API_TOKEN;
		if (!token || token === 'CHANGE_ME') {
			console.error(
				'DatoCMS API token is missing. Please set NEXT_DATOCMS_API_TOKEN in your environment variables.'
			);
			return null;
		}

		const queryResponse = await executeQuery(query, {
			...options,
			token,
			// environment: process.env.NODE_ENV,
		});

		return queryResponse as T;
	} catch (error: unknown) {
		console.error('DatoCMS request failed:', error);

		// Check if it's an authentication error
		const message = error instanceof Error ? error.message : '';
		if (message.includes('token') || message.includes('unauthorized')) {
			console.error(
				'DatoCMS API token is missing or invalid. Please check your NEXT_DATOCMS_API_TOKEN environment variable.'
			);
		}

		// Log additional error details for debugging
		const response = (error as { response?: { status?: number; statusText?: string; data?: unknown } }).response;
		if (response) {
			console.error('DatoCMS response error:', {
				status: response.status,
				statusText: response.statusText,
				data: response.data,
			});
		}

		// Return null instead of throwing to prevent app crash
		return null;
	}
};

// NOTE • Dato-native alias for the same function
export const performRequest = fetchContent;
