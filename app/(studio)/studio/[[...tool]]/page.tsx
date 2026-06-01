/**
 * Built-in authoring environment at /studio.
 * @see https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio';

import config from '../../../../sanity.config';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

const StudioPage = () => {
	return <NextStudio config={config} />;
};

StudioPage.displayName = 'StudioPage';
export default StudioPage;
