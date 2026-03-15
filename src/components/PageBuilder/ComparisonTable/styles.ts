// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, getBrand, getGlobal, getGap, H3, P, Header, Picture } from '@tackl';
import { bodyL, captionL, headlineS } from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	() => css`
        position: relative;
        z-index: 1;
        padding-bottom: var(--mobile-pad);
        background: ${getBrand('bc3')};
        overflow: hidden;

        ${bp.l`
            padding-bottom: ${getGap('sm')};
        `}
    `
);

export const Background = styled(Picture)(
	() => css`
		position: absolute;
        z-index: -1;
		inset: 0;
        background: linear-gradient(
            to bottom,
            ${getBrand('bc3')} 0%,
            ${getBrand('bc4')} 100%
        );

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.1;
        }
	`
);

export const Top = styled(Section)(
	() => css`
		position: relative;
		z-index: 1;
        padding-block: var(--mobile-pad) 0;

        ${bp.l`
            padding-block: ${getGap('sm')} 0;
        `}

        waffl-grid {
            row-gap: ${getGap('m')};
            margin-block: ${getGap('xxl')};

            ${bp.l`
                row-gap: ${getGap('xxl')};
                margin-block: ${getGap('xxl')} ${getGap('huge')};
            `}
        }
	`
);

export const Heading = styled(H3)(
	() => css`
        ${headlineS}
		color: ${getGlobal('luxuryWhite')};
        text-wrap: balance;
        text-align: center;

        ${bp.l`
            text-align: left;
        `}
	`
);

export const Description = styled(P)(
	() => css`
        ${bodyL}
		color: ${getGlobal('luxuryWhite', 60)};
        text-wrap: balance;
        text-align: center;

        ${bp.l`
            text-align: left;
        `}
	`
);

export const Bottom = styled(Section)(
	() => css`
		position: relative;
		z-index: 1;
        width: 100%;


        ul {
            display: flex;
            flex-direction: column;
            padding-inline: var(--mobile-pad);

            ${bp.l`
                padding-inline: ${getGap('sm')};
            `}
        }
	`
);

export const HeadingRow = styled(Header)(
	() => css`
		position: relative;
		z-index: 1;

        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: ${getGap('sm')} var(--mobile-pad);

        ${bp.l`
            padding: ${getGap('m')} ${getGap('sm')};
        `}

        

        span {
            ${captionL}
            flex: 1;
            display: block;
            text-align: center;
            padding-block: ${getGap('s')};
            border-inline: 1px solid ${getGlobal('luxuryWhite', 20)};
            height: 100%;
        }
	`
);

export const Logo = styled(Picture)(
	() => css`
		position: relative;
		z-index: 1;
        display: grid;
        place-items: center;
        flex: 1;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            max-width: 8rem;
        }
	`
);
