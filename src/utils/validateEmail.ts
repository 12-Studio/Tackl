/**
 * Checks if a given string is a valid email address.
 *
 * The validation uses a regular expression to ensure the following:
 * - At least one non-whitespace, non-@ character before the "@" symbol
 * - Exactly one "@" symbol
 * - At least one non-whitespace, non-@ character between "@" and "."
 * - At least one "." after the "@"
 * - At least one non-whitespace character after the "."
 *
 * Note: This is a basic validation and may not cover all valid/invalid email formats as per RFC 5322.
 *
 * @param email - The email address to validate.
 * @returns `true` if the email is valid according to the pattern, otherwise `false`.
 *
 * @example
 * ```typescript
 * validateEmail('user@example.com'); // true
 * validateEmail('invalid.email'); // false
 * validateEmail('no spaces@test.com'); // false
 * ```
 */
export function validateEmail(email: string): boolean {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}
