# Tackl CLI

The ultimate Next.js starter kit with Waffl Grid system.

## Installation

```bash
pnpm add -g tackl
```

## Usage

```bash
tackl my-app
```

### Options

- `--ref <branch>` - Template ref (branch or tag) (default: main)
- `--no-install` - Skip dependency installation
- `--no-git` - Skip git initialization
- `--help` - Show help message

### Examples

```bash
# Create a new project
tackl my-app

# Create with specific branch
tackl my-app --ref develop

# Skip installation and git
tackl my-app --no-install --no-git
```

## What's Included

- ⚡ **Next.js 15** with App Router
- 🎨 **Waffl Grid System** - Responsive grid with smart breakpoint inheritance
- 🎭 **Styled Components** - CSS-in-JS with TypeScript
- 🎬 **GSAP** - Professional animations
- 📱 **Responsive Design** - Mobile-first approach
- 🔧 **TypeScript** - Full type safety
- 🎯 **Performance** - Optimized for speed
- 📦 **Modern Tooling** - ESLint, Prettier, Husky

## Features

### Waffl Grid System

- Smart breakpoint inheritance (only specify what changes!)
- Responsive grid columns
- Semantic components
- CSS custom properties

### Example Usage

```jsx
<Waffl>
	<Section $s='1/-1' $l='3/9'>
		// Mobile: full width, Desktop: 3/9 // Tablet inherits mobile (full
		width) Content
	</Section>
</Waffl>
```

## Repository

- **GitHub**: https://github.com/12-studio/tackl
- **Issues**: https://github.com/12-studio/tackl/issues

## License

MIT
