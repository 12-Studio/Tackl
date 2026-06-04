import { HomeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const homeType = defineType({
	name: 'homePage',
	title: 'Home',
	type: 'document',
	icon: HomeIcon,
	__experimental_formPreviewTitle: false,
	groups: [
		{ name: 'hero', title: 'Hero', default: true },
		{ name: 'introduction', title: 'Introduction' },
		{ name: 'approach', title: 'Approach' },
		{ name: 'services', title: 'Services' },
		{ name: 'builds', title: 'Builds' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		// Hero
		defineField({
			name: 'loadingVideo',
			title: 'Loading video',
			type: 'file',
			group: 'hero',
			options: { accept: 'video/*' },
		}),
		defineField({
			name: 'heroVideo',
			title: 'Hero video',
			type: 'file',
			group: 'hero',
			options: { accept: 'video/*' },
		}),
		defineField({
			name: 'heroTitle',
			title: 'Hero title',
			type: 'string',
			group: 'hero',
			validation: rule => rule.required(),
		}),
		defineField({
			name: 'heroText',
			title: 'Hero text',
			type: 'text',
			group: 'hero',
		}),
		// Introduction
		defineField({
			name: 'introductionHeading',
			title: 'Heading',
			type: 'string',
			group: 'introduction',
		}),
		defineField({
			name: 'introductionImages',
			type: 'array' as const,
			title: 'Images',
			group: 'introduction',
			of: [{ type: 'image', options: { hotspot: true } }],
			options: { layout: 'grid' },
		}),
		// Approach
		defineField({
			name: 'approachHeading',
			title: 'Heading',
			type: 'string',
			group: 'approach',
		}),
		defineField({
			name: 'approachDescription',
			title: 'Description',
			type: 'text',
			group: 'approach',
		}),
		defineField({
			name: 'usps',
			type: 'array' as const,
			title: 'USPs',
			group: 'approach',
			of: [{ type: 'homeUsp' }],
			validation: rule => rule.max(3),
		}),
		// Services
		defineField({
			name: 'servicesHeading',
			title: 'Heading',
			type: 'string',
			group: 'services',
		}),
		defineField({
			name: 'servicesDescription',
			title: 'Description',
			type: 'text',
			group: 'services',
		}),
		defineField({
			name: 'serviceList',
			type: 'array' as const,
			title: 'Service list',
			group: 'services',
			of: [{ type: 'homeServiceItem' }],
		}),
		// Builds (homepage section)
		defineField({
			name: 'buildsHeading',
			title: 'Heading',
			type: 'string',
			group: 'builds',
		}),
		defineField({
			name: 'buildsDescription',
			title: 'Description',
			type: 'text',
			group: 'builds',
		}),
		defineField({
			name: 'featuredBuilds',
			type: 'array' as const,
			title: 'Featured builds',
			description: 'Pick up to 4 builds — title, excerpt, image, and link come from each build.',
			group: 'builds',
			of: [{ type: 'reference', to: [{ type: 'build' }] }],
			validation: rule => rule.max(4),
		}),
		// SEO
		defineField({
			name: 'seo',
			type: 'seo',
			group: 'seo',
		}),
	],
});
