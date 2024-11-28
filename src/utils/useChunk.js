/**
 * Splits an array into smaller chunks of a specified size.
 * Useful for pagination, batch processing, or displaying data in grids.
 *
 * @param {Array} array - The array to split into chunks
 * @param {number} size - The size of each chunk
 * @returns {Array[]} An array containing the chunks
 *
 * @example
 * chunkArray([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunkArray(['a', 'b', 'c'], 3) // [['a', 'b', 'c']]
 * chunkArray([1, 2, 3, 4], 1) // [[1], [2], [3], [4]]
 */
export const useChunk = (array, size) => {
    return array.reduce((acc, _, i) => {
        if (i % size === 0) acc.push(array.slice(i, i + size));
        return acc;
    }, []);
};
