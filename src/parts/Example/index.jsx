// Imports
// ------------
import React from 'react';
import PropTypes from 'prop-types';
import { useData } from './data';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Example = ({ title }) => {
	const { launchLatest } = useData();

	return (
		<Jacket>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</Jacket>
	);
};

export default Example;

// Prop Types
// ------------
Example.propTypes = {
	title: PropTypes.string.isRequired,
};
