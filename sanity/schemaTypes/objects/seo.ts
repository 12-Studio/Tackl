import { defineField, defineType } from 'sanity';

export const seoType = defineType({
	name: 'seo',
	title: 'SEO',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			title: 'Meta title',
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
			title: 'Meta description',
		}),
		defineField({
			name: 'image',
			type: 'image',
			title: 'Social image',
		}),
	],
});
