# CMS Adapters

Tackl talks to a CMS through one seam: `@cms` (`src/cms/`). Application code never imports an adapter directly, so the choice of CMS never touches component code.

```mermaid
flowchart LR
    APP["App code\nimport { fetchContent, GET_HOME } from '@cms'"] --> E["src/cms/index.ts\nexport * from './dato'  ← the CLI rewires this line"]
    E --> D["src/cms/dato\nGraphQL via @datocms/cda-client"]
    E -.or.-> S["src/cms/sanity\nGROQ via next-sanity"]
```

## The surface

Both adapters export the same things:

| Export | What it is |
| --- | --- |
| `fetchContent<T>(query, options?)` | Runs the query, returns `T` or **`null` on any failure** (missing token, network, bad query) — it never throws, so an unconfigured CMS can't crash a route |
| `GET_HOME`, `GET_GLOBAL`, … | Query strings (GraphQL for Dato, GROQ for Sanity) living in `src/cms/{adapter}/queries/` |
| `performRequest` (Dato) / `client` (Sanity) | Adapter-native extras |

Usage in a Server Component (page, layout — anywhere async):

```tsx
import { fetchContent, GET_HOME } from '@cms';

const Page = async () => {
	const data = await fetchContent<HomeData>(GET_HOME);
	return <h1>{data?.page?.pageTitle ?? 'Fallback'}</h1>;
};
```

## Choosing an adapter

- **Via the CLI (recommended):** `bunx tackl` asks Dato / Sanity / None and prunes the repo accordingly — the unused adapter folder, its dependencies, its docs, and its `.env.example` block are removed, and `src/cms/index.ts` re-exports the one you chose.
- **Manually:** edit the one line in `src/cms/index.ts` (`export * from './dato'` ⇄ `'./sanity'`), delete the unused adapter folder, and remove its dependencies (`@datocms/cda-client`, `react-datocms`, `graphql`, `graphql-tag` for Dato; `next-sanity` for Sanity).

## Environment

| Adapter | Variables |
| --- | --- |
| DatoCMS | `NEXT_DATOCMS_API_TOKEN` |
| Sanity | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` |

`fetchContent` checks its config at call time and logs a clear error (returning `null`) when a value is missing or still `CHANGE_ME`.

## Going deeper

- DatoCMS patterns (images, structured text, SEO, realtime): [docs/DatoCMS](./DatoCMS)
- Full Sanity setup (schemas, studio, visual editing): [docs/Sanity/README.md](./Sanity/README.md)
