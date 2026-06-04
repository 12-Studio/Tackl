import { defineField, defineType } from 'sanity';

import { CarIcon } from '../../icons/CarIcon';

export const buildType = defineType({
	name: 'build',
	title: 'Build',
	type: 'document',
	icon: CarIcon,
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			group: 'content',
			options: { source: 'title', maxLength: 96 },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			group: 'content',
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: 'excerpt',
			type: 'text',
			rows: 3,
			group: 'content',
		}),
		defineField({
			name: 'coverImage',
			type: 'image',
			group: 'content',
			options: { hotspot: true },
		}),
		defineField({
			name: 'body',
			type: 'array',
			group: 'content',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'seo',
			type: 'seo',
			group: 'seo',
		}),
	],
	orderings: [
		{
			title: 'Newest',
			name: 'publishedDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }],
		},
	],
	preview: {
		select: { title: 'title', media: 'coverImage', date: 'publishedAt' },
		prepare: ({ title, media, date }) => ({
			title,
			media,
			subtitle: date ? new Date(date).toLocaleDateString() : undefined,
		}),
	},
});
