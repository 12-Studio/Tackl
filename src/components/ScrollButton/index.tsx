// Imports
// ------------
import { GlobalContext } from '@contexts';
import Icon from '@parts/Icon';
import { use, useCallback } from 'react';

// Styles
// ------------
import { Arrows, Jacket } from './styles';

// Interfaces
// ------------
import { ScrollButtonProps } from './interface';

// Component
// ------------
const ScrollButton = ({ isDown, hash }: ScrollButtonProps) => {
	// Get lenis instance from global context
	const { lenis } = use(GlobalContext);

	// Define Arrow Type
	const arrowType = isDown ? 'Down' : 'Up';

	// Define Handle Click
	const handleClick = useCallback(() => {
		lenis?.current?.scrollTo(`#${hash}`);
	}, [lenis, hash]);

	return (
		<Jacket onClick={handleClick} $isDown={isDown}>
			<Arrows>
				<Icon type={`arrow${arrowType}`} />
				<Icon type={`arrow${arrowType}`} />
			</Arrows>
		</Jacket>
	);
};

export default ScrollButton;
