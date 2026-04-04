'use client';

import type { ComponentType } from 'react';
import { type EnabledQueryListenerOptions, useQuerySubscription } from 'react-datocms';
import type { ContentComponentType } from './generatePageComponent';

/**
 * Factory for a client component that subscribes to DatoCMS realtime updates.
 * It starts from server-provided initialData and then keeps UI in sync via SSE.
 */
export function generateRealtimeComponent<PageProps, Result, Variables extends Record<string, unknown>>({
	contentComponent: ContentComponent,
}: GenerateRealtimeComponentOptions<PageProps, Result>) {
	const RealtimeComponent: RealtimeComponentType<PageProps, Result, Variables> = ({
		pageProps,
		...subscriptionOptions
	}) => {
		const { data, error } = useQuerySubscription<Result, Variables>({
			...subscriptionOptions,
			// Force enabled here because this component is rendered only when
			// draft mode is active.
			enabled: true,
		});

		if (error) {
			return (
				<div>
					<pre>{error.code}</pre>: {error.message}
				</div>
			);
		}

		return <ContentComponent {...pageProps} data={data ?? null} />;
	};

	RealtimeComponent.displayName = 'RealtimeComponent';

	return RealtimeComponent;
}

type GenerateRealtimeComponentOptions<PageProps, Result> = {
	contentComponent: ContentComponentType<PageProps, Result>;
};

export type RealtimeComponentType<PageProps, Result, Variables extends Record<string, unknown>> = ComponentType<
	Omit<EnabledQueryListenerOptions<Result, Variables>, 'enabled'> & {
		pageProps: PageProps;
	}
>;
