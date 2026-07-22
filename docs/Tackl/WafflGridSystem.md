# Waffl Grid System Documentation

## Overview

The Waffl Grid System is a powerful, responsive grid system built on top of CSS Grid. A single styled `Grid` component renders a plain `<waffl-grid>` tag, direct children span the full grid by default via a zero-specificity global rule, and the polymorphic `Div` semantic component opts children into narrower spans with responsive props.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Waffl Grid System                      │
├─────────────────────────────────────────────────────────────┤
│  Grid (styled <waffl-grid> tag) + Div (semantic child)    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Full-width default (global :where rule)              │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  Grid Span Props ($s, $m, $l, etc.)           │  │ │
│  │  │  ┌─────────────────────────────────────────────┐ │  │ │
│  │  │  │  CSS Grid Implementation                  │ │  │ │
│  │  │  └─────────────────────────────────────────────┘ │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Core Concepts

### 1. The Grid Component

The grid container is the styled `Grid` component (`src/theme/tackl/waffl/index.ts`), imported as a default from `@waffl`. It renders a plain `<waffl-grid>` tag — the tag is just a name (typed as a JSX intrinsic in `src/types/waffl.d.ts`); there is no JS custom element, no shadow DOM, and no side-effect import to register:

```typescript
import Grid from '@waffl';

<Grid>
    {/* children */}
</Grid>
```

### 2. Full-Width by Default

Children no longer emit `grid-column: 1/-1` themselves. The default lives on the grid, in `src/css/global.css`:

```css
/* :where() keeps specificity at zero, so any span prop, class,
   or --col-* variable on the child wins. */
waffl-grid > :where(*) {
    grid-column: 1 / -1;
}
```

Because the rule targets any direct child, plain elements — including Server Components with no styled-components at all — participate in the grid and span full width automatically. Only children needing narrower spans need span props.

### 3. Grid System Props

Children use the polymorphic `Div` component (from `@tackl`) with responsive span props:

```typescript
// Responsive grid props
type ResponsiveProps = {
    [K in keyof Breakpoints as `$${K}`]?: string;
}

// Example usage
<Div as='section' $m='2/6' $l='3/9'>
    Content
</Div>
```

### 4. Responsive Breakpoints

The system uses predefined breakpoints for responsive design:

```typescript
const breakpoints = {
    s: '320px',    // Small mobile
    sm: '390px',   // Large mobile
    m: '700px',    // Tablet
    l: '1024px',   // Desktop
    xl: '1200px',  // Large desktop
    xxl: '1400px', // Extra large
    huge: '1600px', // Huge screens
    uber: '1800px'  // Ultra wide
};
```

## Grid System Implementation

### 1. Base Grid Styles

The grid system is built on CSS Grid with responsive columns and gutters:

```typescript
const baseGridStyles = css`
    --grid-columns: repeat(${columns?.s}, 1fr);
    --grid-gutter: ${gutter.s};
    --grid-margin: ${gutter.s};

    display: grid;
    contain: layout;
    grid-template-columns: var(--grid-columns);
    column-gap: var(--grid-gutter);

    padding-inline: var(--grid-margin);
    margin: 0 auto;
    width: 100%;

    ${bp.m`
        --grid-columns: repeat(${columns?.m}, 1fr);
        --grid-gutter: ${gutter.m};
        --grid-margin: calc(var(--grid-gutter) / 2);
    `}

    ${bp.l`
        --grid-columns: repeat(${columns?.l}, 1fr);
        --grid-gutter: ${gutter.l};
        --grid-margin: calc(var(--grid-gutter) / 2);
    `}
`;
```

### 2. Grid Variants

The system includes various grid variants for different use cases:

```typescript
const gridVariants = {
    noGutter: css`
        column-gap: 0;
    `,
    noMargin: css`
        padding-inline: 0;
    `,
    isFullscreen: css`
        height: 100%;
    `,
    isCenter: css`
        place-items: center;
    `,
    isFixed: css`
        max-width: ${maxSize};
    `,
};
```

### 3. Responsive Grid Columns

Span props only emit `grid-column` when set — the full-width default comes from the grid, not the child:

```typescript
export const gridSemantics = (props: SemanticProps) => css`
    ${breakpointKeys.map(
        key =>
            props[`$${key}`] &&
            css`
                ${breakpointUp[key]`
                    grid-column: ${props[`$${key}`]};
                `}
            `
    )}
`;
```

This also means elements used outside a grid carry no grid CSS at all.

## Usage Examples

### 1. Basic Grid Usage

```typescript
import { Div } from '@tackl';
import Grid from '@waffl';

// Simple grid container
<Grid>
    <Div as='section' $m='2/6' $l='3/9'>
        Content spans full width on mobile, 2-6 on tablet, 3-9 on desktop
    </Div>
</Grid>
```

### 2. Responsive Grid Layout

```typescript
// Responsive grid layout
<Grid>
    <Div as='section' $m='1/3' $l='1/4'>
        Sidebar
    </Div>
    <Div as='section' $m='3/7' $l='4/10'>
        Main content
    </Div>
    <Div as='section' $m='7/9' $l='10/13'>
        Right sidebar
    </Div>
</Grid>
```

### 3. Grid Variants

```typescript
// Grid with variants
<Grid $noGutter $isFixed>
    <Div as='section' $m='2/6'>
        Content with no gutters and fixed max width
    </Div>
</Grid>
```

### 4. Plain and Server-Rendered Children

```typescript
// No styled-components needed for full-width children —
// the global waffl-grid rule makes them span the grid
<Grid>
    <section>Full-width Server Component content</section>
    <Div as='aside' $m='3/5' $l='4/6'>
        Narrower sidebar content
    </Div>
</Grid>
```

## Grid System Props

### 1. Responsive Grid Props

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

### 2. Grid Variant Props

| Prop | Description |
|------|-------------|
| `$noGutter` | Remove column gaps |
| `$noMargin` | Remove padding-inline |
| `$isFullscreen` | Set height to 100% |
| `$isCenter` | Center items with place-items |
| `$isFixed` | Set max-width to theme maxSize |

### 3. Semantic Props

| Prop | Description |
|------|-------------|
| `$marBottom` | Add bottom margin |
| `$marTop` | Add top margin |
| `$mar` | Add vertical margins |
| `$padBottom` | Add bottom padding |
| `$padTop` | Add top padding |
| `$pad` | Add vertical padding |

## Grid Column Syntax

### 1. Basic Column Spans

```typescript
// Single column
<Div as='section' $s='1/2'> // Spans 1 column on small screens

// Multiple columns
<Div as='section' $s='1/3'> // Spans 2 columns on small screens

// Full width
<Div as='section'> // Spans all columns (grid default — no prop needed)
```

### 2. Responsive Column Spans

```typescript
// Responsive grid spans
<Div
    as='section'
    $m='2/6'     // Spans columns 2-6 on tablet
    $l='3/9'     // Spans columns 3-9 on desktop
>
    Content
</Div>
```

### 3. Grid Column Examples

```typescript
// Mobile-first responsive design (full width on mobile by default)
<Div
    as='section'
    $m='1/3'     // Tablet: left third
    $l='1/4'     // Desktop: left quarter
>
    Left content
</Div>

<Div
    as='section'
    $m='3/7'     // Tablet: middle two-thirds
    $l='4/10'    // Desktop: middle half
>
    Main content
</Div>

<Div
    as='section'
    $m='7/9'     // Tablet: right third
    $l='10/13'   // Desktop: right quarter
>
    Right content
</Div>
```

## Advanced Usage

### 1. Nested Grids

```typescript
// Nested grid system
<Grid>
    <Div as='section' $m='2/6' $l='3/9'>
        <Grid $noMargin>
            <Div as='section' $m='1/3'>
                Nested left
            </Div>
            <Div as='section' $m='3/5'>
                Nested right
            </Div>
        </Grid>
    </Div>
</Grid>
```

### 2. Grid with Variants

```typescript
// Grid with multiple variants
<Grid $noGutter $isFixed $isCenter>
    <Div as='section' $m='2/6'>
        Centered content with no gutters
    </Div>
</Grid>
```

### 3. Semantic HTML with Grid

```typescript
// Using semantic HTML with grid system
<Grid>
    <Div as='header' $m='1/3' $l='1/4'>
        <Div as='h1'>Page Title</Div>
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

## Performance Considerations

### 1. CSS Grid Performance

- **Containment**: Uses `contain: layout` for performance
- **CSS Variables**: Efficient responsive updates
- **Pre-computed Styles**: Base styles are pre-computed
- **No Runtime Registration**: `<waffl-grid>` is a plain tag — no custom element JS, no shadow DOM

### 2. Responsive Performance

- **Mobile-First**: Optimized for mobile devices
- **Efficient Breakpoints**: Span CSS is only emitted for breakpoints you set
- **Zero-Specificity Default**: The full-width default is one global rule, not per-element CSS
- **Grid Containment**: Prevents layout thrashing

### 3. Development Performance

- **Type Safety**: Full TypeScript support (the tag is typed in `src/types/waffl.d.ts`)
- **IntelliSense**: Auto-completion for props
- **Error Prevention**: Compile-time error checking
- **Tree-Shaking**: `package.json` declares `"sideEffects": ["*.css", "src/components/AnimationPlugins/**"]`, so unused modules are dropped from the bundle

## Best Practices

### 1. Grid Design

- **Mobile-First**: Start with mobile layout
- **Progressive Enhancement**: Add complexity for larger screens
- **Semantic HTML**: Pick the right tag with `as` (or plain elements for full-width children)
- **Accessibility**: Maintain semantic structure

### 2. Performance

- **Rely on the Default**: Don't pass span props for full-width children — the grid handles it
- **Grid Containment**: Use `contain: layout` for performance
- **CSS Variables**: Leverage CSS custom properties
- **Prefer Plain Elements**: Server Components need no styled-components to sit in the grid

### 3. Maintenance

- **Consistent Naming**: Use consistent prop naming
- **Documentation**: Document complex grid layouts
- **Testing**: Test across different screen sizes
- **Performance**: Monitor performance metrics

## Troubleshooting

### 1. Common Issues

- **Grid Column Syntax**: Ensure correct column span syntax
- **Responsive Breakpoints**: Check breakpoint values
- **CSS Grid Support**: Verify browser support
- **Performance**: Monitor layout performance

### 2. Debugging Tips

- **Browser DevTools**: Use grid inspector
- **Console Logging**: Add strategic logs
- **Performance Tab**: Monitor layout performance
- **Responsive Testing**: Test across screen sizes

### 3. Performance Issues

- **Layout Thrashing**: Use `contain: layout`
- **Re-renders**: Optimize component updates
- **CSS Variables**: Use efficient variable updates
- **Grid Containment**: Prevent unnecessary recalculations

## Conclusion

The Waffl Grid System provides a powerful, flexible, and performant grid system that combines the best of CSS Grid with semantic HTML and responsive design. It offers a clean API for building complex layouts while maintaining excellent performance and developer experience.

For more specific implementation details, refer to the individual component documentation and the main App Architecture guide.
