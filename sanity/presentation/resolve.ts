import {
	defineDocuments,
	defineLocations,
	type PresentationPluginOptions,
} from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
	mainDocuments: defineDocuments([
		{
			route: '/',
			filter: `_type == "homePage" && _id == "homePage"`,
		},
		{
			route: '/builds/:slug',
			resolve: ({ params }) => ({
				filter: `_type == "build" && slug.current == $slug`,
				params: { slug: params.slug },
			}),
		},
	]),
	locations: {
		homePage: defineLocations({
			select: { headline: 'headline' },
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.headline || 'Homepage',
						href: '/',
					},
				],
			}),
		}),
		build: defineLocations({
			select: { title: 'title', slug: 'slug.current' },
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title || 'Build',
						href: doc?.slug ? `/builds/${doc.slug}/` : '/builds/',
					},
					{ title: 'All builds', href: '/builds/' },
				],
			}),
		}),
	},
};
