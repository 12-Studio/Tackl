# The Setup Wizard

The first time you pull down Tackl and run `bun dev`, a full-screen setup wizard
greets you in the browser. It walks through every theme token like a form,
ordered by cognitive lift: the quick wins first (brand, global & feedback
colours, spacing, gaps, radii, durations and easing curves), then the type
work — fonts are added and assigned to roles (heading/body/mono/script)
first, and the per-breakpoint type scale that builds on those roles closes
the flow — with live previews as you type.

## What it does

- **Defaults come from the theme.** Every field opens with the current value
  from `src/theme`, so skipping a field keeps the starter default.
- **Finishing writes the theme.** The wizard POSTs to a dev-only API route
  (`app/api/tackl-setup`) that rewrites the raw value objects in place:
  `baseColors`, `fontFamilies`, `spaceValues`, `gapValues`,
  `borderRadiusValues`, `timeValues`, `easingValues` and the `typeScale`
  behind `displayL`…`captionS` in `src/theme/tackl/type`. Everything
  downstream (`--brand-*` CSS variables, `getBrand()`, the theme object, the
  type styles) updates automatically because those objects are the single
  source of truth.
- **The type scale is edited per breakpoint, one role per slide.** Each
  slide opens with the role's descriptor — when to reach for Display vs
  Headline vs Title etc. — sourced from the `typeRoles` export in
  `src/theme/tackl/type` (also shown in the Storybook theme overview, and
  kept after the wizard deletes itself). Each
  role (Display, Headline, Title, Body, Caption) shows its L and S variants
  side by side, each with a Base block and a `bp.xl` override block — font
  family and weight (theme token keys resolved through the getters), size,
  line-height, letter-spacing and text-transform. Empty override fields
  simply inherit from base, and an optional `m` block stays hand-editable
  in `src/theme/tackl/type`. **Sizes are entered in px** and written as rem
  (px ÷ 10, matching the 10px html base); CSS sizes like `clamp(…)` pass
  through as-is.
- **Fonts are passed by name only.** The `fontVariables`
  registry in `src/theme/fonts` lists every available font (`inter` out of
  the box). Uploading a font drops the file in `src/theme/fonts/custom/`,
  generates its `next/font` `localFont` export (weight 400 — add more
  weights afterwards), wires the variable onto `<html>` and registers it —
  it immediately appears in the role dropdowns. Each role (heading / body /
  mono / script) picks a font by name; the full `var(--…), Arial,
  sans-serif` stacks are generated on finish.
- **Brand colours are flexible.** Add as many `c*` colours as the project
  needs or remove ones it doesn't (minimum one) — `baseColors.brand`,
  the `--brand-*` variables and `getBrand()` typing all follow
  automatically.
- **Then it deletes itself.** On finish (or skip), the route removes
  `src/components/TacklSetup`, the API route folder and the marked
  `tackl:setup-*` lines in `app/(site)/Providers.tsx`. Hot reload picks up the
  change and the overlay disappears — no trace ships to production.

## Skipping

Choose **Skip — keep the defaults** on the welcome screen. The wizard removes
itself without touching the theme; edit `src/theme` by hand whenever you like.

## Safety

- The component only renders in development, and the API route returns 404
  outside development — even if a build somehow shipped it.
- Submitted values are validated (hex colours, no code-breaking characters)
  before anything is written to disk.

## Re-running it

The wizard is one-shot by design. To run it again, restore the deleted files
from git before your setup commit:

```bash
git checkout <commit-before-setup> -- src/components/TacklSetup "app/(site)/Providers.tsx" app/api/tackl-setup
```

Or simply edit the token files in `src/theme` directly — that's all the wizard
does under the hood.
