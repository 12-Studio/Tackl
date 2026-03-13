/**
 * Utility object for interacting with localStorage with JSON serialization/deserialization.
 * Provides type-safe methods to store, retrieve, and remove data from localStorage,
 * automatically handling JSON conversion.
 *
 * @example
 * // Store a complex object
 * storage.set('user', { name: 'John', age: 25 });
 *
 * // Retrieve the object
 * const user = storage.get<{ name: string; age: number }>('user'); // Returns: { name: 'John', age: 25 } | null
 *
 * // Remove the item
 * storage.remove('user');
 */
export const storage = {
	/**
	 * Stores a value in localStorage after converting it to JSON.
	 *
	 * @template T
	 * @param {string} key - The key to store the value under.
	 * @param {T} value - The value to store (will be JSON stringified).
	 */
	set<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	},

	/**
	 * Retrieves and parses a JSON value from localStorage.
	 *
	 * @template T
	 * @param {string} key - The key to retrieve.
	 * @returns {T | null} The parsed value, or null if not found or parsing fails.
	 */
	get<T>(key: string): T | null {
		const item = localStorage.getItem(key);
		if (item === null) return null;
		try {
			return JSON.parse(item) as T;
		} catch {
			return null;
		}
	},

	/**
	 * Removes an item from localStorage.
	 *
	 * @param {string} key - The key to remove.
	 */
	remove(key: string): void {
		localStorage.removeItem(key);
	},
};
