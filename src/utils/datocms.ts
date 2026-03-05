import { executeQuery as datocmsExecuteQuery } from '@datocms/cda-client';

type PerformRequestOptions<Variables = Record<string, unknown>> = {
	variables?: Variables;
	includeDrafts?: boolean;
	environment?: string;
	requestInitOptions?: Partial<RequestInit>;
};

export async function performRequest<T = unknown, Variables = Record<string, unknown>>(
	query: string,
	options?: PerformRequestOptions<Variables>
): Promise<T | null> {
	const publishedToken = process.env.DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN ?? process.env.NEXT_DATOCMS_API_TOKEN;
	const draftToken = process.env.DATOCMS_DRAFT_CONTENT_CDA_TOKEN;
	const token = options?.includeDrafts ? draftToken : publishedToken;

	if (!token) {
		const missingTokenVariable = options?.includeDrafts
			? 'DATOCMS_DRAFT_CONTENT_CDA_TOKEN'
			: 'DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN (fallback: NEXT_DATOCMS_API_TOKEN)';

		console.error(`DatoCMS token missing. Configure ${missingTokenVariable}.`);
		return null;
	}

	try {
		const queryResponse = await datocmsExecuteQuery<T, Variables>(query, {
			variables: options?.variables,
			includeDrafts: options?.includeDrafts,
			environment: options?.environment,
			contentLink: options?.includeDrafts ? 'v1' : undefined,
			baseEditingUrl: options?.includeDrafts ? process.env.DATOCMS_BASE_EDITING_URL : undefined,
			requestInitOptions: options?.requestInitOptions,
			excludeInvalid: true,
			token,
		});

		return queryResponse;
	} catch (error: unknown) {
		console.error('DatoCMS request failed:', error);
		return null;
	}
}
