import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest, NextResponse } from 'next/server';
import {
	handleUnexpectedError,
	invalidRequestResponse,
	isRelativeUrl,
	makeDraftModeWorkWithinIframes,
} from '../../utils';

export const dynamic = 'force-dynamic';

/**
 * Enables Next.js Draft Mode for DatoCMS previews.
 *
 * Called by DatoCMS Web Previews before redirecting an editor to a page.
 * Once enabled, server-side data fetching can opt into draft content.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const token = request.nextUrl.searchParams.get('token');
	const redirectTo = request.nextUrl.searchParams.get('redirect') || '/';

	try {
		// Shared-secret check: only trusted callers (eg. DatoCMS plugin/webhook)
		// can turn draft mode on.
		if (token !== process.env.SECRET_API_TOKEN) {
			return invalidRequestResponse('Invalid token', 401);
		}

		// Prevent open-redirect issues by allowing only internal relative paths.
		if (!isRelativeUrl(redirectTo)) {
			return invalidRequestResponse('URL must be relative!', 422);
		}

		const draft = await draftMode();
		draft.enable();

		// Next.js sets the draft cookie, then we rewrite it with CHIPS-friendly
		// attributes so previews also work inside DatoCMS iframe contexts.
		await makeDraftModeWorkWithinIframes();
	} catch (error) {
		return handleUnexpectedError(error);
	}

	redirect(redirectTo);
}
