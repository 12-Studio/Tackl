// Imports
// ------
import React from 'react';
import { Grid } from '@waffl';
import { useHotkeys } from 'react-hotkeys-hook';

// Styles
// ------
import { Jacket, Col } from './styles';

// Component
// ------
const GridExposer = () => {
	const [grid, setGrid] = React.useState(false);
	const [altColor, setAltColor] = React.useState(true);

	useHotkeys('ctrl+g', () => {
		setGrid((grid) => !grid);
	});
	useHotkeys('ctrl+f', () => {
		setAltColor((altColor) => !altColor);
	});

	const array = [...Array(12)];

	return (
		<Jacket $showGrid={grid} $altColor={altColor}>
			<Grid className="grid">
				{array.map((_, i) => (
					<Col key={i} $isMobile={i < 2} $isTablet={i < 6} $altColor={altColor}>
						<span />
					</Col>
				))}
			</Grid>
		</Jacket>
	);
};

export default GridExposer;
