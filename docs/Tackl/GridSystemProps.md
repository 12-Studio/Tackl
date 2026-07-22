# Grid System Props Documentation

## Overview

This document provides a comprehensive reference for all grid system props available on Tackl's polymorphic `Div` component and the `Grid` container. These props enable responsive grid layouts while maintaining semantic HTML structure (pick the rendered tag with `Div`'s `as` prop).

## Prop Categories

### 1. Responsive Grid Props
### 2. Semantic Props  
### 3. Grid Variant Props
### 4. Standard HTML Props

## Responsive Grid Props

### Breakpoint System

The grid system uses a mobile-first approach with the following breakpoints:

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

### Grid Column Props

| Prop | Breakpoint | Type | Description | Example |
|------|------------|------|-------------|---------|
| `$s` | 320px+ | `string` | Small mobile grid span | `"1/-1"` |
| `$sm` | 390px+ | `string` | Large mobile grid span | `"1/3"` |
| `$m` | 700px+ | `string` | Tablet grid span | `"2/6"` |
| `$l` | 1024px+ | `string` | Desktop grid span | `"3/9"` |
| `$xl` | 1200px+ | `string` | Large desktop grid span | `"4/10"` |
| `$xxl` | 1400px+ | `string` | Extra large grid span | `"5/11"` |
| `$huge` | 1600px+ | `string` | Huge screen grid span | `"6/12"` |
| `$uber` | 1800px+ | `string` | Ultra wide grid span | `"7/13"` |

**Full-width is the default**: children of a `Grid` span all columns automatically via the `waffl-grid > :where(*)` rule in `src/css/global.css` — you only need span props for narrower placement. Plain elements (including Server Components) get the default too.

### Grid Column Syntax

Grid column props accept CSS Grid column span syntax:

```typescript
// Basic column spans
"1/2"    // Spans 1 column
"1/3"    // Spans 2 columns  
"1/-1"   // Spans all columns (full width — the grid default, rarely needed)

// Specific column positions
"2/4"    // Starts at column 2, ends at column 4
"3/6"    // Starts at column 3, ends at column 6
"5/8"    // Starts at column 5, ends at column 8
```

### Responsive Grid Examples

```typescript
import { Div } from '@tackl';

// Mobile-first responsive design (full width on mobile by default)
<Div
    as='section'
    $m='2/6'     // Tablet: columns 2-6
    $l='3/9'     // Desktop: columns 3-9
>
    Content
</Div>

// Complex responsive layout
<Div
    as='section'
    $sm='1/2'    // Large mobile: half width
    $m='1/3'     // Tablet: one third
    $l='1/4'     // Desktop: one quarter
    $xl='1/5'    // Large desktop: one fifth
>
    Content
</Div>
```

## Semantic Props

### Margin Props

| Prop | Type | Description | CSS Property |
|------|------|-------------|--------------|
| `$marBottom` | `boolean` | Add bottom margin | `margin-bottom` |
| `$marTop` | `boolean` | Add top margin | `margin-top` |
| `$mar` | `boolean` | Add vertical margins | `margin-block` |

### Padding Props

| Prop | Type | Description | CSS Property |
|------|------|-------------|--------------|
| `$padBottom` | `boolean` | Add bottom padding | `padding-bottom` |
| `$padTop` | `boolean` | Add top padding | `padding-top` |
| `$pad` | `boolean` | Add vertical padding | `padding-block` |

### Semantic Props Implementation

```typescript
// Margin styles
const marginStyles = (props: SemanticProps) => {
    const s = theme.space.s;
    const m = theme.space.m;
    const l = theme.space.l;

    return css`
        ${props.$marBottom &&
        css`
            margin-bottom: ${s};
            ${breakpointUp.m`margin-bottom: ${m};`}
            ${breakpointUp.l`margin-bottom: ${l};`}
        `}

        ${props.$marTop &&
        css`
            margin-top: ${s};
            ${breakpointUp.m`margin-top: ${m};`}
            ${breakpointUp.l`margin-top: ${l};`}
        `}
        
        ${props.$mar &&
        css`
            margin-block: ${s};
            ${breakpointUp.m`margin-block: ${m};`}
            ${breakpointUp.l`margin-block: ${l};`}
        `}
    `;
};

// Padding styles
const paddingStyles = (props: SemanticProps) => {
    const s = theme.space.s;
    const m = theme.space.m;
    const l = theme.space.l;

    return css`
        ${props.$padBottom &&
        css`
            padding-bottom: ${s};
            ${breakpointUp.m`padding-bottom: ${m};`}
            ${breakpointUp.l`padding-bottom: ${l};`}
        `}

        ${props.$padTop &&
        css`
            padding-top: ${s};
            ${breakpointUp.m`padding-top: ${m};`}
            ${breakpointUp.l`padding-top: ${l};`}
        `}
        
        ${props.$pad &&
        css`
            padding-block: ${s};
            ${breakpointUp.m`padding-block: ${m};`}
            ${breakpointUp.l`padding-block: ${l};`}
        `}
    `;
};
```

### Semantic Props Examples

```typescript
// Margin examples
<Div as='section' $marBottom>
    Content with bottom margin
</Div>

<Div as='section' $marTop>
    Content with top margin
</Div>

<Div as='section' $mar>
    Content with vertical margins
</Div>

// Padding examples
<Div as='section' $padBottom>
    Content with bottom padding
</Div>

<Div as='section' $padTop>
    Content with top padding
</Div>

<Div as='section' $pad>
    Content with vertical padding
</Div>

// Combined semantic props
<Div as='section' $mar $pad>
    Content with both margins and padding
</Div>
```

## Grid Variant Props

### Grid Container Variants

These props belong on the `Grid` container (`import Grid from '@waffl'`):

| Prop | Type | Description | CSS Effect |
|------|------|-------------|------------|
| `$noGutter` | `boolean` | Remove column gaps | `column-gap: 0` |
| `$noMargin` | `boolean` | Remove padding-inline | `padding-inline: 0` |
| `$isFullscreen` | `boolean` | Set height to 100% | `height: 100%` |
| `$isCenter` | `boolean` | Center items | `place-items: center` |
| `$isFixed` | `boolean` | Set max-width | `max-width: ${maxSize}` |

### Grid Variant Implementation

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

### Grid Variant Examples

```typescript
import Grid from '@waffl';

// No gutters
<Grid $noGutter>
    <Div as='section' $m='1/3'>Content 1</Div>
    <Div as='section' $m='3/5'>Content 2</Div>
    <Div as='section' $m='5/7'>Content 3</Div>
</Grid>

// No margins
<Grid $noMargin>
    <Div as='section' $m='1/3'>Content 1</Div>
    <Div as='section' $m='3/5'>Content 2</Div>
</Grid>

// Fullscreen
<Grid $isFullscreen>
    <section>Full height content</section>
</Grid>

// Centered
<Grid $isCenter>
    <Div as='section' $m='2/6'>Centered content</Div>
</Grid>

// Fixed width
<Grid $isFixed>
    <Div as='section' $m='2/6'>Fixed width content</Div>
</Grid>
```

## Standard HTML Props

Because `Div` is a properly typed `styled.div`, it accepts all normal HTML attributes with full typing — nothing needs to be declared in `SemanticProps`.

### React Props

| Prop | Type | Description |
|------|------|-------------|
| `as` | `string` | HTML tag to render (`'section'`, `'h1'`, …) |
| `children` | `React.ReactNode` | React children |
| `ref` | `React.Ref<HTMLDivElement>` | React ref |
| `key` | `string \| number` | React key |

### HTML Attributes

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | HTML id attribute |
| `className` | `string` | CSS class name |
| `style` | `React.CSSProperties` | Inline style object |
| `aria-*` | `string` | Accessibility attributes |
| `onClick` | `function` | Click handler |
| `onChange` | `function` | Change handler |
| `onSubmit` | `function` | Submit handler |

For elements with tag-specific attributes (`href`, `src`, `type`, `value`, …), use the plain element (`<a>`, `<img>`, `<input>`) — inside a `Grid` it still gets the full-width default — or pass the attributes through `Div` with the matching `as` tag.

## Complete Usage Examples

### 1. Basic Grid Layout

```typescript
import { Div } from '@tackl';
import Grid from '@waffl';

<Grid>
    <Div as='section' $m='1/3' $l='1/4'>
        <Div as='h2'>Sidebar</Div>
        <Div as='p'>Sidebar content...</Div>
    </Div>

    <Div as='section' $m='3/7' $l='4/10'>
        <Div as='h1'>Main Content</Div>
        <Div as='p'>Main content...</Div>
    </Div>

    <Div as='section' $m='7/9' $l='10/13'>
        <Div as='h3'>Right Sidebar</Div>
        <Div as='p'>Right sidebar content...</Div>
    </Div>
</Grid>
```

### 2. Form Layout

```typescript
<Grid>
    <Div as='form' $m='2/6' $l='3/9'>
        <fieldset>
            <legend>Contact Form</legend>

            <label htmlFor='name'>Name</label>
            <input
                id='name'
                type='text'
                placeholder='Enter your name'
            />

            <label htmlFor='email'>Email</label>
            <input
                id='email'
                type='email'
                placeholder='Enter your email'
            />

            <button type='submit'>Submit</button>
        </fieldset>
    </Div>
</Grid>
```

### 3. Card Layout

```typescript
<Div as='section' $m='1/3' $l='1/4'>
    <Div as='article' $mar $pad>
        <Div as='header' $marBottom>
            <Div as='h3'>Card Title</Div>
        </Div>

        <Div $marBottom>
            <Div as='p'>Card description...</Div>
        </Div>

        <Div as='footer'>
            <button>Learn More</button>
        </Div>
    </Div>
</Div>
```

### 4. Responsive Navigation

```typescript
<Div as='header' $m='1/3' $l='1/4'>
    <Div as='nav'>
        <Div as='h1' $m='1/3'>Logo</Div>

        <Div $m='3/5'>
            <a href='/'>Home</a>
            <a href='/about'>About</a>
            <a href='/contact'>Contact</a>
        </Div>

        <Div $m='5/7'>
            <button>Sign In</button>
        </Div>
    </Div>
</Div>
```

## Best Practices

### 1. Grid System

- **Mobile-first**: Start with mobile layout and enhance for larger screens
- **Rely on the default**: Don't pass span props for full-width children — the grid handles that
- **Consistent spacing**: Use consistent grid spans across components
- **Semantic HTML**: Choose the appropriate `as` tag for content
- **Accessibility**: Ensure components are accessible to screen readers

### 2. Responsive Design

- **Breakpoint usage**: Use appropriate breakpoints for your design
- **Content priority**: Prioritize content for mobile devices
- **Testing**: Test across different screen sizes
- **Performance**: Optimize for mobile performance

### 3. Component Design

- **Single responsibility**: Each component should have one clear purpose
- **Reusability**: Design components to be reusable
- **Composition**: Compose complex components from simpler ones
- **Documentation**: Document component usage and props

## Troubleshooting

### 1. Common Issues

- **Grid column syntax**: Ensure correct column span syntax
- **Responsive breakpoints**: Check breakpoint values
- **Semantic HTML**: Verify the `as` tag matches the content's meaning
- **Accessibility**: Test with screen readers

### 2. Debugging Tips

- **Browser DevTools**: Use element inspector
- **Console Logging**: Add strategic logs
- **Performance Tab**: Monitor component performance
- **Accessibility Testing**: Use accessibility tools

### 3. Performance Issues

- **Re-renders**: Optimize component updates
- **CSS Performance**: Use efficient CSS selectors
- **Bundle Size**: Monitor component bundle size
- **Loading Performance**: Optimize component loading

## Conclusion

The grid system props in Tackl provide a powerful and flexible way to create responsive layouts while maintaining semantic HTML structure through the polymorphic `Div` component. By understanding these props and their usage patterns, developers can build complex, accessible, and performant web applications.

For more specific implementation details, refer to the Waffl Grid System documentation and the Semantic Components guide.
