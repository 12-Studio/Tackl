// Imports
// ------------
import { Header } from '@tackl';
import {} from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled(Header)(
	props => css`
		position: fixed;
		z-index: 999;
		inset: 0 0 auto 0;
	`
);
