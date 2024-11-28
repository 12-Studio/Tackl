# GSAP 3 with React: Best Practices & Performance

GSAP (GreenSock Animation Platform) is a professional-grade animation library that offers high-performance animations. This guide covers how to use GSAP 3 effectively with React components.

Heres the correct way to setup and use GSAP with React:

```jsx
import gsap from 'gsap';
```

```jsx
// Create a ref for the most parent element
const jacketRef = useRef();

// On mount (before render), create the GSAP context
useLayoutEffect(() => {
    const setupAnimations = () => {
        // Setup animations here
    };

    // Create GSAP context
    const ctx = gsap.context(setupAnimations, jacketRef);

    // Kill on unmount
    return () => ctx.revert();
}, []);
```

When using GSAP plugins, you need to import them separately and register them:

```jsx
import ScrollTrigger from 'gsap/ScrollTrigger';

// Ideally register plugins in the root component not on the component that uses the plugin
gsap.registerPlugin(ScrollTrigger);
```

```jsx
// Create a ref for the most parent element
const jacketRef = useRef();

// On mount (before render), create the GSAP context
useLayoutEffect(() => {
    const setupAnimations = () => {
        // Create a timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: jacketRef.current,
                start: '0% bottom',
                end: '100% top',
                scrub: true,
                markers: true,
            },
        });

        // Define animations on the timeline
        tl.to(jacketRef.current, {
            x: 100,
        });
    };

    // Create GSAP context
    const ctx = gsap.context(setupAnimations, jacketRef);

    // Kill on unmount
    return () => ctx.revert();
}, []);
```
