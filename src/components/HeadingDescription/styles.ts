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
        padding-bottom: var(--mobile-pad);

        ${bp.l`
            padding-bottom: ${getGap('sm')};
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
		color: ${getGlobal('black')};
	`
);

export const Description = styled(P)<StylesInterface>(
	() => css`
		${bodyL}
		color: ${getGlobal('black', 60)};
	`
);
