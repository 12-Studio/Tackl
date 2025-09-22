// Imports
// ------------
import { Section, bp, getBrand, getSpace } from '@tackl';
import {} from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Section)(
	props => css`
		position: relative;
		z-index: 3;

		display: flex;
		flex-direction: column;
		gap: ${getSpace('s')};

		min-height: 100svh;
		background: ${getBrand('bc1')};

		${bp.l`
            gap: ${getSpace('l')};
        `}
	`
);
