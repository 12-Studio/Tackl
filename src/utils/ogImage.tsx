// Imports
// ------------
import { baseColors } from '@theme/colors';
import { ImageResponse } from 'next/og';

// Exports
// ------------
// NOTE • The share card behind app/(site)/opengraph-image.tsx. Give a page
// its own card by adding an opengraph-image.tsx next to its page.tsx:
//
// import { createOgImage, ogImageSize } from '@utils/ogImage';
// export const size = ogImageSize;
// export const contentType = 'image/png';
// export default async function Image() {
// 	const data = await fetchContent(GET_PROJECT);
// 	return createOgImage({ title: data?.title ?? 'Project' });
// }
//
// NOTE • Rendered by Satori, not a browser: inline styles only, flexbox
// layout, and raw colour values (CSS variables don't exist here). The font
// is Next's built-in default — pass `fonts` to ImageResponse for your own.
export const ogImageSize = { width: 1200, height: 630 };

type OgImageProps = {
	title: string;
	eyebrow?: string;
};

export const createOgImage = ({ title, eyebrow = 'Tackl' }: OgImageProps) =>
	new ImageResponse(
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				width: '100%',
				height: '100%',
				padding: 80,
				color: baseColors.global.white,
				background: `radial-gradient(60% 80% at 50% 120%, ${baseColors.brand.c2}, ${baseColors.global.black})`,
			}}
		>
			<div style={{ display: 'flex', fontSize: 32, opacity: 0.7 }}>{eyebrow}</div>
			<div style={{ display: 'flex', fontSize: 88, lineHeight: 1.05, letterSpacing: -2, maxWidth: 960 }}>
				{title}
			</div>
		</div>,
		ogImageSize
	);
