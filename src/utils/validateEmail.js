/**
 * Validates an email address using a regular expression pattern.
 * The pattern checks for:
 * 1. At least one character before @ that isn't whitespace
 * 2. A single @ symbol
 * 3. At least one character between @ and . that isn't whitespace
 * 4. A single . character
 * 5. At least one character after . that isn't whitespace
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email matches pattern, false otherwise
 *
 * @example
 * // Valid email
 * validateEmail('user@example.com') // Returns: true
 *
 * // Invalid emails
 * validateEmail('invalid.email') // Returns: false
 * validateEmail('no spaces@test.com') // Returns: false
 */
export const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
