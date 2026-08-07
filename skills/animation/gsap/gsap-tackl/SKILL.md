---
name: gsap-tackl
description: Implements and orchestrates GSAP in Tackl — useAnimation, useGSAP, ScrollTrigger, Lenis sync, page transitions, and reduced-motion fallbacks. Use when the user mentions GSAP, tweens, timelines, ScrollTrigger, scrub, matchMedia, Lenis, smooth scroll, page transitions, motion design, or enter/exit animations.
---

# GSAP (Tackl)

## System overview

```
Client.tsx
  └── AnimationPlugins     # registers ScrollTrigger + useGSAP (+ SplitText) globally
  └── Contexts
        └── PerformanceProvider   # isReducedMotion, isLowPowerMode
        └── SmoothScroll (Lenis)
              └── LenisGsapBridge # ScrollTrigger.scrollerProxy + ticker sync
              └── {page children}
```

Animation is **client-side only**. Never run Lenis/GSAP in Server Components.

## Stack

- `gsap` + `@gsap/react` (`useGSAP`)
- `ScrollTrigger` — registered in `src/components/AnimationPlugins/index.tsx`
- Project hook: `useAnimation` in `src/utils/useAnimation.ts` (wraps `useGSAP` + `gsap.matchMedia`)

Do not re-register plugins in every file. `AnimationPlugins` is mounted in `app/(site)/Client.tsx`.

## When to use what

| Need | Tool |
|------|------|
| Smooth scroll | Lenis via `SmoothScroll` — already mounted, do not duplicate |
| Scroll-linked reveal/scrub | GSAP ScrollTrigger via `useAnimation` |
| Responsive breakpoints | `useAnimation` matchMedia (`isDesktop`, `isMobile`, `isTablet`) |
| Simple mount tween (no breakpoints) | `useGSAP` |
| Route transitions | `ViewTransitions` in `app/(site)/Client.tsx` + `@utils/viewTransitions` |
| Reduced motion fallback | `PerformanceContext.isReducedMotion` |

## Rules

1. GSAP code belongs in **client components** (`'use client'`).
2. Prefer `useAnimation` for responsive / scroll work; pass `{ scope: ref }` when using selectors.
3. Prefer refs over class selectors when possible.
4. Always scope cleanup — `useGSAP`/`useAnimation` handle this via `gsap.context()`.
5. Interaction-driven animations (click, delayed) are **not** context-safe — manage and revert manually.
6. Respect `PerformanceContext` — skip or simplify when `isReducedMotion` or `isLowPowerMode` is true.
7. Animate `transform` and `opacity` first; avoid layout properties.

## Default breakpoints (`useAnimation`)

| Key | Query |
|-----|-------|
| `isDesktop` | `(min-width: 1024px)` |
| `isMobile` | `(max-width: 699px)` |
| `isTablet` | `(min-width: 700px) and (max-width: 1023px)` |

## Lenis + GSAP contract

`SmoothScroll` / `LenisGsapBridge` sets:

- `ScrollTrigger.scrollerProxy` on the Lenis root element
- `ScrollTrigger.defaults({ scroller: wrapper })`
- `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker` RAF bridge (`autoRaf: false`)

**Do not** set ScrollTrigger `scroller: window`. **Do not** mount a second `ReactLenis`.

When creating ScrollTriggers that may run before the bridge is ready, pass `scroller: lenis.rootElement` explicitly and refresh after the proxy is live (one `requestAnimationFrame` after setup is enough).

## Pattern: responsive scroll animation

```tsx
'use client';

import { use, useRef } from 'react';
import gsap from 'gsap';
import { PerformanceContext } from '@parts/Contexts/Performance';
import { useAnimation } from '@utils/useAnimation';

const MySection = () => {
	const { isReducedMotion } = use(PerformanceContext);
	const ref = useRef<HTMLDivElement>(null);

	useAnimation(
		({ isDesktop }) => {
			if (isReducedMotion || !ref.current) return;

			gsap.from(ref.current, {
				y: isDesktop ? '2rem' : '1rem',
				scrollTrigger: {
					trigger: ref.current,
					start: 'top 100%',
					end: isDesktop ? 'bottom 50%' : 'bottom 80%',
					scrub: true,
				},
			});
		},
		{ scope: ref },
	);

	return <div ref={ref}>Content</div>;
};
```

## Pattern: simple `useGSAP`

Use when matchMedia breakpoints are not needed:

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ref = useRef<HTMLDivElement>(null);

useGSAP(
	() => {
		gsap.to(ref.current, { opacity: 1, duration: 0.6 });
	},
	{ scope: ref },
);
```

## Page transitions

View transitions are enabled in `Client.tsx` via `ViewTransitions`. Link helpers live in `src/utils/viewTransitions/`. Use those utilities for navigations that should participate in transitions.

## Sanity / CMS content

Animate **wrappers** around CMS content, not PortableText nodes directly. Fetch data in Server Components; pass to client animated wrappers.

## Avoid

- CSS `@keyframes` for scroll-scrubbed effects — use ScrollTrigger
- `useEffect` for GSAP when `useGSAP`/`useAnimation` applies
- Animating `height`/`width`/`top`/`left` on scroll — use `scale` or clip
- `position: sticky` fights with Lenis in some layouts — test carefully
- Creating ScrollTriggers without a trigger element
- Multiple `ScrollTrigger.refresh()` calls — one after layout settle is enough
- Heavy particle/canvas effects without checking `isLowPowerMode`

## Related skills

- **gsap-core** / **gsap-react** / **gsap-scrolltrigger** — upstream GSAP API details
- **gsap-timeline** / **gsap-plugins** / **gsap-utils** / **gsap-performance** — specialized GSAP topics
- **performance** — reduced motion, Web Vitals, image optimization

## References

- `src/components/SmoothScroll/index.tsx`
- `src/components/AnimationPlugins/index.tsx`
- `src/utils/useAnimation.ts`
- `docs/Motion.md`
- `docs/GSAP/UseGsapHook.md`
- `docs/GSAP/EntryExitAnimations.md`
