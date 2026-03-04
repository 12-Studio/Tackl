// Imports
// ------------
import styled, { css } from 'styled-components';
import { Div } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Div)(
	() => css`
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%) rotate(90deg);
		width: 240rem;
		aspect-ratio: 48/27;
		overflow: visible;

		video {	
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
			
		}
	`
);
