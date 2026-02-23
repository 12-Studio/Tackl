# Semantic Components Documentation

## Overview

Semantic Components in Tackl provide a powerful way to use semantic HTML elements with built-in grid system functionality. These components combine the accessibility and SEO benefits of semantic HTML with the flexibility of a responsive grid system.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Semantic Components System                  │
├─────────────────────────────────────────────────────────────┤
│  HTML Elements (section, div, main, etc.)                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Grid System Props ($s, $m, $l, etc.)                │ │
│  │  ┌─────────────────────────────────────────────────┐  │ │
│  │  │  Semantic Props ($mar, $pad, etc.)            │  │ │
│  │  │  ┌─────────────────────────────────────────────┐ │  │ │
│  │  │  │  Styled Components Integration            │ │  │ │
│  │  │  └─────────────────────────────────────────────┘ │  │ │
│  │  └─────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Available Components

### 1. Layout Components

```typescript
// Main layout components
export const Waffl = createSemanticComponent('waffl-grid');
export const Section = createSemanticComponent('section');
export const Div = createSemanticComponent('div');
export const Main = createSemanticComponent('main');
export const Article = createSemanticComponent('article');
export const Aside = createSemanticComponent('aside');
export const Header = createSemanticComponent('header');
export const Footer = createSemanticComponent('footer');
```

### 2. Text Components

```typescript
// Text and heading components
export const H1 = createSemanticComponent('h1');
export const H2 = createSemanticComponent('h2');
export const H3 = createSemanticComponent('h3');
export const H4 = createSemanticComponent('h4');
export const H5 = createSemanticComponent('h5');
export const H6 = createSemanticComponent('h6');
export const P = createSemanticComponent('p');
export const Span = createSemanticComponent('span');
export const Strong = createSemanticComponent('strong');
export const Em = createSemanticComponent('em');
```

### 3. Interactive Components

```typescript
// Interactive components
export const Button = createSemanticComponent('button');
export const Input = createSemanticComponent('input');
export const Label = createSemanticComponent('label');
export const Form = createSemanticComponent('form');
export const Select = createSemanticComponent('select');
export const Textarea = createSemanticComponent('textarea');
```

### 4. Media Components

```typescript
// Media components
export const Img = createSemanticComponent('img');
export const Video = createSemanticComponent('video');
export const Audio = createSemanticComponent('audio');
export const Picture = createSemanticComponent('picture');
export const Canvas = createSemanticComponent('canvas');
export const Svg = createSemanticComponent('svg');
```

## Component Creation

### 1. Semantic Component Generator

```typescript
const createSemanticComponent = (tag: string) => styled(tag)<SemanticProps>`
    ${props => semantics(props)}
    ${props => gridSemantics(props)}
`;
```

**How it works**:
- Takes an HTML tag name
- Creates a styled component with semantic props
- Applies semantic styles (margins, padding)
- Applies grid styles (responsive columns)

### 2. Props Integration

```typescript
// Semantic props are automatically applied
interface SemanticProps extends GridProps {
    children?: React.ReactNode;
    ref?: React.Ref<unknown>;
    id?: string;
    className?: string;
    
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

## Usage Examples

### 1. Basic Semantic Usage

```typescript
// Simple semantic component with grid
<Section $s="1/-1" $m="2/6" $l="3/9">
    <H1 $s="1/-1">Page Title</H1>
    <P $s="1/-1">Page content...</P>
</Section>
```

### 2. Layout with Semantic HTML

```typescript
// Complete page layout with semantic HTML
<Main $s="1/-1" $m="2/6" $l="3/9">
    <Header $s="1/-1" $m="1/3" $l="1/4">
        <H1 $s="1/-1">Site Title</H1>
        <Nav $s="1/-1">
            <A $s="1/-1" href="/">Home</A>
            <A $s="1/-1" href="/about">About</A>
        </Nav>
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

### 3. Form with Semantic Components

```typescript
// Form with semantic components
<Form $s="1/-1" $m="2/6" $l="3/9">
    <Fieldset $s="1/-1">
        <Legend $s="1/-1">Contact Information</Legend>
        
        <Label $s="1/-1" $m="1/3" $l="1/4" htmlFor="name">
            Name
        </Label>
        <Input 
            $s="1/-1" $m="3/5" $l="4/7" 
            id="name" 
            type="text" 
        />
        
        <Label $s="1/-1" $m="1/3" $l="1/4" htmlFor="email">
            Email
        </Label>
        <Input 
            $s="1/-1" $m="3/5" $l="4/7" 
            id="email" 
            type="email" 
        />
        
        <Button $s="1/-1" $m="3/5" $l="4/7" type="submit">
            Submit
        </Button>
    </Fieldset>
</Form>
```

### 4. Media with Semantic Components

```typescript
// Media content with semantic components
<Article $s="1/-1" $m="2/6" $l="3/9">
    <H2 $s="1/-1">Media Article</H2>
    
    <Figure $s="1/-1" $m="1/3" $l="1/4">
        <Img $s="1/-1" src="/image.jpg" alt="Description" />
        <FigCaption $s="1/-1">Image caption</FigCaption>
    </Figure>
    
    <P $s="1/-1" $m="3/5" $l="4/7">
        Article content...
    </P>
</Article>
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

| Prop | Description |
|------|-------------|
| `children` | React children |
| `ref` | React ref |
| `id` | HTML id attribute |
| `className` | CSS class name |
| `onClick` | Click handler |
| `onChange` | Change handler |
| `href` | Link URL (for anchor tags) |
| `src` | Image source (for img tags) |
| `alt` | Alt text (for img tags) |

## Advanced Usage

### 1. Custom Styling

```typescript
// Custom styled semantic component
const CustomSection = styled(Section)`
    background-color: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.br.m};
    
    &:hover {
        transform: translateY(-2px);
    }
`;

// Usage with grid props
<CustomSection $s="1/-1" $m="2/6" $l="3/9">
    Custom styled content
</CustomSection>
```

### 2. Component Composition

```typescript
// Composing semantic components
const Card = ({ children, ...props }) => (
    <Article $s="1/-1" $m="1/3" $l="1/4" {...props}>
        {children}
    </Article>
);

const CardHeader = ({ children, ...props }) => (
    <Header $s="1/-1" {...props}>
        {children}
    </Header>
);

const CardContent = ({ children, ...props }) => (
    <Div $s="1/-1" {...props}>
        {children}
    </Div>
);

// Usage
<Card>
    <CardHeader>
        <H3 $s="1/-1">Card Title</H3>
    </CardHeader>
    <CardContent>
        <P $s="1/-1">Card content...</P>
    </CardContent>
</Card>
```

### 3. Responsive Design Patterns

```typescript
// Mobile-first responsive design
<Main $s="1/-1" $m="2/6" $l="3/9">
    {/* Mobile: stacked, Tablet: 2 columns, Desktop: 3 columns */}
    <Section $s="1/-1" $m="1/3" $l="1/4">
        <H2 $s="1/-1">Feature 1</H2>
        <P $s="1/-1">Feature description...</P>
    </Section>
    
    <Section $s="1/-1" $m="3/5" $l="4/7">
        <H2 $s="1/-1">Feature 2</H2>
        <P $s="1/-1">Feature description...</P>
    </Section>
    
    <Section $s="1/-1" $m="5/7" $l="7/10">
        <H2 $s="1/-1">Feature 3</H2>
        <P $s="1/-1">Feature description...</P>
    </Section>
</Main>
```

## Best Practices

### 1. Semantic HTML

- **Use appropriate elements**: Choose the right HTML element for the content
- **Maintain hierarchy**: Use proper heading hierarchy (H1, H2, H3, etc.)
- **Accessibility**: Ensure components are accessible to screen readers
- **SEO**: Use semantic elements for better search engine optimization

### 2. Grid System

- **Mobile-first**: Start with mobile layout and enhance for larger screens
- **Consistent spacing**: Use consistent grid spans across components
- **Responsive design**: Test across different screen sizes
- **Performance**: Use efficient grid layouts

### 3. Component Design

- **Single responsibility**: Each component should have one clear purpose
- **Reusability**: Design components to be reusable across the application
- **Composition**: Compose complex components from simpler ones
- **Documentation**: Document component usage and props

### 4. Performance

- **Efficient rendering**: Minimize unnecessary re-renders
- **CSS optimization**: Use efficient CSS selectors
- **Bundle size**: Keep component bundle size minimal
- **Loading**: Use lazy loading for heavy components

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

Semantic Components in Tackl provide a powerful way to build accessible, performant, and maintainable web applications. By combining semantic HTML with a responsive grid system, developers can create complex layouts while maintaining excellent user experience and developer experience.

For more specific implementation details, refer to the Waffl Grid System documentation and the main App Architecture guide.
