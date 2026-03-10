// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Interfaces
// ------------
type StylesInterface = {};

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
		height: 100dvh;
		overflow: scroll;
		/* iOS Safari: allow vertical touch scroll and momentum */
		touch-action: pan-y;
		-webkit-overflow-scrolling: touch;

		${bp.l`
			overflow: hidden;
		`}
	`
);

export const Content = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
	`
);
