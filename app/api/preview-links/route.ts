import type { RawApiTypes } from '@datocms/cma-client';
import { deserializeRawItem } from '@datocms/rest-client-utils';
import type { NextRequest, NextResponse } from 'next/server';
import { NextResponse as NextServerResponse } from 'next/server';
import { recordToWebsiteRoute } from '@/lib/datocms/recordInfo';
import { handleUnexpectedError, invalidRequestResponse, withCORS } from '../utils';

export async function OPTIONS() {
	// Web Previews issues CORS preflight requests before POSTing payloads.
	return new Response('OK', withCORS());
}

type PreviewLink = {
	label: string;
	url: string;
	reloadPreviewOnRecordUpdate?: boolean | { delayInMs: number };
};

type WebPreviewsResponse = {
	previewLinks: PreviewLink[];
};

type WebPreviewsRequestBody = {
	item?: RawApiTypes.Item;
	locale?: string;
};

/**
 * Previews webhook for the DatoCMS Web Previews plugin.
 * https://www.datocms.com/marketplace/plugins/i/datocms-plugin-web-previews#the-previews-webhook
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const token = request.nextUrl.searchParams.get('token');

		// Shared secret that you configure both in DatoCMS plugin and env vars.
		if (token !== process.env.SECRET_API_TOKEN) {
			return invalidRequestResponse('Invalid token', 401);
		}

		const body: WebPreviewsRequestBody = await request.json();
		const item = body.item;
		const locale = body.locale ?? 'en';

		if (!item) {
			return invalidRequestResponse('Missing `item` in request body');
		}

		// Convert DatoCMS raw JSON:API item to a friendlier object and map it
		// to the frontend route where this content is rendered.
		const url = await recordToWebsiteRoute(deserializeRawItem(item), locale);
		const response: WebPreviewsResponse = { previewLinks: [] };

		if (url) {
			// Route path is embedded as a query param in enable/disable URLs.
			const encodedRedirect = encodeURIComponent(url);

			// If content has an unpublished version, provide a draft preview link.
			if (item.meta.status !== 'published') {
				response.previewLinks.push({
					label: 'Draft version',
					url: new URL(
						`/api/draft-mode/enable?redirect=${encodedRedirect}&token=${token}`,
						request.url
					).toString(),
					// Ask the plugin to refresh preview after saves so editors see
					// updated data without manually reloading.
					reloadPreviewOnRecordUpdate: true,
				});
			}

			// If content has a published version, provide a public-view link.
			if (item.meta.status !== 'draft') {
				response.previewLinks.push({
					label: 'Published version',
					url: new URL(`/api/draft-mode/disable?redirect=${encodedRedirect}`, request.url).toString(),
				});
			}
		}

		return NextServerResponse.json(response, withCORS());
	} catch (error) {
		return handleUnexpectedError(error);
	}
}
