# Data Flow Documentation

## Overview

This document explains how data flows through the Tackl application architecture, from server-side data fetching to client-side state management and user interactions.

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Data Flow Overview                      │
├─────────────────────────────────────────────────────────────┤
│  Server-Side Data Flow                                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Build Time → Server Component → Page Component        │ │
│  │       ↓              ↓                ↓               │ │
│  │  Data Fetching → Static Content → Page Content        │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Client-Side Data Flow                                      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  User Interaction → Content Component → Client Component│ │
│  │       ↓                    ↓                ↓          │ │
│  │  State Update → Re-render → Theme Update              │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Server-Side Data Flow

### 1. Build Time Data Fetching

**Location**: Server Components
**Purpose**: Fetch data at build time for static generation
**Benefits**: Better performance, SEO, and user experience

```typescript
// Server Component (app/Server.tsx)
async function getGlobalData() {
    try {
        const data = await performRequest(GET_GLOBAL);
        return data;
    } catch (error) {
        console.error('Failed to fetch data from DatoCMS:', error);
        return null;
    }
}

const Server = async ({ children }: { children: React.ReactNode }) => {
    const data = await getGlobalData();

    return (
        <>
            <Header data={data} />
            {children}
        </>
    );
};
```

### 2. Page-Specific Data Fetching

**Location**: Page Components
**Purpose**: Fetch data specific to individual pages
**Benefits**: Page-specific optimization and SEO

```typescript
// Page Component (app/(home)/page.tsx)
async function getHomeData() {
    try {
        const data = await performRequest(GET_HOME);
        return data;
    } catch (error) {
        console.error('Failed to fetch home data:', error);
        return null;
    }
}

const Page = async () => {
    const data = await getHomeData();

    return <Content data={data} />;
};
```

### 3. Data Passing to Client Components

**Location**: Server to Client Component boundary
**Purpose**: Pass server-fetched data to client components
**Benefits**: Hydration consistency and performance

```typescript
// Server Component passes data to Client Component
<Content data={data} />

// Client Component receives and uses data
const Content = ({ data }: HomeProps) => {
    const [localState, setLocalState] = useState(data);

    return (
        <div>
            {/* Use data and localState here */}
        </div>
    );
};
```

## Client-Side Data Flow

### 1. User Interaction Flow

**Location**: Content Components
**Purpose**: Handle user interactions and state updates
**Benefits**: Responsive user experience

```typescript
// Content Component (app/(home)/Content.tsx)
const Content = ({ data }: HomeProps) => {
    const [state, setState] = useState(data);

    const handleUserInteraction = () => {
        setState(prevState => ({
            ...prevState,
            // Update state based on user interaction
        }));
    };

    return (
        <div onClick={handleUserInteraction}>
            {/* Interactive content */}
        </div>
    );
};
```

### 2. Context Data Flow

**Location**: Client Component
**Purpose**: Share data across component tree
**Benefits**: Avoid prop drilling and centralize state

```typescript
// Client Component (app/Client.tsx)
<ThemeProvider theme={theme}>
    <Contexts>
        <Server>
            <Page>
                <Content /> {/* Has access to theme context */}
            </Page>
        </Server>
    </Contexts>
</ThemeProvider>
```

### 3. Animation Data Flow

**Location**: Client Component
**Purpose**: Handle animation state and updates
**Benefits**: Smooth animations and performance

```typescript
// Client Component (app/Client.tsx)
const Client = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);
        return () => gsap.ticker.remove(update);
    }, []);

    return (
        <Contexts>
            <ReactLenis ref={lenisRef} />
            <AnimationPlugins />
            {children}
        </Contexts>
    );
};
```

## Data Flow Patterns

### 1. Server-to-Client Data Flow

```
Server Component → Page Component → Content Component
       ↓                ↓                ↓
   Data Fetching → Data Passing → Data Consumption
```

**Implementation**:

```typescript
// 1. Server Component fetches data
const Server = async () => {
    const data = await getGlobalData();
    return <Page data={data} />;
};

// 2. Page Component receives and passes data
const Page = ({ data }) => {
    return <Content data={data} />;
};

// 3. Content Component consumes data
const Content = ({ data }) => {
    return <div>{data.title}</div>;
};
```

### 2. Client-to-Server Data Flow

```
Content Component → Client Component → Server Component
       ↓                ↓                ↓
   State Update → Context Update → Data Refresh
```

**Implementation**:

```typescript
// 1. Content Component updates state
const Content = ({ data }) => {
    const [state, setState] = useState(data);

    const updateData = () => {
        setState(prevState => ({
            ...prevState,
            updated: true
        }));
    };

    return <button onClick={updateData}>Update</button>;
};

// 2. Client Component provides context
<ThemeProvider theme={theme}>
    <Content />
</ThemeProvider>

// 3. Server Component receives updated data
const Server = ({ data }) => {
    // Data is updated through props
    return <Content data={data} />;
};
```

### 3. Context Data Flow

```
ThemeProvider → All Child Components
       ↓
   Theme Context
```

**Implementation**:

```typescript
// 1. ThemeProvider provides theme context
<ThemeProvider theme={theme}>
    <Server>
        <Page>
            <Content /> {/* Has access to theme */}
        </Page>
    </Server>
</ThemeProvider>

// 2. Any component can access theme
const StyledComponent = styled.div`
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.font.family.body};
`;
```

## Data Flow Best Practices

### 1. Server-Side Data Fetching

- **Build Time**: Fetch data at build time for static generation
- **Error Handling**: Implement proper error handling
- **Fallbacks**: Provide fallback data for failed requests
- **Caching**: Use Next.js caching strategies

```typescript
// Good: Proper error handling and fallbacks
async function getData() {
	try {
		const data = await fetch('/api/data');
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return { fallback: true }; // Provide fallback
	}
}
```

### 2. Client-Side State Management

- **Local State**: Use useState for component-specific state
- **Context**: Use context for shared state
- **Props**: Pass data through props when appropriate
- **Performance**: Optimize re-renders

```typescript
// Good: Efficient state management
const Content = ({ data }) => {
    const [state, setState] = useState(data);

    // Memoize expensive calculations
    const expensiveValue = useMemo(() => {
        return computeExpensiveValue(state);
    }, [state]);

    return <div>{expensiveValue}</div>;
};
```

### 3. Data Flow Optimization

- **Code Splitting**: Split code by feature
- **Lazy Loading**: Load components when needed
- **Memoization**: Use React.memo for performance
- **Context Optimization**: Avoid unnecessary re-renders

```typescript
// Good: Optimized component
const Content = React.memo(({ data }) => {
    return <div>{data.title}</div>;
});
```

## Common Data Flow Issues

### 1. Hydration Mismatch

**Problem**: Server and client render different content
**Solution**: Ensure consistent rendering

```typescript
// Bad: Different content on server and client
const Content = ({ data }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // This causes hydration mismatch

    return <div>{data.title}</div>;
};

// Good: Consistent rendering
const Content = ({ data }) => {
    return <div>{data.title}</div>;
};
```

### 2. Data Fetching Issues

**Problem**: Data not available when needed
**Solution**: Proper data fetching and error handling

```typescript
// Bad: No error handling
const Page = async () => {
    const data = await getData(); // Might fail
    return <Content data={data} />;
};

// Good: Proper error handling
const Page = async () => {
    try {
        const data = await getData();
        return <Content data={data} />;
    } catch (error) {
        console.error('Error fetching data:', error);
        return <Content data={null} />;
    }
};
```

### 3. Performance Issues

**Problem**: Unnecessary re-renders
**Solution**: Optimize component rendering

```typescript
// Bad: Unnecessary re-renders
const Content = ({ data }) => {
    const [state, setState] = useState(data);

    // This causes re-render on every parent update
    return <div>{state.title}</div>;
};

// Good: Optimized rendering
const Content = React.memo(({ data }) => {
    return <div>{data.title}</div>;
});
```

## Debugging Data Flow

### 1. Server-Side Debugging

- **Console Logging**: Add strategic logs
- **Data Inspection**: Check fetched data
- **Error Handling**: Monitor error logs
- **Performance**: Monitor build times

### 2. Client-Side Debugging

- **React DevTools**: Inspect component state
- **Console Logging**: Add strategic logs
- **Network Tab**: Check data fetching
- **Performance Tab**: Monitor performance

### 3. Data Flow Debugging

- **Props Inspection**: Check data passing
- **State Inspection**: Monitor state changes
- **Context Inspection**: Check context values
- **Performance Monitoring**: Monitor re-renders

## Conclusion

Understanding data flow is crucial for building effective applications with Tackl. This architecture provides a solid foundation for managing data from server-side fetching to client-side interactions while maintaining performance and user experience.

For more specific implementation details, refer to the individual component documentation and the main App Architecture guide.
