// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, getEase } from '@tackl';

// Interfaces
// ------------
interface StylesInterface {
	$isLoaderFinished?: boolean;
	$isPageLoaded?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	({ $isLoaderFinished }) => css`
		position: absolute;
		inset: 0;
		z-index: -1;
		mix-blend-mode: screen;
		scale: 1;

		@keyframes scaleIn {
			from { scale: 2 }
			to { scale: 1 }
		}

		${
			$isLoaderFinished &&
			css`
			animation: scaleIn 1s ${getEase('bezzy3')} forwards;	
		`
		}

		${bp.l` mix-blend-mode: normal; `}

		.unicorn {
			position: absolute !important;
			inset: 0 auto auto 0;
		}
	`
);
