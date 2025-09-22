// Imports
// ------------
import { bp, getBrand, getEase, Header } from '@tackl';
import { emphasis, headingM, headingXL } from '@tackl/type';
import Link from 'next/link';
import styled, { css } from 'styled-components';

// Interfaces
// ------------
interface JacketProps {
	$isTop?: boolean;
	$isUpward?: boolean;
}

interface MenuItemProps {
	$isActive?: boolean;
	$isMobileOnly?: boolean;
}

interface MobileMenuItemProps {
	$isLast?: boolean;
}

interface MobileToggleProps {
	$isOpen?: boolean;
}

interface MobileMenuProps {
	$isOpen?: boolean;
}

interface CTAProps {
	$isActive?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Header)<JacketProps>(
	props => css`
		z-index: 9999;

		position: fixed;
		inset: 0 0 auto 0;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 3.6rem;

		transform: translateY(-100%);
		transition: transform 0.25s ${getEase('bezzy2')};

		${props.$isTop &&
		css`
			transform: translateY(0%);
		`}

		${props.$isUpward &&
		css`
			transform: translateY(0%);
		`}

        ${bp.l`
            padding: 8.4rem calc(8.333vw + 1.8rem);
        `}
	`
);

export const Home = styled(Link)(
	props => css`
		display: inline-block;
	`
);

export const Menu = styled.nav(
	props => css`
		display: none;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		${bp.m` display: block; `}

		ul {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6rem;
		}
	`
);

export const MenuItem = styled.li<MenuItemProps>(
	props => css`
		position: relative;
		pointer-events: ${props.$isActive ? 'none' : 'all'};

		${props.$isMobileOnly &&
		css`
			display: none;
		`}

		&:after {
			content: '';
			position: absolute;
			inset: auto 0 0 0;
			height: 2px;
			background: ${getBrand('bc5')};

			opacity: ${props.$isActive ? 0.5 : 0};
			transform: scaleX(${props.$isActive ? 1 : 0});
			transition: ${getEase('ease')};
		}

		&:hover {
			&:after {
				opacity: 1;
				transform: scaleX(1);
			}
		}

		a {
			${emphasis}
			position: relative;
			color: transparent;
			transition: ${getEase('ease')};
			overflow: hidden;
			padding-bottom: 0.6rem;

			&:before,
			&:after {
				content: attr(data-label);
				position: absolute;
				top: 0;
				left: 0;
				color: ${getBrand('bc5')};
				transition: ${props.theme.easing.ease};
			}

			&:before {
				transform: translateY(0%) skewY(0deg);
			}

			&:after {
				transform: translateY(120%) skewY(-12deg);
			}

			&:hover {
				&:before,
				&:after {
					opacity: 0.6;
				}
				&:before {
					transform: translateY(-120%) skewY(12deg);
				}
				&:after {
					transform: translateY(0%) skewY(0deg);
				}
			}
		}
	`
);

export const CTA = styled(Link)<CTAProps>(
	props => css`
		${emphasis}
		position: relative;
		color: transparent;
		transition: ${props.theme.easing.ease};
		overflow: hidden;
		border-bottom: 2px solid ${getBrand('bc5', props.$isActive ? 50 : 100)};
		padding-bottom: 0.6rem;
		display: none;

		${bp.m` display: block; `}

		&:before,
        &:after {
			content: attr(data-label);
			position: absolute;
			top: 0;
			left: 0;
			color: ${getBrand('bc5')};
			transition: ${getEase('ease')};
		}

		&:before {
			transform: translateY(0%) skewY(0deg);
		}

		&:after {
			transform: translateY(120%) skewY(-6deg);
		}

		&:hover {
			&:before,
			&:after {
				opacity: 0.6;
			}
			&:before {
				transform: translateY(-120%) skewY(6deg);
			}
			&:after {
				transform: translateY(0%) skewY(0deg);
			}
		}
	`
);

export const MobileMenuItem = styled.li<MobileMenuItemProps>(
	props => css`
		opacity: 0;
		transform: translateY(2.4rem);
		transition: all 1s ${getEase('bezzy2')};

		a {
			${headingXL}
		}

		${props.$isLast &&
		css`
			position: absolute;
			inset: auto 0 0 0;
			background: ${getBrand('bc1', 20)};

			a {
				${headingM}
				display: grid;
				place-items: center;
				height: 12rem;
				width: 100%;
			}
		`}
	`
);

export const MobileToggle = styled.button<MobileToggleProps>(
	props => css`
		position: relative;
		width: 3.6rem;
		height: 3rem;
		background: transparent;

		${bp.l` display: none; `}

		transition: all 0.5s ${getEase('bezzy2')};
		transform: rotate(${props.$isOpen ? 225 : 0}deg);

		span {
			position: absolute;
			top: 50%;
			left: 50%;

			display: block;
			width: 3.6rem;
			height: 2px;
			background: ${getBrand('bc5')};
			transition: all 0.5s ${getEase('bezzy2')};

			&:nth-child(1) {
				transform: translate(-50%, -8px) scaleX(0.6);
				transform-origin: center right;

				${props.$isOpen &&
				css`
					transform: translate(-100%, -1.9rem) scaleX(1)
						rotate(-90deg);
				`}
			}

			&:nth-child(2) {
				transform: translate(-50%, -50%);

				${props.$isOpen &&
				css`
					transform: translate(-50%, -50%);
				`}
			}

			&:nth-child(3) {
				transform: translate(-50%, 6px) scaleX(0.6);
				transform-origin: center left;

				${props.$isOpen &&
				css`
					transform: translate(0%, 1.8rem) scaleX(1) rotate(-90deg);
					opacity: 0;
				`}
			}
		}
	`
);

export const MobileMenu = styled.ul<MobileMenuProps>(
	props => css`
		position: fixed;
		z-index: 998;
		inset: 0;
		background: linear-gradient(
			180deg,
			${getBrand('bc1')} 0%,
			${getBrand('bc2')} 50%,
			${getBrand('bc3')} 100%
		);

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4.8rem;

		pointer-events: ${props.$isOpen ? 'all' : 'none'};
		transition: clip-path 1s ${getEase('bezzy2')};

		clip-path: polygon(100% 0, 100% 0%, 100% 100%, 100% 100%);

		${bp.l` display: none; `}

		${props.$isOpen &&
		css`
			clip-path: polygon(-50% 0, 100% 0%, 100% 100%, 0% 100%);

			li {
				opacity: 1;
				transform: translateY(0rem);
			}
		`}
	`
);
