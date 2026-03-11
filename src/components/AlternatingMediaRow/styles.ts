// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, H3, P } from '@tackl';
import { bodyL, headlineS } from '@tackl/type';

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
        padding-bottom: var(--mobile-pad);

        .side-frame {
            z-index: 1;
        }

        ${bp.l`
            padding-bottom: ${getGap('sm')};
        `}
    `
);

export const Top = styled(Section)(
	() => css`
        position: relative;
        z-index: 1;
        padding-block: var(--mobile-pad);

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
        position: relative;
        z-index: 1;
        color: ${getGlobal('black')};
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
        position: relative;
        z-index: 1;

        color: ${getGlobal('black', 60)};
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
        /* padding-block: var(--mobile-pad); */

        .frame {
            z-index: 2;
        }
    `
);
