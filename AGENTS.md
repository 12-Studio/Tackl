# AGENTS.md

Guidance for AI coding agents working in a Tackl project. Tool-agnostic — read by
Cursor, Claude Code, Copilot, Zed, Aider, Gemini CLI and any tool that supports the
[agents.md](https://agents.md) convention.

Human-facing docs live in [`docs/`](./docs) and [`README.md`](./README.md); deep-dive
skills live in [`skills/`](./skills) (see the end of this file).

---

## The one rule that trips agents up most

**There is exactly one semantic component: the polymorphic `Div`.** Per-tag components
(`Section`, `Main`, `H1`, `P`, `Nav`, …) **do not exist** — never import them.

```tsx
import { Div } from '@tackl';

<Div as='section' $pad>…</Div>
<Div as='h1' $m='2/6' $l='3/9'>Heading</Div>
```

Pick the tag with the `as` prop, or fix it in a styles file with `.attrs`:

```tsx
export const Jacket = styled(Div).attrs({ as: 'header' })(/* … */);
```

`Div` is a real `styled.div`, so it accepts spacing props (`$mar`, `$pad`, …), responsive
grid-span props (`$s`…`$uber`), and every normal HTML attribute — all fully typed.

---

## Imports & aliases

| Import | Use for | Never write |
| --- | --- | --- |
| `import { Div, bp, bpd, alpha, getBrand, … } from '@tackl'` | Primitives, breakpoints, theme getters | `import { Section } from '@tackl'` (doesn't exist) |
| `import { headlineL, bodyL } from '@tackl/type'` | Typography styles | `import … from '@/theme/tackl/type'` |
| `import Grid from '@waffl'` | The grid container (**default** import) | `import { Grid } from '@waffl'`, deep paths, `import { Waffl }` |
| `import { fetchContent, GET_HOME } from '@cms'` | CMS data | importing a CMS adapter folder directly |

When editing existing files, normalise any legacy imports to the forms above.

---

## Writing a component

Each component is a folder under `src/components/ComponentName/`:

```
index.tsx          # the component — logic and markup only
styles.ts          # ALL styled-components for this component
interface.d.ts     # prop types
Component.stories.tsx  # optional Storybook story
```

- **Functional components only.** Type props from `./interface.d.ts`.
- **No styled-components in `index.tsx`** — style in `styles.ts`, import as `import * as S from './styles'`.
- The **outermost styled component is always `Jacket`**; inner ones get descriptive names (`Title`, `Content`, `Coat`).
- No CSS modules, inline styles, SASS/LESS, or Tailwind.

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
import * as S from './styles';

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
	return <S.Jacket ref={jacketRef}>{/* … */}</S.Jacket>;
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

- Style with styled-components in `styles.ts`. Prefer CSS custom properties for dynamic values.
- **Design tokens are CSS variables on `:root`** (`--brand-bc1`, `--space-m`, `--gap-l`,
  `--br-m`, `--time-m`, `--easing-bezzy`, `--font-heading`). Theme getters resolve to
  `var()` references, so in plain CSS or Server Components you can use `var(--space-m)`
  directly. See [docs/Tackl/Theming.md](./docs/Tackl/Theming.md).
- Getters: `getBrand`, `getGlobal`, `getFeedback`, `getSpace`, `getGap`, `getRadius`,
  `getEase`, `getTime`, `getFont`, `getFontWeight`.
- **Translucent colors:** `alpha()` from `@tackl` — `alpha('--brand-bc1', 20)` or
  `alpha(props.theme.colors.global.white, 15)` — wraps the color in `color-mix`.
- **Breakpoints are NOT CSS variables** (media queries can't read them). Use `bp`/`bpd`
  from `@tackl`. **Mobile-first**: base styles are the mobile styles; `bp.m`, `bp.l`, …
  layer changes upward with `min-width` queries. `bpd` is the rare `max-width` case.

```ts
// components/Example/styles.ts
import styled, { css } from 'styled-components';
import { alpha, bp, Div, getBrand, getEase, getTime } from '@tackl';
import { bodyS } from '@tackl/type';

export const Jacket = styled(Div).attrs({ as: 'section' })(
	() => css`
		display: flex;
		padding: var(--gap-l);
		background: ${alpha('--brand-bc3', 40)};
		transition: background ${getTime('m')} ${getEase('bezzy')};

		${bp.l` padding: var(--gap-xl); `}
	`
);
```

---

## The Waffl grid

`Grid` (from `@waffl`) renders a plain `<waffl-grid>` tag — no web component, no shadow
DOM, no side-effect import to register (never import `WebComponent`; it doesn't exist).
Direct children span the full grid by default via the `waffl-grid > :where(*)` rule in
`src/css/global.css` — **plain and server-rendered elements included**. Add span props
(`$s`/`$m`/`$l`…) only to children that need a narrower span.

```tsx
import Grid from '@waffl';
import { Div } from '@tackl';

<Grid $isFixed>
	<Div as='article' $m='1/4' $l='1/7'>Narrower on larger screens</Div>
	<figure>Full width by default — no props, no styled-component</figure>
</Grid>
```

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

---

## App Router & data

- The app has two root layouts via route groups: `app/(site)/layout.tsx` (the website —
  a Server Component owning `<html>`/`<body>`, site chrome, and site-wide `metadata`)
  and `app/(studio)/layout.tsx` (a bare shell for the embedded Sanity Studio, when
  present). `app/(site)/Providers.tsx` is the only client boundary in the site shell;
  page content passes through as `children` and stays server-rendered.
- Fetch CMS data in Server Components with `fetchContent` from `@cms` — it returns `null`
  on failure (never throws), so an unconfigured CMS can't crash a route.
- Route transitions: `useTransitionRouter` from the view-transitions utils.
- Dynamically load non-critical client components; wrap them in `Suspense` with a fallback.
- Optimise images (WebP/AVIF, explicit width/height, lazy loading).

---

## General code quality

- **Strict TypeScript.** Never `any` — use `unknown` for dynamic data and narrow it.
- Prefer named constants over magic numbers; give them purpose-revealing names.
- Small, single-responsibility functions. If a function needs a comment to explain
  *what* it does, split it. Comments explain *why*, not *what*.
- DRY: extract repeated logic; keep single sources of truth.
- Declarative JSX; prefer ternary / short-circuit over verbose conditionals. Name boolean
  flags clearly (`isLoading`, `hasError`).

---

## Before you finish

- `bun run type-check` — must pass (strict, no emit).
- `bun run lint` — Biome check.
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
