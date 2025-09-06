# Animation System Documentation

> **Note:** This animation system is designed to mimic the entry/exit animation patterns popularized by [Framer Motion](https://www.framer.com/motion/)—such as animating components in and out of the DOM with smooth transitions—but without requiring you to install or import the Framer Motion library. Instead, it leverages GSAP and a custom React hook to provide similar functionality, giving you full control and flexibility while reducing bundle size and dependencies.

## Overview

This documentation explains how to animate components in and out of the DOM using our custom animation system built on GSAP and React hooks.

## Core Components

### 1. `useAnimation` Hook

The `useAnimation` hook is the foundation of our animation system. It provides a clean way to manage GSAP animations with proper cleanup and dependency tracking.

**Location**: `src/utils/useAnimation.ts`

**Usage**:

```typescript
import { useAnimation } from '@utils/useAnimation';

useAnimation(
    ({ isDesktop }) => {
        // Your GSAP animation code here
        if (elementRef.current) {
            gsap.to(elementRef.current, {
                // animation properties
            });
        }
    },
    {
        scope: elementRef, // The ref to watch for cleanup (usually highest element)
        dependencies: [dependency1, dependency2], // Re-run when these change
    }
);
```

### 2. Component Animation Pattern

Our animation system follows a specific pattern for animating components in and out of the DOM:

```typescript
'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useAnimation } from '@utils/useAnimation';

interface ComponentProps {}

const Component = ({}: ComponentProps) => {
    // State management
    const [isVisible, setIsVisible] = useState(false);
    const [exit, setExit] = useState(false);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const animatedElementRef = useRef<HTMLDivElement>(null);

    // Enter animation
    useAnimation(
        () => {
            if (animatedElementRef.current && isVisible) {
                gsap.to(animatedElementRef.current, {
                    // Enter animation properties
                    xPercent: -100, // Example: slide in from left
                    duration: 0.8,
                    ease: 'power1.inOut',
                });
            }
        },
        {
            scope: containerRef,
            dependencies: [isVisible],
        }
    );

    // Exit animation
    useAnimation(
        () => {
            if (animatedElementRef.current && exit) {
                gsap.to(animatedElementRef.current, {
                    // Exit animation properties
                    xPercent: 100, // Example: slide out to right
                    duration: 0.8,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        setIsVisible(false); // Remove from DOM
                        setExit(false); // Reset exit state
                    },
                });
            }
        },
        {
            scope: containerRef,
            dependencies: [exit],
        }
    );

    return (
        <Container ref={containerRef}>
            <button onClick={() => setIsVisible(true)}>Show</button>
            <button onClick={() => setExit(true)}>Hide</button>
            {isVisible && <AnimatedElement ref={animatedElementRef}>Content</AnimatedElement>}
        </Container>
    );
};

export default Component;
```

## Key Concepts

### 1. State Management

-   **`isVisible`**: Controls whether the component is rendered in the DOM
-   **`exit`**: Triggers the exit animation before removing from DOM

### 2. Animation Flow

1. **Enter**: User clicks "Show" → `setIsVisible(true)` → Component renders → Enter animation runs
2. **Exit**: User clicks "Hide" → `setExit(true)` → Exit animation runs → `onComplete` → Component removed from DOM

### 3. Conditional Rendering

Components are conditionally rendered using `{isVisible && <Component />}` to ensure they exist in the DOM when animations run.

### 4. Ref Management

-   **Container Ref**: Used as the `scope` for `useAnimation` cleanup
-   **Element Ref**: Points to the actual animated element

## Animation Properties

### Common GSAP Properties

```typescript
// Position animations
xPercent: -100, // Move left 100% of element width
yPercent: -100, // Move up 100% of element height
x: 0, // Move to specific pixel position
y: 0,

// Opacity animations
autoAlpha: 0, // GSAP's opacity + visibility
opacity: 0,

// Scale animations
scale: 0,
scaleX: 0,
scaleY: 0,

// Rotation
rotation: 180,

// Timing
duration: 0.8,
delay: 0.2,

// Easing
ease: 'power1.inOut',
ease: 'power2.out',
ease: 'back.out(1.7)',
ease: 'elastic.out(1, 0.3)',
```

### Custom Easing

```typescript
// CSS cubic-bezier syntax
ease: "cubic-bezier(0.5,0,0,1)",

// GSAP custom ease
ease: "power1.inOut",
```

## Styled Components Setup

Your styled components should include initial states for animations:

```typescript
import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    overflow: hidden; // Hide elements outside container
`;

export const AnimatedElement = styled.div`
    // Initial state for enter animation
    transform: translateX(-100%); // Start off-screen

    // Or use GSAP's autoAlpha for opacity
    // opacity: 0;
    // visibility: hidden;
`;
```

## Best Practices

### 1. Always Check Refs

```typescript
if (elementRef.current && condition) {
    // Animation code
}
```

### 2. Reset State in onComplete

```typescript
onComplete: () => {
    setIsVisible(false);
    setExit(false); // Important: reset exit state
};
```

### 3. Use Appropriate Scopes

-   Use the container ref as the `scope` for cleanup
-   Use the element ref for the actual animation target

### 4. Handle Edge Cases

```typescript
// Prevent multiple animations
if (animatedElementRef.current && exit && !isAnimating) {
    // Animation code
}
```

## Common Animation Patterns

### 1. Slide In/Out

```typescript
// Enter: slide from left
xPercent: -100,

// Exit: slide to right
xPercent: 100,
```

### 2. Fade In/Out

```typescript
// Enter: fade in
autoAlpha: 1,

// Exit: fade out
autoAlpha: 0,
```

### 3. Scale In/Out

```typescript
// Enter: scale up
scale: 1,

// Exit: scale down
scale: 0,
```

### 4. Combined Animations

```typescript
// Enter: slide and fade
xPercent: 0,
autoAlpha: 1,

// Exit: slide and fade
xPercent: 100,
autoAlpha: 0,
```

## Troubleshooting

### Common Issues

1. **"target is null"**: Element doesn't exist in DOM when animation runs

    - **Solution**: Check `isVisible` state and ref existence

2. **Animation doesn't run**: Dependencies not properly set

    - **Solution**: Ensure `dependencies` array includes all state variables

3. **Exit button stops working**: Exit state not reset

    - **Solution**: Add `setExit(false)` in `onComplete`

4. **Invalid scope error**: Wrong ref passed as scope
    - **Solution**: Use container ref as scope, element ref as target

### Debug Tips

```typescript
// Add logging to debug
useAnimation(
    () => {
        console.log('Animation running:', { isVisible, exit, ref: animatedElementRef.current });
        // Animation code
    },
    {
        scope: containerRef,
        dependencies: [isVisible, exit],
    }
);
```

## Example Implementation

See `src/components/Test/index.tsx` for a complete working example of the animation system.

## Dependencies

-   **GSAP**: Animation library
-   **React**: Component framework
-   **styled-components**: Styling (optional)

## Related Files

-   `src/utils/useAnimation.ts` - Core animation hook
-   `src/components/Test/index.tsx` - Example implementation
-   `src/components/Test/styles.ts` - Example styles
