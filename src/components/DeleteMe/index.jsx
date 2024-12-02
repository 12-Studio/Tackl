'use client';

// Imports
// ------------
import React from 'react';
import PropTypes from 'prop-types';

// Styles
// ------------
import { Jacket, Pulse } from './styles';

// Component
// ------------
const DeleteMe = ({ logoSrc = './logo.svg', logoAlt = 'Tackl Logo' }) => {
	return (
		<Jacket>
			<picture>
				<img src={logoSrc} alt={logoAlt} />
			</picture>

			<Pulse>
				<span />
				<span />
			</Pulse>
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
};

// Exports
// ------------
export default DeleteMe;
