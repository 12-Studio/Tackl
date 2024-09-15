// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section } from '@tackl';
import {} from '@tackl/type';

// Exports
// ------------
export const Jacket = styled(Section)(
	(props) => css`
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100svh;

		img {
			width: 100%;
			max-width: 12rem;
			height: auto;
		}
	`
);

export const Text = styled.h1(
	(props) => css`
		position: absolute;
		inset: auto 0 0 0;

		font-size: 1rem;
		font-family: ${props.theme.font.type.heading};
		font-weight: 600;
		text-align: center;
		letter-spacing: 1em;
		color: ${props.theme.colors.global.white};
		line-height: 1.5;
		text-transform: uppercase;

		background: ${props.theme.colors.brand.bc1};
		padding: 1.2rem;
	`
);
