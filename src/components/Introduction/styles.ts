// Imports
// ------------
import { H2, Section, bp, getBrand } from '@tackl';
import { headingL, headingM } from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: 100svh;
		z-index: 2;
		background: ${getBrand('bc1')};
	`
);

export const Content = styled(H2)(
	props => css`
		${headingL}

		position: relative;
		z-index: 2;
		text-align: center;

		${bp.l`
			${headingM}
		`}
	`
);
