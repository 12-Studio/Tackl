// Imports
// ------------
import { bp, Button, Header, getEase, getGap, getGlobal, getRadius, getBrand } from '@tackl';
import { bodyS } from '@tackl/type';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface StylesInterface {
	type?: 'button';
	ariaLabel?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	$isModalOpen?: boolean;
	$isLoaderFinished?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Header)<StylesInterface>(
	({ $isModalOpen, $isLoaderFinished }) => css`
		--offset: ${getGap('xxl')};
		--expanded: calc(100vw - var(--offset));
		--collapsed: 13.5rem;
		--ease: ${getEase('bezzy4')};

		position: fixed;
		z-index: 997;
		top: calc(var(--offset) / 2);
		left: calc(var(--offset) / 2);

		display: flex;
		justify-content: center;
		align-items: center;
		
		width: var(--expanded);
		height: 4.8rem;

		
		border-radius: ${getRadius('s')};
		overflow: hidden;

		transform: translateY(-200%);
		opacity: 0;
		will-change: width, transform;

		${bp.l`
			--offset: ${getGap('uber')};

			background: ${getGlobal('luxuryWhite', 10)};
			backdrop-filter: blur(1.6rem);
			height: 5.6rem;
			justify-content: space-between;
			padding-inline: ${getGap('m')} 0;
		`}
		
		${
			$isLoaderFinished &&
			css`
				transform: translateY(${$isModalOpen ? -150 : 0}%);
				opacity: ${$isModalOpen ? 0 : 1};
				transition: opacity 750ms var(--ease), transform 750ms var(--ease);
				transition-delay: ${$isModalOpen ? 0 : 0.25}s;

				${bp.l`
					transform: translateY(0);
					opacity: 1;
					transition: opacity 2s var(--ease), transform 1.5s var(--ease), width 1.2s var(--ease);
				`}
			`
		}

		// Collapsed state
		${bp.l`
			z-index: 998;
			${
				$isModalOpen &&
				css`
					width: var(--collapsed);
				`
			}
		`}
	`
);
