# Sanity + Next.js Integration Guide

> **Tackl note:** choosing Sanity in the CLI now ships the core of this setup out of the box — the embedded Studio at `/studio` (`app/(studio)/studio/[[...tool]]/page.tsx` + root `sanity.config.ts`), schemas in `sanity/schemaTypes/` (`homePage`, `siteSettings`), the draft-mode routes under `app/api/draft-mode/`, and the fetch adapter at `src/cms/sanity/` (imported as `import { fetchContent } from '@cms'`); the CLI can also run `bunx sanity init --env .env` for you. This guide remains the **deep spec** for the rest — live content (`SanityLive`), visual editing / Presentation, and deployment. When following it, keep the `@cms` seam: grow the adapter in `src/cms/sanity/` (e.g. re-export `fetchSanity` there) instead of importing Sanity libraries from app code directly. See [docs/CMS.md](../CMS.md).

Use this document as a **replication spec** for embedding Sanity CMS into a Next.js App Router project. It describes the architecture the Tackl Sanity scaffold is built on: one repo, one build, site + Studio + draft preview deployed together.

---

## Goals

- Embed **Sanity Studio** at `/studio` inside the Next.js app (no separate Studio deploy required).
- Fetch content with **GROQ** in Server Components.
- Support **live content updates** (`SanityLive`) and **visual draft preview** (Presentation tool + Next.js draft mode).
- Deploy to **Netlify** with public Sanity env vars in `netlify.toml` and secrets in the Netlify UI.

---

## Tech stack

| Package | Version (approx.) | Role |
|---------|-------------------|------|
| `next` | 16.x | App Router, draft mode |
| `sanity` | 5.x | Studio + schema |
| `next-sanity` | 13.x | Client, live, studio, visual editing |
| `@sanity/image-url` | 2.x | Image URLs |
| `@sanity/vision` | 5.x | GROQ runner in Studio |
| `sanity-plugin-media` | 4.x | Media library tab |
| `@portabletext/react` | 6.x | Rich text rendering |
| `server-only` | — | Guard server-only fetch modules |

**Build command:** `next build --webpack` (via `bun run build`).

**Node:** `>= 24`.

---

## Architecture overview

```
┌─────────────────────────────────────────────────────────────┐
│  Single Next.js app (one Netlify deploy)                    │
├──────────────────────────┬──────────────────────────────────┤
│  app/(site)/             │  app/(studio)/                   │
│  Public website          │  Sanity Studio at /studio        │
│  - GROQ fetch            │  - NextStudio                    │
│  - SanityLive            │  - Bare html/body layout         │
│  - Visual editing        │  - No site theme/header          │
│  - Draft mode overlays   │                                  │
└──────────────────────────┴──────────────────────────────────┘
         │                              │
         └──────────┬───────────────────┘
                    ▼
           Sanity project (CDN + API)
```

**No top-level layout in `app/`.** Each route group owns its own root layout (`<html>` / `<body>`); only `sitemap.ts`, `robots.ts`, and `icon.svg` sit at the `app/` root.

---

## Directory structure

The kit already ships the skeleton of this layout: `app/(site)/` (site root layout + `Providers.tsx` + `(home)/`), `app/(studio)/` (bare layout + `studio/[[...tool]]/page.tsx`), `app/api/draft-mode/`, root `sanity.config.ts`, `sanity/schemaTypes/` (`homePage`, `siteSettings`), and the adapter in `src/cms/sanity/` (`client.ts`, `queries/`). The tree below is the **full** target this guide builds towards — extend the shipped files into it (paths are relative to project root):

```
app/
  (site)/
    layout.tsx              # Site root: shell (html/body, header), SanityLive, VisualEditing
    Providers.tsx           # Client-side providers (theme, contexts)
    (home)/
      layout.tsx            # generateMetadata from Sanity
      page.tsx              # Homepage — fetchSanity(homePageQuery)
    builds/
      page.tsx              # Build index
      [slug]/page.tsx       # Build detail + generateStaticParams
  (studio)/
    layout.tsx              # Minimal studio root layout
    studio/[[...tool]]/page.tsx   # NextStudio mount
  api/
    draft-mode/
      enable/route.ts       # defineEnableDraftMode (503 if no token)
      disable/route.ts      # draftMode().disable() + redirect

sanity/
  env.ts                    # projectId, dataset, previewOrigin, studioUrl
  config.ts → sanity.config.ts (root)   # Studio plugins + schema
  cli.ts → sanity.cli.ts (root)
  deskStructure.ts          # Custom desk navigation
  presentation/resolve.ts   # Presentation route ↔ document mapping
  schemaTypes/
    index.ts
    documents/              # homePage, build, …
    objects/                # seo, imageOrVideo, …
  lib/
    client.ts               # createClient (next-sanity)
    live.server.ts          # defineLive → sanityFetch, SanityLive
    live.ts                 # Re-export types only (no server pull-in)
    fetch.server.ts         # fetchSanity / fetchSanityPublished
    queries.ts              # GROQ strings
    image.ts                # urlFor helper
    metadata.ts             # buildMetadata from seo object

src/
  components/
    DisableDraftMode/       # “Exit draft preview” link
    SanityImage/            # next/image + urlFor
    PortableText/           # @portabletext/react wrapper
  types/sanity.ts           # TypeScript types for query results

sanity.config.ts            # Studio config (client component)
sanity.cli.ts               # CLI projectId/dataset
.env.example
netlify.toml
```

**TypeScript path alias:**

```json
"@sanity/*": ["sanity/*"]
```

Include `sanity/**/*` in `tsconfig.json` `include`.

---

## Step-by-step implementation

### 1. Install dependencies

```bash
bun add sanity next-sanity @sanity/image-url @sanity/vision sanity-plugin-media @portabletext/react @portabletext/types server-only
```

### 2. Environment variables

**`.env.example`:**

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production

# Viewer token — required for live updates and draft preview
SANITY_API_READ_TOKEN=

# Draft preview (Presentation tool)
NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN=http://localhost:3000
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio/
```

**`sanity/env.ts`** — assert required public vars at runtime:

```ts
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-01'
export const dataset = assertValue(process.env.NEXT_PUBLIC_SANITY_DATASET, 'Missing NEXT_PUBLIC_SANITY_DATASET')
export const projectId = assertValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 'Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
export const previewOrigin = process.env.NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN || 'http://localhost:3000'
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || `${previewOrigin.replace(/\/$/, '')}/studio/`
```

### 3. Sanity client

**`sanity/lib/client.ts`:**

```ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, studioUrl } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  stega: { studioUrl },
})
```

### 4. Live content + fetch helpers

**`sanity/lib/live.server.ts`** (`import 'server-only'`):

```ts
import { defineLive } from 'next-sanity/live'
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
```

**`sanity/lib/fetch.server.ts`:**

```ts
import { sanityFetch } from './live.server'

export const fetchSanity = async <T>(query: string, params?, options?) => {
  const { data } = await sanityFetch({ query, params, ...options })
  return data as T
}

export const fetchSanityPublished = async <T>(query: string, params?) =>
  fetchSanity<T>(query, params, { perspective: 'published', stega: false })
```

Use **`fetchSanityPublished`** for `generateMetadata` and `generateStaticParams`. Use **`fetchSanity`** in pages that should reflect drafts when draft mode is on.

### 5. Studio config

**`sanity.config.ts`** (`'use client'`):

```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { apiVersion, dataset, previewOrigin, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/deskStructure'
import { resolve } from './sanity/presentation/resolve'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  name: 'Your Project',
  schema,
  plugins: [
    presentationTool({
      resolve,
      allowOrigins: [previewOrigin, 'http://localhost:3000'],
      previewUrl: {
        initial: '/',
        origin: previewOrigin,
        previewMode: { enable: '/api/draft-mode/enable/' },
      },
    }),
    structureTool({ structure }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
```

### 6. Studio page

**`app/(studio)/studio/[[...tool]]/page.tsx`:**

```tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

**`app/(studio)/layout.tsx`** — minimal layout (no site CSS/theme).

### 7. Site layout + draft preview

**`app/(site)/layout.tsx`:**

```tsx
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { SanityLive } from '@sanity/lib/live.server'
import DisableDraftMode from '@parts/DisableDraftMode'
import Header from '@parts/Header'
import Providers from './Providers'

export default async function SiteLayout({ children }) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main id="page">{children}</main>
        </Providers>

        <SanityLive />
        {isDraftMode ? (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        ) : null}
      </body>
    </html>
  )
}
```

Render `SanityLive`/`VisualEditing` **outside** the main app shell (after `</main>` — or after `</Providers>` — still inside `<body>`) so overlays do not interfere with layout.

**`app/(site)/Providers.tsx`** — client-side providers only (`'use client'`: theme, contexts); the layout owns the shell.

### 8. Draft mode API routes

**`app/api/draft-mode/enable/route.ts`:**

```ts
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@sanity/lib/client'

const readToken = process.env.SANITY_API_READ_TOKEN
const { GET: enableDraftMode } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken ?? '' }),
})

export async function GET(request: Request) {
  if (!readToken) {
    return new Response(
      'Draft preview is not configured. Set SANITY_API_READ_TOKEN, then redeploy.',
      { status: 503 },
    )
  }
  return enableDraftMode(request)
}
```

**`app/api/draft-mode/disable/route.ts`:**

```ts
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { previewOrigin } from '@sanity/env'

export async function GET() {
  ;(await draftMode()).disable()
  return NextResponse.redirect(new URL('/', previewOrigin))
}
```

### 9. Presentation resolve (route mapping)

**`sanity/presentation/resolve.ts`** — map CMS documents to frontend URLs:

```ts
import { defineDocuments, defineLocations } from 'sanity/presentation'

export const resolve = {
  mainDocuments: defineDocuments([
    { route: '/', filter: `_type == "homePage" && _id == "homePage"` },
    {
      route: '/builds/:slug',
      resolve: ({ params }) => ({
        filter: `_type == "build" && slug.current == $slug`,
        params: { slug: params.slug },
      }),
    },
  ]),
  locations: {
    homePage: defineLocations({
      select: { headline: 'heroTitle' },
      resolve: (doc) => ({ locations: [{ title: doc?.headline || 'Home', href: '/' }] }),
    }),
    build: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Build', href: doc?.slug ? `/builds/${doc.slug}/` : '/builds/' },
          { title: 'All builds', href: '/builds/' },
        ],
      }),
    }),
  },
}
```

Adjust routes to match your app (trailing slashes if `trailingSlash: true` in `next.config.js`).

### 10. Content schema patterns

**Singleton homepage** (`homePage`):

- Fixed document id: `homePage` (create via desk structure, not “New document”).
- In `sanity.config.ts`, filter out delete/duplicate actions for `homePage`.
- In `newDocumentOptions`, hide `homePage` from global “Create” menu.

**Desk structure** (`sanity/deskStructure.ts`):

```ts
const singleton = (S, type, title, icon) =>
  S.listItem().title(title).id(type).icon(icon).child(
    S.document().schemaType(type).documentId(type).title(title)
  )

export const structure = (S) =>
  S.list().title('Navigation').items([
    singleton(S, 'homePage', 'Home', HomeIcon),
    S.divider(),
    S.listItem().title('Builds').child(S.documentTypeList('build').title('All builds')),
  ])
```

**Reusable objects:** `seo`, `imageOrVideo`, etc. — register in `sanity/schemaTypes/index.ts`.

**Array fields in schema:** use `type: 'array' as const` and plain `of: [{ type: 'image' }]` members (not `defineField` inside `of`) to avoid TypeScript errors.

### 11. GROQ queries + pages

**`sanity/lib/queries.ts`** — centralise GROQ. Example:

```groq
*[_id == "homePage"][0]{ heroTitle, heroText, seo }
*[_type == "build"] | order(publishedAt desc) { _id, title, "slug": slug.current, excerpt }
*[_type == "build" && slug.current == $slug][0]{ title, body, seo }
```

**Page pattern:**

```tsx
import { fetchSanity } from '@sanity/lib/fetch.server'
import { homePageQuery } from '@sanity/lib/queries'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const page = await fetchSanity(homePageQuery)
  if (!page) return <p>No content — publish in Studio.</p>
  return <main>{page.heroTitle}</main>
}
```

**Metadata pattern** (layout or page):

```tsx
import { fetchSanityPublished } from '@sanity/lib/fetch.server'
import { buildMetadata } from '@sanity/lib/metadata'

export const generateMetadata = async () => {
  const page = await fetchSanityPublished(homePageQuery)
  return buildMetadata(page?.seo, { title: page?.heroTitle ?? 'Home' })
}
```

### 12. Next.js config

```js
// next.config.js
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
},
transpilePackages: ['next-sanity'],
trailingSlash: true, // if your routes use trailing slashes
```

---

## Netlify deployment

**`netlify.toml`:**

```toml
[build]
  command = "bun run build"

[build.environment]
  NODE_VERSION = "24"
  NEXT_PUBLIC_SANITY_PROJECT_ID = "your-project-id"
  NEXT_PUBLIC_SANITY_DATASET = "production"
  NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN = "https://your-branch--your-site.netlify.app"
  NEXT_PUBLIC_SANITY_STUDIO_URL = "https://your-branch--your-site.netlify.app/studio/"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**In Netlify UI (Site settings → Environment variables):**

| Variable | Required | Purpose |
|----------|----------|---------|
| `SANITY_API_READ_TOKEN` | Yes (for preview/live) | Viewer token from sanity.io/manage → API → Tokens |

Without `SANITY_API_READ_TOKEN`:
- Build still succeeds.
- Published content can still be fetched (CDN).
- `/api/draft-mode/enable/` returns **503**.
- Presentation preview and `SanityLive` are degraded.

**Publish directory:** leave empty (Next.js plugin handles output).

---

## Sanity CORS

Presentation and draft mode need credentialed CORS on your site origin.

**`package.json` scripts:**

```json
"sanity:cors": "sanity cors add http://localhost:3000 --credentials",
"sanity:cors:production": "sanity cors add https://your-site.netlify.app --credentials"
```

Run both after creating the Sanity project.

---

## Local development

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_READ_TOKEN

bun run dev
# Site:    http://localhost:3000/
# Studio:  http://localhost:3000/studio/
```

**CLI** (schema deploy, CORS, etc.):

```bash
bunx sanity schema deploy   # if using separate schema deploy
bun run sanity:cors
```

---

## Content model reference (Tackl)

| Schema | Type | Notes |
|--------|------|-------|
| `homePage` | Singleton | Hero, introduction, approach, services, builds, SEO groups |
| `build` | Collection | Title, slug, excerpt, cover, portable text body, SEO |
| `seo` | Object | title, description, image |
| `imageOrVideo` | Object | mediaType, image, video file |
| `homeUsp` | Object | heading, description, image |
| `homeServiceItem` | Object | heading, description, media |

Studio plugins: **Presentation**, **Structure** (custom desk), **Media**, **Vision**.

---

## Checklist for a new project

- [ ] Create Sanity project + dataset at [sanity.io/manage](https://sanity.io/manage)
- [ ] Add env vars (local + Netlify)
- [ ] Create `sanity/` folder, `sanity.config.ts`, `sanity.cli.ts`
- [ ] Split app into `(site)` and `(studio)` route groups with separate root layouts
- [ ] Mount `NextStudio` at `/studio`
- [ ] Wire `defineLive` + `<SanityLive />` in site layout
- [ ] Add draft-mode API routes with 503 guard when token missing
- [ ] Configure `presentationTool` + `resolve.ts` route mapping
- [ ] Add CORS for localhost and production URL (with credentials)
- [ ] Add `cdn.sanity.io` to `next.config.js` images
- [ ] Add `@sanity/*` path alias in `tsconfig.json`
- [ ] Create viewer token and set `SANITY_API_READ_TOKEN` on Netlify
- [ ] Publish singleton `homePage` document in Studio
- [ ] Verify Presentation preview opens site in draft mode
- [ ] Verify “Exit draft preview” disables draft mode

---

## Common pitfalls

1. **Missing `NEXT_PUBLIC_SANITY_DATASET` at build time** — Netlify build fails or Studio shows blank project. Put public vars in `netlify.toml` or Netlify UI.

2. **Draft mode 500/503** — `SANITY_API_READ_TOKEN` not set on the deploy environment. Enable route should return 503 with a clear message, not throw.

3. **Presentation preview broken** — CORS missing or `allowOrigins` / `previewOrigin` mismatch with actual deploy URL.

4. **`useCdn` + drafts** — live/draft fetches use the token path via `defineLive`; metadata/static params should use `fetchSanityPublished`.

5. **Studio inside site layout** — Studio must use `(studio)/layout.tsx` without site theme, Lenis, or global CSS that breaks Studio UI.

6. **Trailing slashes** — Presentation `href` values and `previewUrl.initial` must match `next.config.js` `trailingSlash` setting.

7. **Server-only imports** — never import `live.server.ts` or `fetch.server.ts` from client components. Use `sanity/lib/live.ts` for types only.

---

## Prompt template for another project

Copy everything below into your AI / project brief:

---

> Implement Sanity CMS in this Next.js App Router project using the **embedded Studio** pattern from the Tackl `sanity` branch.
>
> Requirements:
> 1. Route groups: `app/(site)/` for the public site, `app/(studio)/` for Studio at `/studio` with a minimal root layout.
> 2. No top-level layout in `app/` — each group owns `<html>/<body>`.
> 3. `sanity/` folder with `env.ts`, `lib/client.ts`, `lib/live.server.ts`, `lib/fetch.server.ts`, `lib/queries.ts`, `lib/image.ts`, `lib/metadata.ts`, `schemaTypes/`, `deskStructure.ts`, `presentation/resolve.ts`.
> 4. Root `sanity.config.ts` with Presentation, Structure, Media, and Vision plugins.
> 5. Draft mode: `/api/draft-mode/enable/` (503 if `SANITY_API_READ_TOKEN` missing) and `/api/draft-mode/disable/`.
> 6. Site layout: `<SanityLive />`, conditional `<VisualEditing />` + exit-draft link when draft mode is on.
> 7. Singleton `homePage` document + `build` collection schema; custom desk structure.
> 8. Pages fetch via `fetchSanity` / `fetchSanityPublished`; metadata via `buildMetadata`.
> 9. Netlify: public Sanity env in `netlify.toml`; `SANITY_API_READ_TOKEN` in UI; `bun run build` with Node 24.
> 10. CORS scripts for localhost and production with `--credentials`.
> 11. `next.config.js`: `cdn.sanity.io` remote images, transpile `next-sanity`.
> 12. Follow pitfalls in `docs/Sanity/README.md`.
>
> Match file structure and patterns in that README. Do not use a separate Studio deploy.

---

## Reference implementation

This repo's Sanity scaffold ships the starting point; key files (some, like the `sanity/lib/` and `sanity/presentation/` helpers, are built by following this guide):

- `sanity.config.ts`
- `app/(site)/layout.tsx`, `app/(site)/Providers.tsx`
- `app/(studio)/layout.tsx`, `app/(studio)/studio/[[...tool]]/page.tsx`
- `app/api/draft-mode/enable/route.ts`, `app/api/draft-mode/disable/route.ts`
- `sanity/schemaTypes/` (`homePage`, `siteSettings`)
- `src/cms/sanity/` (`client.ts`, `queries/`)
- `sanity/lib/live.server.ts`, `sanity/lib/fetch.server.ts`
- `sanity/presentation/resolve.ts`
- `netlify.toml`
- `.env.example`
