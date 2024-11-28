/**
 * Formats a date into a localized string representation.
 * Converts the input date into a long-form date string (e.g., "January 1, 2023")
 * using the specified locale's conventions.
 *
 * @param {string|number|Date} date - The date to format. Can be a Date object, timestamp, or date string
 * @param {string} [locale='en-US'] - The locale to use for formatting (BCP 47 language tag)
 * @returns {string} The formatted date string
 *
 * @example
 * formatDate('2023-01-01') // "January 1, 2023"
 * formatDate(1672531200000, 'fr-FR') // "1 janvier 2023"
 * formatDate(new Date(2023, 0, 1), 'es-ES') // "1 de enero de 2023"
 */
export const formatDate = (date, locale = 'en-US') => {
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
