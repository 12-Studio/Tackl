// Imports
// ------------
import Icon from '@parts/Icon';
import React from 'react';

// Styles
// ------------
import { Arrows, Jacket } from './styles';

// Component
// ------------
const ScrollButton = ({ isDown, hash }) => {
	const arrowType = isDown ? 'Down' : 'Up';

	return (
		<Jacket href={`#${hash ? hash : ''}`} $isDown={isDown}>
			<Arrows>
				<Icon type={`arrow${arrowType}`} />
				<Icon type={`arrow${arrowType}`} />
			</Arrows>
		</Jacket>
	);
};

export default React.memo(ScrollButton);
