# Semantic Components Documentation

## Overview

Semantic Components in Tackl provide a powerful way to use semantic HTML elements with built-in grid system functionality. Tackl exposes a single polymorphic component — `Div` — and you choose the rendered HTML tag with the `as` prop. This combines the accessibility and SEO benefits of semantic HTML with the flexibility of a responsive grid system, without shipping ~100 near-identical styled components.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Semantic Component System                   │
├─────────────────────────────────────────────────────────────┤
│  One polymorphic base: Div (styled.div)                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Tag selection via `as` prop (section, h1, p, etc.)   │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  Grid System Props ($s, $m, $l, etc.)         │  │ │
│  │  │  ┌─────────────────────────────────────────────┐ │  │ │
│  │  │  │  Semantic Props ($mar, $pad, etc.)        │ │  │ │
│  │  │  └─────────────────────────────────────────────┘ │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## The `Div` Component

### 1. One Component, Any Tag

`Div` (from `src/theme/tackl/index.ts`) is the only semantic component. It is a properly typed `styled.div`, so it accepts every standard HTML attribute (`style`, `aria-*`, `data-*`, event handlers, etc.) with full typing:

```typescript
import { Div } from '@tackl';

// Pick the rendered tag with the `as` prop
<Div as='section' $pad>…</Div>
<Div as='h1' $m='2/6' $l='3/9'>Page Title</Div>
<Div as='p' $marBottom>Paragraph copy…</Div>

// No `as` prop → renders a plain <div>
<Div $pad>…</Div>
```

The old per-tag exports (`Section`, `Main`, `Article`, `Aside`, `Header`, `Footer`, `H1`–`H6`, `P`, `Span`, `Waffl`, etc.) **no longer exist** — use `Div` with `as` instead. For the grid container, use `import Grid from '@waffl'`.

### 2. Implementation

```typescript
export const Div = styled.div<SemanticProps>`
    ${props => semantics(props)}
    ${props => gridSemantics(props)}
`;
```

**How it works**:
- One `styled.div` base carries all semantic behaviour
- Applies semantic styles (margins, padding)
- Applies grid styles (responsive column spans) — only when a span prop is set
- The `as` prop (styled-components polymorphism) swaps the rendered tag

### 3. In styles.ts Files

In component style files, fix the tag with `.attrs` so consumers don't need to pass `as` (see `src/components/Header/styles.ts` for the canonical example):

```typescript
// components/Header/styles.ts
import { Div } from '@tackl';
import styled, { css } from 'styled-components';

export const Jacket = styled(Div).attrs({ as: 'header' })(
    props => css`
        position: fixed;
        z-index: 999;
        inset: 0 0 auto 0;
    `
);
```

### 4. Props Integration

```typescript
// Transient props only — HTML attributes (id, className, style, ref…)
// come from styled.div's own typing on the polymorphic Div base
interface SemanticProps extends GridProps {
    // Semantic props
    $marBottom?: boolean;
    $marTop?: boolean;
    $mar?: boolean;
    $padBottom?: boolean;
    $padTop?: boolean;
    $pad?: boolean;

    // Grid props (inherited from GridProps)
    $s?: string;
    $m?: string;
    $l?: string;
    // ... other breakpoints
}
```

## Full-Width by Default (Grid-Side)

Elements no longer emit `grid-column: 1/-1` themselves. Instead, the grid makes its direct children full-width via a zero-specificity rule in `src/css/global.css`:

```css
waffl-grid > :where(*) {
    grid-column: 1 / -1;
}
```

Because `:where()` has zero specificity, any span prop, class, or `--col-*` variable on the child wins. This means **plain elements — including Server Components with no styled-components at all — are full-width grid children automatically**. Only children that need narrower spans need span props.

## Usage Examples

### 1. Basic Semantic Usage

```typescript
import { Div } from '@tackl';
import Grid from '@waffl';

// Simple semantic layout with grid
<Grid>
    <Div as='section' $m='2/6' $l='3/9'>
        <Div as='h1'>Page Title</Div>
        <Div as='p'>Page content...</Div>
    </Div>
</Grid>
```

### 2. Layout with Semantic HTML

```typescript
// Complete page layout with semantic HTML
<Grid>
    <Div as='header' $m='1/3' $l='1/4'>
        <Div as='h1'>Site Title</Div>
        <Div as='nav'>
            <a href='/'>Home</a>
            <a href='/about'>About</a>
        </Div>
    </Div>

    <Div as='article' $m='3/7' $l='4/10'>
        <Div as='h2'>Article Title</Div>
        <Div as='p'>Article content...</Div>
    </Div>

    <Div as='aside' $m='7/9' $l='10/13'>
        <Div as='h3'>Sidebar</Div>
        <Div as='p'>Sidebar content...</Div>
    </Div>
</Grid>
```

Note that headings, paragraphs, and links inside a layout block don't need span props (or `Div` at all) unless they sit directly in a grid and need a narrower span — plain elements default to full width.

### 3. Form with Semantic Components

```typescript
// Form with semantic tags — plain elements work inside the grid too
<Grid>
    <Div as='form' $m='2/6' $l='3/9'>
        <fieldset>
            <legend>Contact Information</legend>

            <label htmlFor='name'>Name</label>
            <input id='name' type='text' />

            <label htmlFor='email'>Email</label>
            <input id='email' type='email' />

            <button type='submit'>Submit</button>
        </fieldset>
    </Div>
</Grid>
```

### 4. Media with Semantic Components

```typescript
// Media content with semantic tags
<Div as='article' $m='2/6' $l='3/9'>
    <Div as='h2'>Media Article</Div>

    <Div as='figure' $m='1/3' $l='1/4'>
        <img src='/image.jpg' alt='Description' />
        <figcaption>Image caption</figcaption>
    </Div>

    <Div as='p' $m='3/5' $l='4/7'>
        Article content...
    </Div>
</Div>
```

## Props Reference

### 1. Grid System Props

| Prop | Breakpoint | Description |
|------|------------|-------------|
| `$s` | 320px+ | Small mobile grid span |
| `$sm` | 390px+ | Large mobile grid span |
| `$m` | 700px+ | Tablet grid span |
| `$l` | 1024px+ | Desktop grid span |
| `$xl` | 1200px+ | Large desktop grid span |
| `$xxl` | 1400px+ | Extra large grid span |
| `$huge` | 1600px+ | Huge screen grid span |
| `$uber` | 1800px+ | Ultra wide grid span |

### 2. Semantic Props

| Prop | Description |
|------|-------------|
| `$marBottom` | Add bottom margin |
| `$marTop` | Add top margin |
| `$mar` | Add vertical margins |
| `$padBottom` | Add bottom padding |
| `$padTop` | Add top padding |
| `$pad` | Add vertical padding |

### 3. Standard HTML Props

Because `Div` is a typed `styled.div`, all normal HTML attributes are accepted with full typing — no special prop plumbing required.

| Prop | Description |
|------|-------------|
| `as` | The HTML tag to render (`'section'`, `'h1'`, `'p'`, …) |
| `children` | React children |
| `ref` | React ref |
| `id` | HTML id attribute |
| `className` | CSS class name |
| `style` | Inline style object |
| `aria-*` | Accessibility attributes |
| `onClick` / `onChange` / … | Event handlers |

## Advanced Usage

### 1. Custom Styling

```typescript
// Custom styled semantic component — fix the tag with .attrs
const CustomSection = styled(Div).attrs({ as: 'section' })`
    background-color: ${props => props.theme.colors.brand.bc1};
    border-radius: ${props => props.theme.br.m};

    &:hover {
        transform: translateY(-2px);
    }
`;

// Usage with grid props
<CustomSection $m='2/6' $l='3/9'>
    Custom styled content
</CustomSection>
```

### 2. Component Composition

```typescript
// Composing with the polymorphic Div
const Card = ({ children, ...props }) => (
    <Div as='article' $m='1/3' $l='1/4' {...props}>
        {children}
    </Div>
);

const CardHeader = ({ children, ...props }) => (
    <Div as='header' {...props}>
        {children}
    </Div>
);

const CardContent = ({ children, ...props }) => (
    <Div {...props}>
        {children}
    </Div>
);

// Usage
<Card>
    <CardHeader>
        <Div as='h3'>Card Title</Div>
    </CardHeader>
    <CardContent>
        <Div as='p'>Card content...</Div>
    </CardContent>
</Card>
```

### 3. Responsive Design Patterns

```typescript
// Mobile-first responsive design
<Grid>
    {/* Mobile: stacked (full width by default), Tablet/Desktop: columns */}
    <Div as='section' $m='1/3' $l='1/4'>
        <Div as='h2'>Feature 1</Div>
        <Div as='p'>Feature description...</Div>
    </Div>

    <Div as='section' $m='3/5' $l='4/7'>
        <Div as='h2'>Feature 2</Div>
        <Div as='p'>Feature description...</Div>
    </Div>

    <Div as='section' $m='5/7' $l='7/10'>
        <Div as='h2'>Feature 3</Div>
        <Div as='p'>Feature description...</Div>
    </Div>
</Grid>
```

## Best Practices

### 1. Semantic HTML

- **Use appropriate elements**: Choose the right `as` tag for the content
- **Maintain hierarchy**: Use proper heading hierarchy (`as='h1'`, `as='h2'`, etc.)
- **Accessibility**: Ensure components are accessible to screen readers
- **SEO**: Use semantic tags for better search engine optimization

### 2. Grid System

- **Mobile-first**: Start with mobile layout and enhance for larger screens
- **Rely on the default**: Don't pass span props for full-width children — the grid handles that
- **Consistent spacing**: Use consistent grid spans across components
- **Responsive design**: Test across different screen sizes

### 3. Component Design

- **Single responsibility**: Each component should have one clear purpose
- **Fix tags in styles.ts**: Use `styled(Div).attrs({ as: '…' })` so consumers don't repeat `as`
- **Composition**: Compose complex components from simpler ones
- **Documentation**: Document component usage and props

### 4. Performance

- **Prefer plain elements**: Server Components and plain tags participate in the grid with zero styled-components cost
- **Efficient rendering**: Minimize unnecessary re-renders
- **Bundle size**: One base component + tree-shaking (`"sideEffects"` is configured in `package.json`) keeps the styling layer minimal
- **Loading**: Use lazy loading for heavy components

## Troubleshooting

### 1. Common Issues

- **Grid column syntax**: Ensure correct column span syntax
- **Responsive breakpoints**: Check breakpoint values
- **Missing tag**: Forgetting `as` renders a `<div>` — fine for wrappers, wrong for landmarks/headings
- **Accessibility**: Test with screen readers

### 2. Debugging Tips

- **Browser DevTools**: Use element inspector to confirm the rendered tag
- **Console Logging**: Add strategic logs
- **Performance Tab**: Monitor component performance
- **Accessibility Testing**: Use accessibility tools

### 3. Performance Issues

- **Re-renders**: Optimize component updates
- **CSS Performance**: Use efficient CSS selectors
- **Bundle Size**: Monitor component bundle size
- **Loading Performance**: Optimize component loading

## Conclusion

Tackl's polymorphic `Div` component provides a powerful way to build accessible, performant, and maintainable web applications. By combining semantic HTML (via the `as` prop) with a responsive grid system whose full-width default lives on the grid itself, developers can create complex layouts while maintaining excellent user experience and developer experience.

For more specific implementation details, refer to the Waffl Grid System documentation and the main App Architecture guide.
