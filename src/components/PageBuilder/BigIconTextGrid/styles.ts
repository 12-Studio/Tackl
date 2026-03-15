// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, H2, P } from '@tackl';
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
        background: ${getGlobal('luxuryWhite')};
        padding-block: var(--mobile-pad);


        ${bp.l`
            padding-block: ${getGap('sm')};
        `}
    `
);

export const Top = styled(Section)(
	() => css`
		position: relative;
        padding-block: ${getGap('m')};

        ${bp.l`
            padding-block: ${getGap('xxl')};
        `}


        waffl-grid {
            row-gap: ${getGap('m')};

            ${bp.l`
                row-gap: ${getGap('xxl')};
            `}
        }
	`
);

export const Heading = styled(H2)(
	() => css`
		${headlineS}
        color: ${getGlobal('black')};
	`
);

export const Description = styled(P)(
	() => css`
		${bodyL}
        color: ${getGlobal('black', 60)};
	`
);

export const Bottom = styled(Section)(
	() => css`
		position: relative;


        ul {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
	`
);
