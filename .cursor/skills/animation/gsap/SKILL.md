---
name: gsap
description: Implements GSAP animations in Tackl using useGSAP, useAnimation, and ScrollTrigger. Use when the user mentions GSAP, tweens, timelines, ScrollTrigger, scrub animations, matchMedia breakpoints, or @gsap/react.
---

# GSAP (Tackl)

## Stack

- `gsap` + `@gsap/react` (`useGSAP`)
- `ScrollTrigger` — registered globally in `src/components/AnimationPlugins/index.tsx`
- Project hook: `useAnimation` in `src/utils/useAnimation.ts` (wraps `useGSAP` + `gsap.matchMedia`)

Do not re-register plugins in every file. `AnimationPlugins` is mounted in `app/(site)/Client.tsx`.

## Rules

1. GSAP code belongs in **client components** (`'use client'`).
2. Prefer `useAnimation` for responsive animations; pass `{ scope: ref }` when using selectors.
3. Prefer refs over class selectors when possible.
4. Always scope cleanup — `useGSAP`/`useAnimation` handle this via `gsap.context()`.
5. Interaction-driven animations (click, delayed) are **not** context-safe — manage and revert manually.
6. Respect `PerformanceContext` — skip or simplify animations when `isReducedMotion` or `isLowPowerMode` is true.

## Default breakpoints (`useAnimation`)

| Key | Query |
|-----|-------|
| `isDesktop` | `(min-width: 1024px)` |
| `isMobile` | `(max-width: 699px)` |
| `isTablet` | `(min-width: 700px) and (max-width: 1023px)` |

## Pattern: responsive scroll animation

```tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useAnimation } from '@utils/useAnimation';

const MySection = () => {
	const ref = useRef<HTMLDivElement>(null);

	useAnimation(
		({ isDesktop }) => {
			if (!ref.current) return;

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
		{ scope: ref }
	);

	return <div ref={ref}>Content</div>;
};
```

## Pattern: direct `useGSAP`

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
	{ scope: ref }
);
```

## ScrollTrigger + Lenis

Lenis is the scroll container. `SmoothScroll` wires `ScrollTrigger.scrollerProxy` and `ScrollTrigger.defaults({ scroller: wrapper })`. Do not override the scroller to `window` in page components.

## Avoid

- Animating layout properties (`width`, `height`, `top`, `left`) when `transform`/`opacity` suffice
- Creating ScrollTriggers without a trigger element
- `useEffect` for GSAP when `useGSAP`/`useAnimation` applies
- Heavy particle/canvas effects without checking `isLowPowerMode`

## References

- `docs/GSAP/New.md` — `useGSAP` API
- `docs/GSAP/EntryExitAnimations.md` — enter/exit patterns
- `src/utils/useAnimation.ts` — matchMedia hook source
