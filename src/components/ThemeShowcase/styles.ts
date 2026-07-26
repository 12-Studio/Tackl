// Imports
// ------------

import { Div, getBrand, getFont, getGap, getGlobal, getRadius } from '@tackl';
import {
	bodyL,
	bodyS,
	captionL,
	captionS,
	displayL,
	displayS,
	headlineL,
	headlineS,
	titleL,
	titleS,
	type typeScale,
} from '@tackl/type';
import styled, { css } from 'styled-components';

// NOTE • Map every type style so specimens can render themselves with the
// real RuleSet — keys mirror typeScale
const typeStyleMap = {
	displayL,
	displayS,
	headlineL,
	headlineS,
	titleL,
	titleS,
	bodyL,
	bodyS,
	captionL,
	captionS,
};

// Exports
// ------------
export const Jacket = styled(Div).attrs({ as: 'main' })(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('uber')};
		min-height: 100vh;
		padding: ${getGap('huge')};
		background: ${getGlobal('black')};
		color: ${getGlobal('white')};
	`
);

export const Block = styled(Div).attrs({ as: 'section' })(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('l')};
	`
);

export const BlockTitle = styled(Div).attrs({ as: 'h2' })(
	() => css`
		${headlineS}
		padding-bottom: ${getGap('s')};
		border-bottom: 1px solid ${getGlobal('white', 10)};
	`
);

export const GroupLabel = styled(Div).attrs({ as: 'h3' })(
	() => css`
		${captionL}
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: ${getBrand('c1')};
	`
);

export const RoleNote = styled(Div).attrs({ as: 'p' })(
	() => css`
		${bodyS}
		max-width: 72rem;
		color: ${getGlobal('white', 60)};
	`
);

export const SwatchGroup = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};
	`
);

export const Row = styled(Div)(
	() => css`
		display: flex;
		flex-wrap: wrap;
		gap: ${getGap('m')};
	`
);

export const SwatchCard = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('xs')};
		width: 12rem;
	`
);

export const SwatchChip = styled(Div)(
	() => css`
		height: 6rem;
		border: 1px solid ${getGlobal('white', 10)};
		border-radius: ${getRadius('s')};
	`
);

export const TokenName = styled(Div).attrs({ as: 'p' })(
	() => css`
		${captionL}
	`
);

export const TokenValue = styled(Div).attrs({ as: 'p' })(
	() => css`
		${captionS}
		font-family: ${getFont('mono')};
		color: ${getGlobal('white', 50)};
		overflow-wrap: anywhere;
	`
);

export const FontRow = styled(Div).attrs({ as: 'p' })(
	() => css`
		${titleL}
	`
);

export const SpecimenRow = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('xs')};
		padding-bottom: ${getGap('m')};
		border-bottom: 1px dashed ${getGlobal('white', 8)};
	`
);

export const Specimen = styled(Div).attrs({ as: 'p' })<{ $style: keyof typeof typeScale }>(
	({ $style }) => css`
		${typeStyleMap[$style]}
	`
);

export const Bar = styled(Div)(
	() => css`
		height: 1.6rem;
		max-width: 100%;
		border-radius: ${getRadius('xs')};
		background: ${getBrand('c1', 60)};
	`
);

export const BarRow = styled(Div)(
	() => css`
		display: flex;
		align-items: center;
		gap: ${getGap('m')};

		> p {
			width: 8rem;
			flex-shrink: 0;
		}
	`
);

export const RadiusBox = styled(Div)(
	() => css`
		width: 10rem;
		height: 10rem;
		border: 1px solid ${getBrand('c1')};
		background: ${getBrand('c1', 15)};
	`
);

// NOTE • Hover a chip to feel the timing/easing — duration and curve come in
// via inline style from the token values
export const MotionChip = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('xs')};
		width: 16rem;
		padding: ${getGap('s')};
		border: 1px solid ${getGlobal('white', 10)};
		border-radius: ${getRadius('m')};

		&:hover > span {
			transform: translateX(10rem);
		}

		> span {
			display: block;
			width: 2.4rem;
			height: 2.4rem;
			border-radius: ${getRadius('xs')};
			background: ${getBrand('c1')};
			transition-property: transform;
		}
	`
);
