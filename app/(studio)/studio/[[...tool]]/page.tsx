'use client';

// Imports
// ------------
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

// Component
// ------------
// NOTE • Mounts the full Sanity Studio at /studio (config: sanity.config.ts).
// Requires NEXT_PUBLIC_SANITY_PROJECT_ID in .env — run
// `bunx sanity init --env .env` to create/link a project.
const StudioPage = () => {
	return <NextStudio config={config} />;
};

// Exports
// ------------
export default StudioPage;
