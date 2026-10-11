# Global Context Usage Guide

## Overview

The GlobalContext provides shared state management across your application. It's already set up in the root layout, so this guide focuses on using and extending the context in your components.

## Using the Context

### Basic Usage

To access global state in any component:

```jsx
import { useContext } from 'react';
import { GlobalContext } from '@parts/Contexts';

const YourComponent = () => {
	const { lenisRef } = useContext(GlobalContext);

	// Example: Smooth scroll to element
	const handleScroll = () => {
		lenisRef.current?.lenis?.scrollTo('#section-id', {
			duration: 1.2, // Optional: customize duration
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Optional: custom easing
		});
	};

	return <button onClick={handleScroll}>Scroll to Section</button>;
};
```

## Extending the Context

### 1. Add New Context Values

To add new global state, modify the Contexts component:

```jsx
const Contexts = ({ children }) => {
	// Existing values
	const lenisRef = useRef(null);
	const [menuOpen, setMenuOpen] = useState(false);

	// Add new refs or state
	const [theme, setTheme] = useState('light');
	const [language, setLanguage] = useState('en');

	// Include new values in context
	const contextValue = useMemo(
		() => ({
			lenisRef,
			menuOpen,
			setMenuOpen,
			theme,
			setTheme,
			language,
			setLanguage,
		}),
		[menuOpen, theme, language] // Add dependencies for memoization
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			<PerformanceProvider>{children}</PerformanceProvider>
		</GlobalContext.Provider>
	);
};
```

The context lives in `src/components/Contexts/index.tsx` — add the new keys to the `createContext` defaults there too.

### 2. Using Extended Context

Access new context values in components:

```jsx
const YourComponent = () => {
	const { theme, setTheme, language } = useContext(GlobalContext);

	return (
		<div>
			<p>Current Theme: {theme}</p>
			<button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
				Toggle Theme
			</button>
			<p>Language: {language}</p>
		</div>
	);
};
```

## Best Practices

### 1. Performance Optimization

- Use useMemo for computed values
- Include only necessary dependencies in the dependency array

```jsx
const expensiveValue = useMemo(
	() => computeExpensiveValue(dependency),
	[dependency]
);
```

### 2. State Organization

- Group related state together
- Consider creating separate contexts for different domains

```jsx
// Example: Separate authentication context
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const value = useMemo(
		() => ({
			user,
			setUser,
			isAuthenticated,
			setIsAuthenticated,
		}),
		[user, isAuthenticated]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### 3. Type Safety

If using TypeScript, define interfaces for your context:

```jsx
interface GlobalContextType {
	lenisRef: React.RefObject<LenisRef | null>;
	menuOpen: boolean;
	setMenuOpen: (value: boolean) => void;
	theme?: string;
	setTheme?: (theme: string) => void;
	// ... other properties
}

export const GlobalContext =
	createContext <
	GlobalContextType >
	{
		lenisRef: { current: null },
		menuOpen: false,
		setMenuOpen: () => {},
	};
```

## Current Available Values

| Value       | Type                          | Description                                   | Usage Example                                    |
| ----------- | ----------------------------- | --------------------------------------------- | ------------------------------------------------ |
| lenisRef    | `RefObject<LenisRef \| null>` | The ReactLenis ref (set by `SmoothScroll`)    | `lenisRef.current?.lenis?.scrollTo('#target')`   |
| menuOpen    | `boolean`                     | Whether the site menu is open                 | `data-state={menuOpen ? 'open' : 'closed'}`      |
| setMenuOpen | `(value: boolean) => void`    | Opens/closes the menu                         | `setMenuOpen(!menuOpen)`                         |

`lenisRef.current` is `null` for users with `prefers-reduced-motion` (Lenis is skipped) — fall back to native scrolling there.

For more detailed information about specific context values and their usage, refer to the relevant feature documentation in the docs directory.
