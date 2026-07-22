# Component Hierarchy Documentation

## Overview

This document explains the component hierarchy and data flow in the Tackl application architecture. Understanding this hierarchy is crucial for effective development and debugging.

## Component Tree Structure

```
RootLayout (app/layout.tsx)
├── ViewTransitions
│   └── html > body
│       └── Providers (app/Providers.tsx)
│           ├── StyledComponentsRegistry
│           │   └── ThemeProvider
│           │       ├── GlobalStyle
│           │       ├── GridExposer (dev only)
│           │       ├── CookieBar (prod only)
│           │       └── Contexts
│           │           ├── Header
│           │           └── main#page
│           │               └── SmoothScroll
│           │                   └── Page Components
│           │                       └── Content Components
```

## Detailed Component Breakdown

### 1. RootLayout (`app/layout.tsx`)

**Position**: Top-level component
**Type**: Server Component
**Purpose**: Application entry point — owns the document shell and site chrome

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

**Responsibilities**:

- Exports site-wide `metadata` and `viewport`
- Imports global CSS
- Provides the `html`/`body` structure (Inter font variable, view transitions)
- Renders `Header` before `main#page` for correct landmark semantics
- Fetches global/site-wide CMS data (server component, so it's async-capable)
- Wraps page content in `SmoothScroll` inside `main` (a non-fixed Footer belongs inside the scrolled content, at the end of a page)

**Note**: `main#page` gets `view-transition-name: page` from `src/css/global.css` — there is no inline style.

### 2. Providers (`app/Providers.tsx`)

**Position**: Second level
**Type**: Client Component (`'use client'`)
**Purpose**: Client-side providers only

```typescript
'use client';

import '@theme/tackl/waffl/WebComponent';
import '@parts/AnimationPlugins';

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

- **Side-Effect Imports**: Waffl WebComponent registration and animation plugins
- **Theme Provider**: Styled Components theme context
- **Global Styles**: CSS custom properties and global styles
- **Environment Detection**: Different components for dev/prod
- **Performance Contexts**: Performance optimization contexts
- **No Document Shell**: `html`/`body` and site chrome live in `app/layout.tsx`, so page content stays server-rendered

### 3. Page Components (`app/(home)/page.tsx`)

**Position**: Third level
**Type**: Server Component
**Purpose**: Page-specific logic and data

```typescript
const Page = async () => {
    // Page-specific data fetching
    // const data = await getHomeData();

    return <Content data={{ page: null }} />;
};
```

**Key Features**:

- **Route Handling**: Next.js App Router integration
- **Data Fetching**: Page-specific data retrieval
- **SEO Metadata**: Page-specific meta tags
- **Performance**: Static generation

### 4. Content Components (`app/(home)/Content.tsx`)

**Position**: Fourth level
**Type**: Client Component (`'use client'`)
**Purpose**: Interactive content and user interactions

```typescript
const Content = ({ data }: HomeProps) => {
    return (
        <>
            <DeleteMe />
        </>
    );
};
```

**Key Features**:

- **User Interactions**: Click handlers, form inputs
- **State Management**: Client-side state
- **Animations**: Interactive animations
- **Dynamic Content**: Real-time updates

## Data Flow Patterns

### 1. Server-to-Client Data Flow

```
Root Layout → Page Component → Content Component
       ↓             ↓                ↓
   Data Fetching → Data Passing → Data Consumption
```

**Example**:

```typescript
// Root Layout (app/layout.tsx)
const data = await getGlobalData();

// Page Component (page.tsx)
return <Content data={data} />;

// Content Component (Content.tsx)
const Content = ({ data }: HomeProps) => {
    // Use data here
};
```

### 2. Client-to-Server Data Flow

```
Content Component → Providers → Root Layout
       ↓                ↓            ↓
   State Update → Context Update → Data Refresh
```

**Example**:

```typescript
// Content Component
const [state, setState] = useState();

// Providers
<ThemeProvider theme={theme}>
    {/* Theme updates affect all children */}
</ThemeProvider>

// Root Layout
// Receives updated data through props
```

### 3. Context Data Flow

```
ThemeProvider → All Child Components
       ↓
   Theme Context
```

**Example**:

```typescript
// Providers (app/Providers.tsx)
<ThemeProvider theme={theme}>
    <Contexts>
        <Page>
            <Content /> {/* Has access to theme */}
        </Page>
    </Contexts>
</ThemeProvider>
```

## Environment-Specific Rendering

### Development Environment

```typescript
{process.env.NODE_ENV === 'development' && (
    <GridExposer />
)}
```

**Features**:

- **GridExposer**: Visual development grid
- **Hot Reloading**: Fast development iteration
- **Debug Tools**: Enhanced debugging
- **Source Maps**: Better error tracking

### Production Environment

```typescript
{process.env.NODE_ENV === 'production' && <CookieBar />}
```

**Features**:

- **CookieBar**: GDPR compliance
- **Performance**: Optimized builds
- **Security**: Production-ready
- **Analytics**: User tracking

## Performance Considerations

### 1. Server-Side Performance

- **Static Generation**: Pages pre-rendered at build time
- **Data Fetching**: Server-side data retrieval
- **SEO**: Search engine optimization
- **Caching**: Built-in Next.js caching

### 2. Client-Side Performance

- **Code Splitting**: Automatic code splitting
- **Lazy Loading**: Dynamic imports
- **Animation**: Optimized GSAP + Lenis
- **Theme**: Efficient theme switching

### 3. Development Performance

- **Hot Reloading**: Fast development iteration
- **Type Safety**: TypeScript compilation
- **Linting**: Code quality enforcement
- **Formatting**: Biome integration

## Common Patterns

### 1. Data Fetching Pattern

```typescript
// Server Component
async function getData() {
    try {
        const data = await fetch('/api/data');
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Page Component
const Page = async () => {
    const data = await getData();
    return <Content data={data} />;
};
```

### 2. State Management Pattern

```typescript
// Content Component
const Content = ({ data }: HomeProps) => {
    const [state, setState] = useState(data);

    return (
        <div>
            {/* Use state here */}
        </div>
    );
};
```

### 3. Theme Usage Pattern

```typescript
// Any component within ThemeProvider
const StyledComponent = styled.div`
	color: ${props => props.theme.colors.primary};
	font-family: ${props => props.theme.font.family.body};
`;
```

## Debugging Tips

### 1. Component Hierarchy Debugging

- **React DevTools**: Inspect component tree
- **Console Logging**: Add strategic logs
- **Props Inspection**: Check data flow
- **State Inspection**: Monitor state changes

### 2. Performance Debugging

- **Bundle Analyzer**: Analyze bundle size
- **Performance Tab**: Monitor performance
- **Network Tab**: Check data fetching
- **Lighthouse**: Performance auditing

### 3. Development Debugging

- **Source Maps**: Better error tracking
- **Hot Reloading**: Fast iteration
- **Type Checking**: TypeScript errors
- **Linting**: Code quality issues

## Best Practices

### 1. Component Organization

- **Single Responsibility**: Each component has one purpose
- **Clear Hierarchy**: Logical component structure
- **Proper Naming**: Descriptive component names
- **Documentation**: Clear component documentation

### 2. Data Flow

- **Server First**: Fetch data on the server
- **Client Second**: Handle interactions on the client
- **Context Usage**: Use context for shared state
- **Props Drilling**: Avoid excessive prop passing

### 3. Performance

- **Code Splitting**: Split code by feature
- **Lazy Loading**: Load components when needed
- **Optimization**: Use Next.js optimizations
- **Monitoring**: Monitor performance metrics

## Conclusion

Understanding the component hierarchy is essential for effective development with Tackl. This architecture provides a solid foundation for building scalable, performant web applications while maintaining clean separation of concerns.

For more specific implementation details, refer to the individual component documentation and the main App Architecture guide.
