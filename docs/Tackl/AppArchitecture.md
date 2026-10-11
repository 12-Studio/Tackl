# App Architecture Documentation

## Overview

Tackl uses a server-first architecture where the site's root layout owns the entire document shell and a single client-side `Providers` component handles browser-only concerns. This architecture leverages the Next.js App Router capabilities while maintaining clean separation of concerns.

The app has **two root layouts** via route groups (route groups don't affect URLs): `app/(site)/layout.tsx` is the website — everything described below — and `app/(studio)/layout.tsx` is a bare `html`/`body` shell for the embedded Sanity Studio at `/studio` (present in Sanity scaffolds; pruned by the CLI otherwise). There is no top-level layout in `app/`; only `sitemap.ts`, `robots.ts`, and `icon.svg` live at the `app/` root.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│        Site Root Layout ((site)/layout.tsx, Server)        │
│  ViewTransitions > html > body                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Providers (Client)                        │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │   Header + main#page > SmoothScroll             │  │ │
│  │  │  ┌─────────────────────────────────────────────┐ │  │ │
│  │  │  │            Page Components                 │ │  │ │
│  │  │  │  ┌─────────────────────────────────────┐   │ │  │ │
│  │  │  │  │   Your Components (server/client)  │   │ │  │ │
│  │  │  │  └─────────────────────────────────────┘   │ │  │ │
│  │  │  └─────────────────────────────────────────────┘ │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
app/
├── (site)/
│   ├── layout.tsx      # Site root layout: document shell + metadata (Server Component)
│   ├── Providers.tsx   # Client-side providers (Client Component)
│   └── (home)/
│       ├── layout.tsx  # Per-route metadata (commented generateMetadata example)
│       └── page.tsx    # Page component (Server Component)
├── (studio)/           # Embedded Sanity Studio (Sanity scaffolds only)
│   ├── layout.tsx      # Bare html/body shell
│   └── studio/[[...tool]]/page.tsx  # NextStudio mount at /studio
├── sitemap.ts
├── robots.ts
└── icon.svg
```

## Component Breakdown

### 1. Root Layout (`app/(site)/layout.tsx`)

**Purpose**: The site's root layout — it owns the document shell and site chrome.

**Type**: Server Component (default in Next.js)

**Responsibilities**:

- Exports site-wide `metadata` (metadataBase, title default + template, description, robots, openGraph) and `viewport` (width, initialScale, themeColor)
- Imports the stylesheets in order: `@css/tokens.css` (generated design tokens) then `@css/global.scss` (reset, base, grid, utilities)
- Renders the `html`/`body` structure with the Inter font variable
- Renders site chrome: `Header` before `main#page` for correct landmark semantics
- Fetches global/site-wide CMS data (it's async-capable, so data fetching happens here or in a dedicated server component)

```typescript
export const metadata: Metadata = { /* site-wide defaults */ };
export const viewport: Viewport = { /* width, initialScale, themeColor */ };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ViewTransitions>
            <html lang='en' className={inter.variable} suppressHydrationWarning>
                <body>
                    <Providers>
                        <Header />

                        <main id='page'>
                            <SmoothScroll>{children}</SmoothScroll>
                        </main>
                    </Providers>
                </body>
            </html>
        </ViewTransitions>
    );
};
```

**Key Features**:

- ✅ Server-side rendered by default
- ✅ Site-wide `metadata` and `viewport` exports
- ✅ Imports `@css/tokens.css` then `@css/global.scss` — styles are static CSS, no runtime
- ✅ Header rendered as a sibling before `main` (landmark semantics)
- ✅ No view-transition wrapper — pages opt in with `PageTransition` (React's `<ViewTransition>`), see [PageTransitions.md](./PageTransitions.md)
- ✅ SmoothScroll wraps page content inside `main` (a non-fixed Footer belongs inside the scrolled content, at the end of a page)

### 2. Providers (`app/(site)/Providers.tsx`)

**Purpose**: Contains only the client-side providers and browser-specific features.

**Type**: Client Component (`'use client'`)

**Responsibilities**:

- Registers the AnimationPlugins side-effect import (the Waffl grid needs no client-side registration — `Grid` from `@waffl` is a server component rendering a plain `<waffl-grid>` tag)
- Manages environment-specific tools (GridExposer/CookieBar)
- Provides the global and performance contexts (`Contexts`)

Styling needs no provider: every style is static CSS (the global stylesheet plus per-component CSS Modules), so nothing in `Providers` exists for styles.

```typescript
'use client';

import '@parts/AnimationPlugins';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{GridExposer && <GridExposer />}
			{process.env.NODE_ENV === 'production' && <CookieBar />}
			<Contexts>{children}</Contexts>
		</>
	);
};
```

**Key Features**:

- ✅ Client-side providers only — no document shell, so page content stays server-rendered
- ✅ No styling provider, registry or global-style injection — styles are static CSS
- ✅ Development tools (GridExposer)
- ✅ Production tools (CookieBar)
- ✅ Animation plugins (side-effect import)
- ✅ Performance contexts

### 3. Page Components (`app/(site)/(home)/page.tsx`)

**Purpose**: Individual page components that define routes.

**Type**: Server Component (default in Next.js)

**Responsibilities**:

- Define page-specific data fetching
- Handle SEO metadata (per-route `metadata`/`generateMetadata` — see the commented example in `app/(site)/(home)/layout.tsx`)
- Render page content
- Manage page-specific logic

```typescript
const Page = async () => {
    // Page-specific data fetching
    // const data = await getHomeData();

    return <DeleteMe />;
};
```

The kit ships with the `DeleteMe` placeholder here. Replace it with your own components, passing server-fetched data down as props.

**Key Features**:

- ✅ Server-side rendering
- ✅ Page-specific data fetching
- ✅ SEO metadata generation
- ✅ Route handling

### 4. Interactive Components (your own, e.g. `src/components/HomeContent/`)

**Purpose**: Client-side interactive components rendered by a page. The kit doesn't ship one — create them in `src/components/` when a page needs hooks, state or event handlers, and pass the page's server-fetched data in as props.

**Type**: Client Component (`'use client'`)

**Responsibilities**:

- Handle user interactions
- Manage client-side state
- Render interactive content
- Handle animations and effects

```typescript
'use client';

// src/components/HomeContent/index.tsx
const HomeContent = ({ data }: I.HomeContentProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className={s.jacket} data-state={isOpen ? 'open' : 'closed'}>
            <button type='button' onClick={() => setIsOpen(!isOpen)}>{data?.title}</button>
        </section>
    );
};
```

**Key Features**:

- ✅ Client-side interactivity
- ✅ User interactions
- ✅ Dynamic content
- ✅ Animations and effects

Only reach for `'use client'` when a component needs hooks, refs or event handlers — styling never requires it. Server Components import their `styles.module.scss` directly.

## Styles Pipeline

Styles are SCSS CSS Modules plus one global stylesheet, compiled to static CSS at build time:

```
src/theme/**  (TS design tokens — the source of truth)
      ↓  bun run styles  (scripts/build-styles.ts — runs before dev, build and storybook)
src/css/tokens.css                 :root custom properties (--brand-c1, --space-m…)
src/css/tackl/_breakpoints.scss    $breakpoints + bp() / bpd()
src/css/tackl/_grid.scss           columns, gutters, max width, design widths
      ↓
app/(site)/layout.tsx  imports @css/tokens.css, then @css/global.scss
components             import s from './styles.module.scss'
```

- The generated files are committed and never hand-edited — change a token in `src/theme`, then run `bun run styles` (or just `bun run dev`). The pre-commit hook runs `bun run styles --check` to catch stale output.
- `next.config.js` injects the Tackl SCSS layer (`src/css/tackl` — mixins and functions only, no CSS output) into every `.scss` file via `sassOptions.additionalData`, so `bp()`, the type and spacing mixins, `vw()` and `alpha()` need no imports.
- `global.scss` declares `@layer reset, base, grid, utilities;`. Component modules are unlayered, so module CSS always wins without specificity games.

See [Tackl.md](./Tackl.md) and [Theming.md](./Theming.md) for the details.

## Data Flow

### 1. Server-Side Data Flow

```
Build Time → Root Layout → Page Component → Your Components
     ↓            ↓              ↓                ↓
Data Fetching → Static Content → Page Content → Interactive Content
```

### 2. Client-Side Data Flow

```
User Interaction → Client Component → Providers → Root Layout
        ↓                ↓                ↓            ↓
   State Update → Re-render → Context Update → Data Refresh
```

## Performance Optimizations

### 1. Server-Side Optimizations

- **Static Generation**: Pages are pre-rendered at build time
- **Data Fetching**: Data is fetched on the server, not the client
- **SEO**: Server-rendered content is immediately available to crawlers
- **Performance**: Faster initial page loads

### 2. Client-Side Optimizations

- **Code Splitting**: Components are loaded only when needed
- **Lazy Loading**: Heavy components are loaded dynamically
- **Animation Optimization**: GSAP + Lenis for smooth animations
- **Static CSS**: No styling runtime in the client bundle; CSS Modules are split per route and cached
- **Theming**: Runtime theme switches override CSS custom properties (e.g. `html[data-theme='dark']`) — no re-render

### 3. Development Optimizations

- **GridExposer**: Development-only grid overlay
- **Hot Reloading**: Fast development iteration
- **Type Safety**: Full TypeScript support
- **Linting**: Code quality enforcement

## Environment-Specific Features

### Development Environment

```typescript
// Lazy, dev-only — neither its JS nor its CSS ships in production
const GridExposer = process.env.NODE_ENV === 'development' ? dynamic(() => import('@parts/GridExposer')) : null;

{GridExposer && <GridExposer />}
```

- **GridExposer**: Visual grid overlay for development
- **Hot Reloading**: Fast development iteration
- **Debug Tools**: Enhanced debugging capabilities

### Production Environment

```typescript
{process.env.NODE_ENV === 'production' && <CookieBar />}
```

- **CookieBar**: a cookie consent manager (Accept All / Accept Necessary / per-category choices) — see [CookieConsent.md](./CookieConsent.md). It's server-rendered so it paints with the page instead of popping in after hydration (which would make it a late LCP element); an inline `<head>` script (`src/components/CookieBar/consent.ts`) marks `<html data-cookie-consent>` for returning visitors before first paint, so it never flashes for them
- **Performance**: Optimized builds
- **Security**: Production-ready security measures

## Best Practices

### 1. Component Separation

- **Server Components**: Use for data fetching and static content
- **Client Components**: Use for interactivity and browser features
- **Layout Components**: Use for shared layout and structure

### 2. Data Fetching

- **Server Components**: Fetch data at build time
- **Client Components**: Handle user interactions and state
- **Page Components**: Define page-specific data requirements

### 3. Performance

- **Lazy Loading**: Load components only when needed
- **Code Splitting**: Split code by route and feature
- **Optimization**: Use Next.js optimizations

### 4. SEO

- **Server Rendering**: Ensure content is server-rendered
- **Metadata**: Use Next.js metadata API
- **Structured Data**: Implement schema.org markup

## Troubleshooting

### Common Issues

1. **Hydration Mismatch**: Ensure server and client render the same content
2. **Data Fetching**: Use appropriate data fetching methods
3. **Component Types**: Use correct component types for your use case
4. **Performance**: Monitor bundle size and loading times

### Debugging Tips

1. **React DevTools**: Use React DevTools for component inspection
2. **Next.js DevTools**: Use Next.js built-in debugging tools
3. **Console Logging**: Add strategic console.log statements
4. **Performance Monitoring**: Use browser dev tools for performance analysis

## Conclusion

This architecture provides a robust foundation for building scalable, performant web applications with Next.js. The separation of concerns between server and client components ensures optimal performance while maintaining clean, maintainable code.

For more specific implementation details, refer to the individual component documentation in the `docs/` directory.
