/**
 * Formats a date value into a localized, human-readable string (e.g., "January 1, 2023").
 *
 * Accepts a variety of date representations and returns a string formatted according to the specified locale.
 * Uses the browser's `toLocaleDateString` with options for long month, numeric day, and numeric year.
 *
 * @param date - The date to format. Accepts:
 *   - `string`: Any string accepted by the Date constructor (e.g., "2023-01-01", "January 1, 2023").
 *   - `number`: A timestamp in milliseconds since the Unix epoch.
 *   - `Date`: A JavaScript Date object.
 * @param locale - (Optional) A BCP 47 language tag specifying the locale for formatting (e.g., "en-US", "fr-FR").
 *   Defaults to `"en-US"` if not provided.
 * @returns The formatted date string, or "Invalid Date" if the input cannot be parsed.
 *
 * @example
 * // Using an ISO date string
 * formatDate('2023-01-01'); // "January 1, 2023"
 *
 * // Using a timestamp and a different locale
 * formatDate(1672531200000, 'fr-FR'); // "1 janvier 2023"
 *
 * // Using a Date object and Spanish locale
 * formatDate(new Date(2023, 0, 1), 'es-ES'); // "1 de enero de 2023"
 *
 * // Handling invalid input
 * formatDate('not-a-date'); // "Invalid Date"
 */
export function formatDate(
  date: string | number | Date,
  locale: string = 'en-US'
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
