import { performRequest } from '@utils/datocms';
import { draftMode } from 'next/headers';
import type { ComponentType } from 'react';
import type { RealtimeComponentType } from './generateRealtimeComponent';

/**
 * Factory that builds a page component with:
 * 1) server-side initial fetch
 * 2) optional client-side realtime subscription in draft mode
 */
export function generatePageComponent<
	PageProps extends Record<string, unknown>,
	Result,
	Variables extends Record<string, unknown>,
>(options: GeneratePageComponentOptions<PageProps, Result, Variables>) {
	return async function Page(pageProps: PageProps) {
		// Next.js draft mode flag is the switch for preview behavior.
		const { isEnabled: isDraftModeEnabled } = await draftMode();

		const variables = options.buildQueryVariables ? await options.buildQueryVariables(pageProps) : undefined;

		const data = await performRequest<Result, Variables>(options.query, {
			variables,
			includeDrafts: isDraftModeEnabled,
		});

		const { realtimeComponent: RealtimeComponent, contentComponent: ContentComponent } = options;
		const draftToken = process.env.DATOCMS_DRAFT_CONTENT_CDA_TOKEN;
		const baseEditingUrl = process.env.DATOCMS_BASE_EDITING_URL;

		if (isDraftModeEnabled && draftToken) {
			return (
				<RealtimeComponent
					// Realtime subscriptions must use draft token to listen for
					// unpublished changes in the editor.
					token={draftToken}
					query={options.query}
					variables={variables}
					initialData={data ?? undefined}
					pageProps={pageProps}
					includeDrafts={true}
					excludeInvalid={true}
					// Keep Content Link active in realtime previews.
					contentLink='v1'
					baseEditingUrl={baseEditingUrl}
				/>
			);
		}

		// Normal published rendering path (no realtime stream).
		return <ContentComponent {...pageProps} data={data} />;
	};
}

export type ContentComponentType<PageProps, Result> = ComponentType<
	PageProps & {
		data: Result | null;
	}
>;

type GeneratePageComponentOptions<
	PageProps extends Record<string, unknown>,
	Result,
	Variables extends Record<string, unknown>,
> = {
	query: string;
	buildQueryVariables?: (pageProps: PageProps) => Promise<Variables> | Variables;
	contentComponent: ContentComponentType<PageProps, Result>;
	realtimeComponent: RealtimeComponentType<PageProps, Result, Variables>;
};
