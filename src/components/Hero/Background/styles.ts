// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Div)(
	() => css`
		position: absolute;
		inset: 0;
		z-index: -1;
		mix-blend-mode: screen;

		${bp.l` mix-blend-mode: normal; `}

		.unicorn {
			position: absolute !important;
			inset: 0 auto auto 0;
		}
	`
);
