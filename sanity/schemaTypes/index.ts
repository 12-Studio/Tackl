// Sanity Schema Types
// ------------
// NOTE • Register every document/object type here — the Studio reads this
// list via sanity.config.ts. The two starters match the GROQ queries in
// src/cms/sanity/queries.

// Imports
// ------------
import { homePage } from './homePage';
import { siteSettings } from './siteSettings';

// Exports
// ------------
export const schemaTypes = [homePage, siteSettings];
