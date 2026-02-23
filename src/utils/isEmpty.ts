/**
 * Checks if a value is an empty object (i.e. {})
 * Handy for form validation or API responses.
 *
 * @param obj - The value to check
 * @returns True if the value is an empty object, false otherwise
 *
 * @example
 * isEmpty({}) // true
 * isEmpty({a: 1}) // false
 * isEmpty(null) // false
 * isEmpty([]) // false
 */
export const isEmpty = (obj: unknown): boolean =>
  !!obj && Object.keys(obj as object).length === 0 && (obj as object).constructor === Object;
