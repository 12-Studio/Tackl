// No-CMS Adapter
// ------------
// NOTE • Exposes the same common surface as the real adapters (fetchContent
// + query strings), so the '@cms' seam — and any code written against it —
// keeps working when no CMS is chosen. Wiring up a CMS later means adding
// an adapter folder and rewiring src/cms/index.ts, never touching app code.

// Exports
// ------------
export { fetchContent } from './client';
export { GET_GLOBAL } from './queries/getGlobal';
export { GET_HOME } from './queries/getHome';
