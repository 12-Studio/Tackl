// Draft Mode — Sanity
// ------------
// NOTE • Lets Sanity's Presentation tool (and editors) turn on Next.js
// draft mode so pages render draft content. Requires a viewer token in
// SANITY_API_READ_TOKEN (server-only env, never NEXT_PUBLIC_) — without
// one this route responds 503 and the site simply stays on published
// content.

// Imports
// ------------
import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from './client';

// Exports
// ------------
export const { GET } = defineEnableDraftMode({
	client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
