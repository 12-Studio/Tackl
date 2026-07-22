// Home Page Schema
// ------------
// NOTE • Matches GET_HOME in src/cms/sanity/queries/getHome.ts — extend
// both together.

// Imports
// ------------
import { defineField, defineType } from 'sanity';

// Exports
// ------------
export const homePage = defineType({
	name: 'homePage',
	title: 'Home Page',
	type: 'document',
	fields: [
		defineField({
			name: 'pageTitle',
			title: 'Page Title',
			type: 'string',
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'subtext',
			title: 'Subtext',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'seoMeta',
			title: 'SEO',
			type: 'object',
			fields: [
				defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
				defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 2 }),
			],
		}),
	],
});
