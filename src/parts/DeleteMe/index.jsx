'use client';

// Imports
// ------------
import React from 'react';
import PropTypes from 'prop-types';

// Styles
// ------------
import { Jacket, Pulse } from './styles';

/**
 * DeleteMe Component
 *
 * A sample component that demonstrates proper React component structure.
 * Shows a logo with a pulsing animation effect.
 *
 * @component
 * @example
 * return (
 *   <DeleteMe
 *     logoSrc="./logo.svg"
 *     logoAlt="Company Logo"
 *     pulseCount={2}
 *   />
 * )
 */

// Component
// ------------
const DeleteMe = ({
	logoSrc = './logo.svg',
	logoAlt = 'Tackl Logo',
	pulseCount = 2,
}) => {
	// Create pulse elements based on count
	const pulseElements = Array.from({ length: pulseCount }, (_, i) => (
		<span key={i} />
	));

	return (
		<Jacket>
			<picture>
				<img src={logoSrc} alt={logoAlt} />
			</picture>

			<Pulse>{pulseElements}</Pulse>
		</Jacket>
	);
};

// Prop Types
// ------------
DeleteMe.propTypes = {
	/** Source URL for the logo image */
	logoSrc: PropTypes.string,
	/** Alt text for the logo image */
	logoAlt: PropTypes.string,
	/** Number of pulse elements to render */
	pulseCount: PropTypes.number,
};

// Exports
// ------------
export default DeleteMe;
