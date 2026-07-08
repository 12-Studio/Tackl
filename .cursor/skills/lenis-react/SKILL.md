---
name: lenis-react
description: Integrate Lenis smooth scroll into React and Next.js projects. Use when the user wants smooth scrolling, scroll-linked animations, parallax effects, GSAP ScrollTrigger sync, Framer Motion sync, programmatic scroll-to navigation, or scroll event listening in a React app. Covers ReactLenis provider setup, useLenis hook, custom scroll containers, SSR/Next.js considerations, and accessibility.
compatibility: React 16.8+, Next.js 13+ (App Router and Pages Router), Vite, CRA. Node.js 16+.
metadata:
  author: claude
  version: "1.0"
---

# Lenis Smooth Scroll — React Integration Skill

## Overview

Lenis (Latin: "smooth") is a lightweight, performant smooth-scroll library by darkroom.engineering. The `lenis/react` sub-package provides a `<ReactLenis>` context provider and a `useLenis` hook, eliminating prop-drilling and tying the RAF loop into React's lifecycle automatically.

**Package landscape (important — use the right import):**

| Package | Status | Import |
|---|---|---|
| `lenis` | ✅ Current (v1+) | `import { ReactLenis, useLenis } from 'lenis/react'` |
| `@studio-freight/lenis` | ⚠️ Legacy | `import Lenis from '@studio-freight/lenis'` |
| `@studio-freight/react-lenis` | ⚠️ Legacy | `import { ReactLenis } from '@studio-freight/react-lenis'` |

Always use the current `lenis` package unless the project explicitly pins to the legacy packages.

---

## 1. Installation

```bash
npm install lenis
# or
yarn add lenis
# or
pnpm add lenis
```

Also add Lenis's required CSS (critical for correct layout):

```css
/* In your global CSS file */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}
```

Or import from the package directly:
```js
import 'lenis/dist/lenis.css'
```

---

## 2. Minimal Setup (full-page scroll)

```tsx
// app/layout.tsx  OR  src/main.tsx
import { ReactLenis } from 'lenis/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  )
}
```

- `root` prop: Lenis hijacks the `<html>` scroll container (the standard full-page case).
- RAF loop is managed automatically when `autoRaf` is not disabled.

---

## 3. Common Configuration Options

Pass options via the `options` prop on `<ReactLenis>`:

```tsx
<ReactLenis
  root
  options={{
    lerp: 0.1,          // Smoothing factor (0–1). Lower = smoother but slower. Default: 0.1
    duration: 1.2,      // Scroll animation duration in seconds (ignored if lerp set)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    orientation: 'vertical',   // 'vertical' | 'horizontal'
    gestureOrientation: 'vertical', // 'vertical' | 'horizontal' | 'both'
    smoothWheel: true,  // Smooth wheel events (default: true)
    smoothTouch: false, // Smooth touch scroll — keep false unless intentional (can feel unnatural)
    touchMultiplier: 2, // Touch sensitivity
    infinite: false,    // Infinite scroll
  }}
>
  {children}
</ReactLenis>
```

**Decision guide:**
- For most marketing sites: `lerp: 0.08–0.12` feels natural.
- For heavy creative/portfolio sites: `lerp: 0.05–0.08` for extra drag.
- Never set `smoothTouch: true` without thorough iOS testing — can feel laggy.
- Prefer `lerp` over `duration` unless you need deterministic timing (e.g., carousel snapping).

---

## 4. useLenis Hook

`useLenis` returns the Lenis instance and optionally registers a scroll callback:

```tsx
import { useLenis } from 'lenis/react'

function ScrollTracker() {
  // Fires every scroll frame
  const lenis = useLenis(({ scroll, limit, velocity, direction, progress }) => {
    console.log('scroll progress:', progress) // 0–1
  })

  // Programmatic scroll-to
  const scrollToTop = () => lenis?.scrollTo(0, { duration: 1.5 })
  const scrollToEl = () => lenis?.scrollTo('#section-2', { offset: -80 })

  return <button onClick={scrollToTop}>Back to top</button>
}
```

`useLenis` with no callback just returns the instance — useful for imperative control.

---

## 5. Scroll-To Navigation

```tsx
import { useLenis } from 'lenis/react'

function NavLink({ target, children }: { target: string; children: React.ReactNode }) {
  const lenis = useLenis()

  return (
    <a
      href={target}
      onClick={(e) => {
        e.preventDefault()
        lenis?.scrollTo(target, {
          offset: -80,      // Adjust for sticky header height
          duration: 1.2,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          lock: false,      // Lock scroll during animation
          force: false,     // Force scroll even if already at target
        })
      }}
    >
      {children}
    </a>
  )
}
```

`scrollTo` accepts: `number` (px), `string` (CSS selector), `HTMLElement`, or `'top'` / `'bottom'`.

---

## 6. GSAP ScrollTrigger Integration

When using GSAP ScrollTrigger, Lenis must drive the RAF loop through GSAP's ticker — otherwise scroll positions desync.

```tsx
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import type { LenisRef } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

export default function App({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000) // GSAP time is in seconds
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0) // Prevents scroll jumps on tab focus

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
```

**Critical:** `autoRaf: false` — Lenis must NOT run its own RAF when GSAP is driving it.

---

## 7. Framer Motion Integration

```tsx
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { cancelFrame, frame } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function App({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp)
    }

    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
```

---

## 8. Custom Scroll Container (non-root)

For scrollable sections inside the page (not full-page scroll):

```tsx
import { ReactLenis } from 'lenis/react'
import { useRef } from 'react'

function ScrollablePanel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <ReactLenis
      options={{
        wrapper: containerRef,   // The scrolling viewport
        content: contentRef,     // The inner content element
        lerp: 0.1,
      }}
    >
      <div ref={containerRef} style={{ height: '400px', overflow: 'hidden' }}>
        <div ref={contentRef}>
          {/* scrollable content */}
        </div>
      </div>
    </ReactLenis>
  )
}
```

---

## 9. Next.js App Router

Add `'use client'` to any component using `<ReactLenis>` or `useLenis`:

```tsx
// components/SmoothScrollProvider.tsx
'use client'

import { ReactLenis } from 'lenis/react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  )
}
```

```tsx
// app/layout.tsx
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
```

---

## 10. Preventing Scroll on Nested Elements

Some elements (modals, inner scrollable panels) should be excluded from Lenis:

```html
<!-- HTML attribute approach -->
<div data-lenis-prevent>
  <!-- This element scrolls natively -->
</div>

<!-- Horizontal-only prevention -->
<div data-lenis-prevent-wheel>...</div>
<div data-lenis-prevent-touch>...</div>
```

Or programmatically:
```tsx
lenis?.stop()   // Pause Lenis (e.g., modal open)
lenis?.start()  // Resume Lenis (e.g., modal close)
```

---

## 11. Accessing Lenis Outside Provider (global access)

When `root` is true, `useLenis()` works anywhere in the tree — even in components far from the provider. This is Lenis's key React advantage over manual prop-passing.

```tsx
// In any deeply nested component:
import { useLenis } from 'lenis/react'

function DeepButton() {
  const lenis = useLenis()
  return <button onClick={() => lenis?.scrollTo('top')}>Top</button>
}
```

---

## 12. Accessibility

Always respect `prefers-reduced-motion`:

```tsx
'use client'

import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'framer-motion' // or a custom hook

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <>{children}</>  // Skip Lenis entirely
  }

  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  )
}
```

Or with a plain media query hook if not using Framer Motion — see `references/accessibility.md`.

---

## 13. Common Pitfalls & Fixes

| Problem | Cause | Fix |
|---|---|---|
| Scroll jumps with GSAP ScrollTrigger | RAF loop conflict | Use `autoRaf: false` + `gsap.ticker.add()` |
| `useLenis` returns undefined | Component outside `<ReactLenis>` tree | Move provider higher, or use `root` prop |
| Lenis not working in Next.js | Missing `'use client'` | Add directive to provider component |
| Modal/overlay blocks page scroll | Lenis still active | Call `lenis.stop()` on open, `lenis.start()` on close |
| iOS touch feels laggy | `smoothTouch: true` | Set `smoothTouch: false` (default) |
| `scroll-behavior: smooth` conflicts | CSS fighting Lenis | Add `.lenis.lenis-smooth { scroll-behavior: auto !important; }` |
| Anchor links don't work | Lenis intercepting | Lenis handles anchors — use `scrollTo` or `data-lenis-prevent` |

---

## 14. Reusable SmoothScrollProvider Pattern

Create this once, use everywhere — the canonical pattern for React/Next.js projects:

```tsx
// components/SmoothScrollProvider.tsx
'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: Props) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  if (prefersReducedMotion) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothTouch: false,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

See [references/recipes.md](references/recipes.md) for more complete recipes including scroll progress bars, parallax, and infinite scroll.
