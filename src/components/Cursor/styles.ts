// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getGlobal, getRadius } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------

// Exports
// ------------
export const Jacket = styled(Div)(
	() => css`
		--size: 4.8rem;

		display: none;
		position: fixed;
		z-index: 999;
		top: calc(var(--size) / 2 * -1);
		left: calc(var(--size) / 2 * -1);

		width: var(--size);
		height: var(--size);

		border: 1px solid ${getGlobal('luxuryWhite')};
		border-radius: ${getRadius('round')};
		mix-blend-mode: difference;
		pointer-events: none;

		${bp.l` display: block; `}
	`
);
