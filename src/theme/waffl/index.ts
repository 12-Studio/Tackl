// @ts-nocheck
// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '../tackl';
import { theme } from '../';

// Interfaces
// ------------
interface GridInterface {
	theme?: any;
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
const { small, medium, large } = gutter;

// Pre-computed grid templates for better performance
const mobileGrid = `repeat(${columns?.mobile}, 1fr)`;
const mediumGrid = `repeat(${columns?.tablet}, 1fr)`;
const largeGrid = `repeat(${columns?.desktop}, 1fr)`;

// Base styles to reduce recalculation
const baseGridStyles = css`
	display: grid;
	margin: 0 auto;
	width: 100%;
`;

// Helper function for gutter calculation
const getGutter = (noGutter: boolean, size: string) => noGutter ? '0' : size;

export const Grid = styled(Div)(
	(props: GridInterface) => css`
		${baseGridStyles}
		grid-template-columns: ${mobileGrid};
		column-gap: ${getGutter(props.$noGutter, small)};
		padding-left: ${small};
		padding-right: ${small};
		max-width: ${props.$isFixed ? maxSize : 'none'};

		${bp.medium`
			grid-template-columns: ${mediumGrid};
			column-gap: ${getGutter(props.$noGutter, medium)};
			padding-left: ${medium};
			padding-right: ${medium};
		`}

		${bp.large`
			grid-template-columns: ${largeGrid};
			column-gap: ${getGutter(props.$noGutter, large)};
			padding-left: calc(${large} / 2);
			padding-right: calc(${large} / 2);
		`}

		${props.$noMargin && css`padding: 0;`}
		${props.$isFullscreen && css`height: 100lvh;`}
		${props.$isFullscreenTop && css`height: 100svh;`}
		${props.$isCenter && css`
			align-items: center;
			justify-content: center;
		`}
	`
);