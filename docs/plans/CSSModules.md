# Plan: styled-components → CSS Modules (SCSS)

Status: **implemented** · Branch: `css-modules` · Release: **Tackl 5.0.0** (breaking)

> Implementation notes (where the build differs from the original plan) are
> collected in **§14** at the end.

## Why

Performance. styled-components costs at three points:

- **Client bundle.** The runtime ships to every page (~13 kB gz).
- **Server render.** Every streamed flush serialises collected styles through
  `useServerInsertedHTML`. This is the `ServerStyleSheet` registry in
  `src/utils/registry.tsx`.
- **Hydration.** Styles are rebuilt and injected on the client, and any
  component that styles itself needs the client-side `ThemeProvider` context.

CSS Modules compile to static `.css` files at build time. They need no runtime, are
cached separately from JS, are only shipped on routes that import them, and
work in Server Components without a client boundary.

## Decisions

| Topic | Decision |
| --- | --- |
| Styling | SCSS CSS Modules (`styles.module.scss`), compiled by `sass-embedded` |
| Mixins | Global via `sassOptions.additionalData`, so modules need no imports |
| Tokens | Stay in TS. They **generate** `tokens.css` (`:root` variables) and feed the JS `theme` object. |
| Breakpoints | Stay in TS (`theme.grid.breakpoints`). They generate the Sass `bp()` / `bpd()` mixins, and JS gets `breakpoints` + `mq` for GSAP and utils. |
| Typography | **Hand-written** in one `_type.scss`, from Figma. `typeScale` (TS) is deleted. |
| Type API | Mixins (`@include captionL;`), classes (`.t-captionL`) **and** data attributes (`data-type='captionL'`) |
| Spacing API | Data attributes on any element (`data-pad`, `data-mar='top'`) **and** mixins (`@include pad(top);`). The `$pad`/`$mar` props go. |
| Grid | `<Grid>` → `<waffl-grid>` with data attributes; `<Col>` replaces `Div` for grid spans |
| Setup wizard | **Removed** entirely (component, API route, docs, README/CLI mentions) |
| Linting | Biome stays for TS/JS/JSON/CSS. **Stylelint is added for `.scss` only.** Biome has no SCSS support: tested on 2.5.7 (pinned) and 2.5.15 (latest), and both skip `.scss` files. |
| Editor | Recommended extensions for variable autocomplete with colour swatches, mixin IntelliSense and inline Stylelint |
| Browser support | `"browserslist": ["baseline widely available"]`. Next uses it for JS compilation **and** CSS prefixing automatically. Today it resolves to Chrome/Edge 123+, Firefox 124+ and Safari/iOS 17.4+ (checked with browserslist 4.29.3). |
| Unused CSS | **No purging for now.** Modules are already per-route; keep the global layer small and revisit only if measurements say so. |
| Agent + skill files | AGENTS.md and `skills/styling/*` rewritten for SCSS Modules; styled-components skills deleted |

## Principles

1. **One source of truth.** Tokens and breakpoints live in TS and are generated
   into CSS/SCSS, never hand-copied. Typography lives in SCSS only.
2. **Runtime values are CSS custom properties; build-time values are Sass.**
   Colours, space, gap, radius, easing, time and fonts are `var(--…)` on `:root`,
   so they can be re-themed at runtime. Only media queries, which can't read
   variables, use Sass values.
3. **The injected SCSS layer emits zero CSS.** It contains mixins and functions
   only. It's prepended to every `.scss` file, so any rule in it would be
   duplicated in every file.
4. **Global utilities live in `@layer utilities`.** Module CSS is unlayered, so it
   always overrides a utility, with no specificity fights and no `!important`.
5. **Dynamic values use data attributes and custom properties.** `$isOpen` becomes
   `data-state='open'`, and `$col={3}` becomes `style={{ '--col': 3 }}`.

---

## Target architecture

```
src/
  theme/
    grid/index.ts            ← breakpoints, columns, gutters, design widths (source)
    colors/ space/ gap/ …    ← raw token values (source)
    fonts/values.ts          ← NEW: raw font stacks/weights (no next/font call — see §1)
    fonts/index.ts           ← next/font instances only
    index.ts                 ← `theme` object (var() refs) for JS/GSAP
    tackl/
      index.ts               ← JS utils: alpha(), breakpoints, mq, getVw*
      waffl/index.tsx        ← <Grid>
      col/index.tsx          ← NEW: <Col>
  css/
    tackl/                   ← INJECTED layer — zero CSS output
      _index.scss            ← @forward all of the below
      _breakpoints.scss      ← GENERATED: $breakpoints map, bp(), bpd()
      _grid.scss             ← GENERATED: $columns, $gutters, $grid-max, $design-widths
      _helpers.scss          ← vw(), alpha(), noscrollbars
      _spacing.scss          ← pad(), mar() mixins
      _type.scss             ← HAND-WRITTEN: displayL … captionS mixins
    tokens.css               ← GENERATED: :root { --brand-c1: …; … }
    global.scss              ← @layer order, reset, body, waffl-grid + Col cascade,
                               Lenis, view transitions
    utilities/
      _spacing.scss          ← [data-pad] / [data-mar] (in @layer utilities)
      _type.scss             ← .t-* / [data-type] (in @layer utilities)
scripts/
  build-styles.ts            ← generator (bun)
.stylelintrc.json
.vscode/extensions.json, .vscode/settings.json
```

### Hierarchy

```
breakpoints   TS → generated Sass map + bp()/bpd()        (build-time)
     ↓
tokens        TS → generated tokens.css (:root vars)      (runtime)
     ↓
type          hand-written mixins using bp() + var(--font-*)
spacing       mixins using bp() + var(--space-*)
     ↓
utilities     global classes / data attributes built from those mixins
     ↓
components    styles.module.scss, using everything above with no imports
```

---

## 1. The generator

`scripts/build-styles.ts` imports the raw TS values and writes three files. Each
one starts with a `GENERATED — do not edit` banner.

```ts
// scripts/build-styles.ts (sketch)
import { grid } from '@theme/grid';
import { baseColors } from '@theme/colors';
import { fontFamilies } from '@theme/fonts/values';
// …space / gap / br / easing / time values

write('src/css/tokens.css', `:root {\n${declarations}\n}`);

write('src/css/tackl/_breakpoints.scss', `
@use 'sass:map';
$breakpoints: (${pairs(grid.breakpoints)});

@mixin bp($key) {
	@media (min-width: map.get($breakpoints, $key)) { @content; }
}

// NOTE • -0.02px so bp(m) and bpd(m) never both match at exactly the breakpoint
@mixin bpd($key) {
	@media (max-width: calc(map.get($breakpoints, $key) - 0.02px)) { @content; }
}
`);

write('src/css/tackl/_grid.scss', /* $columns, $gutters, $grid-max, $design-widths */);
```

**JS side.** Same data, nothing duplicated:

```ts
// src/theme/tackl/index.ts
export const breakpoints = grid.breakpoints;            // { s: '320px', m: '700px', … }
export const mq = {
	up: mapValues(breakpoints, v => `(min-width: ${v})`),
	down: mapValues(breakpoints, v => `(max-width: ${parseFloat(v) - 0.02}px)`),
};
```

`useAnimation` and `useResponsive` switch to `mq.up.m` / `mq.up.l` instead of
`parseFloat`-ing the theme.

**When it runs:**

| Trigger | How |
| --- | --- |
| `bun run dev` / `build` / `storybook` | Chained explicitly: `"dev": "bun run styles && next dev --turbopack"` |
| Pre-commit (husky) | `bun run styles --check` fails if the generated files are stale |

Generated files are **committed**. A fresh clone, an editor or Storybook works
before any script runs, and token changes show up in diffs.

> `src/theme/fonts/index.ts` calls `Inter()` from `next/font/google`, which only
> works inside Next's compiler. The raw stacks and weights move to
> `fonts/values.ts` so the generator can import pure data.

---

## 2. Global SCSS: setup and usage

### Setup (once, in `next.config.js`)

```js
const path = require('node:path');

const nextConfig = {
	sassOptions: {
		implementation: 'sass-embedded',
		loadPaths: [path.join(__dirname, 'src/css')],
		additionalData: `@use 'tackl' as *;`,
	},
};
```

```scss
// src/css/tackl/_index.scss
@forward 'breakpoints';
@forward 'grid';
@forward 'helpers';
@forward 'spacing';
@forward 'type';
```

### Usage: no imports

```scss
// src/components/CookieBar/styles.module.scss
.jacket {
	position: fixed;
	inset: auto var(--gap-l) var(--gap-l) var(--gap-l);
	display: flex;
	flex-direction: column;
	gap: var(--gap-m);
	padding: var(--gap-l);
	background: var(--global-white);
	border-radius: var(--br-l);

	@include bp(m) {
		flex-direction: row;
		align-items: center;
	}

	p { @include captionL; }

	button {
		@include captionL;
		background: var(--brand-c1);
		transition: opacity var(--time-s) var(--easing-bezzy);

		&:hover { background: alpha(--brand-c1, 85); }
	}
}
```

```tsx
import s from './styles.module.scss';

return <aside className={s.jacket}>…</aside>;
```

If `additionalData` doesn't work under Turbopack (verified in Phase 1), the
fallback is one line per module, `@use 'tackl' as *;`. It costs nothing at runtime.

### Helpers (`_helpers.scss`)

```scss
// px → vw against a design width (mirrors getVw / getVwTablet / getVwMobile)
@function vw($px, $design: desktop) {
	@return math.div($px, map.get($design-widths, $design)) * 100vw;
}

// Translucent token, the SCSS twin of alpha() in @tackl
// NOTE • Originally fade(); renamed to alpha() during review (see §14)
@function alpha($token, $opacity) {
	@return color-mix(in srgb, var(#{$token}) #{$opacity * 1%}, transparent);
}
```

---

## 3. Typography: hand-written

`src/css/tackl/_type.scss` is the only place type is defined. It's written by
hand from Figma, and any breakpoint the design needs is fair game.

```scss
// src/css/tackl/_type.scss
@mixin displayL {
	font-family: var(--font-heading);
	font-weight: 400;
	font-size: 4.8rem;
	line-height: 1.1;
	letter-spacing: -1px;

	@include bp(xl) {
		font-size: clamp(9.6rem, 8.333vw, 12rem);
		letter-spacing: -2px;
	}
}

@mixin captionL {
	font-family: var(--font-body);
	font-weight: 400;
	font-size: 1.4rem;
	line-height: 1.5;

	@include bp(xl) { font-size: 1.6rem; }
}
```

Each mixin is exposed three ways from one definition:

```scss
// src/css/utilities/_type.scss — emitted once, from global.scss
@layer utilities {
	.t-displayL, [data-type='displayL'] { @include displayL; }
	.t-captionL, [data-type='captionL'] { @include captionL; }
	// …
}
```

```tsx
<h1 className='t-displayL'>…</h1>                        // class
<p data-type='captionL'>…</p>                              // data attribute
<h2 className={`${s.title} t-headlineL`}>…</h2>          // alongside a module class
```

```scss
.title { @include headlineL; }                             // mixin
```

**Deleted:**
- `typeScale` and its `RuleSet` exports in `src/theme/tackl/type/index.ts`.
- `typeRoles` too. It's only used by the wizard and ThemeShowcase, and the role
  descriptions move into the Storybook Typography page as prose.

---

## 4. Spacing: data attributes and mixins

Same responsive scale as today's `$pad` / `$mar` (`--space-s` → `m` at `bp(m)` →
`l` at `bp(l)`):

```scss
// src/css/tackl/_spacing.scss (injected, zero output)
@mixin pad($side: block) {
	padding-#{$side}: var(--space-s);
	@include bp(m) { padding-#{$side}: var(--space-m); }
	@include bp(l) { padding-#{$side}: var(--space-l); }
}
// mar() is the same with margin
```

```scss
// src/css/utilities/_spacing.scss (emitted once)
@layer utilities {
	[data-pad=''], [data-pad='true'], [data-pad~='block'] { @include pad(block); }
	[data-pad~='top'] { @include pad(top); }
	[data-pad~='bottom'] { @include pad(bottom); }
	// mar likewise
}
```

```tsx
<section data-pad>…</section>                  // top + bottom
<section data-pad='top'>…</section>
<section data-mar='top bottom'>…</section>     // ~= lets values combine
```

- **Why `''` and `'true'` both mean "block":** a bare `data-pad` renders as
  `data-pad="true"` in React and `data-pad=""` in plain HTML.
- **Component-owned spacing** uses the mixin instead: `.jacket { @include pad(top); }`.

---

## 5. Grid primitives

### `Grid` (`@waffl`)

A Server Component that renders `<waffl-grid>`. Boolean props become data
attributes:

```tsx
<Grid $isFixed $noGutter>…</Grid>
// → <waffl-grid data-fixed data-no-gutter>…</waffl-grid>
```

Styles go in `global.scss`, not a module. CSS Modules' pure mode rejects bare
tag selectors, and the grid is global anyway. Columns, gutters and max width
come from the generated `_grid.scss`.

### `Col` (replaces `Div`)

Its only job is grid spans. It's polymorphic via `as` and sets `--col-*`
custom properties:

```tsx
<Col as='article' $m='2/6' $l='3/9' className={s.card}>…</Col>
// → <article class="…" style="--col-m: 2/6; --col-l: 3/9">
```

The cascade is generated once in `global.scss`. Each breakpoint falls back to
the one below, so `$l` alone still spans fully on mobile:

```scss
waffl-grid > :where(*) {
	--_c-s:  var(--col-s, 1 / -1);
	--_c-sm: var(--col-sm, var(--_c-s));
	--_c-m:  var(--col-m, var(--_c-sm));
	// … through uber, generated with @each over $breakpoints
	grid-column: var(--_c-s);

	@include bp(sm) { grid-column: var(--_c-sm); }
	@include bp(m)  { grid-column: var(--_c-m); }
	// …
}
```

- **Plain children still work.** Zero specificity via `:where()` means plain and
  server-rendered children still span the full grid, as they do today.
- **`Col` is a Server Component.**
- **`--col-*` is the one sanctioned inline `style`.** A `.d.ts` adds `--${string}`
  keys to `React.CSSProperties`, so it's typed without casts.

---

## 6. Wrappers and config

| File | Today | After |
| --- | --- | --- |
| `src/utils/registry.tsx` | `ServerStyleSheet` + `useServerInsertedHTML` | **Deleted** |
| `app/(site)/Providers.tsx` | Registry → `ThemeProvider` → `GlobalStyle` → wizard gate → children | Contexts, CookieBar, GridExposer only. Still a client boundary for Contexts, but carries no style runtime. |
| `app/(site)/layout.tsx` | Imports `global.css` | Imports `@css/tokens.css`, then `@css/global.scss` |
| `src/theme/index.ts` | `theme` + `GlobalStyle` | `theme` only. `:root` moves to `tokens.css`, and `body` colours to `global.scss`. |
| `next.config.js` | `compiler.styledComponents` | Removed. `sassOptions` added. `removeConsole` stays. |
| `package.json` | No `browserslist`; `styled-components` dep | `"browserslist": ["baseline widely available"]`. Remove `styled-components`; add `sass-embedded`, `stylelint`, `stylelint-config-standard-scss`. Add `styles` script; `lint` runs Biome **and** Stylelint. |
| `src/types/styles.d.ts` | `DefaultTheme` augmentation | **Deleted** (Next already types `*.module.scss`) |
| `src/types/waffl.d.ts` | JSX typing for `<waffl-grid>` | Kept, with the `data-*` attributes added |
| `.storybook/preview.js` | `ThemeProvider`, `GlobalStyle`, `withThemeFromJSXProvider` | Import `tokens.css` + `global.scss`; `withThemeByDataAttribute` on `html[data-theme]` |
| `@tackl` getters (`getBrand`, `getSpace`, …) | styled-components prop functions | **Deleted.** `var(--…)` in SCSS, `theme.*` in JS. |
| `@tackl` `bp` / `bpd`, `noscrollbars` | styled-components `css` helpers | JS `breakpoints` / `mq`; Sass `bp()` / `bpd()`; `noscrollbars` becomes a mixin |
| `semantics/` | `$pad` / `$mar` / span CSS | **Deleted** (spacing → §4, spans → §5) |
| `.husky/pre-commit` | lint + type-check | Adds `bun run styles --check` |

## 7. Removing the setup wizard

Delete:

- `src/components/TacklSetup/` (incl. the 567-line `styles.ts`, so it needs no conversion)
- `app/api/tackl-setup/route.ts`
- The `tackl:setup-start` / `tackl:setup-end` blocks in `app/(site)/Providers.tsx`
- `docs/Tackl/SetupWizard.md`

Update:

- **`README.md`:** the first-run wizard paragraph, the feature bullet and the docs
  table row.
- **`tackl/README.md`:** the wizard paragraph.
- **`tackl/bin/tackl.js`:** the "first-run setup wizard" next-steps line.
- **`src/theme/fonts/index.ts`:** comments that mention the wizard. The
  `fontVariables` registry stays if ThemeShowcase still uses it.
- **ThemeShowcase:** remove its wizard references.

## 8. Linting and editor

**Stylelint, for `.scss` only.** Biome keeps everything else unchanged.

```json
// .stylelintrc.json
{
	"extends": ["stylelint-config-standard-scss"],
	"ignoreFiles": ["src/css/tokens.css", "src/css/tackl/_breakpoints.scss", "src/css/tackl/_grid.scss"],
	"rules": {
		"selector-class-pattern": "^[a-z][a-zA-Z0-9]*$|^t-[a-zA-Z0-9]+$",
		"selector-type-no-unknown": [true, { "ignore": ["custom-elements"] }]
	}
}
```

- **Scripts:** `"lint": "biome check . && stylelint \"**/*.scss\""`, plus a matching
  `lint:fix`.
- **Unknown variables:** a custom-properties check against `tokens.css` flags
  `var(--brand-c11)`-style typos. This is the safety net the typed getters
  provided. Plugin choice is confirmed in Phase 1.

**Editor (`.vscode/extensions.json` recommendations, plus `.vscode/settings.json`):**

- **CSS Variable Autocomplete:** `var(--…)` completion and colour swatches read
  from `tokens.css`, plus go-to-definition.
- **SCSS IntelliSense:** completion and go-to-definition for `bp()`, `captionL`,
  `vw()` and the rest, including mixins it can't see imported (needed because of
  the injected `@use`).
- **Stylelint:** inline lint errors; Biome stays the formatter for TS.

> Extension behaviour is from memory; confirm in Phase 1 and adjust settings.

## 9. Component conventions

| styled-components | SCSS modules |
| --- | --- |
| `styles.ts` | `styles.module.scss` |
| `import * as S from './styles'` | `import s from './styles.module.scss'` |
| `<S.Jacket>` | `<header className={s.jacket}>` (outermost class is still `jacket`) |
| `styled(Div).attrs({ as: 'h1' })` | Write the tag in JSX |
| `$center`, `$hasError` | `data-center`, `aria-invalid` (where semantic) → `&[data-center]` |
| `${props.$col}` | `style={{ '--col': col }}` → `grid-column: var(--col)` |
| `${headlineL}` | `@include headlineL;` or the `t-headlineL` class |
| `${bp.l`…`}` | `@include bp(l) { … }` |
| `getVw(48)` | `vw(48)` |
| `alpha('--brand-c1', 20)` | `alpha(--brand-c1, 20)` |
| `$pad` / `$mar` props | `data-pad` / `data-mar`, or `@include pad;` |

- **Class names are camelCase** (`.removeButton` → `s.removeButton`).
- **Nesting is fine.** Nesting under the local class is allowed in pure mode (`.jacket p {}`).
- **Top-level tag selectors go in `global.scss`.**

## 10. Agent and skill files

| File | Change |
| --- | --- |
| `AGENTS.md` | Rewrite **The one rule** (`Div` → `Col`, grid-only) and the **Imports & aliases** table (`@tackl` JS utils, no `@tackl/type` import). Rewrite **Writing a component** (`styles.module.scss`, `import s from …`, `.jacket`). Rewrite **Styling & theming**: injected mixins, `bp()`, type and spacing APIs, `@layer utilities`, `alpha()` / `vw()`, data attributes for state. Ban list becomes: no Tailwind, LESS, CSS-in-JS or inline styles (except `--col-*` / dynamic custom properties). Waffl grid example uses `Col`. **Before you finish**: lint now runs Stylelint too, and generated files must not be hand-edited. |
| `skills/styling/styled-components/` | **Deleted** |
| `skills/styling/styled-components-helper/` | **Deleted** |
| `skills/styling/scss-modules/SKILL.md` | **New.** Conventions, the injected layer, type/spacing APIs, Grid/Col, data-attribute state, common mistakes (rules in the injected layer, top-level tag selectors in modules, hand-rolled rgba, editing generated files) |
| `CLAUDE.md` | No change (points at AGENTS.md) |

Docs alongside: `docs/Tackl/` Theming, WritingComponents, SemanticComponents
(→ Col), WafflGrid, GridSystemProps, AppArchitecture, ComponentHierarchy and
Tackl; a new `MigratingFromV4.md`; `README.md` and `src/stories/*.mdx`.

---

## 11. Phases

Each phase ends green (`type-check`, `lint`, `test`, plus a visual check in
`bun run dev`) and is its own commit.

### Phase 0: Baseline
- Install deps, then record `next build` First Load JS per route, total CSS size,
  a local production Lighthouse run (`bun run lighthouse`) and the smoke test.
- Netlify preview Lighthouse isn't comparable (it already shows a −8
  Best Practices on a docs-only change), so measure locally.
- Numbers go in the PR description.

### Phase 1: Wizard removal and foundation (styled-components still installed)
- Remove the wizard (§7).
- Add `browserslist`, `sass-embedded`, Stylelint, and the `.vscode` recommendations.
- Split `fonts/values.ts`; write `scripts/build-styles.ts` and the generated files.
- Add `sassOptions`; import `tokens.css` in the layout. `GlobalStyle` still runs
  alongside, emitting the same variables.
- Write `_functions.scss`, `_spacing.scss` and a hand-written `_type.scss` (ported
  from today's values).
- **Spike:** convert CookieBar, then verify:
  - [ ] `additionalData`, `loadPaths` and `implementation` work under Turbopack (dev and build)
  - [ ] Editing an injected partial hot-reloads modules that use it
  - [ ] Storybook (`@storybook/nextjs`) honours `sassOptions`
  - [ ] Production CSS has no duplicated output from the injected layer
  - [ ] Prefixing follows `browserslist`
  - [ ] Stylelint and the editor extensions behave as described
- **Go/no-go.** If injection fails, switch to an explicit `@use 'tackl' as *;` per file.

### Phase 2: Global layer and primitives
- `global.scss`: `@layer` order, the reset ported from `global.css`, `body`,
  `waffl-grid`, the `Col` cascade, and utilities (spacing + type).
- `Grid` → data attributes; `Col` replaces `Div`; `CSSProperties` typing.
- JS `breakpoints` / `mq`; update `useAnimation`, `useResponsive` and `getVw`.

### Phase 3: Components
Header → Footer → Icon → DeleteMe → GridExposer (data attributes + `--col`) → ThemeShowcase.

### Phase 4: Teardown
- Remove the registry, `ThemeProvider`, `GlobalStyle`, getters, `semantics/`,
  `typeScale` / `typeRoles`, `styles.d.ts` and `compiler.styledComponents`.
- `bun remove styled-components`.
- `grep -r styled-components` returns nothing outside the changelog / migration doc.

### Phase 5: Agents, skills, docs
- §10, and bump to **5.0.0**.

### Phase 6: Verify
- Re-run the Phase 0 measurements and compare in the PR.
- Visual pass on every component at s / m / l / xl via chrome-devtools.

## 12. To verify against the installed Next docs (Phase 1)

`node_modules/next/dist/docs` wasn't readable when this was written (deps not installed).

- Turbopack support for `sassOptions.additionalData` / `loadPaths` / `implementation`
- That Next honours `browserslist` from `package.json` for CSS prefixing under Turbopack
- CSS ordering between `tokens.css`, `global.scss` and modules in production
- `@storybook/nextjs` reading `sassOptions` from `next.config.js`

## 13. Revisit later

- **Purging unused CSS.** Off by design. Revisit only if Phase 6 shows the
  global CSS is heavy, and then for `global.scss` only, with a safelist.
- **GSAP easing.** If GSAP needs the easing tokens, the generator can emit a JS map for `CustomEase`.
- **`experimental.inlineCss` / `cssChunking`.** A/B test them once the migration is
  done; measure, don't assume.

## 14. Implementation notes

What changed from the plan while building it:

- **`_functions.scss` → `_helpers.scss`**: it also holds the `noscrollbars` mixin.
- **`fade()` → `alpha()`**: the SCSS translucency helper shares its name with the JS
  `alpha()`. It shadows Sass's legacy global `alpha($color)` with no warnings (verified
  with sass-embedded); `color.channel()` covers reading an alpha channel.
- **Font weights are tokens too**: `--weight-light … --weight-black` are generated
  alongside `--font-*`, so the hand-written type mixins use `var(--weight-regular)`.
- **`typeRoles` lives in ThemeShowcase** (the only place that shows the role notes),
  not in the Storybook Typography page.
- **Non-inheriting span variables**: `--col-*` are registered with
  `@property … { inherits: false }` and reset on every `waffl-grid`, so a grid nested in a
  spanned column never inherits the parent's spans.
- **Utilities load via `meta.load-css`** at the end of `global.scss`, so the `@layer`
  order is declared first. `additionalData` doesn't reach files loaded that way, so the
  utility partials `@use 'tackl'` explicitly.
- **Stylelint** also uses `stylelint-value-no-unknown-custom-properties`, checking every
  `var(--…)` against `tokens.css`.
- **`.vscode/settings.json`** is committed alongside `extensions.json` (`.gitignore` now
  ignores `.vscode/*` except those two).
- **Components that no longer need `'use client'`**: Header, Footer, DeleteMe and
  ThemeShowcase are Server Components now.
- **Icon** SVGs are `aria-hidden` — the styled wrapper had hidden Biome's a11y rule.
- **Storybook** sets the `next/font` class on `<html>` (it was on `<body>`), so `--font-*`
  on `:root` resolves to Inter.
- **`cx()`** (`src/utils/cx.ts`) added for joining module, utility and prop class names.
- **Verified in Phase 1**: Turbopack honours `additionalData`, `loadPaths` and
  `implementation`; edits to injected partials hot-reload; production CSS contains no
  output from the injected layer; `@storybook/nextjs` honours `sassOptions`.
