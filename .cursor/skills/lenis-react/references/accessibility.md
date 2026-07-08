# Lenis React — Accessibility

## The Core Rule

Smooth scroll can cause vestibular disorders for users with motion sensitivity. Always respect `prefers-reduced-motion`.

---

## Vanilla Hook (no Framer Motion dependency)

```tsx
import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
```

Usage in provider:
```tsx
'use client'
import { ReactLenis } from 'lenis/react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <>{children}</>
  return <ReactLenis root options={{ lerp: 0.1 }}>{children}</ReactLenis>
}
```

---

## Keyboard Navigation

Lenis does not break keyboard navigation — arrow keys, Page Up/Down, Home/End all work through Lenis's event layer. Anchor focus scrolling is also handled.

## Screen Readers

Lenis does not affect ARIA roles or DOM structure. Screen reader scroll is unaffected. No special configuration needed.

## Focus Management

If programmatically scrolling (`lenis.scrollTo()`), pair with `element.focus()` when appropriate so keyboard users land at the right place.
