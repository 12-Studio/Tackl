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

// Example usage - 2, 6, 12 columns.
<Section $s="1/3" $m="1/7" $l="1/13">
    Content
</Section>
```

### 3. Responsive Breakpoints

The system uses predefined breakpoints for responsive design:

```typescript
const breakpoints = {
	s: '320px', // Small mobile
	sm: '390px', // Large mobile
	m: '700px', // Tablet
	l: '1024px', // Desktop
	xl: '1200px', // Large desktop
	xxl: '1400px', // Extra large
	huge: '1600px', // Huge screens
	uber: '1800px', // Ultra wide
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

### 4. Smart Breakpoint Inheritance

**Key Feature**: You only need to specify props for breakpoints that change! The system automatically inherits the previous breakpoint's value. (Meaning, if your grid props only change on desktop, $l, you do not need to specify $s or $m)

```typescript
// ✅ Only specify what changes
<Section $l="3/9">
    // Mobile: full width (1/-1)
    // Tablet: full width (1/-1)
    // Desktop: 3/9
</Section>

// ✅ Skip intermediate breakpoints
<Section $m="1/5" $xl="4/10">
    // Mobile: full width (1/-1)
    // Tablet: Changes
    // Desktop: Changes
</Section>
```

## Basic Usageop

```jsx
import { Waffl, Section, Div } from '@tackl';

// Basic grid layout
<Waffl>
  <Section $s="1/-1" $m="2/6" $l="3/9">
    Content
  </Section>
</Waffl>

// Common configurations
<Waffl $isFixed>               {/* Max-width container */}
<Waffl $noGutter>              {/* Remove column gaps */}
<Waffl $isFullscreen>          {/* Full viewport height */}
<Waffl $isCenter>              {/* Center content */}
<Waffl $noMargin>              {/* Remove padding */}
```

## Grid Configuration

The grid system is configured in the theme file:

```typescript
export const grid: Grid = {
	columns: {
		s: 2, // Small mobile columns
		m: 6, // Tablet columns
		l: 12, // Desktop columns
	},
	breakpoints: {
		s: '320px', // Small mobile
		sm: '390px', // Large mobile
		m: '700px', // Tablet
		l: '1024px', // Desktop
		xl: '1200px', // Large desktop
		xxl: '1400px', // Extra large
		huge: '1600px', // Huge screens
		uber: '1800px', // Ultra wide
	},
	gutter: {
		s: '2.4rem', // Small mobile gutter
		m: '2.4rem', // Tablet gutter
		l: '3.6rem', // Desktop gutter
	},
	maxSize: '1440px', // Max container width
};
```

## Props Interface

### Grid System Props

| Prop    | Breakpoint | Type     | Description             | Example  |
| ------- | ---------- | -------- | ----------------------- | -------- |
| `$s`    | 320px+     | `string` | Small mobile grid span  | `"1/-1"` |
| `$sm`   | 390px+     | `string` | Large mobile grid span  | `"1/3"`  |
| `$m`    | 700px+     | `string` | Tablet grid span        | `"2/6"`  |
| `$l`    | 1024px+    | `string` | Desktop grid span       | `"3/9"`  |
| `$xl`   | 1200px+    | `string` | Large desktop grid span | `"4/10"` |
| `$xxl`  | 1400px+    | `string` | Extra large grid span   | `"5/11"` |
| `$huge` | 1600px+    | `string` | Huge screen grid span   | `"6/12"` |
| `$uber` | 1800px+    | `string` | Ultra wide grid span    | `"7/13"` |

### Grid Variant Props

| Prop            | Type      | Description           | CSS Effect              |
| --------------- | --------- | --------------------- | ----------------------- |
| `$noGutter`     | `boolean` | Remove column gaps    | `column-gap: 0`         |
| `$noMargin`     | `boolean` | Remove padding-inline | `padding-inline: 0`     |
| `$isFullscreen` | `boolean` | Set height to 100%    | `height: 100%`          |
| `$isCenter`     | `boolean` | Center items          | `place-items: center`   |
| `$isFixed`      | `boolean` | Set max-width         | `max-width: ${maxSize}` |

### Semantic Props

| Prop         | Type      | Description          | CSS Property     |
| ------------ | --------- | -------------------- | ---------------- |
| `$marBottom` | `boolean` | Add bottom margin    | `margin-bottom`  |
| `$marTop`    | `boolean` | Add top margin       | `margin-top`     |
| `$mar`       | `boolean` | Add vertical margins | `margin-block`   |
| `$padBottom` | `boolean` | Add bottom padding   | `padding-bottom` |
| `$padTop`    | `boolean` | Add top padding      | `padding-top`    |
| `$pad`       | `boolean` | Add vertical padding | `padding-block`  |

## Usage Examples

### 1. Basic Grid Layout

```jsx
<Waffl>
	<Section $s='1/-1' $m='2/6' $l='3/9'>
		Content spans full width on mobile, 2-6 on tablet, 3-9 on desktop
	</Section>
</Waffl>
```

### 1.1. Smart Breakpoint Inheritance

```jsx
// ✅ Efficient: Only specify what changes
<Section $s='1/-1' $l='3/9'>
	// Mobile: full width (1/-1)
	// Tablet: inherits mobile (1/-1)
	// Desktop: 3/9
</Section>

// ✅ Skip intermediate breakpoints
<Section $s='1/-1' $xl='4/10'>
	// Mobile: full width (1/-1)
	// Tablet: inherits mobile (1/-1)
	// Desktop: inherits tablet (1/-1)
	// Large Desktop: 4/10
</Section>

// ✅ Start from any breakpoint
<Section $m='2/6' $l='3/9'>
	// Mobile: default (1/-1)
	// Tablet: 2/6
	// Desktop: 3/9
</Section>
```

### 2. Responsive Grid Layout

```jsx
<Waffl>
	<Section $s='1/-1' $m='1/3' $l='1/4'>
		Sidebar
	</Section>
	<Section $s='1/-1' $m='3/7' $l='4/10'>
		Main content
	</Section>
	<Section $s='1/-1' $m='7/9' $l='10/13'>
		Right sidebar
	</Section>
</Waffl>
```

### 2.1. Efficient Responsive Layout

```jsx
// ✅ Only specify what changes at each breakpoint
<Waffl>
	<Section $s='1/-1' $l='1/4'>
		// Mobile: full width, Desktop: left quarter // Tablet inherits mobile
		(full width) Sidebar
	</Section>
	<Section $s='1/-1' $l='4/10'>
		// Mobile: full width, Desktop: middle half // Tablet inherits mobile
		(full width) Main content
	</Section>
	<Section $s='1/-1' $l='10/13'>
		// Mobile: full width, Desktop: right quarter // Tablet inherits mobile
		(full width) Right sidebar
	</Section>
</Waffl>
```

### 3. Grid with Variants

```jsx
<Waffl $noGutter $isFixed>
	<Section $s='1/-1' $m='2/6'>
		Content with no gutters and fixed max width
	</Section>
</Waffl>
```

### 4. Semantic HTML with Grid

```jsx
<Main $s='1/-1' $m='2/6' $l='3/9'>
	<Article $s='1/-1' $m='1/3' $l='1/4'>
		Article content
	</Article>
	<Aside $s='1/-1' $m='3/5' $l='4/6'>
		Sidebar content
	</Aside>
</Main>
```

### 5. Centered Content

```jsx
<Waffl $isCenter $isFullscreen>
	<Section $s='1/-1' $m='2/6'>
		Centered vertically and horizontally
	</Section>
</Waffl>
```

### 6. Fixed Width Container

```jsx
<Waffl $isFixed>
	<Section $s='1/-1' $m='2/6'>
		Fixed width container content
	</Section>
</Waffl>
```

### 7. No Gutters

```jsx
<Waffl $noGutter>
	<Section $s='1/-1' $m='1/3'>
		Content with no column gaps
	</Section>
</Waffl>
```

## Grid Column Syntax

### Basic Column Spans

```typescript
// Single column
<Section $s="1/2"> // Spans 1 column on small screens

// Multiple columns
<Section $s="1/3"> // Spans 2 columns on small screens

// Full width
<Section $s="1/-1"> // Spans all columns (default)
```

### Responsive Column Spans

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

### Smart Breakpoint Inheritance

**Key Feature**: You only need to specify props for breakpoints that change! The system automatically inherits the previous breakpoint's value.

```typescript
// ✅ Efficient: Only specify what changes
<Section $s="1/-1" $l="3/9">
    // Mobile: full width (1/-1)
    // Tablet: inherits mobile (1/-1)
    // Desktop: 3/9
</Section>

// ✅ Skip intermediate breakpoints
<Section $s="1/-1" $xl="4/10">
    // Mobile: full width (1/-1)
    // Tablet: inherits mobile (1/-1)
    // Desktop: inherits tablet (1/-1)
    // Large Desktop: 4/10
</Section>

// ✅ Start from any breakpoint
<Section $m="2/6" $l="3/9">
    // Mobile: default (1/-1)
    // Tablet: 2/6
    // Desktop: 3/9
</Section>

// ✅ Only specify the breakpoints you need
<Section $l="3/9">
    // Mobile: default (1/-1)
    // Tablet: default (1/-1)
    // Desktop: 3/9
</Section>
```

## Responsive Behavior

The grid automatically adjusts based on breakpoints:

### Small Mobile (320px+)

- 2 columns
- 2.4rem gutters
- 2.4rem padding

### Tablet (700px+)

- 6 columns
- 2.4rem gutters
- 1.2rem padding (half of gutter)

### Desktop (1024px+)

- 12 columns
- 3.6rem gutters
- 1.8rem padding (half of gutter)

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

## Performance Optimizations

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

## Grid Exposer Tool

For development, use the Grid Exposer to visualize the grid:

```jsx
// Automatically included in development
<GridExposer />
```

The Grid Exposer provides:

- Visual grid overlay
- Breakpoint indicators
- Column span visualization
- Debug information

## Best Practices

### 1. Grid Design

- **Mobile-First**: Start with mobile layout and enhance for larger screens
- **Progressive Enhancement**: Add complexity for larger screens
- **Semantic HTML**: Use appropriate HTML elements
- **Accessibility**: Maintain semantic structure
- **Smart Breakpoints**: Only specify props for breakpoints that change

### 2. Performance

- **Efficient Breakpoints**: Use only necessary breakpoints
- **Grid Containment**: Use `contain: layout` for performance
- **CSS Variables**: Leverage CSS custom properties
- **Optimized Renders**: Minimize re-renders
- **Smart Inheritance**: Only specify props for breakpoints that change

### 3. Component Design

- **Single Responsibility**: Each component should have one clear purpose
- **Reusability**: Design components to be reusable across the application
- **Composition**: Compose complex components from simpler ones
- **Documentation**: Document component usage and props

### 4. Responsive Design

```jsx
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

### 4.1. Efficient Responsive Design

```jsx
// ✅ Only specify what changes at each breakpoint
<Section $s="1/-1" $l="1/4">
    // Mobile: full width, Desktop: left quarter
    // Tablet inherits mobile (full width)
    Left content
</Section>

<Section $s="1/-1" $l="4/10">
    // Mobile: full width, Desktop: middle half
    // Tablet inherits mobile (full width)
    Main content
</Section>

<Section $s="1/-1" $l="10/13">
    // Mobile: full width, Desktop: right quarter
    // Tablet inherits mobile (full width)
    Right content
</Section>
```

### 5. Container Usage

```jsx
// Preferred: Fixed container for content
<Waffl $isFixed>
    <Section $s="1/-1" $m="2/6">
        Content
    </Section>
</Waffl>

// Full-width sections
<Waffl>
    <Section $s="1/-1">
        Full width content
    </Section>
</Waffl>
```

### 6. Nesting Grids

```jsx
// Proper grid nesting
<Waffl $isFixed>
	<Section $s='1/-1' $m='1/3' $l='1/4'>
		<Waffl $noMargin>
			<Section $s='1/-1' $m='1/3'>
				Nested content
			</Section>
		</Waffl>
	</Section>
</Waffl>
```

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

### Understanding Grid Columns

_Writing CSS Grid columns can be confusing - use the Grid Exposer tool to visualize the grid and help with debugging_

The grid system uses CSS Grid with a fraction-based column system that adapts across breakpoints:

- **Small Mobile (2 columns)**: `1/3` spans 2 columns on mobile
- **Tablet (6 columns)**: `1/7` spans 6 columns on tablet
- **Desktop (12 columns)**: `1/13` spans 12 columns on desktop

_When using CSS Grid columns:_

- The first number represents the starting column (1-based index)
- The second number represents the ending column + 1

For example, `grid-column: 2 / 4` means:

- Start at column 2
- Span through column 3 (end before column 4)

This is why our fraction notation uses `1/3` to span 2 columns - it starts at column 1 and ends before column 3.

### Common Grid Issues

- **Overflow Issues**: Use `$noMargin` for nested grids
- **Alignment Problems**: Use `$isCenter` for vertical/horizontal centering
- **Responsive Behavior**: Check content padding/margins
- **Grid Column Configuration**: Verify breakpoint values

## Conclusion

The Waffl Grid System provides a powerful, flexible, and performant grid system that combines the best of CSS Grid with semantic HTML and responsive design. It offers a clean API for building complex layouts while maintaining excellent performance and developer experience.

### Key Benefits

- **Semantic HTML**: Use proper HTML elements with grid functionality
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Performance**: Optimized CSS Grid implementation with containment
- **Developer Experience**: TypeScript support with IntelliSense
- **Accessibility**: Maintains semantic structure for screen readers
- **Flexibility**: Supports complex layouts and nested grids

### Getting Started

1. **Import Components**: Use semantic components from `@tackl`
2. **Apply Grid Props**: Use responsive grid props (`$s`, `$m`, `$l`, etc.)
3. **Use Variants**: Apply grid variants (`$isFixed`, `$noGutter`, etc.)
4. **Test Responsively**: Use Grid Exposer for development
5. **Follow Best Practices**: Mobile-first, semantic HTML, performance optimization

For more examples and advanced usage, refer to the Storybook documentation or component examples in the codebase.
