# useGSAP() Hook 💚

GSAP itself is completely framework-agnostic and can be used in any JS framework without any special wrappers or dependencies. However, this hook solves a few React-specific friction points for you so that you can just focus on the fun stuff. 🤘🏻

## Overview

`useGSAP()` is a drop-in replacement for `useEffect()` or `useLayoutEffect()` that automatically handles cleanup using `gsap.context()`. Cleanup is important in React and Context makes it simple.

## Usage

Import the `useGSAP()` hook from `@gsap/react` and you're good to go! All GSAP animations, ScrollTriggers, Draggables, and SplitText instances created when the `useGSAP()` hook executes will be reverted automatically when the component unmounts and the hook is torn down.

```jsx
import { useGSAP } from '@gsap/react';
```

```jsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const container = useRef();

useGSAP(
    () => {
        // gsap code here...
        gsap.to('.box', { x: 360 }); // <-- automatically reverted
    },
    { scope: container }
); // <-- scope is for selector text (optional)
```

## Why is cleanup so important?

Proper animation cleanup is very important with frameworks, but especially with React. React 18 runs in strict mode locally by default which causes your Effects to get called TWICE. This can lead to duplicate, conflicting animations or logic issues with from tweens if you don't revert things properly.

The `useGSAP()` hook follows React's best practices for animation cleanup.

If you're interested in what's happening at a lower level, check out the [Context docs](#).

## SSR

This hook is safe to use in Next or other server-side rendering environments. It implements the `useIsomorphicLayoutEffect` technique, preferring React's `useLayoutEffect()` but falling back to `useEffect()` if `window` isn't defined.

The second property is optional. You can pass either a dependency array - like `useEffect()` - or a config object for more flexibility.

```jsx
// config object offers maximum flexibility
useGSAP(
    () => {
        // gsap code here...
    },
    { dependencies: [endX], scope: container, revertOnUpdate: true }
);

useGSAP(() => {
    // gsap code here...
}, [endX]); // simple dependency array setup like useEffect, good for state-reactive animation

useGSAP(() => {
    // gsap code here...
}); // defaults to an empty dependency array '[]' and no scoping.
```

| Property       | Description                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dependencies   | Array / null : default [] <br/> The dependency array passed to the internal useEffect. What's the dependency array for?                                                                                                                                                                                                                                                                                           |
| scope          | React ref - Super useful! <br/> Define a container as a scope in the config object to ensure that all GSAP selector text inside the the useGSAP() hook will be scoped to the descendants of that container. [Learn more...](#)                                                                                                                                                                                    |
| revertOnUpdate | Boolean : default false <br/> If you define a dependency array and a dependency changes, the GSAP-related objects (animations, ScrollTriggers, etc.) won't get reverted. They will only get reverted when the component is unmounted and the hook is torn down. If you'd prefer the context to be reverted every time the hook re-synchronizes (when any dependency changes), you can set `revertOnUpdate: true`. |

## Animating on interaction ✨

All GSAP animations, ScrollTriggers, Draggables, and SplitText instances that are created when the useGSAP() hook executes will automatically get added to the internal gsap.context() and reverted when the component unmounts and the hook is torn down. These animations are considered 'context-safe'

However, if you create any animations that get called after the useGSAP() hook executes (like click event handlers, something in a setTimeout(), or anything delayed), those animations will not be context-safe.

### DANGER! Animation added on click will not be cleaned up

Let's take a user triggered click event as an example: The animation inside the click event is only created when the user 'clicks'. Because this happens after the useGSAP() hook is executed (on mount) the animation won't get recorded, so it won't be included in the context for automatic cleanup.

```jsx
const container = useRef();

useGSAP(
    () => {
        // ✅ safe, created during execution, selector text scoped
        gsap.to('.good', { x: 100 });
    },
    { scope: container }
);

// ❌ Unsafe! Created on interaction and not wrapped in contextSafe()
// animation will not be cleaned up
// Selector text also isn't scoped to the container.
const onClickBad = () => {
    gsap.to('.bad', { y: 100 });
};

return (
    <div ref={container}>
        <div className="good"></div>
        <button onClick={onClickBad} className="bad"></button>
    </div>
);
```

### Making your animation 'context-safe'

Let's tell `useGSAP()` about this animation so it can be added to the internal `gsap.context()`. Think of it like telling the Context when to hit the "record" button for any GSAP-related objects.

The `useGSAP()` hook exposes a couple of references for us:

-   **context**: The `gsap.context()` instance that keeps track of all our animations.
-   **contextSafe**: Converts any function into a context-safe one so that any GSAP-related objects created while that function executes will be reverted when that Context gets reverted (cleanup). Selector text inside a context-safe function will also use the Context's scope. `contextSafe()` accepts a function and returns a new context-safe version of that function.

We can wrap up our click animation in the `contextSafe()` function in order to add it to the context. There are two ways to access this function:

#### 1) Using the returned object property (for outside useGSAP() hook)

> **Note**: Animation added on click event is context-safe and added to the internal context

```jsx
const container = useRef();

const { contextSafe } = useGSAP({ scope: container }); // we can pass in a config object as the 1st parameter to make scoping simple

// ✅ wrapped in contextSafe() - animation will be cleaned up correctly
// selector text is scoped properly to the container.
const onClickGood = contextSafe(() => {
    gsap.to('.good', { rotation: 180 });
});

return (
    <div ref={container}>
        <button onClick={onClickGood} className="good"></button>
    </div>
);
```

#### 2) Using the second parameter (for inside useGSAP() hook)

> **Note**: Any animation created inside a context-safe function will be added to the internal context.

When manually adding event listeners (which is uncommon in React), remember to:

-   Wrap the animation in the `contextSafe()` function provided as the second parameter
-   Return a cleanup function that removes the event listeners

```jsx
const container = useRef();
const badRef = useRef();
const goodRef = useRef();

useGSAP(
    (context, contextSafe) => {
        // ✅ safe, created during execution
        gsap.to(goodRef.current, { x: 100 });

        // ❌ DANGER! This animation is created in an event handler that executes AFTER useGSAP() executes. It's not added to the context so it won't get cleaned up (reverted). The event listener isn't removed in cleanup function below either, so it persists between component renders (bad).
        badRef.current.addEventListener('click', () => {
            gsap.to(badRef.current, { y: 100 });
        });

        // ✅ safe, wrapped in contextSafe() function
        const onClickGood = contextSafe(() => {
            gsap.to(goodRef.current, { rotation: 180 });
        });

        goodRef.current.addEventListener('click', onClickGood);

        // 👍 we remove the event listener in the cleanup function below.
        return () => {
            // <-- cleanup
            goodRef.current.removeEventListener('click', onClickGood);
        };
    },
    { scope: container }
);
return (
    <div ref={container}>
        <button ref={badRef}></button>
        <button ref={goodRef}></button>
    </div>
);
```
