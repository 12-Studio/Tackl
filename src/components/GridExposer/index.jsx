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
 * - GRID_SIZE: Total number of columns (12)
 * - MOBILE_COLUMNS: Number of columns for mobile view (2)
 * - TABLET_COLUMNS: Number of columns for tablet view (6)
 */

// Imports
// ------
import React, { useState, useCallback, useEffect } from 'react';
import { Grid } from '@waffl';

// Styles
// ------
import { Jacket, Col } from './styles';

// Constants
// ------
const GRID_SIZE = 12;
const MOBILE_COLUMNS = 2;
const TABLET_COLUMNS = 6;

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
        const handleKeyDown = e => {
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
        <Col key={i} $isMobile={i < MOBILE_COLUMNS} $isTablet={i < TABLET_COLUMNS} $altColor={useAltColor}>
            <span />
        </Col>
    ));

    return (
        <Jacket $showGrid={isGridVisible} $altColor={useAltColor}>
            <Grid className="grid">{gridColumns}</Grid>
        </Jacket>
    );
};

export default GridExposer;
