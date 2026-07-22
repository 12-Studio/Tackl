// Site Settings Schema
// ------------
// NOTE • Global/site-wide content — matches GET_GLOBAL in
// src/cms/sanity/queries/getGlobal.ts. Add navigation, socials, footer
// content etc. here.

// Imports
// ------------
import { defineField, defineType } from 'sanity';

// Exports
// ------------
export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'siteName',
			title: 'Site Name',
			type: 'string',
		}),
	],
});
