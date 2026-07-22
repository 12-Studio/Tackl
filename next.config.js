/** @type {import('next').NextConfig} */
const nextConfig = {
	// Image loader settings
	images: {
		formats: ['image/avif', 'image/webp'],
		// Optimized images are cached for a day — bump higher if your imagery
		// rarely changes (CMS images get new URLs on change anyway)
		minimumCacheTTL: 86400,
		// imageSizes defines the set of fixed image widths (in pixels) that Next.js will generate for images
		// when using the "sizes" attribute or for static image imports. These are typically used for icons,
		// avatars, or other images that are rendered at specific, small sizes.
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

		// deviceSizes defines the set of viewport widths (in pixels) that Next.js considers when generating
		// responsive images. These values are used to create different image versions for various device screen
		// sizes, enabling optimal image loading and performance across mobile, tablet, and desktop devices.
		deviceSizes: [390, 640, 750, 828, 1080, 1200, 1400, 1920, 2048, 3840],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
			{
				protocol: 'https',
				hostname: 'placehold.it',
			},
		],
	},
	// React Strict Mode is a development-only feature that helps identify potential problems
	// It enables additional checks and warnings for:
	// - Identifying unsafe lifecycles
	// - Warning about legacy string ref API usage
	// - Detecting unexpected side effects
	// - Ensuring reusable state
	// - Detecting legacy context API
	reactStrictMode: true,

	// Ensure trailing slashes are added to all routes
	trailingSlash: true,

	experimental: {
		webVitalsAttribution: ['CLS', 'LCP'],
	},

	// Styled Components settings
	compiler: {
		// styledComponents: true,
		removeConsole: process.env.NODE_ENV === 'production',

		styledComponents: {
			displayName: process.env.NODE_ENV === 'development',
			ssr: true,
			minify: true,
		},
	},
};

module.exports = nextConfig;
