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
 * Disables Next.js Draft Mode for DatoCMS previews.
 *
 * This endpoint intentionally does not require a token because it only reduces
 * privileges (draft -> published), which is safe.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const redirectTo = request.nextUrl.searchParams.get('redirect') || '/';

	try {
		// Keep redirects internal for the same security reason as the enable route.
		if (!isRelativeUrl(redirectTo)) {
			return invalidRequestResponse('URL must be relative!', 422);
		}

		const draft = await draftMode();
		draft.disable();

		// Keep cookie attributes aligned with iframe-based preview requirements.
		await makeDraftModeWorkWithinIframes();
	} catch (error) {
		return handleUnexpectedError(error);
	}

	redirect(redirectTo);
}
