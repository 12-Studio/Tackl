---
name: tackl-performance
description: Optimizes Tackl apps for Web Vitals, reduced motion, and scroll performance. Use when the user mentions performance, LCP, CLS, prefers-reduced-motion, lazy loading, scroll jank, or PerformanceContext.
---

# Performance (Tackl)

## PerformanceContext

Provided by `PerformanceProvider` in `src/components/Contexts/Performance.tsx`, available app-wide via `Contexts`.

| Value | Type | Use |
|-------|------|-----|
| `isReducedMotion` | `boolean` | `prefers-reduced-motion: reduce` — disable/skip animations |
| `devicePixelRatio` | `number` | Choose image resolution / canvas DPR |

```tsx
'use client';

import { use } from 'react';
import { PerformanceContext } from '@parts/Contexts/Performance';

const MyComponent = () => {
	const { isReducedMotion } = use(PerformanceContext);

	if (isReducedMotion) return <StaticFallback />;

	return <AnimatedContent />;
};
```

Built-in consumer: `SmoothScroll` skips Lenis entirely when `isReducedMotion` is true — native scrolling takes over and no rAF loop starts.

## Animation gating

Before any GSAP/Lenis/canvas work:

```tsx
if (isReducedMotion) return;
```

Prefer instant state changes over tweens when `isReducedMotion` is true. Scale canvas/WebGL resolution by `devicePixelRatio` rather than always rendering at full DPR.

## Images

- Always set `width`, `height`, and `sizes`
- `next.config.js` already configures AVIF/WebP output; add your CMS's image CDN hostname to `images.remotePatterns` before using it

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

Smooth scroll runs on every page via `SmoothScroll`. Do not add second scroll libraries. Keep ScrollTrigger counts reasonable — batch refreshes; cleanup is automatic via `useAnimation`/`useGSAP` context (never `.kill()` by hand).

## Avoid

- Autoplay video without `prefers-reduced-motion` check
- Large GSAP timelines on every section without viewport triggers
- `will-change` everywhere — use sparingly on animated elements only
- Importing heavy libs in Server Components

## References

- `docs/Tackl/PerformanceContext.md`
- `src/components/Contexts/Performance.tsx`
- `docs/Lighthouse.md`
