/**
 * Checks if a number is even
 *
 * @param value - The number to check
 * @returns True if the number is even, false if odd
 *
 * Performance notes:
 * - Uses modulo operator (%) which is highly optimized by JS engines
 * - Returns boolean directly from comparison for best performance
 * - Avoids unnecessary type checks/conversions for speed
 *
 * Example:
 * isEven(2) // returns true
 * isEven(3) // returns false
 */
export const isEven = (value: number): boolean => value % 2 === 0;
