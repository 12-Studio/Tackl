// Draft Mode — Disable
// ------------
// NOTE • Turns draft mode back off and returns the visitor to where they
// were (or the homepage).

// Imports
// ------------
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

// Exports
// ------------
export const GET = async (request: Request) => {
	(await draftMode()).disable();
	const url = new URL(request.url);
	redirect(url.searchParams.get('redirect') || '/');
};
