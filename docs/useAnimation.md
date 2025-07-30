# GSAP Match Media Utility

This utility abstracts the common pattern of setting up GSAP match media contexts for responsive animations.

## Usage

### Hook-based approach (Recommended)

```jsx
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';

const MyComponent = () => {
    const elementRef = useRef(null);

    useAnimation(
        ({ isDesktop, isMobile }) => {
            gsap.from(elementRef.current, {
                y: isDesktop ? '2rem' : '1rem',
                scrollTrigger: {
                    trigger: elementRef.current,
                    start: 'top 100%',
                    end: isDesktop ? 'bottom 50%' : 'bottom 80%',
                    scrub: true,
                },
            });
        },
        { scope: elementRef }
    );

    return <div ref={elementRef}>Content</div>;
};
```

### Function-based approach

```jsx
import { createGSAPMatchMedia } from '@utils/useAnimation';
import gsap from 'gsap';

const MyComponent = () => {
    const elementRef = useRef(null);

    useEffect(() => {
        const cleanup = createGSAPMatchMedia(({ isDesktop, isMobile }) => {
            gsap.from(elementRef.current, {
                y: isDesktop ? '2rem' : '1rem',
            });
        });

        return cleanup;
    }, []);

    return <div ref={elementRef}>Content</div>;
};
```

## Default Breakpoints

The utility comes with these default breakpoints:

-   `isDesktop`: `(min-width: 1024px)`
-   `isMobile`: `(max-width: 1023px)`

## Custom Breakpoints

You can override or extend the default breakpoints:

```jsx
useAnimation(
    ({ isDesktop, isTablet, isMobile }) => {
        // Your animation logic
    },
    { scope: elementRef },
    {
        isTablet: '(min-width: 768px) and (max-width: 1023px)',
        isLargeDesktop: '(min-width: 1440px)',
    }
);
```

## Benefits

1. **Reduced boilerplate**: No need to manually set up `gsap.matchMedia()` and `mm.add()`
2. **Automatic cleanup**: Match media contexts are automatically cleaned up on unmount
3. **Consistent breakpoints**: Standardized breakpoint definitions across components
4. **Better maintainability**: Centralized animation setup logic
5. **Type safety**: Better IDE support with proper parameter types

## Migration

To migrate existing components:

1. Replace `useGSAP` with `useAnimation`
2. Remove the manual `gsap.matchMedia()` setup
3. Move your animation logic directly into the callback function
4. Keep the `gsap` import for animation methods

### Before

```jsx
useGSAP(
    () => {
        const mm = gsap.matchMedia();
        mm.add(
            {
                isDesktop: '(min-width: 1024px)',
                isMobile: '(max-width: 1023px)',
            },
            context => {
                // Animation logic
            }
        );
    },
    { scope: elementRef }
);
```

### After

```jsx
useAnimation(
    ({ isDesktop, isMobile }) => {
        // Animation logic
    },
    { scope: elementRef }
);
```
