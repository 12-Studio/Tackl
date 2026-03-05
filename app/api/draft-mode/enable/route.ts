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
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const token = request.nextUrl.searchParams.get('token');
	const redirectTo = request.nextUrl.searchParams.get('redirect') || '/';

	try {
		if (token !== process.env.SECRET_API_TOKEN) {
			return invalidRequestResponse('Invalid token', 401);
		}

		if (!isRelativeUrl(redirectTo)) {
			return invalidRequestResponse('URL must be relative!', 422);
		}

		const draft = await draftMode();
		draft.enable();

		await makeDraftModeWorkWithinIframes();
	} catch (error) {
		return handleUnexpectedError(error);
	}

	redirect(redirectTo);
}
