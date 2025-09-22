/**
 * Utility to check if document is available (client-side)
 * Useful for SSR-safe code that needs to access the document object
 *
 * @returns {boolean} True if document is available, false otherwise
 */
export const isDocument = (): boolean => {
	return typeof document !== 'undefined';
};

/**
 * Gets the document object safely, returning undefined if not available
 * Useful for passing as a scope to GSAP or other DOM libraries
 *
 * @returns {Document | undefined} The document object or undefined
 */
export const getDocument = (): Document | undefined => {
	return isDocument() ? document : undefined;
};
