# The Setup Wizard

The first time you pull down Tackl and run `bun dev`, a full-screen setup wizard
greets you in the browser. It walks through every theme token like a form —
brand colours, global & feedback colours, font stacks, spacing, gaps, radii,
durations and easing curves — and previews your values live as you type.

## What it does

- **Defaults come from the theme.** Every field opens with the current value
  from `src/theme`, so skipping a field keeps the starter default.
- **Finishing writes the theme.** The wizard POSTs to a dev-only API route
  (`app/api/tackl-setup`) that rewrites the raw value objects in place:
  `baseColors`, `fontFamilies`, `spaceValues`, `gapValues`,
  `borderRadiusValues`, `timeValues` and `easingValues`. Everything downstream
  (`--brand-*` CSS variables, `getBrand()`, the theme object) updates
  automatically because those objects are the single source of truth.
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
