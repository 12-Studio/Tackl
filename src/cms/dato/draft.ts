// Draft Mode — DatoCMS
// ------------
// NOTE • Secret-gated enable handler for Next.js draft mode. Point Dato's
// Web Previews plugin (or a bookmark) at:
//   /api/draft-mode/enable/?secret=<NEXT_DATOCMS_PREVIEW_SECRET>&redirect=/some-page/
// Once draft mode is on, fetchContent automatically adds includeDrafts to
// every query. Without the env secret this route is disabled entirely.

// Imports
// ------------
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

// Exports
// ------------
export const GET = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const secret = process.env.NEXT_DATOCMS_PREVIEW_SECRET;

	if (!secret) {
		return new Response('Draft mode is not configured — set NEXT_DATOCMS_PREVIEW_SECRET', { status: 503 });
	}

	if (url.searchParams.get('secret') !== secret) {
		return new Response('Invalid secret', { status: 401 });
	}

	(await draftMode()).enable();

	// NOTE • Relative paths only — never an open redirect
	const target = url.searchParams.get('redirect') || '/';
	redirect(target.startsWith('/') && !target.startsWith('//') ? target : '/');
};
