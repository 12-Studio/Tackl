// @ts-nocheck
// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Waffl } from '../tackl';
import { theme, Theme } from '../';

// Interfaces
// ------------
interface GridInterface {
	theme?: Theme;
	$noMargin?: boolean;
	$isFixed?: boolean;
	$isFullscreen?: boolean;
	$isFullscreenTop?: boolean;
	$isCenter?: boolean;
	$noGutter?: boolean;
}

// Constants
// ------------
const { columns, gutter, maxSize } = theme.grid;


// Pre-computed grid templates for better performance
const mobileGrid = `repeat(${columns?.mobile}, 1fr)`;
const mediumGrid = `repeat(${columns?.tablet}, 1fr)`;
const largeGrid = `repeat(${columns?.desktop}, 1fr)`;

// Base styles to reduce recalculation
const baseGridStyles = css`
	--grid-columns: ${mobileGrid};
    --grid-gutter: ${gutter.s};
    --grid-margin: ${gutter.s};

    display: grid;
	contain: layout;
	grid-template-columns: var(--grid-columns);
    column-gap: var(--grid-gutter);

    padding-inline: var(--grid-margin);
    margin: 0 auto;
    width: 100%;

	${bp.m`
		--grid-columns: ${mediumGrid};
		--grid-gutter: ${gutter.m};
		--grid-margin: calc(var(--grid-gutter) / 2);
	`}

	${bp.l`
		--grid-columns: ${largeGrid};
		--grid-gutter: ${gutter.l};
		--grid-margin: calc(var(--grid-gutter) / 2);
	`}
`;

// Pre-compute all possible CSS combinations
const gridVariants = {
	noGutter: css` column-gap: 0; `,
    noMargin: css` padding-inline: 0; `,
    isFullscreen: css` height: 100%; `,
	isCenter: css` place-items: center; `,
	isFixed: css` max-width: ${maxSize}; `,
};


export const Grid = styled(Waffl)<GridInterface>(
	(props: GridInterface) => css`
		${baseGridStyles}

		${props.$noGutter && gridVariants.noGutter}
		${props.$isFixed && gridVariants.isFixed}
		${props.$noMargin && gridVariants.noMargin}
		${props.$isFullscreen && gridVariants.isFullscreen}
		${props.$isCenter && gridVariants.isCenter}
	`
);

export default Grid;