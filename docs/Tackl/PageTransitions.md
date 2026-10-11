# Page Transitions

Tackl animates route changes with React's built-in [`<ViewTransition>`](https://react.dev/reference/react/ViewTransition), which drives the browser's View Transitions API. App Router navigations are already React Transitions, so this needs no config, no provider, and no custom router or `Link`. Use plain `next/link` and `useRouter` from `next/navigation`.

The Next.js guide this follows is bundled at `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`.

## Opting a page in

Wrap the page's content in `PageTransition`, inside `page.tsx`:

```tsx
// app/(site)/work/page.tsx
import PageTransition from '@parts/PageTransition';

const Page = async () => (
	<PageTransition>
		<WorkGrid />
	</PageTransition>
);
```

Put it in the page, not a layout. Layouts persist across navigations, so their enter and exit never fire. Every page that should animate needs the wrapper: the outgoing page plays its exit and the incoming page plays its enter.

`PageTransition` is a Server Component.

## Choosing the animation

| Navigation | Animation |
| --- | --- |
| Untyped `<Link>` / `router.push()` | Crossfade (`.pageFade`) |
| `transitionTypes={[NAV_FORWARD]}` | Old page slides out left, new page slides in from the right (`.navForward`) |
| `transitionTypes={[NAV_BACK]}` | The mirror of forward (`.navBack`) |
| Browser back/forward buttons | Instant swap. The route is restored from the client cache synchronously, so nothing animates. |
| Suspense reveals, `router.refresh()` | None (`default='none'`) |

```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NAV_BACK, NAV_FORWARD } from '@parts/PageTransition';

<Link href='/work/project' transitionTypes={[NAV_FORWARD]}>Project</Link>

router.push('/work', { transitionTypes: [NAV_BACK] });
```

You decide which links count as forward and which as back, based on the site's hierarchy.

## Changing the animation

The animations are plain CSS keyframes in `src/css/_page-transitions.scss`. Each transition class gets its own `::view-transition-old(.class)` / `::view-transition-new(.class)` rules.

To add a type:

1. Map it in `pageAnimation` in `src/components/PageTransition/index.tsx`.
2. Style it in `_page-transitions.scss`.

The root snapshot is held still, so the `Header` and any fixed chrome stay put while the page content animates. `::view-transition { pointer-events: none; }` keeps the page clickable mid-transition. `prefers-reduced-motion` collapses every transition to an instant swap.

Write page transitions in CSS, not GSAP. React owns the timing of the snapshot, so tweening the pseudo-elements with GSAP fights it. Use `useAnimation` for in-page motion once the new page has mounted.

## Beyond pages

`<ViewTransition>` from `react` works anywhere inside a Transition:

- **Shared element morph:** wrap the thumbnail and the hero in `<ViewTransition name={`photo-${id}`} share='morph' default='none'>` on both pages. The browser morphs one into the other.
- **Suspense reveal:** wrap the fallback in `<ViewTransition exit='…' default='none'>` and the content in `<ViewTransition enter='…' default='none'>`.
- **Same-route crossfade:** `<ViewTransition key={slug} name='…' share='auto' enter='auto' default='none'>`.

Browsers without view-transition support navigate normally, with no animation.
