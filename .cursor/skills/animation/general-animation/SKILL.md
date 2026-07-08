---
name: general-animation
description: Orchestrates Tackl's animation system — Lenis smooth scroll, GSAP ScrollTrigger, page transitions, and reduced-motion fallbacks. Use when the user mentions animations, smooth scroll, Lenis, scroll-linked effects, page transitions, motion design, or enter/exit animations.
---

# Animation (Tackl)

## System overview

```
Client.tsx
  └── AnimationPlugins     # registers ScrollTrigger + useGSAP globally
  └── Contexts
        └── PerformanceProvider   # isReducedMotion, isLowPowerMode
        └── SmoothScroll (Lenis)
              └── LenisGsapBridge # ScrollTrigger.scrollerProxy + ticker sync
              └── {page children}
```

Animation is **client-side only**. Never run Lenis/GSAP in Server Components.

## When to use what

| Need | Tool |
|------|------|
| Smooth scroll | Lenis via `SmoothScroll` — already mounted, do not duplicate |
| Scroll-linked reveal/scrub | GSAP ScrollTrigger via `useAnimation` |
| Simple mount tween | `useGSAP` |
| Responsive breakpoints | `useAnimation` matchMedia (`isDesktop`, `isMobile`, `isTablet`) |
| Route transitions | `ViewTransitions` in `app/(site)/Client.tsx` + `@utils/viewTransitions` |
| Reduced motion fallback | `PerformanceContext.isReducedMotion` |

## Lenis + GSAP contract

`SmoothScroll` sets:

- `ScrollTrigger.scrollerProxy` on the Lenis root element
- `ScrollTrigger.defaults({ scroller: wrapper })`
- `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker` RAF bridge

**Do not** set ScrollTrigger `scroller: window`. **Do not** mount a second `ReactLenis`.

## Adding animations to a component

1. Mark component `'use client'`
2. Read `PerformanceContext` — bail early if reduced motion / low power
3. Create a `ref` for the animated element
4. Use `useAnimation` (responsive) or `useGSAP` (simple)
5. Animate `transform` and `opacity` first; avoid layout properties

```tsx
'use client';

import { use, useRef } from 'react';
import gsap from 'gsap';
import { PerformanceContext } from '@parts/Contexts/Performance';
import { useAnimation } from '@utils/useAnimation';

const FadeIn = ({ children }: { children: React.ReactNode }) => {
	const { isReducedMotion } = use(PerformanceContext);
	const ref = useRef<HTMLDivElement>(null);

	useAnimation(
		() => {
			if (isReducedMotion || !ref.current) return;
			gsap.from(ref.current, { opacity: 0, y: 24, duration: 0.8 });
		},
		{ scope: ref }
	);

	return <div ref={ref}>{children}</div>;
};
```

## Page transitions

View transitions are enabled in `Client.tsx` via `ViewTransitions`. Link helpers live in `src/utils/viewTransitions/`. Use those utilities for navigations that should participate in transitions.

## Sanity / CMS content

Animate **wrappers** around CMS content, not Portable Text nodes directly. Fetch data in Server Components; pass to client animated wrappers.

## Avoid

- CSS `@keyframes` for scroll-scrubbed effects — use ScrollTrigger
- `position: sticky` fights with Lenis in some layouts — test carefully
- Animating `height`/`width` on scroll — use `scale` or clip
- Multiple `ScrollTrigger.refresh()` calls — one refresh after layout settle is enough

## Related skills

- **gsap** — GSAP API, `useAnimation`, ScrollTrigger details
- **performance** — reduced motion, Web Vitals, image optimization

## References

- `src/components/SmoothScroll/index.tsx`
- `src/components/AnimationPlugins/index.tsx`
- `docs/Motion.md`
- `docs/GSAP/EntryExitAnimations.md`
