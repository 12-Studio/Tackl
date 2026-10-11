// Imports
// ------------
import { siteUrl } from '@/config';

// llms.txt
// ------------
// NOTE • Served at /llms.txt — a Markdown map of the site for AI agents and
// LLMs (https://llmstxt.org). Lighthouse's Agentic Browsing category checks
// it has an H1, at least one link and some substance. Keep the summary and
// links in step with the site; with a CMS, fetch the pages and list them.
const content = `# Tackl

> The ultimate Next.js starter kit — an animation-first foundation for marketing sites.

## Pages

- [Home](${siteUrl}/): The landing page.

## Optional

- [Sitemap](${siteUrl}/sitemap.xml): Every page on the site.
`;

export const GET = () =>
	new Response(content, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
