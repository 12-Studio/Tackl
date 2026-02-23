/**
 * Waits for all fonts on the page to be loaded and ready.
 *
 * This function uses the Font Loading API (`document.fonts.ready`) if available,
 * otherwise it resolves immediately (no-op fallback).
 *
 * @returns {Promise<void>} A promise that resolves when all fonts are loaded.
 *
 * @example
 * await waitForFonts();
 * // Now it is safe to measure text or perform layout that depends on web fonts.
 */
export function waitForFonts(): Promise<void> {
    if (
        typeof document !== 'undefined' &&
        document.fonts &&
        typeof document.fonts.ready?.then === 'function'
    ) {
        // Wait for fonts.ready, but resolve with void
        return document.fonts.ready.then(() => {});
    }
    // Fallback: resolve immediately if Font Loading API is not supported
    return Promise.resolve();
}
