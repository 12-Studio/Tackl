import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

import { previewOrigin } from '@sanity/env';

export const GET = async () => {
	(await draftMode()).disable();

	return NextResponse.redirect(new URL('/', previewOrigin));
};
