import { defineField, defineType } from 'sanity';

export const homeUspType = defineType({
	name: 'homeUsp',
	title: 'USP',
	type: 'object',
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'image',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
		}),
	],
	preview: {
		select: { title: 'heading', media: 'image' },
	},
});
