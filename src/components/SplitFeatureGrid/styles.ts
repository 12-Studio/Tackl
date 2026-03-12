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
	H3,
	H4,
	P,
	Picture,
} from '@tackl';
import { bodyL, headlineS, titleL } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	$isEven?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	() => css`
        position: relative;
        padding-bottom: var(--mobile-pad);

        ${bp.l`
            padding-bottom: ${getGap('sm')};
        `}

        .side-frame {
            z-index: 1;
        }
    `
);

export const Top = styled(Section)<StylesInterface>(
	() => css`
		position: relative;


        > .frame {
            position: absolute;
            z-index: 2;

            &.top { top: 0; }
            &.bottom { bottom: 0; }
        }
	`
);

export const Heading = styled(H3)<StylesInterface>(
	() => css`
    ${headlineS}
    color: ${getGlobal('black')};
    padding-block: ${getGap('l')};
    text-wrap: balance;
    text-align: center;

    ${bp.l`
        padding-block: ${getGap('xxl')};
        text-align: left;
    `}
`
);

export const Bottom = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        display: flex;
        flex-direction: column;

        .frame.bottom {
            z-index: 2;
        }
	`
);

export const Feature = styled(Div)<StylesInterface>(
	({ $isEven }) => css`
        --aspect: 1/1;

		position: relative;
        display: flex;
        flex-flow: column;
        
        padding-inline: 1.2rem;
        background: ${getGlobal('luxuryWhite')};

        ${bp.l`
            flex-direction: ${$isEven ? 'row' : 'row-reverse'};
            padding-inline: ${getGap('sm')};
        `}

        .frame.bottom {
            position: absolute;
            inset: auto 0 0 0;
            z-index: 3;;
        }

	`
);

export const Vertical = styled.span<StylesInterface>(
	() => css`
        flex: 0 0 1px;
		background: ${getBrand('bc5')};

        display: none;
        ${bp.l` display: block; `}
	`
);

export const FeatureMedia = styled(Picture)<StylesInterface>(
	({ $isEven }) => css`
        width: 100%;
        aspect-ratio: var(--aspect);
		position: relative;
        display: block;
        
        padding: ${getGap('sm')};
        background: ${getGlobal('luxuryWhite')};

        ${bp.l`
            flex: 1 1 50%;
            padding: ${getGap('xxl')};
        `}

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            mix-blend-mode: multiply;
        }
	`
);

export const FeatureContent = styled(Div)<StylesInterface>(
	() => css`
        
		position: relative;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: ${getGap('sm')};
        padding: ${getGap('sm')} var(--mobile-pad) ${getGap('l')};
        width: 100%;

        ${bp.l`
            flex: 1 1 50%;
            aspect-ratio: var(--aspect);
            gap: 0;
            padding: ${getGap('l')};
        `}
	`
);

export const FeatureHeading = styled(H4)<StylesInterface>(
	() => css`
        ${titleL}
		position: relative;
        color: ${getGlobal('black')};
        
        width: 100%;
        text-align: center;

        ${bp.l`
            text-align: left;
        `}
	`
);

export const FeatureDesc = styled(P)<StylesInterface>(
	() => css`
        ${bodyL}
		position: relative;
        color: ${getGlobal('black', 50)};

        text-align: center;
        width: 100%;

        ${bp.l`
            text-align: left;
        `}
	`
);
