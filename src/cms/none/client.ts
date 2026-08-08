// No-CMS Client
// ------------
// NOTE • Same signature and same failure contract as the real adapters:
// returns null, never throws — so routes render their fallbacks and the
// app can't crash on a missing CMS.

// Exports
// ------------
export const fetchContent = async <T = unknown>(
	_query: string,
	_options?: Record<string, unknown>
): Promise<T | null> => {
	console.warn('No CMS is configured — fetchContent returns null. See docs/CMS.md to wire up DatoCMS or Sanity.');
	return null;
};
