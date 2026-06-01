import { buildType } from './documents/build';
import { homeType } from './documents/home';
import { homeServiceItemType } from './objects/homeServiceItem';
import { homeUspType } from './objects/homeUsp';
import { imageOrVideoType } from './objects/imageOrVideo';
import { seoType } from './objects/seo';

export const schema = {
	types: [
		seoType,
		imageOrVideoType,
		homeUspType,
		homeServiceItemType,
		homeType,
		buildType,
	],
};
