import type { Metadata } from 'next';

import { urlFor } from './image';
import type { SanitySeo } from '@/types/sanity';

export const buildMetadata = (
	seo: SanitySeo | undefined | null,
	fallback: { title: string; description?: string },
): Metadata => {
	const title = seo?.title || fallback.title;
	const description = seo?.description || fallback.description;

	const metadata: Metadata = {
		title,
		description,
	};

	if (seo?.image) {
		const ogImage = urlFor(seo.image).width(1200).height(630).url();
		metadata.openGraph = {
			title,
			description,
			images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
		};
		metadata.twitter = {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		};
	}

	return metadata;
};
