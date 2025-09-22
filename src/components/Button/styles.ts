// Imports
// ------------
import { bp, getBrand, getEase } from '@tackl';
import { bodyM } from '@tackl/type';
import Link from 'next/link';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface CHANGE_ME {}

// Exports
// ------------
export const Jacket = styled(Link)(
	props => css`
		${bodyM}
		position: relative;
		display: inline-flex;
		gap: 1.2rem;
		align-items: center;
		justify-content: flex-start;

		color: ${getBrand('bc4')};
		padding-bottom: 1rem;
		width: max-content;
		transition: all 0.75s ${getEase('bezzy')};

		&:hover {
			${bp.l`
                color: ${getBrand('bc5')};

                &:after {
                    width: calc(100% - 6rem);
                    transform: translateX(6rem);
                }

                svg {
                    stroke: ${getBrand('bc4')};
                }
            `}
		}

		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			height: 0.2rem;

			background: ${getBrand('bc4')};
			width: 3.6rem;
			transition: all 0.75s ${getEase('bezzy')};

			${bp.l`
                width: 4.8rem;
                height: 0.3rem;
            `}
		}

		svg {
			--size: 3.6rem;

			width: var(--size);
			height: var(--size);
			fill: none;
			stroke: ${getBrand('bc5')};
			stroke-width: 0.3rem;
			transition: all 0.75s ${getEase('bezzy')};

			${bp.l`
                --size: 4.8rem;
            `}
		}

		span {
			color: inherit;
		}
	`
);
