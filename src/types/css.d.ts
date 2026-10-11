// NOTE • Lets style objects carry CSS custom properties with full typing —
// e.g. <Col> writes style={{ '--col-m': '2/6' }} — without casts
import 'react';

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number | undefined;
	}
}
