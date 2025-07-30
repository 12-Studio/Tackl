/**
 * Generates a reasonably unique string identifier.
 *
 * The generated ID consists of the current timestamp (in milliseconds) converted to base36,
 * concatenated with a random number (also in base36, omitting the leading "0.").
 * This approach ensures IDs are unique across time and unlikely to collide within the same millisecond.
 *
 * Note: This function is suitable for client-side use cases such as React keys, temporary IDs, or
 * non-critical identifiers. It is NOT cryptographically secure and should not be used for security-sensitive purposes.
 *
 * @returns {string} A unique string identifier (e.g., "lm2hj8p12x4")
 *
 * @example
 * // Generate a new unique ID
 * const id = generateUID();
 * // id might be "lm2hj8p12x4"
 *
 * @example
 * // Use as a React key
 * <li key={generateUID()}>{item}</li>
 */
export const generateUID = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};
