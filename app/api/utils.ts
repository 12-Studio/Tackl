import { ApiError } from '@datocms/cma-client';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serializeError } from 'serialize-error';

export function withCORS(responseInit: ResponseInit = {}): ResponseInit {
	// DatoCMS Web Previews calls our API from a different origin, so these
	// headers are required for browser preflight + cross-origin requests.
	const headers = new Headers(responseInit.headers);
	headers.set('Access-Control-Allow-Origin', '*');
	headers.set('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
	headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	return {
		...responseInit,
		headers,
	};
}

export function handleUnexpectedError(error: unknown) {
	try {
		throw error;
	} catch (caughtError) {
		console.error(caughtError);
	}

	// ApiError gives useful request/response metadata from DatoCMS APIs.
	if (error instanceof ApiError) {
		return NextResponse.json(
			{
				success: false,
				error: error.message,
				request: error.request,
				response: error.response,
			},
			withCORS({ status: 500 })
		);
	}

	return invalidRequestResponse(serializeError(error), 500);
}

export function invalidRequestResponse(error: unknown, status = 422) {
	return NextResponse.json(
		{
			success: false,
			error,
		},
		withCORS({ status })
	);
}

export function successfulResponse(data?: unknown, status = 200) {
	return NextResponse.json(
		{
			success: true,
			data,
		},
		withCORS({ status })
	);
}

/**
 * Rewrites Next.js draft cookie to include CHIPS attributes so it can work
 * inside the DatoCMS preview iframe.
 */
export async function makeDraftModeWorkWithinIframes() {
	const cookieStore = await cookies();
	const prerenderBypassCookie = cookieStore.get('__prerender_bypass');

	if (!prerenderBypassCookie?.value) {
		return;
	}

	cookieStore.set({
		name: '__prerender_bypass',
		value: prerenderBypassCookie.value,
		httpOnly: true,
		path: '/',
		// Required for third-party iframe cookie behavior (CHIPS).
		secure: true,
		sameSite: 'none',
		partitioned: true,
	});
}

export function isRelativeUrl(path: string): boolean {
	try {
		// If this succeeds without a base, it is absolute and therefore rejected.
		new URL(path);
		return false;
	} catch {
		try {
			// Valid relative URL if it can be parsed only when a base is provided.
			new URL(path, 'http://example.com');
			return true;
		} catch {
			return false;
		}
	}
}
