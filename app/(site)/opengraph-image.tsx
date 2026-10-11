// Imports
// ------------
import { createOgImage, ogImageSize } from '@utils/ogImage';

// Image metadata
// ------------
// NOTE • The default share card for every page in the site — a page with its
// own opengraph-image.tsx overrides it (see src/utils/ogImage.tsx)
export const alt = 'Tackl — The ultimate Next.js starter kit';
export const size = ogImageSize;
export const contentType = 'image/png';

// Image
// ------------
const Image = () => createOgImage({ title: 'The ultimate Next.js starter kit' });

// Exports
// ------------
export default Image;
