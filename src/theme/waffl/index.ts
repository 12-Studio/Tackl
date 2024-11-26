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

// Exports
// ------------
/**
 * @name Waffl 3.0
 *
	 * @param $noMargin - This will add padding to the sides of your grid
	 * @param $isFixed - This will make your grid fixed width based on your theme settings (1440px)
	 * @param $isFullscreen - This will make your grid fullscreen (100lvh)
	 * @param $isFullscreenTop - This will make your grid fullscreen (100svh)
	 * @param $isCenter - This will center your grid items vertically & horizontally
	 * @param $noGutter - This will get rid of all gutters in your grid
 *
 * @important Children must be a semantic imported from tackl
 */

// Constants
const { columns, gutter, maxSize } = theme.grid;

// Helper Functions
const generateGridTemplate = (cols: number) => `repeat(${cols}, 1fr)`;
const generateGutter = (noGutter: boolean, size: string) => (noGutter ? 0 : size);

export const Grid = styled(Div)(
	(props: GridInterface) => css`
		display: grid;
		grid-template-columns: ${generateGridTemplate(columns.mobile)};
		column-gap: ${generateGutter(props.$noGutter, gutter.small)};

		padding-left: ${theme.grid.gutter.small};
		padding-right: ${theme.grid.gutter.small};
		margin: 0 auto;
		width: 100%;
		max-width: ${props.$isFixed ? theme.grid.maxSize : 'none'};

		${bp.medium`
			grid-template-columns: ${generateGridTemplate(columns.medium)};
			column-gap: ${generateGutter(props.$noGutter, gutter.medium)};
			padding-left: ${theme.grid.gutter.medium};
			padding-right: ${theme.grid.gutter.medium};
		`}

		${bp.large`
			grid-template-columns: ${generateGridTemplate(columns.large)};
    		column-gap: ${generateGutter(props.$noGutter, gutter.large)};
			padding-left: calc(${gutter.large} / 2);
			padding-right: calc(${gutter.large} / 2);
		`}


		/* NOTE • Side Padding for Parent Grids */
		${props.$noMargin && css`
			padding: 0;
		`}

		/* NOTE • Fullscreen */
		${props.$isFullscreen && css`
			height: 100lvh;
		`}

		${props.$isFullscreenTop && css`
			height: 100svh;
		`}

		/* NOTE • Center Content */
		${props.$isCenter && css`
			align-items: center;
			justify-content: center;
		`}

	`
);