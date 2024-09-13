// @ts-nocheck
// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp } from '../tackl';
import { theme } from '../';

// Interfaces
// ------------
interface GridInterface {
	theme?: any;
	/** This will get rid of all gutters in your grid */
	$noGutter?: boolean;
	/** This will get rid of all side-padding in your grid */
	$noPadding?: boolean;
	/** This provides extra padding on mobile equal to your gutter size */
	$noMpad?: boolean;
	/** @defaultValue `12` – This defines how many columns are available on desktop */
	$cols?: number;
	/** @defaultValue `2` – This defines how many columns are available on mobile */
	$mcols?: number;
	/** @defaultValue `6` – This defines how many columns are available on tablet */
	$tcols?: number;
	/** This will make your grid fullscreen (100vh) with mobile 100vh fixes */
	$isFullscreen?: boolean;
	/** This will make your grid fixed width based on your theme settings (1440px) */
	$isFixed?: boolean;
	/** This will center your grid items vertically */
	$isCenter?: boolean;
}

// Defines column count for desktop
const colCount = (props: GridInterface) => (props.cols ? props.cols : 12);

// Mobile + tablet Column Count
const mobileColCount = (props: GridInterface) =>
	props.$mcols ? props.mcols : 2;
const tabletColCount = (props: GridInterface) =>
	props.$tcols ? props.tcols : 6;

// Defines No Padding
const noPad = (props: GridInterface) =>
	props.$noPadding ? 0 : `calc(${theme.grid.gutter.large} / 2)`;

const noPadMobile = (props: GridInterface) =>
	props.$noPadding ? 0 : theme.grid.gutter.small;

// Defines mobile padding
const noMpad = (props: GridInterface) =>
	props.$noMpad ? noPadMobile : theme.grid.gutter.small;

// Exports
// ------------
/**
 * @name Waffl 2.0
 *
 * @param noGutter - This will get rid of all gutters in your grid
 * @param noPadding - This will get rid of all side-padding in your grid
 * @param noMpad - This provides extra padding on mobile equal to your gutter size
 * @param mcols - This defines how many columns are available on mobile
 * @param tcols - This defines how many columns are available on tablet
 * @param cols - This defines how many columns are available on desktop
 * @param isFullscreen - Makes the grid fullscreen in height
 * @param isFixed - Makes your grid a fixed width based on theme.js
 * @param isCenter - This will center your grid items vertically
 *
 * @important Children must be a semantic imported from tackl
 */

export const Grid = styled.div(
	(props: GridInterface) => css`
		display: grid;
		align-items: ${props.$isCenter ? 'center' : 'stretch'};
		justify-content: ${props.$isCenter ? 'center' : 'stretch'};
		max-width: ${props.$isFixed ? theme.grid.maxSize : '100%'};
		gap: ${props.$noGutter ? 0 : theme.grid.gutter.small};
		grid-template-columns: repeat(${mobileColCount}, 1fr);
		padding: 0 ${noMpad};
		margin: 0 auto;

		${bp.medium`
            grid-template-columns: repeat(${tabletColCount}, 1fr);
        `}

		${bp.large`
            gap: ${props.$noGutter ? 0 : theme.grid.gutter.large};
            grid-template-columns: repeat(${colCount}, 1fr);
            padding: 0 ${noPad};
        `}

		/* NOTE • Make Grid Fullscreen */
		${props.$isFullscreen &&
		css`
			${theme.vhs}

			${bp.large` height: 100vh; `}
		`}

		${props.$isBottom &&
		css`
			align-items: end;
		`}
	`
);
