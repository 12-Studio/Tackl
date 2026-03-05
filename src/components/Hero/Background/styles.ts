// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getEase } from '@tackl';

// Interfaces
// ------------
interface StylesInterface {
	$isLoaderFinished?: boolean;
	$isPageLoaded?: boolean;
	$isModalOpen?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	({ $isLoaderFinished, $isModalOpen }) => css`
		--speed: 1s;
		--ease: ${getEase('bezzy2')};
		--scale: 2;

		position: absolute;
		inset: 0;
		z-index: -1;
		mix-blend-mode: screen;
		scale: 1;

		@keyframes scaleIn {
			from {
				scale: var(--scale);
				opacity: 0;
			}
			to {
				scale: 1;
				opacity: 1;
			}
		}

		@keyframes scaleOut {
			from {
				scale: 1;
				opacity: 1;
			}
			to {
				scale: var(--scale);
				opacity: 0;
			}
		}

		${
			$isLoaderFinished &&
			css`
			animation: scaleIn var(--speed) var(--ease) forwards;	
		`
		}

		${
			$isModalOpen &&
			css`
			animation: scaleOut var(--speed) var(--ease) forwards;
		`
		}

		${bp.l` mix-blend-mode: normal; `}

		.unicorn {
			position: absolute !important;
			inset: 0 auto auto 0;
		}
	`
);
