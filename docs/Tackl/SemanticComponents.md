# Col & Spacing Attributes

Tackl has no element-wrapper components. Tags are plain JSX elements — `<section>`, `<h1>`, `<nav>`, `<figure>` — styled with a CSS Module class. Two small pieces cover what's left:

- **`<Col>`** — a grid child with responsive spans, for the children of a [`Grid`](./WafflGrid.md) that shouldn't span the full width.
- **`data-pad` / `data-mar`** — responsive section spacing on any element, straight from the HTML.

## Plain tags first

```tsx
import s from './styles.module.scss';

<section className={s.jacket} data-pad>
	<h1 className={cx(s.title, 't-displayL')}>Heading</h1>
	<p className={s.intro}>…</p>
</section>
```

The element is whatever the markup says, accepts every HTML attribute, and works in Server Components with no client boundary. See [Writing Components](./WritingComponents.md) for the full component pattern.

## `<Col>`

`Col` (from `@tackl`) is a polymorphic grid child. It renders the tag you pick with `as` (default `div`) and turns its span props into `--col-*` custom properties that the grid reads.

```tsx
import { Col } from '@tackl';
import Grid from '@waffl';

<Grid $isFixed>
	<Col as='article' className={s.content} $m='2/6' $l='3/9'>…</Col>
	<Col as='aside' $l='9/13'>…</Col>
</Grid>
```

| Prop | Type | What it does |
| --- | --- | --- |
| `as` | any element type | The tag (or component) to render. Default `div`. |
| `$s` `$sm` `$m` `$l` `$xl` `$xxl` `$huge` `$uber` | `string` | `grid-column` value from that breakpoint up — `'2/6'`, `'1/-1'`, `'span 3'` |
| everything else | props of the chosen tag | `className`, `ref`, `id`, `aria-*`, `data-*`, event handlers… — typed for that tag |

What it renders is just the tag with a style attribute:

```tsx
<Col as='article' $m='2/6' $l='3/9'>…</Col>
// → <article style="--col-m: 2/6; --col-l: 3/9">…</article>
```

A `style` prop is merged after the spans, so you can pass your own custom properties alongside them.

**When you don't need `Col`:** every direct child of a grid spans the full width by default. A plain `<figure>` or a module-styled `<section>` is a first-class grid child — use `Col` only when a child needs a narrower span. Span values and fallback behaviour are covered in [Grid span props](./GridSystemProps.md).

## Spacing attributes

Section spacing uses the `--space-*` tokens and steps up with the viewport: `--space-s` on mobile, `--space-m` from `m` (700px), `--space-l` from `l` (1024px).

| Attribute | Applies |
| --- | --- |
| `data-pad` | `padding-top` + `padding-bottom` |
| `data-pad='top'` | `padding-top` |
| `data-pad='bottom'` | `padding-bottom` |
| `data-mar` | `margin-top` + `margin-bottom` |
| `data-mar='top'` | `margin-top` |
| `data-mar='bottom'` | `margin-bottom` |

Values combine as space-separated words — `data-mar='top bottom'`, `data-pad='block'` — and work on any element, including a `Col` or a `Grid`:

```tsx
<section data-pad>…</section>
<footer data-pad='top' data-mar='bottom'>…</footer>
<Col as='article' $l='3/11' data-pad>…</Col>
```

A bare `data-pad` renders as `data-pad="true"` in React (and `""` in plain HTML); both mean top + bottom.

The rules live in `src/css/utilities/_spacing.scss`, inside `@layer utilities`. Component modules are unlayered, so a module class always overrides them without specificity tricks.

### The same spacing in SCSS

When a component should own its spacing, use the injected mixins instead of the attribute:

```scss
.jacket {
	@include pad;          // top + bottom
	@include mar(top);     // margin-top
}
```

Sides: `block` (default), `top`, `bottom`.

## Migrating from `Div`

The polymorphic `Div` primitive and its spacing props have been removed. Map old code like this:

| Before | After |
| --- | --- |
| `import { Div } from '@tackl'` | Plain JSX tags; `import { Col } from '@tackl'` only for spanned grid children |
| `<Div as='section'>` | `<section>` |
| `<Div as='article' $m='2/6' $l='3/9'>` (in a grid) | `<Col as='article' $m='2/6' $l='3/9'>` |
| `<Div $pad>` | `<div data-pad>` |
| `<Div $padTop>` / `$padBottom` | `data-pad='top'` / `data-pad='bottom'` |
| `<Div $mar>` / `$marTop` / `$marBottom` | `data-mar` / `data-mar='top'` / `data-mar='bottom'` |
| `<Div $padTop $marBottom>` | `data-pad='top' data-mar='bottom'` |
| `styled(Div).attrs({ as: 'header' })` | `<header className={s.jacket}>` with `.jacket { … }` in `styles.module.scss` |
| `$pad` inside a styled block | `@include pad;` in the module |
| `<S.Title>` | `<h2 className={s.title}>` |
