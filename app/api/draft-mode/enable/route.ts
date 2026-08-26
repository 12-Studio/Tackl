// Draft Mode — Enable
// ------------
// NOTE • Thin re-export — the actual handler lives in the CMS adapter
// (src/cms/<adapter>/draft.ts) and is selected via '@cms/draft', so this
// route works unchanged for DatoCMS and Sanity alike.

// Exports
// ------------
export { GET } from '@cms/draft';
