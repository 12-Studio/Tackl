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
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const redirectTo = request.nextUrl.searchParams.get('redirect') || '/';

	try {
		if (!isRelativeUrl(redirectTo)) {
			return invalidRequestResponse('URL must be relative!', 422);
		}

		const draft = await draftMode();
		draft.disable();

		await makeDraftModeWorkWithinIframes();
	} catch (error) {
		return handleUnexpectedError(error);
	}

	redirect(redirectTo);
}
