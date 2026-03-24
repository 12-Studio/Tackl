// @ts-nocheck
// Imports
// ------------

import { theme } from '@theme';
import styled, { css } from 'styled-components';
import { bp, Waffl } from '@/theme/tackl';
import type { GridInterface } from './interface';

// Constants
// ------------
const { columns, gutter, maxSize } = theme.grid;

// Base styles to reduce recalculation
const baseGridStyles = css`
	--grid-columns: repeat(${columns?.s}, 1fr);
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
		--grid-columns: repeat(${columns?.m}, 1fr);
		--grid-gutter: ${gutter.m};
		--grid-margin: calc(var(--grid-gutter) / 2);
	`}

	${bp.l`
		--grid-columns: repeat(${columns?.l}, 1fr);
		--grid-gutter: ${gutter.l};
		--grid-margin: calc(var(--grid-gutter) / 2);
	`}
`;

// Pre-compute all possible CSS combinations
const gridVariants = {
	noGutter: css`
		column-gap: 0;
	`,
	noMargin: css`
		padding-inline: 0;
	`,
	isFullscreen: css`
		height: 100%;
	`,
	isCenter: css`
		place-items: center;
	`,
	isFixed: css`
		max-width: ${maxSize};
	`,
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
