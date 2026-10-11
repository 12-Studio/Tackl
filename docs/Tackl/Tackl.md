# Tackl — The Theme & Styling Layer

## Overview

Tackl is the design-system layer of the starter kit: TypeScript design tokens, a small injected SCSS toolkit, the Waffl grid, and a handful of JS helpers. Components are styled with **SCSS CSS Modules** (`styles.module.scss`) — static CSS, compiled at build time, with no styling runtime in the client bundle and no provider. Server Components can be styled directly.

```
src/theme/**                 TS design tokens — the single source of truth
scripts/build-styles.ts      generator (`bun run styles`, runs before dev/build/storybook)
src/css/tokens.css           GENERATED :root custom properties
src/css/tackl/               the injected SCSS layer (mixins/functions only, zero CSS output)
src/css/global.scss          the only global stylesheet (reset, base, grid, utilities layers)
src/theme/tackl/index.ts     `@tackl` — Col, breakpoints, mq, alpha, getVw…
src/theme/tackl/waffl/       `Grid` — `import Grid from '@waffl'`
```

## 1. Design Tokens

Token values live in `src/theme/<group>/index.ts` (colors, space, gap, borderRadius, easing, time, fonts, grid). The generator turns them into CSS custom properties on `:root` in `src/css/tokens.css`:

`--brand-c1…c5`, `--global-white|black`, `--feedback-positive|negative|warning`, `--space-s|m|l|xl|col`, `--gap-xxs…uber`, `--br-xs|s|m|l|round`, `--easing-bezzy|bezzy2|bezzy3`, `--time-s|m|l`, `--font-heading|body|mono|script`, `--weight-light…black`.

- Use them anywhere as `var(--space-m)` — modules, `global.scss`, inline styles.
- To change a value, edit the token file and run `bun run styles` (or just `bun run dev`). Never hand-edit the generated files (`tokens.css`, `_breakpoints.scss`, `_grid.scss`) — the pre-commit hook runs `bun run styles --check`.
- Runtime theming is a CSS override: `html[data-theme='dark'] { --brand-c1: #9b30ff; }`.
- In JS (e.g. GSAP), the `theme` object from `@theme` holds the same `var()` references: `gsap.to(el, { color: theme.colors.brand.c1 })`.

See [Theming.md](./Theming.md) for the full guide.

## 2. The Injected SCSS Layer (`src/css/tackl`)

`next.config.js` prepends `@use 'tackl' as *;` to every `.scss` file (`sassOptions.additionalData`), so these are available with **no imports**. The layer emits no CSS on its own.

| Helper | Usage |
| --- | --- |
| `bp($key)` | `@include bp(m) { … }` — mobile-first `min-width` query |
| `bpd($key)` | `@include bpd(m) { … }` — the rare `max-width` case (0.02px under) |
| `alpha($color, $opacity)` | `background: alpha(--brand-c1, 20);` — translucent color via `color-mix` |
| `vw($px, $design: desktop)` | `font-size: vw(48);` · `margin: vw(24, mobile);` |
| `noscrollbars` | `@include noscrollbars;` |
| `pad($side)` / `mar($side)` | `@include pad;` · `@include pad(top);` · `@include mar(bottom);` — sides: `block` (default), `top`, `bottom` |
| Type mixins | `@include headlineL;` — `displayL displayS headlineL headlineS titleL titleS bodyL bodyS captionL captionS` |
| Variables | `$breakpoints`, `$columns`, `$gutters`, `$grid-max`, `$design-widths` |

If an editor needs it for IntelliSense, `@use 'tackl' as *;` at the top of a file is a harmless fallback.

## 3. Writing Styles

```tsx
// src/components/Example/index.tsx
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
// src/components/Example/styles.module.scss
.jacket {
	display: flex;
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
	color: var(--brand-c1);
}
```

- The outermost class is `.jacket`; classes are camelCase (`s.removeButton`).
- Tags are written in JSX — there is no polymorphic styling primitive.
- Dynamic state → `data-*` attributes (`&[data-state='open']`); dynamic values → custom properties (`style={{ '--progress': value }}`).
- Bare tag selectors at the top level of a module aren't allowed (CSS Modules pure mode); nest them under a class (`.jacket p {}`) or put them in `global.scss`.
- `cx()` from `@utils/cx` joins class names, skipping falsy values.

See [WritingComponents.md](./WritingComponents.md) for the full conventions.

## 4. Typography

Type styles are hand-written mixins in `src/css/tackl/_type.scss` (from the Figma file). Each style is available three ways:

- mixin in a module: `@include captionL;`
- global class: `<p className='t-captionL'>`
- data attribute: `<p data-type='captionL'>`

To add a style, write the mixin, then add its name to `$type-styles` at the bottom of `_type.scss` — the class and attribute are generated from that list.

## 5. Section Spacing

Section spacing steps along `--space-*` (s → m at `bp(m)` → l at `bp(l)`):

- HTML, on any element: `<section data-pad>` (top + bottom), `data-pad='top'`, `data-pad='bottom'`, `data-mar='top bottom'` (values combine).
- SCSS: `@include pad;`, `@include pad(top);`, `@include mar(bottom);`

See [SemanticComponents.md](./SemanticComponents.md).

## 6. Waffl Grid & `Col`

`Grid` (`import Grid from '@waffl'`) is a server component rendering a plain `<waffl-grid>` tag. Every direct child spans the full width by default (`waffl-grid > :where(*)`), so plain and server-rendered elements need no props. Narrow a child with `Col` from `@tackl`:

```tsx
import Grid from '@waffl';
import { Col } from '@tackl';

<Grid $isFixed>
	<Col as='article' $m='2/6' $l='3/9'>Narrower on larger screens</Col>
	<figure>Full width by default</figure>
</Grid>
```

- `Grid` props become data attributes: `$isFixed` → `data-fixed` (max-width 1440px), `$noGutter`, `$noMargin`, `$isFullscreen`, `$isCenter`. It also takes span props, so a grid can sit inside another grid.
- `Col` is polymorphic (`as`) and takes span props `$s $sm $m $l $xl $xxl $huge $uber` (grid-column values like `'2/6'`, `'1/-1'`, `'span 3'`) plus any props of the chosen tag. Each breakpoint falls back to the one below.
- Spans can also be set by hand: `style={{ '--col-m': '2/6' }}`.
- Columns: s 2 / m 6 / l 12.

See [WafflGrid.md](./WafflGrid.md) and [GridSystemProps.md](./GridSystemProps.md).

## 7. Breakpoints

Tokens in `src/theme/grid/index.ts`: `s` 320, `sm` 390, `m` 700, `l` 1024, `xl` 1200, `xxl` 1400, `huge` 1600, `uber` 1800 (px). Mobile-first. Media queries can't read CSS variables, so breakpoints are build-time values:

- SCSS: `@include bp(m) { … }` / `@include bpd(m) { … }`
- JS (`@tackl`): `breakpoints.m` → `'700px'`, `mq.up.m` → `'(min-width: 700px)'`, `mq.down.m` → `'(max-width: 699.98px)'`. `useAnimation`'s `isMobile`/`isTablet`/`isDesktop` defaults are built from `mq`.

## 8. JS Utilities (`@tackl`)

| Export | Purpose |
| --- | --- |
| `Col` | Grid child with responsive spans |
| `breakpoints`, `mq` | Breakpoint values and media query strings |
| `alpha(color, opacity)` | Same as the SCSS `alpha()`: `alpha('--brand-c1', 20)` → `color-mix(in srgb, var(--brand-c1) 20%, transparent)` |
| `getVw(px)`, `getVwTablet(px)`, `getVwMobile(px)` | px → vw against the design widths (JS twins of `vw()`) |

## 9. Cascade Layers

`global.scss` declares `@layer reset, base, grid, utilities;`. Component modules are unlayered, so module CSS always beats the reset, grid and utilities without specificity games or `!important`.

## 10. Fonts

`next/font` instances live in `src/theme/fonts/index.ts` (Inter by default, a variable font loaded as one file, exposed as `--inter` on `<html>`). Raw stacks and weights live in `src/theme/fonts/values.ts` and become `--font-*` / `--weight-*` tokens. To add a font: create the instance in `fonts/index.ts`, register its variable in `fontVariables`, reference it in `fontFamilies`, add its `.variable` class to `<html>` in `app/(site)/layout.tsx`, and run `bun run styles`.

## 11. Tooling

- `bun run lint` runs Biome (TS/JS/JSON/CSS) and Stylelint (`**/*.scss`, `stylelint-config-standard-scss`). Stylelint checks every `var(--…)` against `tokens.css`, so token typos fail lint.
- `browserslist: ["baseline widely available"]` drives JS and CSS prefixing.
- **Grid Exposer** — a development-only grid overlay, rendered from `app/(site)/Providers.tsx`.
- **Storybook** — configured in `.storybook/`; `bun run storybook` regenerates styles first.
