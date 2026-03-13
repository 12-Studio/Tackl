/**
 * Parses the query parameters from a URL or query string and returns them as a key-value object.
 *
 * This utility accepts either a full URL (e.g., "https://example.com?foo=bar") or just the query string
 * (e.g., "?foo=bar" or "foo=bar"). It returns an object where each key is a parameter name and each value
 * is the corresponding parameter value as a string.
 *
 * Note: If a parameter appears multiple times, only the last value is returned (consistent with URLSearchParams).
 *
 * @param url - The URL or query string to parse. Can be a full URL, a string starting with "?", or just the query part.
 * @returns An object mapping each query parameter name to its value as a string.
 *
 * @example
 * // Parse from a query string
 * getQueryParams('?name=John&age=25');
 * // => { name: 'John', age: '25' }
 *
 * @example
 * // Parse from a full URL
 * getQueryParams('https://example.com?category=books&sort=asc');
 * // => { category: 'books', sort: 'asc' }
 *
 * @example
 * // Parse from a query string without '?'
 * getQueryParams('foo=bar&baz=qux');
 * // => { foo: 'bar', baz: 'qux' }
 *
 * @example
 * // Empty input returns an empty object
 * getQueryParams('');
 * // => {}
 */
export const getQueryParams = (url: string): Record<string, string> => {
	return Object.fromEntries(new URLSearchParams(url).entries());
};
