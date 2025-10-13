# App Architecture Documentation

## Overview

Tackl uses a sophisticated three-layer architecture that separates concerns between server-side rendering, client-side interactivity, and layout management. This architecture leverages Next.js 15's App Router capabilities while maintaining clean separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Root Layout (layout.tsx)                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                Client Component                        │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │              Server Component                   │  │ │
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
├── layout.tsx          # Root layout (Server Component)
├── Client.tsx          # Client wrapper (Client Component)
├── Server.tsx          # Server wrapper (Server Component)
└── (home)/
    ├── page.tsx        # Page component (Server Component)
    └── Content.tsx     # Content component (Client Component)
```

## Component Breakdown

### 1. Root Layout (`app/layout.tsx`)

**Purpose**: The root layout that wraps the entire application.

**Type**: Server Component (default in Next.js)

**Responsibilities**:

- Imports global CSS styles
- Imports Waffl Web Components
- Sets up the component hierarchy
- Provides the base HTML structure

```typescript
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Client>
            <Server>{children}</Server>
        </Client>
    );
};
```

**Key Features**:

- ✅ Server-side rendered by default
- ✅ Imports global styles (`@css/global.css`)
- ✅ Imports Waffl Web Components
- ✅ Sets up component hierarchy

### 2. Client Component (`app/Client.tsx`)

**Purpose**: Handles all client-side functionality and browser-specific features.

**Type**: Client Component (`'use client'`)

**Responsibilities**:

- Manages client-side state and effects
- Handles animations (GSAP + Lenis)
- Provides theme context
- Manages development tools
- Handles browser-specific features

```typescript
'use client';

const Client = ({ children }: { children: React.ReactNode }) => {
    // Client-side logic here
    return (
        <html lang='en' className={classes}>
            <body>
                <StyledComponentsRegistry>
                    <ThemeProvider theme={theme}>
                        <GlobalStyle />
                        {/* Development tools */}
                        <Contexts>
                            <ReactLenis />
                            <AnimationPlugins />
                            {children}
                        </Contexts>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
};
```

**Key Features**:

- ✅ Client-side rendering
- ✅ GSAP + Lenis smooth scrolling
- ✅ Styled Components theme provider
- ✅ Development tools (GridExposer)
- ✅ Production tools (CookieBar)
- ✅ Animation plugins
- ✅ Performance contexts

### 3. Server Component (`app/Server.tsx`)

**Purpose**: Handles server-side data fetching and static content.

**Type**: Server Component (default in Next.js)

**Responsibilities**:

- Fetches data at build time
- Renders static content
- Manages server-side logic
- Provides layout structure

```typescript
const Server = async ({ children }: { children: React.ReactNode }) => {
    // Server-side data fetching
    // const data = await getGlobalData();

    return (
        <>
            <Header />
            {children}
            {/* <Footer /> */}
        </>
    );
};
```

**Key Features**:

- ✅ Server-side rendering
- ✅ Data fetching at build time
- ✅ Static content generation
- ✅ SEO optimization
- ✅ Performance optimization

### 4. Page Components (`app/(home)/page.tsx`)

**Purpose**: Individual page components that define routes.

**Type**: Server Component (default in Next.js)

**Responsibilities**:

- Define page-specific data fetching
- Handle SEO metadata
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

### 5. Content Components (`app/(home)/Content.tsx`)

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
Build Time → Server Component → Page Component → Content Component
     ↓              ↓                ↓                ↓
Data Fetching → Static Content → Page Content → Interactive Content
```

### 2. Client-Side Data Flow

```
User Interaction → Content Component → Client Component → Server Component
        ↓                ↓                    ↓                ↓
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
