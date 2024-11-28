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
	const { lenis } = useContext(GlobalContext);

	// Example: Smooth scroll to element
	const handleScroll = () => {
		lenis.current.scrollTo('#section-id', {
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
	// Add new refs or state
	const lenis = useRef(null);
	const [theme, setTheme] = useState('light');
	const [language, setLanguage] = useState('en');

	// Include new values in context
	const contextValue = useMemo(
		() => ({
			lenis,
			theme,
			setTheme,
			language,
			setLanguage,
		}),
		[theme, language] // Add dependencies for memoization
	);

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	);
};
```

#### index.jsx

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
	lenis: React.RefObject<any>;
	theme?: string;
	setTheme?: (theme: string) => void;
	// ... other properties
}

export const GlobalContext =
	createContext <
	GlobalContextType >
	{
		lenis: { current: null },
	};
```

## Current Available Values

| Value | Type      | Description            | Usage Example                     |
| ----- | --------- | ---------------------- | --------------------------------- |
| lenis | RefObject | Smooth scroll instance | lenis.current.scrollTo('#target') |

For more detailed information about specific context values and their usage, refer to the relevant feature documentation in the docs directory.
