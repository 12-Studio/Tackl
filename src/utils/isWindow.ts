/**
 * Indicates whether the current execution context is a browser (client-side) environment.
 *
 * This constant is `true` if the global `window` object is defined (i.e., running in a browser),
 * and `false` if running in a server-side environment such as Node.js or during server-side rendering (SSR).
 *
 * @remarks
 * - Use this to guard code that should only run in the browser (e.g., DOM manipulation, accessing `window` or `document`).
 * - The `typeof window !== 'undefined'` check is the safest and most performant way to detect browser context.
 *
 * @example
 * if (isBrowser) {
 *   // Safe to use window, document, or other browser APIs
 *   console.log(window.location.href);
 * }
 *
 * @constant
 * @type {boolean}
 */
export const isBrowser = typeof window !== 'undefined';
