// Imports
// ------------
import styled, { css } from 'styled-components';
import { Div, getBrand, getGap, getGlobal } from '@/theme/tackl';
import { captionL, displayL } from '@/theme/tackl/type';

// Exports
// ------------
export const Jacket = styled(Div)(
	() => css`
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: ${getGap('m')};
		height: 100svh;
		overflow: hidden;

		background:
			radial-gradient(60% 80% at 50% 110%, ${getBrand('bc1', 30)}, transparent),
			${getGlobal('black')};
	`
);

export const Title = styled(Div).attrs({ as: 'h1' })(
	() => css`
		${displayL}
	`
);

export const Hint = styled(Div).attrs({ as: 'p' })(
	() => css`
		${captionL}
		color: ${getGlobal('white', 60)};
	`
);
