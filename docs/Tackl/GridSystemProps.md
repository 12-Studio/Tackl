# Grid Span Props

The span props — `$s`, `$sm`, `$m`, `$l`, `$xl`, `$xxl`, `$huge`, `$uber` — position a child inside a [Waffl grid](./WafflGrid.md). They're accepted by two components:

- **`<Col>`** (`import { Col } from '@waffl'`) — the grid child. See [Col & spacing attributes](./SemanticComponents.md).
- **`<Grid>`** (from `@waffl`) — so a grid can itself sit inside another grid.

Under the hood each prop sets an internal `--col-{breakpoint}` custom property (never set these yourself); the `waffl-grid` rules in `src/css/global.scss` turn those into `grid-column` at the matching breakpoint.

## Breakpoints

| Prop | From | Grid columns |
| --- | --- | --- |
| `$s` | 0px (base) | 2 |
| `$sm` | 390px | 2 |
| `$m` | 700px | 6 |
| `$l` | 1024px | 12 |
| `$xl` | 1200px | 12 |
| `$xxl` | 1400px | 12 |
| `$huge` | 1600px | 12 |
| `$uber` | 1800px | 12 |

The props are typed from the breakpoint tokens in `src/theme/grid/index.ts` — add a breakpoint there (and run `bun run styles`) and a matching prop appears.

## Values

Every prop takes a `string` — any valid CSS `grid-column` value:

| Value | Meaning |
| --- | --- |
| `'1/-1'` | First line to last line — full width |
| `'2/6'` | Line 2 to line 6 (columns 2–5) |
| `'3/span 4'` | Start at line 3, span 4 columns |
| `'span 3'` | Span 3 columns from wherever auto-placement puts it |
| `'7/13'` | The right half of a 12-column grid |

Lines are numbered from 1, and the last line is `columns + 1` (`3` on mobile, `7` on tablet, `13` on desktop) — or `-1` at any size.

## Fallback behaviour

- A child with **no span props** spans the full width at every breakpoint.
- Each breakpoint **falls back to the one below it**: if `$l` isn't set, the child keeps its `$m` span (or `$sm`, or `$s`) at `l` and above.
- The base `$s` falls back to `1 / -1`.

So you set only the breakpoints where the layout changes:

```tsx
<Col $l='3/11'>…</Col>
// s, sm, m → full width   l and up → 3/11

<Col $m='1/4' $xl='2/6'>…</Col>
// s, sm → full   m, l → 1/4   xl and up → 2/6
```

Spans don't inherit: a child of a nested grid starts from full width regardless of its parent's spans (see [Nested grids](./WafflGrid.md#nested-grids)).

## Examples

### Content column

```tsx
import Grid, { Col } from '@waffl';

<Grid $isFixed>
	<Col as='article' className={s.content} $m='2/6' $l='4/10'>…</Col>
</Grid>
```

### Two columns from tablet up

```tsx
<Grid $isFixed>
	<Col $m='1/4' $l='1/7'>…</Col>
	<Col $m='4/7' $l='7/13'>…</Col>
</Grid>
```

Stacked full-width on mobile, side by side from 700px.

### Card row

```tsx
<Grid $isFixed className={s.cards}>
	{cards.map(card => (
		<Col as='li' key={card.id} $m='span 3' $l='span 4'>
			<Card {...card} />
		</Col>
	))}
</Grid>
```

One per row on mobile, two on tablet (3 of 6), three on desktop (4 of 12). Give the grid a `row-gap` in its module class (`.cards { row-gap: var(--grid-gutter); }`).

### Nested grid

```tsx
<Grid $isFixed>
	<Grid $l='2/12' $noMargin>
		<Col $l='1/5'>…</Col>
		<Col $l='5/11'>…</Col>
	</Grid>
</Grid>
```

## Troubleshooting

- **Span ignored** — the element must be a *direct* child of the `<waffl-grid>`. A wrapper element in between breaks it; put the span on the wrapper instead.
- **Overflowing the grid** — a line number beyond `columns + 1` at that breakpoint (e.g. `'1/13'` on the 6-column tablet grid) creates implicit columns. Use `-1` or set a span for that breakpoint.
- **Span looks wrong at one size** — remember the fallback: an unset breakpoint uses the nearest one below it. Set the breakpoint explicitly to change it.
- **A module rule overrides the span** — setting `grid-column` in an unlayered module class beats the grid layer. Leave `grid-column` out of module classes on grid children and use span props instead.
- **Need spans on another component** (a `Link`, an `Image`)? Wrap it in a `Col`, or render it with `as`: `<Col as={Link} href='/work' $m='2/6'>`.
