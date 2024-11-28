/**
 * Generates a unique identifier string by combining a timestamp with a random number.
 * The ID is created by:
 * 1. Converting the current timestamp to base36
 * 2. Appending a random number (also in base36)
 *
 * This provides a reasonably unique ID for most use cases, though it is not
 * cryptographically secure. The timestamp portion ensures chronological uniqueness,
 * while the random suffix helps prevent collisions within the same millisecond.
 *
 * @returns {string} A unique string identifier in base36 format
 * @example
 * const id = generateUID(); // Returns something like "lm2hj8p12x4"
 */

export const generateUID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
