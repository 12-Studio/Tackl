'use client';

// Imports
// ------------

import Section from './Section';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const Parallax = ({ parallaxSections }: I.ParallaxProps) => {
	return (
		<>
			{parallaxSections.map(({ id, heading, desc, image }) => (
				<Section key={id} heading={heading} desc={desc} image={image} />
			))}
		</>
	);
};

// Exports
// ------------
Parallax.displayName = 'Parallax';
export default Parallax;
