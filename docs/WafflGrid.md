# Waffl Grid System Documentation

## Overview

Waffl is a flexible, responsive grid system built on styled-components. It provides a powerful layout system with configurable columns, gutters, and responsive behaviors.

## Basic Usage

index.jsx

```jsx
import Grid from '@waffl';

// Basic grid layout
<Grid>
  {/* Grid content */}
</Grid>

// Common configurations
<Grid $isFixed>               {/* Max-width container */}
<Grid $noGutter>              {/* Remove column gaps */}
<Grid $isFullscreen>          {/* Full viewport height */}
<Grid $isCenter>              {/* Center content */}
<Grid $noMargin>              {/* Remove padding */}
```

## Grid Configuration

The grid system is configured in the theme file:
index.js

```javascript
grid: {
  columns: {
    mobile: 2,    // Columns on mobile
    tablet: 6,    // Columns on tablet
    desktop: 12   // Columns on desktop
  },
  breakpoints: {
    small: '0px',
    smedium: '390px',
    medium: '700px',
    large: '1024px',
    xlarge: '1200px',
    xxlarge: '1400px',
    huge: '1600px',
    uber: '1800px'
  },
  gutter: {
    small: '2.4rem',   // Mobile gutter
    medium: '2.4rem',  // Tablet gutter
    large: '3.6rem'    // Desktop gutter
  },
  maxSize: '1440px'    // Max container width
}
```

## Props Interface

```typescript
interface GridInterface {
    $noMargin?: boolean; // Removes padding
    $isFixed?: boolean; // Sets max-width container
    $isFullscreen?: boolean; // Sets height: 100lvh
    $isFullscreenTop?: boolean; // Sets height: 100svh
    $isCenter?: boolean; // Centers content
    $noGutter?: boolean; // Removes column gaps
}
```

## Examples

1. Basic Grid Layout

```jsx
<Grid>{/* Grid content */}</Grid>
```

2. Centered Content

```jsx
<Grid $isCenter $isFullscreen>
    <div>Centered vertically and horizontally</div>
</Grid>
```

3. Fixed Width Container

```jsx
<Grid $isFixed>{/* Fixed width container content */}</Grid>
```

4. No Gutters

```jsx
<Grid $noGutter>{/* Content with no column gaps */}</Grid>
```

## Responsive Behavior

The grid automatically adjusts based on breakpoints:

### Mobile (< 700px)

-   2 columns
-   2.4rem gutters
-   2.4rem padding

### Tablet (700px - 1024px)

-   6 columns
-   2.4rem gutters
-   2.4rem padding

### Desktop (> 1024px)

-   12 columns
-   3.6rem gutters
-   1.8rem padding (half of gutter)

## Implementation Details

index.ts

```typescript
// Pre-computed grid templates for better performance
const mobileGrid = `repeat(${columns?.mobile}, 1fr)`;
const mediumGrid = `repeat(${columns?.tablet}, 1fr)`;
const largeGrid = `repeat(${columns?.desktop}, 1fr)`;

// Base styles to reduce recalculation
const baseGridStyles = css`
    display: grid;
    margin: 0 auto;
    width: 100%;
`;

// Helper function for gutter calculation
const getGutter = (noGutter: boolean, size: string) => (noGutter ? '0' : size);

export const Grid = styled(Waffl)(
    (props: GridInterface) => css`
        ${baseGridStyles}
        grid-template-columns: ${mobileGrid};
        column-gap: ${getGutter(props.$noGutter, small)};
        padding-left: ${small};
        padding-right: ${small};
        max-width: ${props.$isFixed ? maxSize : 'none'};

        ${bp.medium`
            grid-template-columns: ${mediumGrid};
            column-gap: ${getGutter(props.$noGutter, medium)};
            padding-left: ${medium};
            padding-right: ${medium};
        `}

        ${bp.large`
            grid-template-columns: ${largeGrid};
            column-gap: ${getGutter(props.$noGutter, large)};
            padding-left: calc(${large} / 2);
            padding-right: calc(${large} / 2);
        `}

        ${props.$noMargin &&
        css`
            padding: 0;
        `}
        ${props.$isFullscreen &&
        css`
            height: 100lvh;
        `}
        ${props.$isFullscreenTop &&
        css`
            height: 100svh;
        `}
        ${props.$isCenter &&
        css`
            align-items: center;
            justify-content: center;
        `}
    `
);
```

## Performance Optimizations

### Pre-computed Values

-   Grid templates are pre-computed
-   Base styles are defined once
-   Helper functions minimize runtime calculations

### Efficient Props

-   Boolean flags for features
-   Minimal prop dependencies
-   Memoized calculations where possible

## Grid Exposer Tool

For development, use the Grid Exposer to visualize the grid:

```jsx
<GridExposer />
```

## Best Practices

1. Container Usage

```jsx
// Preferred: Fixed container for content
<Grid $isFixed>
  <Content />
</Grid>

// Full-width sections
<Grid>
  <FullWidthContent />
</Grid>
```

2. Responsive Design

```jsx
// Use breakpoint-specific column spans
<Grid>
    // Div has to be a semantic element from Tackl, this can be any semantic element
    <Div $small="1/3" $medium="1/7" $large="1/13">
        Responsive column
    </Div>
</Grid>
```

3. Nesting Grids

```jsx
// Proper grid nesting
<Grid $isFixed>
    <Div $small="1/3" $medium="1/7" $large="1/13">
        <Grid $noMargin>
            <NextedDiv $small="1/3" $medium="1/7" $large="1/13" />
        </Grid>
    </Div>
</Grid>
```

## Common Issues

### Understanding Grid Columns

_Writing CSS Grid columns can be confusing - use the Grid Exposer tool to visualize the grid and help with debugging_

The grid system uses CSS Grid with a fraction-based column system that adapts across breakpoints:

-   **Phone (2 columns)**: `1/3` spans 2 columns on mobile
-   **Tablet (6 columns)**: `1/7` spans 6 columns on tablet
-   **Desktop (12 columns)**: `1/13` spans 12 columns on desktop

_When using CSS Grid columns:_

-   The first number represents the starting column (1-based index)
-   The second number represents the ending column + 1

For example, `grid-column: 2 / 4` means:

-   Start at column 2
-   Span through column 3 (end before column 4)

This is why our fraction notation uses `1/3` to span 2 columns - it starts at column 1 and ends before column 3.

### Overflow Issues

-   Use `$noMargin` for nested grids
-   Check content padding/margins
-   Verify responsive behavior

### Alignment Problems

-   Use $isCenter for vertical/horizontal centering
-   Check parent container height for vertical centering
-   Verify grid column configuration

## Performance

-   Minimize grid nesting
-   Use pre-computed values
-   Avoid unnecessary re-renders

For more examples and advanced usage, refer to the Storybook documentation or component examples in the codebase.
