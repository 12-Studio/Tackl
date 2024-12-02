// Imports
// ------
import React, { useState, useMemo, useCallback, useEffect } from 'react';
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

    // Memoize toggle handlers to prevent recreating on each render
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

    // Memoize grid columns array to prevent recreation on each render
    const gridColumns = useMemo(() => {
        return Array.from({ length: GRID_SIZE }, (_, i) => (
            <Col key={i} $isMobile={i < MOBILE_COLUMNS} $isTablet={i < TABLET_COLUMNS} $altColor={useAltColor}>
                <span />
            </Col>
        ));
    }, [useAltColor]);

    return (
        <Jacket $showGrid={isGridVisible} $altColor={useAltColor}>
            <Grid className="grid">{gridColumns}</Grid>
        </Jacket>
    );
};

export default GridExposer;
