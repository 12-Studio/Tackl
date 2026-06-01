'use client';

/**
 * Sanity Studio — embedded at /studio via app/studio/[[...tool]]/page.tsx
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { structure } from './sanity/deskStructure';
import { apiVersion, dataset, previewOrigin, projectId } from './sanity/env';
import { StudioLogo } from './sanity/Logo';
import { resolve } from './sanity/presentation/resolve';
import { schema } from './sanity/schemaTypes';

export default defineConfig({
	basePath: '/studio', // The base path Sanity Studio will be mounted at in your app
	projectId, // Your Sanity project ID
	dataset, // The dataset to use (e.g. 'production')
	name: 'Tackl', // The display title for your studio
	icon: StudioLogo, // Optional: Custom logo component for the studio
	schema,
	document: {
		newDocumentOptions: (prev, { creationContext }) => {
			if (creationContext.type === 'global') {
				return prev.filter(item => item.templateId !== 'homePage');
			}
			return prev;
		},
		actions: (prev, { schemaType }) => {
			if (schemaType === 'homePage') {
				return prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate');
			}
			return prev;
		},
	},
	// studio: {                 // Studio UI and behavior customization options
	//   components,             // Override studio UI components (navbar, logo, etc)
	//   __experimental_theme,   // Custom theme override
	// },
	plugins: [
		presentationTool({
			title: 'Presentation',
			name: 'presentation',
			resolve,
			allowOrigins: [previewOrigin, 'http://localhost:3000'],
			previewUrl: {
				initial: '/',
				origin: previewOrigin,
				previewMode: {
					enable: '/api/draft-mode/enable/',
				},
			},
		}),
		structureTool({ structure }),
		visionTool({ defaultApiVersion: apiVersion }),
	],
});
