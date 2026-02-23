# Waffl Grid System Documentation

## Overview

The Waffl Grid System is a powerful, responsive grid system built on top of CSS Grid that provides semantic components with built-in grid functionality. It combines the flexibility of CSS Grid with the convenience of semantic HTML elements and responsive design patterns.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Waffl Grid System                      │
├─────────────────────────────────────────────────────────────┤
│  Semantic Components (Waffl, Section, Div, etc.)          │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Grid System Props ($s, $m, $l, etc.)                │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  Responsive Breakpoints (s, m, l, xl, etc.)   │  │ │
│  │  │  ┌─────────────────────────────────────────────┐ │  │ │
│  │  │  │  CSS Grid Implementation                  │ │  │ │
│  │  │  └─────────────────────────────────────────────┘ │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Core Concepts

### 1. Semantic Components

Waffl provides semantic HTML components that automatically include grid functionality:

```typescript
// Available semantic components
export const Waffl = createSemanticComponent('waffl-grid');
export const Section = createSemanticComponent('section');
export const Div = createSemanticComponent('div');
export const Main = createSemanticComponent('main');
export const Article = createSemanticComponent('article');
// ... and many more
```

### 2. Grid System Props

All semantic components accept responsive grid props:

```typescript
// Responsive grid props
type ResponsiveProps = {
    [K in keyof Breakpoints as `$${K}`]?: string;
}

// Example usage
<Section $s="1/-1" $m="2/6" $l="3/9">
    Content
</Section>
```

### 3. Responsive Breakpoints

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

The system automatically handles responsive grid column spans:

```typescript
export const gridSemantics = (props: SemanticProps) => css`
    grid-column: 1/-1; // Default: full width
    
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

## Usage Examples

### 1. Basic Grid Usage

```typescript
// Simple grid container
<Waffl>
    <Section $s="1/-1" $m="2/6" $l="3/9">
        Content spans full width on mobile, 2-6 on tablet, 3-9 on desktop
    </Section>
</Waffl>
```

### 2. Responsive Grid Layout

```typescript
// Responsive grid layout
<Waffl>
    <Section $s="1/-1" $m="1/3" $l="1/4">
        Sidebar
    </Section>
    <Section $s="1/-1" $m="3/7" $l="4/10">
        Main content
    </Section>
    <Section $s="1/-1" $m="7/9" $l="10/13">
        Right sidebar
    </Section>
</Waffl>
```

### 3. Grid Variants

```typescript
// Grid with variants
<Waffl $noGutter $isFixed>
    <Section $s="1/-1" $m="2/6">
        Content with no gutters and fixed max width
    </Section>
</Waffl>
```

### 4. Semantic HTML with Grid

```typescript
// Using semantic HTML elements with grid
<Main $s="1/-1" $m="2/6" $l="3/9">
    <Article $s="1/-1" $m="1/3" $l="1/4">
        Article content
    </Article>
    <Aside $s="1/-1" $m="3/5" $l="4/6">
        Sidebar content
    </Aside>
</Main>
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
<Section $s="1/2"> // Spans 1 column on small screens

// Multiple columns
<Section $s="1/3"> // Spans 2 columns on small screens

// Full width
<Section $s="1/-1"> // Spans all columns (default)
```

### 2. Responsive Column Spans

```typescript
// Responsive grid spans
<Section 
    $s="1/-1"    // Full width on mobile
    $m="2/6"     // Spans columns 2-6 on tablet
    $l="3/9"     // Spans columns 3-9 on desktop
>
    Content
</Section>
```

### 3. Grid Column Examples

```typescript
// Mobile-first responsive design
<Section 
    $s="1/-1"    // Mobile: full width
    $m="1/3"     // Tablet: left third
    $l="1/4"     // Desktop: left quarter
>
    Left content
</Section>

<Section 
    $s="1/-1"    // Mobile: full width
    $m="3/7"     // Tablet: middle two-thirds
    $l="4/10"    // Desktop: middle half
>
    Main content
</Section>

<Section 
    $s="1/-1"    // Mobile: full width
    $m="7/9"     // Tablet: right third
    $l="10/13"   // Desktop: right quarter
>
    Right content
</Section>
```

## Advanced Usage

### 1. Nested Grids

```typescript
// Nested grid system
<Waffl>
    <Section $s="1/-1" $m="2/6" $l="3/9">
        <Waffl>
            <Section $s="1/-1" $m="1/3">
                Nested left
            </Section>
            <Section $s="1/-1" $m="3/5">
                Nested right
            </Section>
        </Waffl>
    </Section>
</Waffl>
```

### 2. Grid with Variants

```typescript
// Grid with multiple variants
<Waffl $noGutter $isFixed $isCenter>
    <Section $s="1/-1" $m="2/6">
        Centered content with no gutters
    </Section>
</Waffl>
```

### 3. Semantic HTML with Grid

```typescript
// Using semantic HTML with grid system
<Main $s="1/-1" $m="2/6" $l="3/9">
    <Header $s="1/-1" $m="1/3" $l="1/4">
        <H1 $s="1/-1">Page Title</H1>
    </Header>
    
    <Article $s="1/-1" $m="3/7" $l="4/10">
        <H2 $s="1/-1">Article Title</H2>
        <P $s="1/-1">Article content...</P>
    </Article>
    
    <Aside $s="1/-1" $m="7/9" $l="10/13">
        <H3 $s="1/-1">Sidebar</H3>
        <P $s="1/-1">Sidebar content...</P>
    </Aside>
</Main>
```

## Performance Considerations

### 1. CSS Grid Performance

- **Containment**: Uses `contain: layout` for performance
- **CSS Variables**: Efficient responsive updates
- **Pre-computed Styles**: Base styles are pre-computed
- **Optimized Renders**: Minimal re-renders

### 2. Responsive Performance

- **Mobile-First**: Optimized for mobile devices
- **Efficient Breakpoints**: Only necessary breakpoints are applied
- **CSS Variables**: Smooth responsive transitions
- **Grid Containment**: Prevents layout thrashing

### 3. Development Performance

- **Type Safety**: Full TypeScript support
- **IntelliSense**: Auto-completion for props
- **Error Prevention**: Compile-time error checking
- **Hot Reloading**: Fast development iteration

## Best Practices

### 1. Grid Design

- **Mobile-First**: Start with mobile layout
- **Progressive Enhancement**: Add complexity for larger screens
- **Semantic HTML**: Use appropriate HTML elements
- **Accessibility**: Maintain semantic structure

### 2. Performance

- **Efficient Breakpoints**: Use only necessary breakpoints
- **Grid Containment**: Use `contain: layout` for performance
- **CSS Variables**: Leverage CSS custom properties
- **Optimized Renders**: Minimize re-renders

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
