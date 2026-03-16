// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, getBrand, getGlobal, getGap, H2, P } from '@tackl';
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
        background: ${getBrand('bc3')};

        .side-frame {
            z-index: 1;
        }
    `
);

export const Top = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        background: ${getBrand('bc3')};
        padding-block: ${getGap('xxl')} ${getGap('l')};

        > .frame.top {
            position: absolute;
            z-index: 2;
            top: var(--mobile-pad);

            ${bp.l`
                top: ${getGap('sm')};
            `}
        }

        waffl-grid {
            row-gap: ${getGap('sm')};

            ${bp.l`
                row-gap: ${getGap('xl')};
            `}
        }
	`
);

export const Heading = styled(H2)<StylesInterface>(
	() => css`
		${headlineS}
        color: ${getGlobal('luxuryWhite')};
        text-wrap: balance;
        text-align: center;
	`
);

export const Desc = styled(P)<StylesInterface>(
	() => css`
		${bodyL}
        color: ${getGlobal('luxuryWhite', 60)};
        text-align: center;
        text-wrap: balance;
	`
);

export const Bottom = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        width: 100%;
        overflow: clip;
        background: linear-gradient(to bottom, ${getBrand('bc3')} 0%, ${getBrand('bc4')} 100%);

        ${bp.l`
            height: 100svh;
        `}

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


        ul {
            display: flex;
            flex-direction: column;

            

            ${bp.l`
                flex-direction: row;
                flex-wrap: nowrap;
                width: max-content;
                height: 100%;
            `}
        }
	`
);
