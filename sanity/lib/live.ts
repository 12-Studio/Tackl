/**
 * Use `@sanity/lib/live.server` in Server Components (pages, layouts).
 * This file exists so imports from `next-sanity/live` are not pulled into client bundles.
 */
export type { LivePerspective } from 'next-sanity/live';
