import { defineEnableDraftMode } from 'next-sanity/draft-mode';

import { client } from '@sanity/lib/client';

const readToken = process.env.SANITY_API_READ_TOKEN;

const { GET: enableDraftMode } = defineEnableDraftMode({
	client: client.withConfig({
		token: readToken ?? '',
	}),
});

export const GET = async (request: Request) => {
	if (!readToken) {
		return new Response(
			'Draft preview is not configured. Set SANITY_API_READ_TOKEN in Netlify (Site settings → Environment variables), then redeploy.',
			{ status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
		);
	}

	return enableDraftMode(request);
};
