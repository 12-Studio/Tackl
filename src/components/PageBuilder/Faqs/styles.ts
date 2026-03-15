// Imports
// ------------
import styled, { css } from 'styled-components';
import {
	bp,
	Section,
	Div,
	getBrand,
	getGlobal,
	getEase,
	getGap,
	getRadius,
	H2,
	P,
	List,
	Aside,
} from '@tackl';
import { bodyL, headlineS, titleS } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$amountOfFaqs?: number;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	() => css`
      position: relative;
      overflow: clip;

      > .frame {
        position: absolute;
        z-index: 2;

        &.top {
          top: var(--mobile-pad);

          ${bp.l`
            top: ${getGap('sm')};
          `}
        }

        &.bottom {
          bottom: var(--mobile-pad);

          ${bp.l`
            bottom: ${getGap('sm')};
          `}
        }
      }
    `
);

export const Top = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
    padding-top: ${getGap('xxl')};

    ${bp.l`
      padding-top: ${getGap('huge')};
    `}

    waffl-grid {
      row-gap: ${getGap('m')};

      ${bp.l`
        row-gap: ${getGap('xxl')};
      `}
    }
	`
);

export const Heading = styled(H2)<StylesInterface>(
	() => css`
    ${headlineS}
		position: relative;
    color: ${getGlobal('black')};
    text-wrap: balance;
	`
);

export const Description = styled(P)<StylesInterface>(
	() => css`
  	${bodyL}
		position: relative;
    color: ${getGlobal('black', 60)};
    text-wrap: balance;
	`
);

export const Bottom = styled(Section)<StylesInterface>(
	({ $amountOfFaqs }) => css`
		position: relative;
    width: 100%;
    padding: ${getGap('xl')} ${getGap('m')} ${getGap('m')} ${getGap('m')};

    ${bp.l`
      padding: ${getGap('huge')};
    `}

    .frame.bottom {
      position: absolute;
      z-index: 2;
      bottom: var(--mobile-pad);
      left: 0;
      background: ${getGlobal('luxuryWhite', 20)};

      ${bp.l`
        bottom: ${getGap('sm')};
      `}
    }
	`
);

export const PinWrapper = styled(Div)<StylesInterface>(
	() => css`
		--offset: ${getGap('m')};

		position: relative;
		width: 100%;
		
		overflow: clip;

    ${bp.l`
      --offset: ${getGap('huge')};
      height: calc(100svh - var(--offset) * 2);
    `}
	`
);

export const Panel = styled(Aside)<StylesInterface>(
	() => css`
		--offset: ${getGap('m')};

		position: absolute;
		inset: 0;
		
		overflow: clip;
		border-radius: ${getRadius('s')};
		pointer-events: none;

    ${bp.l`
      --offset: ${getGap('huge')};
      inset: 0 0 auto 0;
      height: calc(100svh - var(--offset) * 2);
    `}

    picture {
      position: absolute;
      inset: 0;
      z-index: -1;
      background: ${getGlobal('black')};

      img {
        scale: 1.2;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(1rem);

        ${bp.l`
          filter: blur(0);
        `}
      }
    }
	`
);

export const ProgressBar = styled(Div)<StylesInterface>(
	() => css`
    display: none;
		
    ${bp.l`
      position: absolute;
      top: ${getGap('huge')};
      left: ${getGap('huge')};

      display: flex;
      align-items: center;
      justify-content: center;
    `}

    hr {
      width: 1.6rem;
      height: 0.2rem;
      background: ${getGlobal('luxuryWhite', 60)};
      border: none;
      margin-inline: ${getGap('s')};
    }

    span {
      ${titleS}
      font-variant-numeric: tabular-nums slashed-zero;

      &:first-child {
        color: ${getGlobal('luxuryWhite')};
        
      }

      &:last-child {
        color: ${getGlobal('luxuryWhite', 60)};
      }
    }
	`
);

export const FaqsListWrapper = styled(List)<StylesInterface>(
	() => css`
		--offset: ${getGap('sm')};

		position: relative;
		z-index: 1;
		display: flex;
		flex-flow: column;
		align-items: flex-end;
		justify-content: flex-start;
		gap: var(--offset);
		padding: var(--offset);
		width: 100%;

    ${bp.l`
      --offset: ${getGap('huge')};
    `}
	`
);

export const BottomContent = styled(Div)<StylesInterface>(
	() => css`
    --offset: ${getGap('huge')};

    display: flex;
    flex-flow: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: ${getGap('m')};

		position: relative;
    width: 100%;
	`
);
