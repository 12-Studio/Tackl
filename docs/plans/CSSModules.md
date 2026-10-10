# Plan: styled-components → CSS Modules (SCSS)

Status: **proposal** · Branch: `css-modules` · Target release: **Tackl 5.0.0** (breaking)

## Why

Performance. styled-components costs at three points:

- **Client bundle.** The runtime ships to every page (~13 kB gz).
- **Server render.** Every streamed flush serialises collected styles through
  `useServerInsertedHTML`. This is the `ServerStyleSheet` registry in
  `src/utils/registry.tsx`.
- **Hydration.** Styles are rebuilt and injected on the client, and any
  component that styles itself needs the client-side `ThemeProvider` context.

CSS Modules compile to static `.css` files at build time. They need no runtime, are
cached separately from JS, are split per route, and work in Server Components
without a client boundary.

## Principles

1. **One source of truth per token, in TS.** The token files in `src/theme/**`
   stay the source, and the setup wizard keeps writing them. SCSS and CSS
   are **generated** from them, never hand-edited.
2. **Runtime values are CSS custom properties; build-time values are Sass.**
   Colours, space, gap, radius, easing, time and fonts stay `var(--…)` on
   `:root`, so runtime theming still works. Only things CSS can't express
   with variables (media queries) become Sass.
3. **The global SCSS layer emits zero CSS.** It contains mixins and functions only.
   It's injected into every module, so any rule in it would be duplicated in
   every file.
4. **Dynamic values use data attributes and custom properties, never
   class-toggling logic in JS.** `$isOpen` becomes `data-state='open'`, and
   `$col={3}` becomes `style={{ '--col': 3 }}`.

---

## Target architecture

```
src/
  theme/
    grid/index.ts            ← breakpoints, columns, gutters (JS source of truth)
    colors/ space/ gap/ …    ← raw token values (JS source of truth, wizard-written)
    fonts/values.ts          ← NEW: raw font stacks/weights, split from next/font calls
    index.ts                 ← `theme` object (var() refs) — kept for JS/GSAP
    tackl/
      index.ts               ← JS utils only: alpha(), breakpoints, mq, getVw
      waffl/index.tsx        ← <Grid> (renders <waffl-grid> with data attributes)
      col/index.tsx          ← NEW: <Col as=… $s $m $l…> (replaces Div)
      type/index.ts          ← typeScale data + typeRoles (styles removed)
  css/
    tackl/                   ← the global SCSS layer (zero output)
      _index.scss            ← @forward everything below
      _breakpoints.scss      ← GENERATED: $breakpoints map + bp()/bpd() mixins
      _type.scss             ← GENERATED: displayL…captionS mixins
      _functions.scss        ← vw(), fade() helpers (hand-written, read generated values)
      _generated-grid.scss   ← GENERATED: $columns, $gutters, $design
    tokens.css               ← GENERATED: :root { --brand-c1: …; … }
    global.scss              ← reset, body, waffl-grid rules, Lenis, view transitions
scripts/
  build-styles.ts            ← the generator (bun)
```

### Hierarchy

Your hunch about the order is right, with one clarification about what each layer is:

```
breakpoints (JS → Sass map + mixins, build-time)
   ↓
global tokens (JS → CSS custom properties on :root, runtime)
   ↓
typography mixins (use bp() for responsive steps and var(--font-*) for families)
   ↓
component modules (use all of the above, import nothing)
```

Breakpoints are **not** CSS variables. Media queries can't read them, which is why
they're Sass. Tokens **are** CSS variables, which is why they stay runtime-themeable.

---

## 1. One source of truth: the generator

`scripts/build-styles.ts` imports the raw TS values and writes the generated
files. It's plain TS run by Bun, which resolves the tsconfig `paths`.

```ts
// scripts/build-styles.ts (sketch)
import { grid } from '@theme/grid';
import { baseColors } from '@theme/colors';
import { typeScale } from '@tackl/type';
// …space/gap/br/easing/time/font values

writeGenerated('src/css/tackl/_breakpoints.scss', `
$breakpoints: (${entries(grid.breakpoints).map(([k, v]) => `${k}: ${v}`).join(', ')});

@mixin bp($key) {
	@media (min-width: map.get($breakpoints, $key)) { @content; }
}

// NOTE • -0.02px so bp(m) and bpd(m) never both match at exactly the breakpoint
@mixin bpd($key) {
	@media (max-width: calc(map.get($breakpoints, $key) - 0.02px)) { @content; }
}
`);

writeGenerated('src/css/tokens.css', `:root {\n${allTokenDeclarations}\n}`);
writeGenerated('src/css/tackl/_type.scss', typeScaleToMixins(typeScale));
```

Generated typography output looks like this:

```scss
// src/css/tackl/_type.scss — GENERATED, do not edit
@mixin captionL {
	font-family: var(--font-body);
	font-weight: 400;
	font-size: 1.4rem;
	line-height: 1.5;

	@include bp(xl) { font-size: 1.6rem; }
}
```

**On the JS side, nothing is duplicated.** `@tackl` exports the same data for
GSAP and your utils:

```ts
// src/theme/tackl/index.ts
import { grid } from '@theme/grid';

export const breakpoints = grid.breakpoints;                  // { s: '320px', m: '700px', … }
export const mq = {
	up: mapValues(breakpoints, v => `(min-width: ${v})`),      // mq.up.m → '(min-width: 700px)'
	down: mapValues(breakpoints, v => `(max-width: ${parseFloat(v) - 0.02}px)`),
};
```

`useAnimation` then uses `mq.up.m` / `mq.up.l` directly in `gsap.matchMedia`
instead of `parseFloat`-ing the theme by hand. `useResponsive` can do the same.

**When the generator runs:**

| Trigger | How |
| --- | --- |
| `bun run dev` / `build` / `storybook` | Chained explicitly: `"dev": "bun run styles && next dev --turbopack"`. Explicit chaining rather than `pre*` scripts, so it can't silently skip. |
| Setup wizard "finish" | `app/api/tackl-setup/route.ts` calls the generator after writing the token files |
| Pre-commit (husky) | `bun run styles --check` fails if the generated files are stale |

Generated files are **committed**. That way a fresh clone, an editor or Storybook
works before any script runs, and token changes show up in PR diffs.

> ⚠️ `src/theme/fonts/index.ts` calls `Inter()` from `next/font/google`, which
> only works inside Next's compiler. Split the raw stacks and weights into
> `fonts/values.ts`, so the generator imports pure data. The wizard's
> `FONTS_FILE` target moves with them.

---

## 2. The global SCSS layer: setup and usage

### Setup (once, in `next.config.js`)

```js
const path = require('node:path');

const nextConfig = {
	sassOptions: {
		implementation: 'sass-embedded',                 // native Dart Sass — much faster compiles
		loadPaths: [path.join(__dirname, 'src/css')],
		additionalData: `@use 'tackl' as *;`,            // injected at the top of every .scss file
	},
	// …
};
```

```scss
// src/css/tackl/_index.scss
@forward 'breakpoints';
@forward 'generated-grid';
@forward 'functions';
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

		&:hover { background: fade(--brand-c1, 85); }
	}
}
```

```tsx
// src/components/CookieBar/index.tsx
import s from './styles.module.scss';

return <aside className={s.jacket}>…</aside>;
```

### If injection isn't wanted (or doesn't work under Turbopack)

The fallback is one line at the top of each module:

```scss
@use 'tackl' as *;
```

That's the whole cost. `loadPaths` keeps it short with no relative `../../`.
Because it's `@use` and the layer emits no CSS, it's free at runtime either way.

> **Editor note:** VS Code's SCSS IntelliSense doesn't read `additionalData`, so
> autocomplete and go-to-definition for `bp()` / `captionL` won't work in a file
> without the explicit `@use`. Compilation is unaffected. If that bothers you, the
> explicit `@use` line fixes it and costs nothing.

### Helpers in `_functions.scss`

```scss
// px → vw against a design width (mirrors getVw/getVwTablet/getVwMobile)
@function vw($px, $design: desktop) {
	@return math.div($px, map.get($design-widths, $design)) * 100vw;
}

// Translucent token, the SCSS twin of alpha() in @tackl
// NOTE • Not named alpha(): Sass ships a built-in alpha() colour function
@function fade($token, $opacity) {
	@return color-mix(in srgb, var(#{$token}) #{$opacity * 1%}, transparent);
}
```

---

## 3. Primitives: `Grid` and `Col`

### `Grid` (`@waffl`)

A Server Component that renders `<waffl-grid>`. Boolean props become data attributes:

```tsx
<Grid $isFixed $noGutter>…</Grid>
// → <waffl-grid data-fixed data-no-gutter>…</waffl-grid>
```

Its styles live in **`global.scss`, not a module**. CSS Modules' pure mode
rejects bare tag selectors, and the grid is a global primitive anyway. Columns
and gutters are generated from `grid`:

```scss
waffl-grid {
	--grid-columns: repeat(#{map.get($columns, s)}, 1fr);
	display: grid;
	grid-template-columns: var(--grid-columns);
	// …
	@include bp(m) { --grid-columns: repeat(#{map.get($columns, m)}, 1fr); }

	&[data-fixed] { max-width: $grid-max-size; }
	&[data-no-gutter] { column-gap: 0; }
}
```

### `Col` (replaces `Div`)

Its only job is grid spans, so it stays tiny. It's polymorphic via `as` and sets
`--col-*` custom properties:

```tsx
<Col as='article' $m='2/6' $l='3/9' className={s.card}>…</Col>
// → <article class="…" style="--col-m: 2/6; --col-l: 3/9">
```

The cascade is generated once in `global.scss`. Each breakpoint falls back to
the one below it, so `$l` alone still works on mobile:

```scss
waffl-grid > :where(*) {
	--_c-s:  var(--col-s, 1 / -1);
	--_c-sm: var(--col-sm, var(--_c-s));
	--_c-m:  var(--col-m, var(--_c-sm));
	// … through uber
	grid-column: var(--_c-s);

	@include bp(sm) { grid-column: var(--_c-sm); }
	@include bp(m)  { grid-column: var(--_c-m); }
	// …
}
```

- **Plain elements work too.** It still applies to every grid child with zero
  specificity, so plain and server-rendered elements keep spanning full width,
  as today.
- **`Col` is a Server Component.** It's just a tag and a `style` object.
- **It's the one sanctioned inline `style`.** AGENTS.md gets a carve-out for
  `--col-*`.
- **`style` needs a type for custom properties.** Add `--${string}` keys to
  `React.CSSProperties` in a `.d.ts`, so `style={{ '--col-m': '2/6' }}` is typed
  without casts.

**Dropped:** the `$pad` / `$mar` / `$padTop`… spacing props. Section spacing
becomes a mixin (`@include section-pad;`) or plain `var(--space-*)` in the module.

---

## 4. Wrappers and config: reassessed

| File | Today | After |
| --- | --- | --- |
| `src/utils/registry.tsx` | `ServerStyleSheet` + `useServerInsertedHTML` | **Deleted** |
| `app/(site)/Providers.tsx` | Registry → `ThemeProvider` → `GlobalStyle` → children | Keeps only what isn't styling (Contexts, CookieBar, dev tools). Still a client boundary for Contexts, but carries no style runtime. |
| `app/(site)/layout.tsx` | Imports `global.css` | Imports `@css/tokens.css` then `@css/global.scss` (order matters: tokens first) |
| `src/theme/index.ts` | `theme` + `GlobalStyle` (createGlobalStyle) | `theme` only. `:root` vars move to generated `tokens.css`, and `body` colours to `global.scss`. |
| `next.config.js` | `compiler.styledComponents` | Removed. `sassOptions` added (above). `compiler.removeConsole` stays. |
| `src/types/styles.d.ts` | `DefaultTheme` augmentation | **Deleted.** Next's own types already cover `*.module.scss`. |
| `src/types/waffl.d.ts` | JSX typing for `<waffl-grid>` | Kept; add `data-*` attrs if wanted |
| `.storybook/preview.js` | `ThemeProvider`, `GlobalStyle`, `withThemeFromJSXProvider` | Import `tokens.css` + `global.scss`. Swap to `withThemeByDataAttribute` for theme switching via `html[data-theme]`. |
| `@tackl` getters (`getBrand`, `getSpace`, …) | styled-components prop functions | **Deleted.** Use `var(--brand-c1)` in SCSS and `theme.colors.brand.c1` in JS. |
| `@tackl` `bp` / `bpd` (css-tagged) | styled-components helpers | Replaced by JS `breakpoints` / `mq` plus Sass `bp()` / `bpd()` |
| `@tackl/type` | `RuleSet` exports | `typeScale` + `typeRoles` data only (mixins are generated) |
| `semantics/` | `$pad`/`$mar`/span CSS | **Deleted** (spans move to `Col` + `global.scss`) |

### Performance-related config to evaluate (measure, don't assume)

- `experimental.inlineCss`: inlines CSS into the HTML `<head>`. This removes a
  render-blocking request on first load, at the cost of CSS caching between pages.
  It's usually a win for a small kit stylesheet. A/B it with Lighthouse.
- `experimental.cssChunking`: controls how CSS is merged per route.
- `sass-embedded` vs `sass`: build and dev speed only, with no runtime effect.

---

## 5. Component conventions

| styled-components | SCSS modules |
| --- | --- |
| `styles.ts` | `styles.module.scss` |
| `import * as S from './styles'` | `import s from './styles.module.scss'` |
| `<S.Jacket>` | `<header className={s.jacket}>` (outermost class still `jacket`) |
| `styled(Div).attrs({ as: 'h1' })` | Write the tag in JSX: `<h1 className={s.title}>` |
| `$center`, `$hasError` | `data-center`, `aria-invalid` (where semantic) → `&[data-center]` |
| `${props.$col}` | `style={{ '--col': col }}` → `grid-column: var(--col)` |
| `${headlineL}` | `@include headlineL;` |
| `${bp.l`…`}` | `@include bp(l) { … }` |
| `getVw(48)` | `vw(48)` |
| `alpha('--brand-c1', 20)` | `fade(--brand-c1, 20)` |

Class names are camelCase (`.removeButton` → `s.removeButton`). Nesting
under the local class is fine in pure mode (`.jacket p {}`). Top-level tag
selectors go in `global.scss`.

---

## 6. Migration phases

Each phase ends green: `type-check`, `lint`, `test`, plus a visual check in `bun run dev`.

### Phase 0: Baseline
- Install deps, then record `next build` route sizes (First Load JS), a Lighthouse
  run (`bun run lighthouse`) and the smoke test.
- Save the numbers in the PR description so the payoff is measured, not assumed.

### Phase 1: Foundation and spike (styled-components still installed)
- `bun add -d sass-embedded`.
- Split `fonts/values.ts`, and write `scripts/build-styles.ts` and the generated files.
- Add `sassOptions` to `next.config.js` and import `tokens.css` in the layout
  (`GlobalStyle` still runs alongside, emitting the same vars).
- Convert **CookieBar** only, then verify:
  - [ ] `additionalData` works under Turbopack (dev and build)
  - [ ] Editing `_type.scss` / `_breakpoints.scss` hot-reloads modules that use it
  - [ ] Storybook picks up `sassOptions` from `next.config.js`
  - [ ] Production CSS has no duplicated mixin or partial output
- **Go/no-go checkpoint.** If injection fails under Turbopack, switch to the
  explicit `@use 'tackl' as *;` line per file and continue.

### Phase 2: Primitives
- `global.scss` (port `global.css`, add `body`, `waffl-grid` and the `Col` cascade).
- `Grid` → data attributes; `Col` replaces `Div`; add `CSSProperties` typing.
- JS `breakpoints` / `mq`, and update `useAnimation`, `useResponsive` and `getVw`.

### Phase 3: Components (smallest first)
Header → Footer → Icon → DeleteMe → GridExposer (data attrs + `--col`) →
ThemeShowcase → TacklSetup (567 lines; also hook the generator into its route).

### Phase 4: Teardown
- Remove the registry, `ThemeProvider`, `GlobalStyle`, getters, `semantics/`,
  `styles.d.ts` and `compiler.styledComponents`.
- `bun remove styled-components`.
- `grep -r styled-components` returns nothing.

### Phase 5: Docs, agents, skills
- **AGENTS.md:** rewrite the Styling and Writing-a-component sections and the
  `Div` → `Col` rule. Ban list becomes: no Tailwind, LESS or inline styles
  (except `--col-*` / dynamic custom properties).
- **docs/Tackl:** Theming, WritingComponents, SemanticComponents (→ Col),
  WafflGrid, GridSystemProps, AppArchitecture, ComponentHierarchy, Tackl, and a
  new `MigratingFromV4.md`.
- **skills/styling:** replace `styled-components*` with an `scss-modules` skill.
- **README** and `src/stories/*.mdx`.
- Bump to **5.0.0**.

### Phase 6: Verify
- Re-run the Phase 0 measurements and compare.
- Visual pass on every component at s/m/l/xl via chrome-devtools.

---

## 7. Tooling

- **Biome.** `files.includes` lists `*.css` only, so `.scss` is currently
  unchecked. Decide between Biome's SCSS support (check its state for the pinned
  2.5.x) and Stylelint with `stylelint-config-standard-scss` (one extra dev dep).
  Either way, exclude generated files.
- **Type safety on tokens.** A mistyped `var(--brand-c11)` won't error like
  `getBrand('c11')` did. The generator can also emit a list of known custom
  properties for Stylelint's `no-unknown-custom-properties`, which brings the
  check back.
- **GSAP easing.** Easing tokens are CSS `cubic-bezier()` strings. If GSAP needs
  them, the generator can also emit a JS map for `CustomEase` (optional, later).

## 8. Risks / to verify against the installed Next docs

`node_modules/next/dist/docs` couldn't be read when this was written (deps not installed).
Confirm these before Phase 1:

- Turbopack support for `sassOptions.additionalData`, `loadPaths` and
  `implementation` (`sassOptions.functions` is known to be unsupported and isn't used).
- That `experimental.inlineCss` / `cssChunking` still exist in 16.3, and their current names.
- `@storybook/nextjs` honouring `sassOptions`.
- CSS ordering between `tokens.css`, `global.scss` and modules in production.

## 9. Open decisions

1. **Typography: generated or hand-written `_type.scss`?** Generated is
   recommended, because the wizard and Storybook's Typography page already
   read `typeScale`. Hand-written means changing the wizard to write SCSS.
2. **Spacing props.** Drop `$pad` / `$mar` entirely, or ship equivalent mixins
   (`section-pad`, `section-mar`)?
3. **Type styles for heavy reuse.** Mixins copy declarations into each use.
   gzip makes that close to free, but global `.t-captionL` utility classes are
   an option if the CSS grows.
4. **SCSS linting.** Biome or Stylelint.
