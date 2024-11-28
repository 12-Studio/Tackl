/**
 * Creates a Promise that resolves after a specified delay.
 * Useful for adding delays in async functions or creating artificial pauses.
 *
 * @param {number} ms - The delay duration in milliseconds
 * @returns {Promise} A Promise that resolves after the specified delay
 *
 * @example
 * // Basic usage
 * await useSleep(1000) // Pauses execution for 1 second
 *
 * // In an async function
 * async function demo() {
 *   console.log('Start')
 *   await useSleep(2000) // 2 second delay
 *   console.log('End')
 * }
 */
export const useSleep = ms => new Promise(resolve => setTimeout(resolve, ms));
