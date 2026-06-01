import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
	(await draftMode()).disable();

	const origin =
		process.env.NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN || request.nextUrl.origin;

	return NextResponse.redirect(new URL('/', origin));
};
