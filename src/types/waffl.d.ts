// NOTE • The waffl grid renders as a custom <waffl-grid> tag (a plain named
// element — no JS custom element is registered). Declaring it here gives the
// tag full JSX/styled-components typing.
import type * as React from 'react';

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements {
			'waffl-grid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
		}
	}
}
