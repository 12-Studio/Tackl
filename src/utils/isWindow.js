/**
 * Checks if code is running in a browser environment
 *
 * This constant is used to detect whether the code is executing in:
 * - Browser environment (window object exists) -> returns true
 * - Server environment (Node.js, SSR) -> returns false
 *
 * Performance note: The typeof check is the fastest way to safely
 * detect window existence without risking reference errors
 */
export const isBrowser = typeof window !== 'undefined';
