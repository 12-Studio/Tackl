# Migrating a Project from Tackl 3 to Tackl 4

A phased playbook for converting an existing Tackl 3 project to the Tackl 4 architecture. Written to be executed by an AI coding agent (Claude Code, Cursor…) or a human, one phase per commit, on a dedicated branch.

**Strategy:** Tackl 4's engine files (theme, tackl toolkit, app shell, configs) are *replaced wholesale* from the Tackl 4 template — do not try to edit v3 files into v4 shape. Your project's **values** (brand colors, spacing, fonts, metadata) and **components** are then ported onto the new engine. Get the latest template with:

```bash
bunx tackl --cms <dato|sanity|none> --no-git --no-install   # in a scratch folder, matching your project's CMS
```

…and copy engine files from it as each phase directs.

---

## API change map (v3 → v4)

The complete list of source-level changes to apply across project components:

| v3 | v4 |
| --- | --- |
| `import { Section, Main, H1, P, Nav, Aside, … } from '@tackl'` | `import { Div } from '@tackl'` + `as='section'` etc. — per-tag components no longer exist |
| `styled(Section)(…)` in styles.ts | `styled(Div).attrs({ as: 'section' })(…)` |
| `import { Waffl } from '@tackl'` / deep grid paths | `import Grid from '@waffl'` (default import) |
| `import '@theme/tackl/waffl/WebComponent'` | Delete — no web component exists |
| `theme.colors.brand.c1[40]` / `.solid` / `[100]` | `getBrand('c1', 40)` · `getBrand('c1')` — or `alpha('--brand-c1', 40)` |
| `theme.colors.global.white[80]` | `getGlobal('white', 80)` |
| Hand-rolled `rgba(...)` from theme values | `alpha(color, opacity)` from `@tackl` |
| `getEase('ease')` / `easing.ease` (`'0.3s ease-in-out'`) | `${getTime('m')} ${getEase('bezzy')}` — duration and curve are separate tokens |
| `getUtil('noscrollbars')` / `theme.utils.noscrollbars` | `${noscrollbars}` imported from `@tackl` |
| `performRequest` from `@utils/datocms` | `fetchContent` from `@cms` |
| `import { GET_HOME } from '@queries/...'` / `app/queries/` | `import { GET_HOME } from '@cms'` — queries live in `src/cms/<adapter>/queries/` |
| `$s='1/-1'` span props added "to be safe" | Remove — grid children are full-width by default (global `waffl-grid > :where(*)` rule) |
| `app/layout.tsx` + `app/Client.tsx` + `app/Server.tsx` | `app/(site)/layout.tsx` (server shell) + `app/(site)/Providers.tsx` |
| Theme values as literals (`theme.space.m === '6rem'`) | `var()` references (`'var(--space-m)'`) — plain CSS can use `var(--space-m)` directly |

Values that moved but kept their meaning: spacing/gap/radius keys, breakpoint keys, `bp`/`bpd`, type styles from `@tackl/type`, spacing props (`$mar`/`$pad`…), grid span props (`$s`…`$uber`). Component-authored styles generally survive untouched except for the substitutions above.

---

## Phase 0 — Prep & baseline

1. Clean git state; branch: `git checkout -b tackl-4-migration`.
2. Record the baseline: `bun run build` must pass on v3 first (fix or note pre-existing breakage — don't let the migration absorb blame for it).
3. Screenshot key pages at 1440×900 (the chrome-devtools MCP or by hand) — these are the visual-regression reference for Phase 7.
4. Note which CMS the project uses; scaffold a matching Tackl 4 reference copy (command above).

## Phase 1 — Configs

Copy from the Tackl 4 template: `tsconfig.json` (then re-add any project-specific paths), `biome.json`, `next.config.js` (port project domains into `images.remotePatterns`), `package.json` scripts + `"private": true` + `"sideEffects"` (keep the project's name/deps), `.env.example` (port project vars). Delete `jsconfig.json` and `.tsconfig.json` if present. Move real secrets to `.env` (gitignored) and `git rm --cached .env` if it was tracked.

**Verify:** `bun install && bun run type-check` (expect failures from later phases only in files not yet migrated — the config layer itself must resolve).

## Phase 2 — Theme engine

1. Delete the project's `src/theme/` entirely; copy Tackl 4's `src/theme/` in.
2. Copy `src/types/waffl.d.ts` and `src/types/styles.d.ts`.
3. **Port the project's token values** into the new raw-values objects: brand hexes → `baseColors` in `colors/index.ts`; spacing → `spaceValues`; gaps, radii, easings, fonts, grid/breakpoints likewise. Values only — the surrounding code stays as the template wrote it. Types derive automatically.
4. Merge `src/css/global.css`: start from Tackl 4's copy, re-add any project-specific global rules beneath it.
5. Fonts: recreate the project's `next/font` setup in `fonts/index.ts` (variable font, no `weight` array, `variable: '--…'`), and map families in `fontFamilies`.

**Verify:** type-check; the `:root` block in devtools shows the project's real values.

## Phase 3 — App shell

1. Replace the app shell with the template's: `app/(site)/layout.tsx`, `app/(site)/Providers.tsx`, plus `app/sitemap.ts`, `app/robots.ts`, `src/config.ts` (and `app/(studio)` + `sanity.config.ts` + `sanity/` if the project is on Sanity).
2. Move route folders/pages under `app/(site)/` — URLs don't change.
3. Port project-specific shell content: metadata values (title/description/OG), the `<Header/>`/`<Footer/>` placement, analytics/scripts, `NEXT_PUBLIC_SITE_URL`.
4. Delete `app/Client.tsx` / `app/Server.tsx` if present.

**Verify:** `bun run build` compiles the shell (page-level errors from unmigrated components are expected until Phase 4); metadata + sitemap/robots render.

## Phase 4 — Component sweep (the bulk)

For every folder in `src/components/` and every page, apply the API change map. Mechanical checklist per file:

- [ ] Per-tag imports → `Div` (+ `as` / `.attrs`)
- [ ] Grid imports → `import Grid from '@waffl'`; drop redundant full-width span props
- [ ] Color shade indexing → getters / `alpha()`
- [ ] `easing.ease` → `getTime` + `getEase`
- [ ] `getUtil` → direct `noscrollbars` import
- [ ] File comment layout per [WritingComponents](./WritingComponents.md) if the file is being touched anyway

Convert in dependency order (leaf components first, then sections, then pages). After each batch: `bun run type-check` — the compiler is the migration tracker; every remaining error is an unconverted usage.

## Phase 5 — CMS seam

1. Copy `src/cms/` from the template (the project's adapter only); delete `src/utils/datocms.ts` / old client files.
2. Move the project's real queries into `src/cms/<adapter>/queries/` and export them from the adapter's `index.ts`.
3. Replace all `performRequest`/old-client imports with `fetchContent` from `@cms`.
4. Sanity projects: keep the project's existing schemas — copy them into `sanity/schemaTypes/` and register them in its `index.ts`.

**Verify:** with real env values, pages render CMS content; with env removed, pages render fallbacks (no crashes).

## Phase 6 — Agent & tooling files

Copy from the template: `AGENTS.md`, `CLAUDE.md`, `skills/`, `.mcp.json`, `.cursor/mcp.json`. Delete `.cursor/rules/` and `.cursor/skills/`. Re-add any genuinely project-specific agent guidance as a short section at the bottom of `AGENTS.md`.

## Phase 7 — Full verification

1. `bun run type-check` and `bun run lint` — clean.
2. `bun run build` — clean, and note the JS payload (expect a meaningful drop vs the Phase 0 baseline).
3. Browser pass at 1440×900 against the Phase 0 screenshots — every key page, plus: smooth scroll works; `prefers-reduced-motion` emulation scrolls natively with no Lenis; grid layouts intact; zero console errors.
4. Storybook builds, if the project uses it.

Expected intentional differences from v3: reduced-motion users get native scroll; Inter (or the project font) loads as one variable file; focus/scrollbar behavior per the new `global.css`. Anything else that differs visually is a migration bug — fix it, don't rationalise it.

---

## Sizing guide

Phases 0–3 and 5–6 are near-constant cost (an hour of agent time). Phase 4 scales with the site — roughly per-component effort of minutes, so estimate from `ls src/components | wc -l`. A 20-component site is a focused session; a 60-component site wants the sweep split across parallel agents with per-batch verification.
