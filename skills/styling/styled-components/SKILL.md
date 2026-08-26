---
name: styled-components
description: Styles React components with styled-components and the Tackl design system. Use when the user mentions styled-components, styles.ts, theme tokens, Tackl primitives, responsive breakpoints (bp), or component styling in this project.
---

# Styled Components (Tackl)

## File structure

Every component folder:

```
ComponentName/
  index.tsx       # Logic + JSX only — no styled definitions
  styles.ts       # All styled-components
  interface.ts  # Props types
```

Import styles as a namespace:

```tsx
import * as S from './styles';

const Hero = (props: HeroProps) => <S.Jacket {...props}>...</S.Jacket>;
```

## Rules

1. **Never** put styled-components in `index.tsx`.
2. **Never** use Tailwind, CSS modules, inline styles, or SASS for component styling.
3. Use **Tackl primitives** from `@theme/tackl` (`Section`, `Header`, `Div`, etc.) as styled bases.
4. Use **Tackl type styles** from `@tackl/type` for typography (`headlineL`, `bodyL`, `captionS`).
5. Use **theme helpers**: `getBrand`, `getGlobal`, `getRadius`, `getEase`, `getFont`, `getFontWeight`.
6. Mobile-first responsive styles via `bp.l` / `bp.m` / `bp.s` from `@theme/tackl`.
7. Pass styling props with `$` prefix (transient props) to avoid DOM leakage.

## `styles.ts` template

```ts
// Imports
// ------------
import { Section } from '@tackl';
import {} from '@tackl/type';
import styled, { css } from 'styled-components';
import { getBrand } from '@theme/tackl';

// Interfaces
// ------------
interface StylesInterface {
	$isActive?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	props => css`
		display: flex;
		padding: 1rem;
		background: ${getBrand('c1')};
		opacity: ${props.$isActive ? 1 : 0.6};
	`
);
```

## Naming

Use descriptive layout names — not generic wrappers:

- `Jacket` — outermost container
- `Wrapper` — inner layout shell
- `Content` — text/media area
- `Coat` — overlay or secondary layer

## Theme access

Global theme lives in `src/theme/index.ts`. Access in styled-components via `props.theme` or Tackl getters.

`ThemeProvider` wraps the app in `app/(site)/Client.tsx`. `GlobalStyle` is applied there.

## SSR

`StyledComponentsRegistry` in `src/utils/registry.jsx` handles SSR style collection. Client components using styled-components must render inside this registry (already wired in `Client.tsx`).

## Avoid

- `styled.div` when a Tackl semantic primitive fits
- Hardcoded colors/fonts — use theme tokens
- Mixing Sanity/portable text styling here — keep CMS content unstyled or use minimal wrappers

## References

- `AGENTS.md` — Styling & theming, Writing a component
- `docs/Tackl/WritingComponents.md` · `docs/Tackl/Theming.md`
- `src/theme/tackl/` — primitives, breakpoints, semantics
