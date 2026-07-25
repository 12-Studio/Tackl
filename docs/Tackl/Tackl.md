# Tackl 3 - Website Starter Kit Documentation

## Overview

Tackl 3 is a comprehensive Next.js starter kit designed for building scalable, performant web applications. It includes a robust styling system, component library, and development tools.

## Core Features

### 1. Theme System

The theme system (`src/theme/index.ts`) provides:

-   Brand color management with alpha variations
-   Responsive breakpoints
-   Spacing scales
-   Typography settings
-   Animation easings

Raw token values are emitted once as CSS custom properties on `:root`, and the theme object exposes `var()` references to them — so tokens work identically in styled-components, plain CSS and Server Components, and can be overridden at runtime (e.g. `html[data-theme='dark']`). See [Theming.md](./Theming.md) for the full guide.

### 2. Tackl Semantic Components

Tackl provides one polymorphic semantic component with built-in styling capabilities:

#### The `Div` Component

-   `import { Div } from '@tackl'` — a properly typed `styled.div`
-   Pick the rendered tag with the `as` prop: `<Div as='section' $pad>`, `<Div as='h1' $m='2/6' $l='3/9'>`
-   In styles files, fix the tag with `styled(Div).attrs({ as: 'header' })(...)`
-   Supports responsive margin/padding props:
    -   `$marBottom`, `$marTop`, `$mar`,
    -   `$padBottom`, `$padTop`, `$pad`,
-   Supports responsive grid span props (`$s`, `$sm`, `$m`, `$l`, `$xl`, `$xxl`, `$huge`, `$uber`)
-   Accepts all normal HTML attributes (`style`, `aria-*`, event handlers, etc.) with full typing

#### Typography

-   Global text styles live in `@tackl/type` (e.g. `headlineL`, `bodyL`) and are applied via `Div` with the matching `as` tag (`as='h1'` … `as='h6'`, `as='p'`, `as='span'`)
-   Responsive font sizing
-   Consistent line heights
-   Font family management

### 3. Waffl Grid System

A flexible grid system for layout management. The styled `Grid` component (`import Grid from '@waffl'`) renders a plain `<waffl-grid>` tag — no web component, no shadow DOM — with configurable:

-   Column layouts
-   Gaps and spacing
-   Responsive behaviors
-   Full-width children by default (the `waffl-grid > :where(*)` rule in `src/css/global.css`), so plain and server-rendered elements participate without span props

### 4. Responsive Breakpoints

Built-in breakpoint utilities for consistent responsive design across your application.

### 5. Development Tools

#### Storybook Integration

-   Component development environment
-   Located in `/storybook` directory

#### Grid Exposer

Development tool for visualizing grid layout and alignment

### 6. Project Structure

Organized file structure optimized for scalability and maintainability

### 7. Custom Font Management

Tackl provides a centralized approach to managing custom fonts across your application:

#### Font Configuration

Custom fonts are defined in `/src/theme/fonts.js`:

-   Use `next/font/local` for self-hosted fonts
-   Use `next/font/google` for Google Fonts
-   Each font is configured with:
    -   Source files/weights
    -   Display strategy
    -   Preloading settings
    -   CSS variable name

Example configuration:
