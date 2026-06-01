import { defineField, defineType } from 'sanity';

export const homeServiceItemType = defineType({
	name: 'homeServiceItem',
	title: 'Service',
	type: 'object',
	fields: [
		defineField({
			name: 'heading',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
		}),
		defineField({
			name: 'media',
			type: 'imageOrVideo',
			title: 'Image / video',
		}),
	],
	preview: {
		select: { title: 'heading' },
	},
});
