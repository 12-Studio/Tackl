# Tackl 3 - Website Starter Kit Documentation

## Overview

Tackl 3 is a comprehensive Next.js starter kit designed for building scalable, performant web applications. It includes a robust styling system, component library, and development tools.

## Core Features

### 1. Theme System

The theme system (`src/theme/index.js`) provides:

- Brand color management with alpha variations
- Responsive breakpoints
- Spacing scales
- Typography settings
- Animation easings

### 2. Tackl Semantic Components

Tackl provides semantic HTML components with built-in styling capabilities:

#### Base Components

- Section, Div, Main, Nav, Article, Aside, Header, Footer
- Each component supports responsive margin/padding props:
  - `$marBottom`, `$marTop`, `$mar`, `$marX`, `$marY`
  - `$padBottom`, `$padTop`, `$pad`, `$padX`, `$padY`

#### Typography Components

- H1 through H6, P, Em, Span
- Responsive font sizing
- Consistent line heights
- Font family management

### 3. Waffl Grid System

A flexible grid system for layout management with configurable:

- Column layouts
- Row layouts
- Gaps and spacing
- Responsive behaviors

### 4. Responsive Breakpoints

Built-in breakpoint utilities for consistent responsive design across your application.

### 5. Development Tools

#### Storybook Integration

- Component development environment
- Currently requires `--legacy-peer-deps` for Next.js 15 compatibility
- Located in `/storybook` directory

#### Grid Exposer

Development tool for visualizing grid layout and alignment

### 6. Project Structure

Organized file structure optimized for scalability and maintainability
