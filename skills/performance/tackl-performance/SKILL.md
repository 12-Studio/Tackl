---
name: tackl-performance
description: Optimizes Tackl apps for Web Vitals, reduced motion, low-power mode, and scroll performance. Use when the user mentions performance, LCP, CLS, prefers-reduced-motion, lazy loading, scroll jank, or PerformanceContext.
---

# Performance (Tackl)

## PerformanceContext

Provided by `PerformanceProvider` in `src/components/Contexts/Performance.tsx`, available app-wide via `Contexts`.

| Value | Type | Use |
|-------|------|-----|
| `isReducedMotion` | `boolean` | `prefers-reduced-motion: reduce` — disable/skip animations |
| `isLowPowerMode` | `boolean` | Low-power device — reduce particles, WebGL, heavy effects |
| `devicePixelRatio` | `number` | Choose image resolution / canvas DPR |

```tsx
'use client';

import { use } from 'react';
import { PerformanceContext } from '@parts/Contexts/Performance';

const MyComponent = () => {
	const { isReducedMotion, isLowPowerMode } = use(PerformanceContext);

	if (isReducedMotion) return <StaticFallback />;

	return <AnimatedContent reduceEffects={isLowPowerMode} />;
};
```

## Animation gating

Before any GSAP/Lenis/canvas work:

```tsx
if (isReducedMotion || isLowPowerMode) return;
```

Prefer instant state changes over tweens when `isReducedMotion` is true.

## Scroll performance

`useScrollPerformance` (`src/utils/useScrollPerformance.ts`) toggles `disable-hover` on `<body>` during scroll to avoid hover repaint jank. Use in scroll-heavy views if hover effects cause stutter.

## Images

- Use `next-sanity/image` with `sanityImageSrc()` for CMS images
- Always set `width`, `height`, and `sizes`
- `next.config.js` already configures AVIF/WebP and `cdn.sanity.io`

## Next.js patterns

- Server Components for data fetching; client components only when needed
- `dynamic()` for non-critical client bundles
- `Suspense` with lightweight fallbacks for async client trees
- `reactStrictMode: true` — GSAP cleanup must be correct (duplicate effect runs in dev)

## Web Vitals checklist

| Metric | Focus |
|--------|-------|
| **LCP** | Priority images, avoid blocking fonts, minimize client JS above fold |
| **CLS** | Explicit image dimensions, reserve space for async content |
| **INP** | Debounce scroll handlers, avoid long main-thread tasks |

## Lenis + GSAP cost

Smooth scroll runs on every page via `SmoothScroll`. Do not add second scroll libraries. Keep ScrollTrigger counts reasonable — batch refreshes, kill on unmount.

## Avoid

- Autoplay video without `prefers-reduced-motion` check
- Large GSAP timelines on every section without viewport triggers
- `will-change` everywhere — use sparingly on animated elements only
- Importing heavy libs in Server Components

## References

- `docs/Tackl/PerformanceContext.md`
- `src/utils/useScrollPerformance.ts`
- `docs/Lighthouse.md`
