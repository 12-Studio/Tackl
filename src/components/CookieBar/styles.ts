// Imports
// ------------

import styled, { css } from 'styled-components';
import { bp, Div, getBrand, getEase, getGap, getGlobal, getRadius, getTime } from '@/theme/tackl';
import { captionL } from '@/theme/tackl/type';

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'aside' })(
	() => css`
		position: fixed;
		inset: auto ${getGap('l')} ${getGap('l')} ${getGap('l')};
		z-index: 12;

		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};
		padding: ${getGap('l')};

		background: ${getGlobal('white')};
		color: ${getGlobal('black')};
		border-radius: ${getRadius('l')};

		${bp.m`
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		`}

		p {
			${captionL}
		}

		> div {
			display: flex;
			align-items: center;
			gap: ${getGap('s')};
		}

		/* NOTE • Accept and Decline share one style on purpose — equal
		prominence keeps the choice genuinely free */
		button {
			${captionL}
			padding: ${getGap('s')} ${getGap('l')};
			border-radius: ${getRadius('round')};
			background: ${getBrand('c1')};
			color: ${getGlobal('white')};
			cursor: pointer;
			transition: opacity ${getTime('s')} ${getEase('bezzy')};

			&:hover {
				opacity: 0.85;
			}
		}
	`
);
