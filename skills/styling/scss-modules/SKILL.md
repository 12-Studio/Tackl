---
name: scss-modules
description: Styles React components with SCSS CSS Modules and the Tackl design system. Use when the user mentions styling, styles.module.scss, SCSS, CSS modules, design tokens, CSS variables, breakpoints (bp / bpd / mq), typography (t-* classes, type mixins), spacing (data-pad / data-mar), the Waffl grid (Grid / Col), or theming in this project.
---

# SCSS Modules (Tackl)

Tackl styles with **SCSS CSS Modules** — static CSS, no runtime. There is no
styled-components, no `Div`, no theme getters and no `@tackl/type`. Never recreate them.

## File structure

```
src/components/Example/
  index.tsx            # logic + markup
  styles.module.scss   # ALL styles
  interface.ts         # prop types
```

```tsx
// index.tsx
import { cx } from '@utils/cx';
import type * as I from './interface';
import s from './styles.module.scss';

const Example = ({ isOpen, className }: I.ExampleProps) => (
	<section className={cx(s.jacket, className)} data-state={isOpen ? 'open' : 'closed'} data-pad>
		<h2 className={cx(s.title, 't-headlineL')}>Title</h2>
	</section>
);
```

```scss
// styles.module.scss — no imports: the Tackl layer is injected
.jacket {
	display: grid;
	gap: var(--gap-m);
	background: alpha(--brand-c3, 40);
	transition: background var(--time-m) var(--easing-bezzy);

	@include bp(l) {
		gap: var(--gap-xl);
	}

	&[data-state='open'] {
		background: var(--brand-c1);
	}
}

.title {
	color: var(--global-white);
}
```

## Rules

1. Outermost class is `.jacket`; others are descriptive camelCase (`s.removeButton`).
2. Write the HTML tag in JSX. State → `data-*` attributes; dynamic values → CSS custom
   properties via `style={{ '--progress': value }}` (typed — `CSSProperties` accepts `--*`).
3. Tokens are CSS variables — always `var(--…)`, never hard-coded values:
   `--brand-c1…c5`, `--global-white|black`, `--feedback-*`, `--space-s|m|l|xl|col`,
   `--gap-xxs…uber`, `--br-xs|s|m|l|round`, `--easing-bezzy*`, `--time-s|m|l`,
   `--font-heading|body|mono|script|serif`, `--weight-light…black`.
4. Mobile-first: base styles, then `@include bp(m) { … }`, `bp(l)`, … (min-width).
   `@include bpd(m) { … }` only for the rare max-width case.
5. Module rules must sit under a local class. Bare top-level tag selectors go in
   `src/css/global.scss`.
6. `'use client'` only for hooks/events/browser APIs — never for styling.
7. Lint with `bun run lint` (Biome + Stylelint). Stylelint rejects unknown `var(--…)` names.

## The injected layer (`src/css/tackl`, available in every .scss file)

| Need | SCSS |
| --- | --- |
| Breakpoint up / down | `@include bp(m) { … }` · `@include bpd(m) { … }` |
| Type style | `@include displayL;` … `@include captionS;` |
| Section spacing | `@include pad;` `@include pad(top);` `@include mar(bottom);` |
| Translucent colour | `alpha(--brand-c1, 20)` — opacity 0–100, `20%` also accepted (same as `alpha()` in JS) |
| px → vw | `vw(48)` (desktop 1440) · `vw(24, mobile)` · `vw(32, tablet)` |
| Hide scrollbars | `@include noscrollbars;` |
| Grid values | `$breakpoints`, `$columns`, `$gutters`, `$grid-max`, `$design-widths` |

The layer emits **no CSS** — only mixins, functions and variables. Keep it that way: any
rule added there is duplicated into every module.

## Global utilities (HTML, any element)

- Type: `className='t-captionL'` or `data-type='captionL'`
- Spacing: `data-pad` (top + bottom), `data-pad='top'`, `data-pad='bottom'`,
  `data-mar='top bottom'` (values combine)

They live in `@layer utilities`; modules are unlayered, so a module always overrides them.

## Typography

Hand-written in `src/css/tackl/_type.scss`, straight from the Figma file:

```scss
@mixin captionL {
	font-family: var(--font-body);
	font-weight: var(--weight-regular);
	font-size: 1.4rem;
	line-height: 1.5;

	@include bp(xl) {
		font-size: 1.6rem;
	}
}
```

Adding a style: write the mixin, then add its name to `$type-styles` at the bottom of the
file so the `.t-*` class and `[data-type]` selector are generated.

## Grid

```tsx
import Grid, { Col } from '@waffl';

<Grid $isFixed>
	<Col as='article' $m='2/6' $l='3/9'>Spans by breakpoint</Col>
	<figure>Full width by default — no component needed</figure>
</Grid>
```

- Direct grid children span `1 / -1`; narrow one with `Col` span props (`$m='2/6'`). Never set the internal `--col-*` variables by hand.
- Each breakpoint falls back to the one below; spans never leak into nested grids.
- Grid switches → data attributes: `$isFixed`, `$noGutter`, `$noMargin`, `$isFullscreen`, `$isCenter`.

## Tokens & JS

- Source of truth: TS in `src/theme/**`. `bun run styles` regenerates `src/css/tokens.css`,
  `src/css/tackl/_breakpoints.scss` and `_grid.scss` (also runs before dev/build/storybook).
  Never edit generated files.
- JS: `theme` from `@theme` (var() refs), and from `@tackl`: `breakpoints`, `mq.up.m` /
  `mq.down.m` (for `gsap.matchMedia`), `alpha()`, `getVw()`. `Grid` and `Col` come from `@waffl`.
- Runtime theming: override tokens in CSS, e.g. `html[data-theme='dark'] { --brand-c1: #9b30ff; }`.

## Common mistakes

- Importing `styled`, `Div`, `getBrand`, `bp`, `headlineL` from old Tackl APIs — they're gone.
- Adding rules (not just mixins) to `src/css/tackl/*` — duplicates CSS everywhere.
- Hand-rolling `rgba()` / hex-with-alpha instead of `alpha(--token, n)` — it breaks runtime theming.
- Hard-coding breakpoint pixels in JS — use `mq` / `breakpoints` from `@tackl`.
- Editing `tokens.css` or the generated `_breakpoints.scss` / `_grid.scss` by hand.
- Toggling classes for state instead of `data-*` attributes.
- `data-type='t-headlineS'` — `data-type` takes the bare name (`headlineS`); `t-` is only the class prefix (`className='t-headlineS'`).
- `data-type={s.body}` / `data-type='s.body'` / `className='s.body'` — module classes always go in `className={s.body}` (braces, no quotes).
- Inventing a type name (`bodyM`) — only styles listed in `$type-styles` in `_type.scss` exist; anything else silently matches nothing.
- Expecting `Col` spans outside a grid — `$m` / `$l` only apply to a direct child of `<Grid>`.
- Destructuring props (`isFeatured`, `className`) and never using them — wire them up (`cx(s.jacket, className)`, `data-featured={isFeatured || undefined}`) or drop them.
