/**
 * Delays execution for a specified number of milliseconds.
 *
 * @param ms - The delay duration in milliseconds.
 * @returns A Promise that resolves after the specified delay.
 *
 * @example
 * // Pause for 1 second
 * await useSleep(1000);
 *
 * @example
 * // In an async function
 * async function demo(): Promise<void> {
 *   console.log('Start');
 *   await useSleep(2000); // 2 second delay
 *   console.log('End');
 * }
 */
export function useSleep(ms: number): Promise<void> {
	return new Promise<void>(resolve => setTimeout(resolve, ms));
}
