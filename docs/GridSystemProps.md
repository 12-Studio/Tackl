# Grid System Props Documentation

## Overview

This document provides a comprehensive reference for all grid system props available in Tackl's semantic components. These props enable responsive grid layouts while maintaining semantic HTML structure.

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

### Grid Column Syntax

Grid column props accept CSS Grid column span syntax:

```typescript
// Basic column spans
"1/2"    // Spans 1 column
"1/3"    // Spans 2 columns  
"1/-1"   // Spans all columns (full width)

// Specific column positions
"2/4"    // Starts at column 2, ends at column 4
"3/6"    // Starts at column 3, ends at column 6
"5/8"    // Starts at column 5, ends at column 8
```

### Responsive Grid Examples

```typescript
// Mobile-first responsive design
<Section 
    $s="1/-1"    // Mobile: full width
    $m="2/6"     // Tablet: columns 2-6
    $l="3/9"      // Desktop: columns 3-9
>
    Content
</Section>

// Complex responsive layout
<Section 
    $s="1/-1"    // Mobile: full width
    $sm="1/2"    // Large mobile: half width
    $m="1/3"     // Tablet: one third
    $l="1/4"     // Desktop: one quarter
    $xl="1/5"    // Large desktop: one fifth
>
    Content
</Section>
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
<Section $marBottom>
    Content with bottom margin
</Section>

<Section $marTop>
    Content with top margin
</Section>

<Section $mar>
    Content with vertical margins
</Section>

// Padding examples
<Section $padBottom>
    Content with bottom padding
</Section>

<Section $padTop>
    Content with top padding
</Section>

<Section $pad>
    Content with vertical padding
</Section>

// Combined semantic props
<Section $mar $pad>
    Content with both margins and padding
</Section>
```

## Grid Variant Props

### Waffl Grid Variants

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
// No gutters
<Waffl $noGutter>
    <Section $s="1/-1" $m="1/3">Content 1</Section>
    <Section $s="1/-1" $m="3/5">Content 2</Section>
    <Section $s="1/-1" $m="5/7">Content 3</Section>
</Waffl>

// No margins
<Waffl $noMargin>
    <Section $s="1/-1" $m="1/3">Content 1</Section>
    <Section $s="1/-1" $m="3/5">Content 2</Section>
</Waffl>

// Fullscreen
<Waffl $isFullscreen>
    <Section $s="1/-1">Full height content</Section>
</Waffl>

// Centered
<Waffl $isCenter>
    <Section $s="1/-1" $m="2/6">Centered content</Section>
</Waffl>

// Fixed width
<Waffl $isFixed>
    <Section $s="1/-1" $m="2/6">Fixed width content</Section>
</Waffl>
```

## Standard HTML Props

### React Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | React children |
| `ref` | `React.Ref<unknown>` | React ref |
| `key` | `string \| number` | React key |

### HTML Attributes

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | HTML id attribute |
| `className` | `string` | CSS class name |
| `onClick` | `function` | Click handler |
| `onChange` | `function` | Change handler |
| `onSubmit` | `function` | Submit handler |

### Element-Specific Props

| Prop | Type | Description | Elements |
|------|------|-------------|----------|
| `href` | `string` | Link URL | `A` |
| `src` | `string` | Image source | `Img` |
| `alt` | `string` | Alt text | `Img` |
| `type` | `string` | Input type | `Input` |
| `value` | `string` | Input value | `Input` |
| `placeholder` | `string` | Input placeholder | `Input` |

## Complete Usage Examples

### 1. Basic Grid Layout

```typescript
<Waffl>
    <Section $s="1/-1" $m="1/3" $l="1/4">
        <H2 $s="1/-1">Sidebar</H2>
        <P $s="1/-1">Sidebar content...</P>
    </Section>
    
    <Section $s="1/-1" $m="3/7" $l="4/10">
        <H1 $s="1/-1">Main Content</H1>
        <P $s="1/-1">Main content...</P>
    </Section>
    
    <Section $s="1/-1" $m="7/9" $l="10/13">
        <H3 $s="1/-1">Right Sidebar</H3>
        <P $s="1/-1">Right sidebar content...</P>
    </Section>
</Waffl>
```

### 2. Form Layout

```typescript
<Form $s="1/-1" $m="2/6" $l="3/9">
    <Fieldset $s="1/-1">
        <Legend $s="1/-1">Contact Form</Legend>
        
        <Label $s="1/-1" $m="1/3" htmlFor="name">
            Name
        </Label>
        <Input 
            $s="1/-1" $m="3/5" 
            id="name" 
            type="text" 
            placeholder="Enter your name"
        />
        
        <Label $s="1/-1" $m="1/3" htmlFor="email">
            Email
        </Label>
        <Input 
            $s="1/-1" $m="3/5" 
            id="email" 
            type="email" 
            placeholder="Enter your email"
        />
        
        <Button $s="1/-1" $m="3/5" type="submit">
            Submit
        </Button>
    </Fieldset>
</Form>
```

### 3. Card Layout

```typescript
<Section $s="1/-1" $m="1/3" $l="1/4">
    <Article $s="1/-1" $mar $pad>
        <Header $s="1/-1" $marBottom>
            <H3 $s="1/-1">Card Title</H3>
        </Header>
        
        <Div $s="1/-1" $marBottom>
            <P $s="1/-1">Card description...</P>
        </Div>
        
        <Footer $s="1/-1">
            <Button $s="1/-1">Learn More</Button>
        </Footer>
    </Article>
</Section>
```

### 4. Responsive Navigation

```typescript
<Header $s="1/-1" $m="1/3" $l="1/4">
    <Nav $s="1/-1">
        <H1 $s="1/-1" $m="1/3">Logo</H1>
        
        <Div $s="1/-1" $m="3/5">
            <A $s="1/-1" $m="1/2" href="/">Home</A>
            <A $s="1/-1" $m="1/2" href="/about">About</A>
            <A $s="1/-1" $m="1/2" href="/contact">Contact</A>
        </Div>
        
        <Div $s="1/-1" $m="5/7">
            <Button $s="1/-1">Sign In</Button>
        </Div>
    </Nav>
</Header>
```

## Best Practices

### 1. Grid System

- **Mobile-first**: Start with mobile layout and enhance for larger screens
- **Consistent spacing**: Use consistent grid spans across components
- **Semantic HTML**: Choose appropriate HTML elements for content
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
- **Semantic HTML**: Verify proper HTML element usage
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

The grid system props in Tackl provide a powerful and flexible way to create responsive layouts while maintaining semantic HTML structure. By understanding these props and their usage patterns, developers can build complex, accessible, and performant web applications.

For more specific implementation details, refer to the Waffl Grid System documentation and the Semantic Components guide.
