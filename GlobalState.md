## Global State Management in Your Application

This guide explains how to set up and use the global state management provided in this project, built using React's Context API. The global state is integrated into the app via the RootLayout component, wrapping core functionality like smooth scrolling and Apollo GraphQL integration.

### Table of Contents

- Overview
- Project Structure
- Setup
- Integrating the Context Provider
- Accessing Global State
- API Reference
- Example Usage

### Overview

This project provides a global state management system based on:

- React Context API for managing and accessing shared state.
- Integration with key providers like Styled Components, Apollo Client, and a custom SmoothScroll wrapper.
- Easy integration and extension through React's component tree.

The global state is initialized and provided via Contexts, which wraps the app inside RootLayout.

### Project Structure

Here's a brief overview of the relevant files:

1.  **Contexts/Contexts.jsx:** Defines the Contexts component, which initializes global values (e.g., lenis reference) and provides them via GlobalContext.

2.  **Contexts/index.js:** Exports the GlobalContext object for use across the application.

3.  **App/layout.js:** The root layout component, which sets up the application's global context, theme, and smooth scrolling.

### Setup

#### Integrating the Context Provider

The RootLayout component is responsible for initializing the global state and wrapping the entire application with the necessary providers.

JavaScript

```
// App/layout.js
import React from 'react';
import Contexts from '@parts/Contexts/Contexts';
import SmoothScroll from '@parts/SmoothScroll';
import { ThemeProvider } from 'styled-components';
import { theme } from '@theme';

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <ThemeProvider theme={theme}>
        <Contexts>
          <SmoothScroll>{children}</SmoothScroll>
        </Contexts>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;

```

**Key Wrappers:**

- **Contexts:** Provides global state management.
- **SmoothScroll:** Enhances scrolling behavior across the app.
- **ThemeProvider:** Applies the global theme using Styled Components.

### Accessing Global State

Use the GlobalContext to access shared values like the lenis reference in any component.

**Import the Context:**

JSX File

```
import { useContext } from 'react';
import { GlobalContext } from '@parts/Contexts';

```

**Access Context Values:**

JSX File

```
const { lenis } = useContext(GlobalContext);

useEffect(() => {
  if (lenis.current) {
    lenis.current.scrollTo(0); // Example usage
  }
}, [lenis]);

```

### API Reference

#### Contexts Component

Wraps the application with a global state provider.

**Props:**

- children (ReactNode): Components or elements to be wrapped.

**Global State Provided:**

- lenis: A useRef object for managing the smooth scrolling library.

#### GlobalContext

The context object created using React.createContext(). Use it with useContext to access global values.

**Example:**

JSX File

```
import { useContext } from 'react';
import { GlobalContext } from '@parts/Contexts';

const Example = () => {
  const { lenis } = useContext(GlobalContext);

  return <div>{lenis.current ? 'Lenis Initialized' : 'Not Ready'}</div>;
};

```

### Example Usage

Here's how you might use the global context within your application:

**Setup RootLayout:**

Ensure Contexts wraps your app in App/layout.js as shown earlier.

**Consume Context in a Component:**

JSX File

```
import React, { useContext } from 'react';
import { GlobalContext } from '@parts/Contexts';

const SmoothScrollController = () => {
  const { lenis } = useContext(GlobalContext);

  return (
    <button
      onClick={() => {
        if (lenis.current) {
          lenis.current.scrollTo(500);
        }
      }}
    >
      Scroll Down
    </button>
  );
};

export default SmoothScrollController;

```
