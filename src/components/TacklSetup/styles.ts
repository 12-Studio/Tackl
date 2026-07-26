// Imports
// ------------

import { bp, Div, getBrand, getEase, getFeedback, getFont, getGap, getGlobal, getRadius, getTime } from '@tackl';
import { bodyS, captionL, displayS, headlineS } from '@tackl/type';
import styled, { css } from 'styled-components';

// Exports
// ------------
// NOTE • Fullscreen takeover — a scroll-snap slider (one slide per screen)
// with a persistent footer nav. Swiping and the buttons both work.
export const Jacket = styled(Div).attrs({ as: 'section' })(
	() => css`
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		background:
			radial-gradient(70% 90% at 50% 120%, ${getBrand('bc1', 25)}, transparent),
			${getGlobal('black')};
	`
);

export const Slider = styled(Div)(
	() => css`
		flex: 1;
		overflow: hidden;
	`
);

// NOTE • GSAP translates this track between slides (see goTo in index.tsx)
export const Track = styled(Div)(
	() => css`
		display: flex;
		height: 100%;
		will-change: transform;
	`
);

export const Slide = styled(Div)<{ $center?: boolean }>(
	({ $center }) => css`
		flex: 0 0 100%;
		display: flex;
		flex-direction: column;
		${$center ? 'justify-content: center;' : ''}
		gap: ${getGap('l')};
		width: 100%;
		height: 100%;
		overflow-y: auto;
		scroll-snap-align: start;
		padding: ${getGap('xl')};

		${bp.l` padding: ${getGap('huge')}; `}
	`
);

export const Footer = styled(Div).attrs({ as: 'footer' })(
	() => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: ${getGap('m')};
		padding: ${getGap('m')} ${getGap('xl')};

		border-top: 1px solid ${getGlobal('white', 8)};
		background: ${getGlobal('black', 40)};

		${bp.l` padding-inline: ${getGap('huge')}; `}
	`
);

export const Panel = styled(Div)<{ $center?: boolean }>(
	({ $center }) => css`
		display: flex;
		flex-direction: column;
		${$center ? 'justify-content: center;' : ''}
		gap: ${getGap('l')};
		width: 100%;
		min-height: 100svh;
		padding: ${getGap('xl')};

		${bp.l` padding: ${getGap('huge')}; `}
	`
);

// NOTE • Sections sit side by side as columns from bp.l — a whole step reads
// left to right instead of one long stack
export const Content = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: ${getGap('l')};
		width: 100%;

		${bp.l`
			flex-direction: row;
			align-items: stretch;
		`}
	`
);

export const Kicker = styled(Div).attrs({ as: 'p' })(
	() => css`
		${bodyS}
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: ${getBrand('bc1')};
	`
);

export const Title = styled(Div).attrs({ as: 'h1' })(
	() => css`
		${displayS}
	`
);

export const StepTitle = styled(Div).attrs({ as: 'h2' })(
	() => css`
		${headlineS}
	`
);

export const Intro = styled(Div).attrs({ as: 'p' })(
	() => css`
		${bodyS}
		max-width: 64rem;
		color: ${getGlobal('white', 60)};

		code {
			font-family: ${getFont('mono')};
			color: ${getGlobal('white', 80)};
		}
	`
);

export const Progress = styled(Div).attrs({ as: 'p' })(
	() => css`
		${bodyS}
		color: ${getGlobal('white', 40)};
	`
);

export const Section = styled(Div).attrs({ as: 'fieldset' })(
	() => css`
		display: flex;
		flex: 1 1 0;
		flex-direction: column;
		gap: ${getGap('s')};
		margin: 0;
		min-width: 0;
		min-inline-size: auto;
		padding: ${getGap('m')};

		border: 1px solid ${getGlobal('white', 8)};
		border-radius: ${getRadius('m')};
		background: ${getGlobal('white', 3)};

		/* NOTE • A lone section shouldn't stretch across the whole screen */
		&:only-child {
			max-width: 64rem;
		}
	`
);

export const SectionTitle = styled(Div).attrs({ as: 'legend' })(
	() => css`
		${captionL}
		float: left;
		width: 100%;
		margin-bottom: ${getGap('xs')};
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: ${getBrand('bc1')};
	`
);

export const Row = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('xs')};

		& + & {
			margin-top: ${getGap('s')};
			padding-top: ${getGap('s')};
			border-top: 1px dashed ${getGlobal('white', 8)};
		}
	`
);

export const RowLabel = styled(Div).attrs({ as: 'p' })(
	() => css`
		${bodyS}
		color: ${getGlobal('white', 40)};
	`
);

// NOTE • Fields stack vertically inside their section; the sections sit side
// by side on the fullscreen slide (see Content)
export const Fields = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('m')};
	`
);

export const Field = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('xs')};
	`
);

export const Label = styled.label(
	() => css`
		${bodyS}
		color: ${getGlobal('white', 80)};
	`
);

export const LabelRow = styled(Div)(
	() => css`
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: ${getGap('s')};
	`
);

export const RemoveButton = styled.button(
	() => css`
		${bodyS}
		border: none;
		background: none;
		color: ${getFeedback('negative')};
		cursor: pointer;
		transition: opacity ${getTime('s')} ${getEase('bezzy')};

		&:hover {
			opacity: 0.7;
		}
	`
);

export const ColorRow = styled(Div)(
	() => css`
		display: flex;
		align-items: center;
		gap: ${getGap('s')};
	`
);

export const Swatch = styled.input.attrs({ type: 'color' })(
	() => css`
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		padding: 0;
		border: 1px solid ${getGlobal('white', 15)};
		border-radius: ${getRadius('s')};
		background: none;
		cursor: pointer;

		&::-webkit-color-swatch-wrapper {
			padding: 0.3rem;
		}

		&::-webkit-color-swatch {
			border: none;
			border-radius: ${getRadius('xs')};
		}
	`
);

export const Input = styled.input<{ $hasError?: boolean }>(
	({ $hasError }) => css`
		${bodyS}
		width: 100%;
		padding: ${getGap('s')} ${getGap('sm')};

		border: 1px solid ${$hasError ? getFeedback('negative') : getGlobal('white', 15)};
		border-radius: ${getRadius('s')};
		background: ${getGlobal('black', 40)};
		color: ${getGlobal('white')};
		transition: border-color ${getTime('s')} ${getEase('bezzy')};

		&:focus {
			outline: none;
			border-color: ${getBrand('bc1')};
		}
	`
);

export const Select = styled.select(
	() => css`
		${bodyS}
		width: 100%;
		padding: ${getGap('s')} ${getGap('sm')};

		border: 1px solid ${getGlobal('white', 15)};
		border-radius: ${getRadius('s')};
		background: ${getGlobal('black', 40)};
		color: ${getGlobal('white')};
		transition: border-color ${getTime('s')} ${getEase('bezzy')};

		&:focus {
			outline: none;
			border-color: ${getBrand('bc1')};
		}

		option {
			background: ${getGlobal('black')};
		}
	`
);

export const Upload = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};
		max-width: 64rem;
		padding: ${getGap('m')};

		border: 1px dashed ${getGlobal('white', 15)};
		border-radius: ${getRadius('m')};
	`
);

export const UploadTitle = styled(Div).attrs({ as: 'h3' })(
	() => css`
		${captionL}
	`
);

export const UploadRow = styled(Div)(
	() => css`
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: ${getGap('s')};

		> input[type='text'],
		> input:not([type]) {
			flex: 1 1 18rem;
		}
	`
);

export const FileInput = styled.input.attrs({ type: 'file' })(
	() => css`
		${bodyS}
		flex: 1 1 18rem;
		color: ${getGlobal('white', 80)};

		&::file-selector-button {
			${bodyS}
			margin-right: ${getGap('s')};
			padding: ${getGap('xs')} ${getGap('sm')};
			border: 1px solid ${getGlobal('white', 20)};
			border-radius: ${getRadius('round')};
			background: none;
			color: ${getGlobal('white', 80)};
			cursor: pointer;
		}
	`
);

export const UploadHint = styled(Div).attrs({ as: 'p' })(
	() => css`
		${bodyS}
		color: ${getFeedback('positive')};

		code {
			font-family: ${getFont('mono')};
		}
	`
);

export const ErrorText = styled(Div).attrs({ as: 'p' })(
	() => css`
		${bodyS}
		color: ${getFeedback('negative')};
	`
);

export const Nav = styled(Div)(
	() => css`
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: ${getGap('m')};
	`
);

const buttonBase = css`
	${captionL}
	padding: ${getGap('sm')} ${getGap('l')};
	border-radius: ${getRadius('round')};
	cursor: pointer;
	transition:
		background ${getTime('s')} ${getEase('bezzy')},
		border-color ${getTime('s')} ${getEase('bezzy')},
		opacity ${getTime('s')} ${getEase('bezzy')};

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
`;

export const Primary = styled.button(
	() => css`
		${buttonBase}
		border: 1px solid ${getBrand('bc1')};
		background: ${getBrand('bc1')};
		color: ${getGlobal('white')};

		&:hover:not(:disabled) {
			background: ${getBrand('bc1', 80)};
		}
	`
);

export const Ghost = styled.button(
	() => css`
		${buttonBase}
		border: 1px solid ${getGlobal('white', 20)};
		background: none;
		color: ${getGlobal('white', 80)};

		&:hover:not(:disabled) {
			border-color: ${getGlobal('white', 50)};
		}
	`
);

export const ReviewGroup = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('s')};
		padding-top: ${getGap('m')};
		border-top: 1px solid ${getGlobal('white', 10)};
	`
);

export const ReviewHeader = styled(Div)(
	() => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: ${getGap('m')};
	`
);

export const ReviewTitle = styled(Div).attrs({ as: 'h3' })(
	() => css`
		${captionL}
	`
);

export const ReviewBlock = styled(Div)(
	() => css`
		display: flex;
		flex-direction: column;
		gap: ${getGap('xs')};
	`
);

export const ReviewSection = styled(Div).attrs({ as: 'h4' })(
	() => css`
		${bodyS}
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: ${getBrand('bc1', 80)};
	`
);

export const ReviewList = styled(Div).attrs({ as: 'dl' })(
	() => css`
		display: grid;
		grid-template-columns: 1fr;
		gap: ${getGap('xs')} ${getGap('m')};

		${bp.m` grid-template-columns: repeat(2, 1fr); `}
	`
);

export const ReviewItem = styled(Div)(
	() => css`
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: ${getGap('s')};
	`
);

export const ReviewTerm = styled(Div).attrs({ as: 'dt' })(
	() => css`
		${bodyS}
		color: ${getGlobal('white', 60)};
	`
);

export const ReviewValue = styled(Div).attrs({ as: 'dd' })(
	() => css`
		${bodyS}
		display: flex;
		align-items: center;
		gap: ${getGap('xs')};
		text-align: right;
		overflow-wrap: anywhere;
	`
);

export const ReviewSwatch = styled.span(
	() => css`
		flex-shrink: 0;
		width: 1.2rem;
		height: 1.2rem;
		border: 1px solid ${getGlobal('white', 20)};
		border-radius: ${getRadius('xs')};
	`
);
