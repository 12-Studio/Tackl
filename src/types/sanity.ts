import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url';

export type SanitySeo = {
	title?: string;
	description?: string;
	image?: SanityImageSource;
};

export type ImageOrVideo = {
	mediaType?: 'image' | 'video';
	image?: SanityImageSource;
	videoUrl?: string;
};

export type HomeUsp = {
	heading: string;
	description?: string;
	image?: SanityImageSource;
};

export type HomeServiceItem = {
	heading: string;
	description?: string;
	media?: ImageOrVideo;
};

export type HomePage = {
	loadingVideoUrl?: string;
	heroVideoUrl?: string;
	heroTitle?: string;
	heroText?: string;
	introductionHeading?: string;
	introductionImages?: SanityImageSource[];
	approachHeading?: string;
	approachDescription?: string;
	usps?: HomeUsp[];
	servicesHeading?: string;
	servicesDescription?: string;
	serviceList?: HomeServiceItem[];
	buildsHeading?: string;
	buildsDescription?: string;
	featuredBuilds?: BuildCard[];
	seo?: SanitySeo;
};

export type BuildCard = {
	_id: string;
	title: string;
	slug: string;
	excerpt?: string;
	publishedAt?: string;
	coverImage?: SanityImageSource;
};

export type BuildDetail = BuildCard & {
	body?: PortableTextBlock[];
	seo?: SanitySeo;
};
