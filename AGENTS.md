# AGENTS.md

Guidance for AI coding agents working in a Tackl project. Tool-agnostic — read by
Cursor, Claude Code, Copilot, Zed, Aider, Gemini CLI and any tool that supports the
[agents.md](https://agents.md) convention.

Human-facing docs live in [`docs/`](./docs) and [`README.md`](./README.md); deep-dive
skills live in [`skills/`](./skills) (see the end of this file).

---

## The one rule that trips agents up most

**Styles are SCSS CSS Modules — there is no CSS-in-JS.** styled-components, `Div`, the
`$pad`/`$mar` props, theme getters (`getBrand`, `getGap`, …) and `@tackl/type` **do not
exist** — never import or recreate them. Write plain JSX tags and style them from the
component's `styles.module.scss`:

```tsx
import s from './styles.module.scss';

<section className={s.jacket} data-pad>
	<h1 className='t-displayL'>Heading</h1>
</section>
```

The only layout primitive is **`Col`** — a grid child with responsive spans. Pick the tag
with `as`; it accepts span props (`$s`…`$uber`) and every prop of that tag, fully typed:

```tsx
import { Col } from '@waffl';

<Col as='article' $m='2/6' $l='3/9' className={s.card}>…</Col>
```

Children that don't need a narrower span don't need `Col` at all (see the grid section).
Span props only take effect when the `Col` is a **direct child of a `<Grid>`**; `Col` is a `div`
by default, so `as='div'` is never needed.

---

## Imports & aliases

| Import | Use for | Never write |
| --- | --- | --- |
| `import { breakpoints, mq, alpha, getVw } from '@tackl'` | JS breakpoints, colour/viewport utils | `import { Div, getBrand, bp, Col } from '@tackl'` (removed / moved) |
| `import s from './styles.module.scss'` | A component's styles | `import * as S from './styles'`, `import styled …` |
| `import Grid, { Col } from '@waffl'` | The grid (**default** import) and its column (named) | `import { Grid } from '@waffl'`, deep paths, `import { Waffl }` |
| `import { theme } from '@theme'` | Tokens in JS (GSAP, inline styles) — `var()` references | Hard-coded token values |
| `import { cx } from '@utils/cx'` | Joining class names | Template-string juggling with `undefined` |
| `import { fetchContent, GET_HOME } from '@cms'` | CMS data | importing a CMS adapter folder directly |

SCSS needs **no imports**: the Tackl layer (`bp()`, type and spacing mixins, `vw()`,
`alpha()`) is injected into every `.scss` file via `sassOptions.additionalData`.

When editing existing files, normalise any legacy imports to the forms above.

---

## Writing a component

Each component is a folder under `src/components/ComponentName/`:

```
index.tsx              # the component — logic and markup only
styles.module.scss     # ALL styles for this component
interface.ts           # prop types
Component.stories.tsx  # optional Storybook story
```

- **Functional components only.** Type props from `./interface.ts`.
- **Styles live in `styles.module.scss`**, imported as `import s from './styles.module.scss'`.
- The **outermost class is always `.jacket`**; inner ones get descriptive camelCase names
  (`.title`, `.content`, `.coat`, `.removeButton` → `s.removeButton`).
- **Write the tag in JSX** (`<header className={s.jacket}>`) — there is no `.attrs({ as })`.
- **`'use client'` only when the component needs it** (hooks, events, browser APIs) — styling
  never requires it.
- No CSS-in-JS, Tailwind, LESS, or inline styles — except CSS custom properties for dynamic
  values (`style={{ '--progress': value }}`).

### File layout & comments

Use titled blocks with a 12-dash underline, in this order (use `Header/index.tsx` as reference):

```tsx
'use client'; // only when needed

// Imports
// ------------
import { use, useRef } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
const Header = ({ socials = [] }: I.HeaderProps) => {
	// Context
	const { menuOpen } = use(GlobalContext);

	// Refs
	const jacketRef = useRef<HTMLElement>(null);

	// Animations
	useAnimation(() => { /* … */ }, { scope: jacketRef });

	// Render
	return (
		<header ref={jacketRef} className={s.jacket} data-state={menuOpen ? 'open' : 'closed'}>
			{/* … */}
		</header>
	);
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
```

Inside the component body, prefix each logical group with a single-line label — only
those that apply, never empty placeholders: `// Context`, `// Refs`, `// State`,
`// Derived`, `// Handlers`, `// Effects`, `// Animations`, `// Render`. Keep the
`// ------------` underlines at file level only, not inside the body. When extending an
existing file, match the labels and order already there.

---

## Styling & theming

- **Design tokens are CSS variables on `:root`** (`--brand-c1`, `--space-m`, `--gap-l`,
  `--br-m`, `--time-m`, `--easing-bezzy`, `--font-heading`, `--weight-medium`). They're
  **generated** from the TS token files in `src/theme/**` into `src/css/tokens.css` by
  `bun run styles` (runs automatically before dev/build/storybook). Edit the TS, never the
  generated files (`tokens.css`, `src/css/tackl/_breakpoints.scss`, `_grid.scss`).
  See [docs/Tackl/Theming.md](./docs/Tackl/Theming.md).
- **Use tokens with `var()`** in SCSS. In JS, `theme` from `@theme` holds the same `var()`
  references (`theme.colors.brand.c1`).
- **Translucent colors:** `alpha(--brand-c1, 20)` in SCSS, `alpha('--brand-c1', 20)` in JS —
  both emit `color-mix`. Same name and signature in both languages.
- **Breakpoints are NOT CSS variables** (media queries can't read them). **Mobile-first**:
  base styles are mobile; `@include bp(m) { … }`, `bp(l)`, … layer changes upward with
  `min-width`. `@include bpd(m) { … }` is the rare `max-width` case. In JS use
  `breakpoints` / `mq` from `@tackl` (`mq.up.l` → `'(min-width: 1024px)'`).
- **Type** is hand-written in `src/css/tackl/_type.scss` (from Figma). Use a style as a
  mixin (`@include captionL;`), a global class (`className='t-captionL'`) or a data
  attribute (`data-type='captionL'`). New style → write the mixin and add it to `$type-styles`.
  `data-type` takes the **bare** name (never `t-captionL`), module classes only ever go in
  `className={s.x}` (never `data-type`, never quoted), and an unknown name (`bodyM`) silently
  matches nothing.
- **Section spacing** on the `--space-*` scale: `data-pad` / `data-mar` on any element
  (`data-pad`, `data-pad='top'`, `data-mar='top bottom'`), or `@include pad(top);` / `mar()`.
- **State goes in data attributes**, not class toggling: `data-state='open'` → `&[data-state='open']`.
- **Cascade layers:** `global.scss` declares `@layer reset, base, grid, utilities`; modules are
  unlayered, so module CSS always beats globals and utilities — no specificity hacks, no `!important`.
- Module rules must sit under a local class (`.jacket p {}` is fine); bare top-level tag
  selectors belong in `src/css/global.scss`.

```scss
// components/Example/styles.module.scss — no imports needed
.jacket {
	display: flex;
	padding: var(--gap-l);
	background: alpha(--brand-c3, 40);
	transition: background var(--time-m) var(--easing-bezzy);

	@include bp(l) {
		padding: var(--gap-xl);
	}

	&[data-state='open'] {
		background: var(--brand-c1);
	}
}

.title {
	@include headlineL;

	font-size: vw(48);
}
```

---

## The Waffl grid

`Grid` (from `@waffl`) renders a plain `<waffl-grid>` tag — no web component, no shadow
DOM, no client code. All grid styling lives in `src/css/global.scss`. Direct children span
the full grid by default via the `waffl-grid > :where(*)` rule — **plain and
server-rendered elements included**. Use `Col` with span props (`$s`, `$m`, `$l`…) only for
children that need a narrower span; each breakpoint falls back to the one below. Spans are
always set through those props — never write the underlying `--col-*` variables yourself.

```tsx
import Grid, { Col } from '@waffl';

<Grid $isFixed>
	<Col as='article' $m='1/4' $l='1/7'>Narrower on larger screens</Col>
	<figure>Full width by default — no props, no component</figure>
</Grid>
```

Grid switches (`$isFixed`, `$noGutter`, `$noMargin`, `$isFullscreen`, `$isCenter`) render as
data attributes (`data-fixed`, …). A `Grid` also takes span props, so grids can nest.

---

## Animation (GSAP + Lenis)

`useAnimation` (the project's wrapper around `useGSAP` + `gsap.matchMedia`) runs inside a
`gsap.context()`. **Every tween and ScrollTrigger created in the callback is auto-reverted**
on unmount or when a matchMedia condition stops matching.

- **Do not** collect tweens to `.kill()` them, and **do not** return a cleanup function
  just to revert GSAP animations — the context handles it.
- Only return a cleanup for **non-GSAP** resources (Lenis `Snap`, event listeners,
  `matchMedia` listeners) or interaction-driven animations created outside the context.
- Smooth scrolling shares one ticker via `SmoothScroll`; `prefers-reduced-motion` users
  skip Lenis entirely. Don't add a second rAF loop.
- **The nested Lenis wrapper (locked `html`/`body`, scrolling `#page`) is deliberate —
  do not "simplify" to window-mode Lenis.** On iOS, window scrolling collapses the
  browser toolbar, and its transparency breaks page transitions and fullscreen loaders.
  The nested wrapper keeps the viewport stable, which avoids this entirely; the cost
  (the `scrollerProxy` bridge in `SmoothScroll`) is accepted.

---

## App Router & data

- The app has two root layouts via route groups: `app/(site)/layout.tsx` (the website —
  a Server Component owning `<html>`/`<body>`, site chrome, and site-wide `metadata`)
  and `app/(studio)/layout.tsx` (a bare shell for the embedded Sanity Studio, when
  present). `app/(site)/Providers.tsx` is the only client boundary in the site shell;
  page content passes through as `children` and stays server-rendered.
- Fetch CMS data in Server Components with `fetchContent` from `@cms` — it returns `null`
  on failure (never throws), so an unconfigured CMS can't crash a route.
- **`cacheComponents` is on** (`next.config.js`), so data fetching is dynamic by default.
  Anything reading uncached I/O — a `fetchContent` call, `cookies()`, even `new Date()` —
  makes its route dynamic unless you opt in with the `'use cache'` directive (see
  `app/sitemap.ts`). Wrap dynamic subtrees in `Suspense` so the static shell still
  prerenders and the rest streams in. `experimental.ppr` and `experimental_ppr` are gone —
  Partial Prerendering is the default.
- **Partial Prefetching is on**, so a `<Link>` fetches the route's shared App Shell rather
  than a per-link payload. Only add `<Link prefetch={true}>` when the destination reads
  `params`/`searchParams` and you need that resolved before the click.
- **Route transitions use React's built-in `<ViewTransition>`** (React 19.3 / Next 16.4 —
  no config, no wrapper provider, no custom router). Wrap each `page.tsx`'s content in
  `PageTransition` from `@parts/PageTransition` (never a layout — layouts persist, so their
  enter/exit never fire). Untyped navigations crossfade; tag direction with plain `next/link`
  or `useRouter` from `next/navigation`: `<Link href='/work' transitionTypes={[NAV_FORWARD]}>`,
  `router.push('/', { transitionTypes: [NAV_BACK] })`. Animations are CSS on
  `::view-transition-*(.className)` in `src/css/_page-transitions.scss`. Shared-element morphs:
  `<ViewTransition name='…' share='morph' default='none'>` on both sides. See
  `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`.
- Dynamically load non-critical client components; wrap them in `Suspense` with a fallback.
- **Anything that sets non-essential cookies (analytics, pixels, embeds) must be
  consent-gated:** wrap it in `<ConsentGate category='analytics'>` (`@parts/ConsentGate`) or
  check `hasConsent('analytics')` from `@parts/CookieBar/consent`. Never load it unconditionally.
  See [docs/Tackl/CookieConsent.md](./docs/Tackl/CookieConsent.md). GA4 is built in —
  `@parts/Analytics`, switched on by `NEXT_PUBLIC_GA_ID`.
- **Security headers and a CSP** are set in `next.config.js`. A new third-party script,
  embed, font CDN or API **must** have its origins added to `contentSecurityPolicy` there,
  or the browser blocks it. See [docs/Tackl/Security.md](./docs/Tackl/Security.md).
- **404s and errors:** `app/(site)/not-found.tsx` (for `notFound()`), `app/global-not-found.tsx`
  (unmatched URLs), `app/(site)/error.tsx` and `app/global-error.tsx` all render
  `@parts/StatusPage`. Call `notFound()` for missing CMS content rather than rendering empty.
- **Share images:** `app/(site)/opengraph-image.tsx` is the default card. Give a page its own
  card with an `opengraph-image.tsx` beside its `page.tsx` that returns
  `createOgImage({ title })` from `@utils/ogImage`.
- Optimise images (WebP/AVIF, explicit width/height, lazy loading).

---

## General code quality

- **Strict TypeScript.** Never `any` — use `unknown` for dynamic data and narrow it.
  The kit deliberately rides the native (Go-based) TypeScript 7 compiler, pinned to
  its minor line (`~7.0.x`) — `next build` type-checks through the project-local `tsc`
  (`useTypeScriptCli`), which is what makes that work. Don't downgrade to 6.x casually.
- Prefer named constants over magic numbers; give them purpose-revealing names.
- Small, single-responsibility functions. If a function needs a comment to explain
  *what* it does, split it. Comments explain *why*, not *what*.
- DRY: extract repeated logic; keep single sources of truth.
- Declarative JSX; prefer ternary / short-circuit over verbose conditionals. Name boolean
  flags clearly (`isLoading`, `hasError`).

---

## Before you finish

- `bun run type-check` — must pass (strict, no emit).
- `bun run lint` — Biome (TS/JS/JSON/CSS) **and** Stylelint (`.scss` — Biome can't parse SCSS).
  Stylelint also flags `var(--…)` names that aren't real tokens.
- Changed a token in `src/theme`? `bun run styles` regenerates the CSS (the pre-commit hook
  fails on stale generated files).
- `bun run test` — Playwright specs (builds and boots the production app; add
  specs to `tests/` as features land).
- CI also runs Lighthouse 13 (`lighthouserc.js`, desktop) and **fails below Performance 90,
  Best Practices 90, SEO 100, or any failing Agentic Browsing check** — don't loosen a
  threshold to get green without saying why. Keep `app/llms.txt/route.ts` in step with the
  site's pages.
- For anything visual or interactive, verify against the running app (`bun run dev`), not
  just types — the pre-configured `chrome-devtools` MCP can drive the browser for you.

---

## Skills

Deeper, task-specific playbooks live in [`skills/`](./skills), each a `SKILL.md` with
YAML frontmatter (`name`, `description`) following the Agent Skills format — covering GSAP,
Lenis, Next.js, React, TypeScript, styling, performance and WebGL. Read the relevant
`SKILL.md` on demand when a task calls for that depth.

Wiring them to your tool:

- **Claude Code** — symlink or copy into `.claude/skills/` (`ln -s ../../skills .claude/skills`).
- **Cursor** — point Cursor's skills/plugins at the `skills/` directory.
- **Other tools** — reference `skills/**/SKILL.md` however your agent loads context.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
