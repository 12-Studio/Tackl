import { defineField, defineType } from 'sanity';

export const imageOrVideoType = defineType({
	name: 'imageOrVideo',
	title: 'Image or video',
	type: 'object',
	fields: [
		defineField({
			name: 'mediaType',
			title: 'Media type',
			type: 'string',
			options: {
				list: [
					{ title: 'Image', value: 'image' },
					{ title: 'Video', value: 'video' },
				],
				layout: 'radio',
			},
			initialValue: 'image',
		}),
		defineField({
			name: 'image',
			type: 'image',
			options: { hotspot: true },
			hidden: ({ parent }) => parent?.mediaType !== 'image',
		}),
		defineField({
			name: 'video',
			type: 'file',
			title: 'Video file',
			options: { accept: 'video/*' },
			hidden: ({ parent }) => parent?.mediaType !== 'video',
		}),
	],
	preview: {
		select: { mediaType: 'mediaType', image: 'image' },
		prepare: ({ mediaType, image }) => ({
			title: mediaType === 'video' ? 'Video' : 'Image',
			media: image,
		}),
	},
});
