/**
 * Checks if a value is an empty object (i.e. {})
 * Handy for form validation or API responses.
 *
 * @param {Object} obj - The value to check
 * @returns {boolean} True if the value is an empty object, false otherwise
 *
 * @example
 * isEmpty({}) // true
 * isEmpty({a: 1}) // false
 * isEmpty(null) // false
 * isEmpty([]) // false
 */

export const isEmpty = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object;
