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

	// Cache Components (Next 16) — data fetching is dynamic by default and you
	// opt into caching with the `use cache` directive at page, component or
	// function level. Next prerenders a static shell and streams the dynamic
	// parts in, so a route is no longer all-or-nothing static.
	//
	// It also turns on Partial Prerendering as the default App Router behaviour
	// (the old `experimental.ppr` flag is gone) and uses React's <Activity> to
	// keep recently visited routes mounted-but-hidden, so component state
	// survives a back navigation.
	//
	// NOTE • Requires the Node.js runtime — the `edge` runtime is deprecated in
	// 16.3 and unsupported here. Anything reading uncached I/O (`new Date()`,
	// `cookies()`, a CMS call) makes that route dynamic unless you mark it
	// `'use cache'` — see app/sitemap.ts for the pattern.
	cacheComponents: true,

	// Partial Prefetching (Next 16.3) — instead of prefetching a whole route per
	// visible <Link>, Next prefetches one reusable App Shell per route and fills
	// in the per-link bits (params, searchParams) on navigation. A page with 50
	// links to 3 routes fetches 3 shells rather than 50 route payloads.
	//
	// Requires `cacheComponents` above — `next dev`/`next build` throw at config
	// validation without it. Opt a single link into fetching its runtime data
	// with <Link prefetch={true}>, or a whole segment with `export const prefetch`.
	partialPrefetching: true,

	experimental: {
		webVitalsAttribution: ['CLS', 'LCP'],

		// Turbopack persistent cache — saves compilation work under `.next` and
		// restores it on the next run. Both default to `true` as of 16.3; they
		// are spelled out here so the trade-off is visible.
		//
		// NOTE • The build cache only pays off when `.next/cache` survives between
		// builds. Netlify restores it for you; a container that starts from a
		// clean layer does not, so set `ForBuild` to false there rather than
		// writing a cache nothing will read.
		turbopackFileSystemCacheForDev: true,
		turbopackFileSystemCacheForBuild: true,

		// How aggressively Turbopack drops in-memory copies of cache data it has
		// already written to disk — the reason long dev sessions hold on to far
		// less RAM in 16.3. 'auto' evicts once enough has been allocated to be
		// worth it, 'full' evicts on every snapshot, `false` never evicts.
		// Only has an effect while the FileSystem cache above is enabled.
		turbopackMemoryEviction: 'auto',

		// Offline support — tracks connectivity via the browser's online/offline
		// events plus failed framework fetches, polls with HEAD requests while
		// down (backing off to 3s), and replays blocked navigations, prefetches
		// and Server Actions once the connection returns. Also exposes the
		// `useOffline` hook from 'next/offline' for offline UI in Client
		// Components.
		useOffline: true,

		// Prefetch inlining bundles small segment responses into a single
		// response rather than requesting each separately. On by default —
		// override the thresholds (bytes, gzipped) or set `false` when debugging
		// navigation or counting requests.
		// prefetchInlining: { maxSize: 2048, maxBundleSize: 10240 },

		// Production JS chunking. Defaults shown; sizes are bytes of uncompressed,
		// unminified code. `generateComponentChunks` additionally emits each
		// merged chunk's constituent parts so navigations can skip re-downloading
		// code the browser already has.
		// turbopackChunking: {
		// 	minChunkSize: 50000,
		// 	maxChunkCountPerGroup: 40,
		// 	maxMergeChunkSize: 200000,
		// 	minComponentChunkSize: 20000,
		// 	generateComponentChunks: false,
		// },

		// Native Rust port of the React Compiler, run inside Turbopack instead of
		// through Babel — much faster, and no `babel-plugin-react-compiler` to
		// install. Needs the top-level `reactCompiler: true` alongside it, and
		// throws under webpack.
		// turbopackRustReactCompiler: true,

		// Resolve `postcss.config.js` from each CSS file's own directory first,
		// falling back to the project root. Useful in a monorepo where packages
		// need different transforms; Tackl has a single root config.
		// turbopackLocalPostcssConfig: true,

		// `next build` type-checks by shelling out to the project-local `tsc`,
		// which is what makes TypeScript 6 (and, ahead of its JS API, TypeScript 7)
		// work. Set false to go back to the TypeScript compiler API.
		// useTypeScriptCli: false,
	},

	// `next dev` upserts a managed <!-- BEGIN:nextjs-agent-rules --> block into
	// AGENTS.md / CLAUDE.md pointing agents at the version-matched docs bundled
	// in node_modules/next/dist/docs. Anything outside the markers is preserved,
	// and the block is committed so the working tree stays clean. Set false to
	// stop Next writing to those files.
	agentRules: true,

	// Salt mixed into every content-addressed output filename. Change it to
	// force all chunk hashes to change and bust browser caches without touching
	// source. Concatenated with the NEXT_HASH_SALT env var when both are set.
	// outputHashSalt: 'tackl',

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
