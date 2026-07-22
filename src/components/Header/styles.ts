// Imports
// ------------
import { Div } from '@tackl';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'header' })(
	() => css`
		position: fixed;
		z-index: 999;
		inset: 0 0 auto 0;
	`
);
