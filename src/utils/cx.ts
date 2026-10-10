/**
 * Joins class names, skipping falsy values — for combining module classes,
 * global utility classes (t-*) and an optional className prop.
 *
 * @example
 * <h2 className={cx(s.title, 't-headlineL', isActive && s.active, className)} />
 */
export const cx = (...classes: (string | false | null | undefined)[]): string => classes.filter(Boolean).join(' ');
