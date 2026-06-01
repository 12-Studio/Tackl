import Image from 'next/image';

import { urlFor } from '@sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url';

type SanityImageProps = {
	image?: SanityImageSource;
	alt: string;
	width?: number;
	height?: number;
	priority?: boolean;
};

const SanityImage = ({
	image,
	alt,
	width = 1200,
	height = 800,
	priority = false,
}: SanityImageProps) => {
	if (!image) {
		return null;
	}

	const src = urlFor(image).width(width).height(height).auto('format').url();

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			priority={priority}
			sizes="(max-width: 768px) 100vw, 50vw"
		/>
	);
};

SanityImage.displayName = 'SanityImage';
export default SanityImage;
