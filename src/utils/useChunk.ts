/**
 * React hook to split an array into chunks of a specified size.
 *
 * This utility is useful for pagination, batching, or rendering data in grid layouts.
 *
 * @template T
 * @param {T[]} array - The input array to be chunked.
 * @param {number} size - The maximum size of each chunk. Must be a positive integer.
 * @returns {T[][]} An array of arrays, where each sub-array is a chunk of the original array.
 *
 * @example
 * // Chunk an array of numbers into groups of 2
 * const chunks = useChunk([1, 2, 3, 4, 5], 2);
 * // chunks = [[1, 2], [3, 4], [5]]
 *
 * @example
 * // Chunk an array of strings into a single group
 * const chunks = useChunk(['a', 'b', 'c'], 3);
 * // chunks = [['a', 'b', 'c']]
 *
 * @example
 * // Chunk an array into single-item groups
 * const chunks = useChunk([1, 2, 3, 4], 1);
 * // chunks = [[1], [2], [3], [4]]
 *
 * @remarks
 * - If the array length is not divisible by the chunk size, the last chunk will contain the remaining elements.
 * - If the input array is empty, returns an empty array.
 * - If size is less than 1, returns an empty array.
 */
export const useChunk = <T>(array: T[], size: number): T[][] => {
	if (!Array.isArray(array) || size < 1) return [];
	return array.reduce<T[][]>((acc, _, i) => {
		if (i % size === 0) acc.push(array.slice(i, i + size));
		return acc;
	}, []);
};
