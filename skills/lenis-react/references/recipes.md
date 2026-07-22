# Lenis React — Extended Recipes

## Scroll Progress Bar

```tsx
'use client'
import { useLenis } from 'lenis/react'
import { useState } from 'react'

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useLenis(({ progress }) => setProgress(progress))

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress * 100}%`,
        background: 'currentColor',
        zIndex: 9999,
        transition: 'width 0.05s linear',
      }}
    />
  )
}
```

---

## Back-to-Top Button

```tsx
'use client'
import { useLenis } from 'lenis/react'
import { useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const lenis = useLenis(({ scroll }) => setVisible(scroll > 400))

  return visible ? (
    <button onClick={() => lenis?.scrollTo(0, { duration: 1.2 })}>
      ↑ Top
    </button>
  ) : null
}
```

---

## Horizontal Scroll Section

```tsx
'use client'
import { ReactLenis } from 'lenis/react'
import { useRef } from 'react'

export function HorizontalScroller({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <ReactLenis
      options={{
        wrapper: wrapperRef,
        content: contentRef,
        orientation: 'horizontal',
        gestureOrientation: 'both',
        lerp: 0.05,
      }}
    >
      <div
        ref={wrapperRef}
        style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}
      >
        <div ref={contentRef} style={{ display: 'flex', width: 'max-content' }}>
          {children}
        </div>
      </div>
    </ReactLenis>
  )
}
```

---

## Scroll-Locked Modal

```tsx
'use client'
import { useLenis } from 'lenis/react'
import { useEffect } from 'react'

export function Modal({ isOpen, onClose, children }: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  const lenis = useLenis()

  useEffect(() => {
    if (isOpen) lenis?.stop()
    else lenis?.start()
    return () => lenis?.start() // safety cleanup
  }, [isOpen, lenis])

  if (!isOpen) return null
  return (
    <div role="dialog" aria-modal="true">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  )
}
```

---

## Parallax with useLenis + CSS Transform

```tsx
'use client'
import { useLenis } from 'lenis/react'
import { useRef } from 'react'

export function ParallaxLayer({
  speed = 0.5,
  children,
}: {
  speed?: number
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLenis(({ scroll }) => {
    if (ref.current) {
      ref.current.style.transform = `translateY(${scroll * speed}px)`
    }
  })

  return <div ref={ref}>{children}</div>
}
```

> Prefer CSS `will-change: transform` on the element for GPU promotion.

---

## Lenis + GSAP ScrollTrigger (Complete Setup)

```tsx
'use client'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function GSAPScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}
```

Usage in a component:
```tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return <div ref={ref}>{children}</div>
}
```

---

## Listening to Specific Scroll Events

```tsx
'use client'
import { useLenis } from 'lenis/react'

export function DirectionIndicator() {
  const [dir, setDir] = useState<'up' | 'down'>('down')

  useLenis(({ direction }) => {
    if (direction === 1) setDir('down')
    if (direction === -1) setDir('up')
  })

  return <div>Scrolling: {dir}</div>
}
```

Scroll event object properties:
- `scroll` — current scroll position (px)
- `limit` — max scroll position (px)
- `velocity` — scroll speed
- `direction` — `1` (down) or `-1` (up)
- `progress` — `0` to `1` (scroll percentage)
