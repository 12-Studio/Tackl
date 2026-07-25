/**
 * GridExposer Component
 * ====================
 * A development tool component that displays a visual grid overlay to help with layout and alignment.
 * The grid can be toggled on/off and color schemes can be switched using keyboard shortcuts.
 *
 * Features:
 * - Toggleable grid overlay (Ctrl + G)
 * - Switchable color schemes (Ctrl + F)
 * - Responsive grid columns for mobile, tablet and desktop
 *
 * Props:
 * None
 *
 * Keyboard Shortcuts:
 * - Ctrl + G: Toggle grid visibility
 * - Ctrl + F: Toggle color scheme
 *
 * Constants:
 * - Column counts come straight from theme.grid.columns, so the overlay
 *   always matches the real Waffl grid (same tokens drive both)
 */

import { theme } from '@theme';
// Imports
// ------
import Grid from '@waffl';
import { useCallback, useEffect, useState } from 'react';

// Styles
// ------
import { Col, Jacket } from './styles';

// Constants
// ------
// NOTE • Derived from the same tokens the Waffl grid uses — edit
// theme.grid.columns and this overlay follows
const GRID_SIZE = theme.grid.columns?.l ?? 12;
const MOBILE_COLUMNS = theme.grid.columns?.s ?? 2;
const TABLET_COLUMNS = theme.grid.columns?.m ?? 6;

// Component
// ------
const GridExposer = () => {
	// State for grid visibility and color mode
	const [isGridVisible, setIsGridVisible] = useState(false);
	const [useAltColor, setUseAltColor] = useState(true);

	// Toggle handlers
	const toggleGrid = useCallback(() => {
		setIsGridVisible(prev => !prev);
	}, []);

	const toggleColor = useCallback(() => {
		setUseAltColor(prev => !prev);
	}, []);

	// Set up keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey) {
				if (e.key === 'g') {
					e.preventDefault();
					toggleGrid();
				} else if (e.key === 'f') {
					e.preventDefault();
					toggleColor();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [toggleGrid, toggleColor]);

	// No memoization: gridColumns is created on each render
	const gridColumns = Array.from({ length: GRID_SIZE }, (_, i) => (
		<Col
			// biome-ignore lint/suspicious/noArrayIndexKey: static fixed-length column list — the index is the column's identity
			key={`col-${i}`}
			$isMobile={i < MOBILE_COLUMNS}
			$isTablet={i < TABLET_COLUMNS}
			$altColor={useAltColor}
			$col={i + 1}
		>
			<span />
		</Col>
	));

	return (
		<Jacket $showGrid={isGridVisible} $altColor={useAltColor}>
			<Grid>{gridColumns}</Grid>
		</Jacket>
	);
};

export default GridExposer;
