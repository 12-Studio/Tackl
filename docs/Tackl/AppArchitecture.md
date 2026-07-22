# App Architecture Documentation

## Overview

Tackl uses a server-first architecture where the root layout owns the entire document shell and a single client-side `Providers` component handles browser-only concerns. This architecture leverages Next.js 15's App Router capabilities while maintaining clean separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              Root Layout (layout.tsx, Server)              │
│  ViewTransitions > html > body                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Providers (Client)                        │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │   Header + main#page > SmoothScroll             │  │ │
│  │  │  ┌─────────────────────────────────────────────┐ │  │ │
│  │  │  │            Page Components                 │ │  │ │
│  │  │  │  ┌─────────────────────────────────────┐   │ │  │ │
│  │  │  │  │         Content Components         │   │ │  │ │
│  │  │  │  └─────────────────────────────────────┘   │ │  │ │
│  │  │  └─────────────────────────────────────────────┘ │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
app/
├── layout.tsx          # Root layout: document shell + metadata (Server Component)
├── Providers.tsx       # Client-side providers (Client Component)
└── (home)/
    ├── layout.tsx      # Per-route metadata (commented generateMetadata example)
    └── page.tsx        # Page component (Server Component)
```

## Component Breakdown

### 1. Root Layout (`app/layout.tsx`)

**Purpose**: The root layout that owns the document shell and site chrome.

**Type**: Server Component (default in Next.js)

**Responsibilities**:

- Exports site-wide `metadata` (metadataBase, title default + template, description, robots, openGraph) and `viewport` (width, initialScale, themeColor)
- Imports global CSS styles
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
- ✅ Imports global styles (`@css/global.css`)
- ✅ Header rendered as a sibling before `main` (landmark semantics)
- ✅ `main#page` picks up `view-transition-name: page` from `src/css/global.css`
- ✅ SmoothScroll wraps page content inside `main` (a non-fixed Footer belongs inside the scrolled content, at the end of a page)

### 2. Providers (`app/Providers.tsx`)

**Purpose**: Contains only the client-side providers and browser-specific features.

**Type**: Client Component (`'use client'`)

**Responsibilities**:

- Registers the AnimationPlugins side-effect import (the Waffl grid needs no client-side registration — it renders a plain `<waffl-grid>` tag styled by `Grid` from `@waffl`)
- Provides theme context via Styled Components
- Injects global styles
- Manages environment-specific tools (GridExposer/CookieBar)
- Provides performance contexts

```typescript
'use client';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {process.env.NODE_ENV === 'development' && <GridExposer />}
                {process.env.NODE_ENV === 'production' && <CookieBar />}
                <Contexts>{children}</Contexts>
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
};
```

**Key Features**:

- ✅ Client-side providers only — no document shell, so page content stays server-rendered
- ✅ Styled Components theme provider + registry
- ✅ Development tools (GridExposer)
- ✅ Production tools (CookieBar)
- ✅ Animation plugins (side-effect import)
- ✅ Performance contexts

### 3. Page Components (`app/(home)/page.tsx`)

**Purpose**: Individual page components that define routes.

**Type**: Server Component (default in Next.js)

**Responsibilities**:

- Define page-specific data fetching
- Handle SEO metadata (per-route `metadata`/`generateMetadata` — see the commented example in `app/(home)/layout.tsx`)
- Render page content
- Manage page-specific logic

```typescript
const Page = async () => {
    // Page-specific data fetching
    // const data = await getHomeData();

    return <Content data={{ page: null }} />;
};
```

**Key Features**:

- ✅ Server-side rendering
- ✅ Page-specific data fetching
- ✅ SEO metadata generation
- ✅ Route handling

### 4. Content Components (`app/(home)/Content.tsx`)

**Purpose**: Client-side interactive content components.

**Type**: Client Component (`'use client'`)

**Responsibilities**:

- Handle user interactions
- Manage client-side state
- Render interactive content
- Handle animations and effects

```typescript
'use client';

const Content = ({ data }: HomeProps) => {
    return (
        <>
            <DeleteMe />
        </>
    );
};
```

**Key Features**:

- ✅ Client-side interactivity
- ✅ User interactions
- ✅ Dynamic content
- ✅ Animations and effects

## Data Flow

### 1. Server-Side Data Flow

```
Build Time → Root Layout → Page Component → Content Component
     ↓            ↓              ↓                ↓
Data Fetching → Static Content → Page Content → Interactive Content
```

### 2. Client-Side Data Flow

```
User Interaction → Content Component → Providers → Root Layout
        ↓                ↓                ↓            ↓
   State Update → Re-render → Theme Update → Data Refresh
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
- **Theme Management**: Efficient theme switching

### 3. Development Optimizations

- **GridExposer**: Development-only grid overlay
- **Hot Reloading**: Fast development iteration
- **Type Safety**: Full TypeScript support
- **Linting**: Code quality enforcement

## Environment-Specific Features

### Development Environment

```typescript
{process.env.NODE_ENV === 'development' && (
    <GridExposer />
)}
```

- **GridExposer**: Visual grid overlay for development
- **Hot Reloading**: Fast development iteration
- **Debug Tools**: Enhanced debugging capabilities

### Production Environment

```typescript
{process.env.NODE_ENV === 'production' && <CookieBar />}
```

- **CookieBar**: GDPR compliance
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

This architecture provides a robust foundation for building scalable, performant web applications with Next.js 15. The separation of concerns between server and client components ensures optimal performance while maintaining clean, maintainable code.

For more specific implementation details, refer to the individual component documentation in the `docs/` directory.
