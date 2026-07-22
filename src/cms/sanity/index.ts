// Sanity Adapter
// ------------
// NOTE • Exposes the common CMS surface: fetchContent + query strings.
// The raw client is exported for advanced use (live preview, listeners).

// Exports
// ------------
export { client, fetchContent } from './client';
export { GET_GLOBAL } from './queries/getGlobal';
export { GET_HOME } from './queries/getHome';
