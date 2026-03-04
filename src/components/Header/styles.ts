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
		--offset: ${getGap('uber')};
		--expanded: calc(100vw - var(--offset));
		--collapsed: 13rem;
		--ease: ${getEase('bezzy4')};

		position: fixed;
		z-index: 998;
		top: calc(var(--offset) / 2);
		left: calc(var(--offset) / 2);

		display: flex;
		justify-content: space-between;
		align-items: center;

		padding-inline: ${getGap('m')} 0;
		width: var(${$isModalOpen ? '--collapsed' : '--expanded'});
		height: ${getGap('huge')};

		background: ${getGlobal('luxuryWhite', 10)};
		backdrop-filter: blur(1.6rem);
		border-radius: ${getRadius('s')};
		overflow: hidden;

		transform: translateY(-200%);
		opacity: 0;
		will-change: width, transform;

		
		${
			$isLoaderFinished &&
			css`
				transform: translateY(0);
				opacity: 1;
				transition: opacity 2s var(--ease), transform 1.5s var(--ease), width 1.2s var(--ease);
			`
		}
	`
);
