// Imports
// ------------
import type { ElementType } from 'react';

// Interfaces
// ------------
import type * as I from './interface';
import { splitSpans } from './spans';

// Component
// ------------
// NOTE • A grid child with responsive spans — only meaningful as a direct
// child of <Grid>. Pick the tag with `as` (a div by default):
//   <Col as='article' $m='2/6' $l='3/9'>…</Col>
// Children that span the full width don't need Col at all.
const Col = <T extends ElementType = 'div'>({ as, style, ...props }: I.ColProps<T>) => {
	// Derived
	const Tag: ElementType = as ?? 'div';
	const { spans, rest } = splitSpans(props);

	// Render
	return <Tag style={{ ...spans, ...style }} {...rest} />;
};

// Exports
// ------------
Col.displayName = 'Col';
export default Col;
