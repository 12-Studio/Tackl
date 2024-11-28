/**
 * Utility object for interacting with localStorage with JSON serialization/deserialization.
 * Provides methods to safely store and retrieve data from localStorage while handling
 * JSON conversion automatically.
 *
 * @example
 * // Store a complex object
 * storage.set('user', { name: 'John', age: 25 })
 *
 * // Retrieve the object
 * const user = storage.get('user') // Returns: { name: 'John', age: 25 }
 *
 * // Remove the item
 * storage.remove('user')
 */
export const storage = {
    /**
     * Stores a value in localStorage after converting it to JSON
     * @param {string} key - The key to store the value under
     * @param {*} value - The value to store (will be JSON stringified)
     */
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),

    /**
     * Retrieves and parses a JSON value from localStorage
     * @param {string} key - The key to retrieve
     * @returns {*} The parsed value, or null if not found
     */
    get: key => JSON.parse(localStorage.getItem(key)),

    /**
     * Removes an item from localStorage
     * @param {string} key - The key to remove
     */
    remove: key => localStorage.removeItem(key),
};
