# Migrating a Project from Tackl 4 to Tackl 5

Tackl 5 replaces styled-components with **SCSS CSS Modules** and removes the first-run setup wizard. Tokens, breakpoint keys, spacing keys, type style names and the Waffl grid's behaviour are unchanged — what changes is how styles are written and delivered: static CSS compiled at build time, with no styling runtime, no SSR style registry and no provider.

Work on a dedicated branch, one phase per commit. Coming from v3? Do [MigratingFromV3.md](./MigratingFromV3.md) first.

---

## What was removed

- **styled-components** — `styled`, `css`, `RuleSet`, `ThemeProvider`, `GlobalStyle` / `createGlobalStyle`, the SSR registry (`src/utils/registry.tsx`) and `compiler.styledComponents` in `next.config.js`.
- **`Div`** and its spacing props `$pad`, `$mar`, `$padTop`, `$padBottom`, `$marTop`, `$marBottom`.
- **Theme getters** — `getBrand`, `getGlobal`, `getFeedback`, `getSpace`, `getGap`, `getRadius`, `getEase`, `getTime`, `getFont`, `getFontWeight`.
- **css-tagged helpers** — `bp` / `bpd` (`bp.m\`…\``) and the `noscrollbars` RuleSet from `@tackl`.
- **`@tackl/type`** — the `headlineL`… RuleSets, `typeScale` and `typeRoles`.
- `src/theme/tackl/semantics` and `src/theme/tackl/breakpoints`.
- **The setup wizard** — `TacklSetup`, the `/api/tackl-setup` route and its doc. Configure a new project by editing the token files in `src/theme` directly, then run `bun run styles`.

---

## API change map (v4 → v5)

| v4 | v5 |
| --- | --- |
| `styles.ts` | `styles.module.scss` |
| `import * as S from './styles'` | `import s from './styles.module.scss'` |
| `<S.Jacket>` | `<section className={s.jacket}>` — classes are camelCase |
| `styled(Div).attrs({ as: 'header' })(…)` | A plain `<header>` in the JSX, styled by a module class |
| `<Div as='h1' $m='2/6' $l='3/9'>` | `<Col as='h1' $m='2/6' $l='3/9'>` (`import { Col } from '@waffl'`) — only when it needs spans |
| `<Div as='section' $pad>` | `<section data-pad>` |
| `$padTop` / `$padBottom` / `$marTop` / `$marBottom` | `data-pad='top'` / `data-pad='bottom'` / `data-mar='top'` / `data-mar='bottom'` (values combine: `data-mar='top bottom'`) |
| Spacing in a styled block | `@include pad;` · `@include pad(top);` · `@include mar(bottom);` |
| `getBrand('c1')` | `var(--brand-c1)` |
| `getBrand('c1', 20)` · `getGlobal('white', 80)` | `alpha(--brand-c1, 20)` · `alpha(--global-white, 80)` in SCSS — `alpha('--brand-c1', 20)` in JS |
| `getFeedback('negative')` | `var(--feedback-negative)` |
| `getSpace('m')` · `getGap('m')` · `getRadius('m')` | `var(--space-m)` · `var(--gap-m)` · `var(--br-m)` |
| `${getTime('m')} ${getEase('bezzy')}` | `var(--time-m) var(--easing-bezzy)` |
| `getFont('heading')` · `getFontWeight('bold')` | `var(--font-heading)` · `var(--weight-bold)` |
| `` ${bp.l` padding: var(--gap-xl); `} `` | `@include bp(l) { padding: var(--gap-xl); }` |
| `` ${bpd.m`…`} `` | `@include bpd(m) { … }` |
| `${headlineL}` (from `@tackl/type`) | `@include headlineL;` in a module — or `className='t-headlineL'` / `data-type='headlineL'` in JSX |
| `${noscrollbars}` | `@include noscrollbars;` |
| `${getVw(48)}` inside styles | `vw(48)` in SCSS (`vw(24, mobile)` / `vw(24, tablet)` for the other design widths) — `getVw` stays in `@tackl` for JS |
| `typeScale` / `typeRoles` config | Hand-written mixins in `src/css/tackl/_type.scss`; add new names to `$type-styles` |
| Transient props (`$isOpen`) driving `css` blocks | `data-*` attributes: `data-state={isOpen ? 'open' : 'closed'}` + `&[data-state='open'] { … }` |
| Interpolated values (`${p => p.$progress}`) | Custom properties: `style={{ '--progress': value }}` + `var(--progress)` |
| `props.theme.colors.brand.c1` in styles | `var(--brand-c1)` — JS/GSAP keeps `theme.colors.brand.c1` from `@theme` (a `var()` reference) |
| `src/css/global.css` + `GlobalStyle` | `src/css/global.scss`, imported once in `app/(site)/layout.tsx` after `@css/tokens.css` |
| `'use client'` added for styling | Remove it unless the component uses hooks, refs or events — Server Components import modules directly |

Combine module classes with global utility classes and a `className` prop using `cx()` from `@utils/cx`:

```tsx
<h2 className={cx(s.title, 't-headlineL', isActive && s.active, className)} />
```

### Before / after

```tsx
// v4 — styles.ts
export const Jacket = styled(Div).attrs({ as: 'section' })(
	() => css`
		display: flex;
		padding: ${getGap('l')};
		background: ${getBrand('c3', 40)};
		transition: background ${getTime('m')} ${getEase('bezzy')};

		${bp.l` padding: ${getGap('xl')}; `}
	`
);

export const Title = styled(Div).attrs({ as: 'h2' })(
	() => css`
		${headlineL}
	`
);
```

```scss
// v5 — styles.module.scss (no imports needed)
.jacket {
	display: flex;
	padding: var(--gap-l);
	background: alpha(--brand-c3, 40);
	transition: background var(--time-m) var(--easing-bezzy);

	@include bp(l) {
		padding: var(--gap-xl);
	}
}

.title {
	@include headlineL;
}
```

```tsx
// v5 — index.tsx
import s from './styles.module.scss';

<section className={s.jacket}>
	<h2 className={s.title}>Title</h2>
</section>
```

### Module rules worth knowing

- Bare tag selectors at the top level of a module are rejected (CSS Modules pure mode). Nest them under a class (`.jacket p {}`) or move them to `global.scss`.
- `global.scss` declares `@layer reset, base, grid, utilities;`. Modules are unlayered, so they always win — drop any specificity hacks or `!important` that fought the old global styles.
- The outermost class is `.jacket`, matching the old `Jacket` convention.

---

## Config & tooling changes

Copy these from the Tackl 5 template rather than editing by hand:

- **`next.config.js`** — remove `compiler.styledComponents`; add:

	```js
	sassOptions: {
		implementation: 'sass-embedded',
		loadPaths: [path.join(__dirname, 'src/css')],
		additionalData: `@use 'tackl' as *;`,
	},
	```

	This injects the Tackl SCSS layer (`src/css/tackl` — `bp`, `bpd`, `vw`, `alpha`, `noscrollbars`, `pad`, `mar`, type mixins; no CSS output) into every `.scss` file.
- **Dependencies** — remove `styled-components`; add `sass-embedded`, `stylelint`, `stylelint-config-standard-scss` and `stylelint-value-no-unknown-custom-properties`.
- **Generator** — `scripts/build-styles.ts` (`bun run styles`) writes `src/css/tokens.css`, `src/css/tackl/_breakpoints.scss` and `src/css/tackl/_grid.scss` from the TS tokens. `dev`, `build`, `storybook` and `build-storybook` run it first. The generated files are committed; never hand-edit them.
- **Linting** — `bun run lint` is now `biome check . && stylelint "**/*.scss"` (Biome can't parse SCSS). `.stylelintrc.json` enforces camelCase classes and mixins, and checks every `var(--…)` against `tokens.css`, so token typos fail lint.
- **`browserslist: ["baseline widely available"]`** in `package.json` — drives JS and CSS prefixing.
- **`sideEffects`** in `package.json` includes `*.scss`.
- **Pre-commit** (`.husky/pre-commit`) — runs `bun run styles --check` (fails on stale generated files), `bun run lint` and `bun run type-check`.
- **Types** — `src/types/css.d.ts` lets `React.CSSProperties` accept `--*` keys, so `style={{ '--progress': value }}` needs no cast. Delete the old styled-components theme typing.
- **Editor** — `.vscode/extensions.json` recommends Biome, Stylelint, CSS Variable Autocomplete and SCSS IntelliSense.
- **Storybook** — `.storybook/preview.js` imports `@/css/tokens.css` and `@/css/global.scss` instead of rendering `GlobalStyle`.

---

## Phases

1. **Prep** — clean branch; `bun run build` passes on v4; screenshot key pages at 1440×900 as the visual reference.
2. **Config** — apply the config & tooling changes above; `bun install`.
3. **Engine** — replace `src/theme/` and `src/css/` with the template's, then port the project's token *values* back into `src/theme/<group>/index.ts`. Run `bun run styles` and check the `:root` block in devtools.
4. **Type** — rewrite the project's type styles as mixins in `src/css/tackl/_type.scss` (mobile-first, `@include bp(…)` steps) and list them in `$type-styles`.
5. **Shell** — replace `app/(site)/layout.tsx` and `app/(site)/Providers.tsx` with the template's (no registry, `ThemeProvider` or `GlobalStyle`); delete `src/utils/registry.tsx`. Port project-specific global rules into `global.scss` inside the appropriate layer.
6. **Component sweep** — leaf components first. Per component: convert `styles.ts` → `styles.module.scss` using the change map, swap `S.*` for `className={s.*}`, replace `Div` with plain tags (or `Col` where spans are needed), move transient props to `data-*` attributes, and drop `'use client'` where styling was the only reason. Delete `styles.ts`. Run `bun run type-check` and `bun run lint` after each batch.
7. **Verify** — `bun run type-check`, `bun run lint`, `bun run test`, `bun run build`; compare key pages against the Phase 1 screenshots at each breakpoint. Search for leftovers: `rg "styled-components|@tackl/type|getBrand|\\$pad|<Div"` should return nothing.
