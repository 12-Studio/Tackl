import { forwardRef } from 'react';
import type { SVGProps } from 'react';

export const CarIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
	<svg
		data-sanity-icon
		width="1em"
		height="1em"
		viewBox="0 0 25 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		ref={ref}
		{...props}
	>
		<path
			fill="currentColor"
			d="M4.5 11.5 6.2 7h12.6l1.7 4.5H4.5Zm-.5 1.5v2.5h2v-1h11v1h2v-2.5H4Zm3.25 4.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm10.5 0a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Z"
		/>
	</svg>
));

CarIcon.displayName = 'CarIcon';
