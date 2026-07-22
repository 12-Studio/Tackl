// Sanity Studio Configuration
// ------------
// NOTE • Powers the embedded Studio at /studio (see app/(studio)).
// Project id/dataset come from .env — run `bunx sanity init --env .env`
// (or the Tackl CLI's post-scaffold prompt) to create/link a project.
// The placeholder fallback keeps builds working before that happens.

// Imports
// ------------
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

// Exports
// ------------
export default defineConfig({
	name: 'default',
	title: 'Tackl Studio',
	basePath: '/studio',

	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

	plugins: [structureTool(), visionTool()],

	schema: {
		types: schemaTypes,
	},
});
