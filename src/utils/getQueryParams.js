/**
 * Extracts and parses URL query parameters into a key-value object.
 * Converts URL search parameters (everything after '?') into an object
 * where each parameter becomes a property.
 *
 * @param {string} url - The URL string containing query parameters
 * @returns {Object} An object containing the parsed query parameters
 *
 * @example
 * // Basic usage
 * getQueryParams('?name=John&age=25')
 * // Returns: { name: 'John', age: '25' }
 *
 * // With full URL
 * getQueryParams('https://example.com?category=books&sort=asc')
 * // Returns: { category: 'books', sort: 'asc' }
 *
 * // Empty query parameters
 * getQueryParams('') // Returns: {}
 */
export const getQueryParams = url => {
    return Object.fromEntries(new URLSearchParams(url).entries());
};
