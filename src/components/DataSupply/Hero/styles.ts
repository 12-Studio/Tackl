// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, H3, P } from '@tackl';
import { headlineL, bodyL } from '@tackl/type';

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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: ${getGap('xxl')};
        width: 100%;
        min-height: clamp(70rem, 100svh, 1024rem);

        > .frame {
            position: absolute;
            z-index: 2;

            &.top {
                top: var(--line-mobile-dist);

                ${bp.l`
                    top: var(--line-desktop-dist);
                `}
            }

            &.bottom {
                bottom: var(--line-mobile-dist);

                ${bp.l`
                    bottom: var(--line-desktop-dist);
                `}
            }
        }
    `
);

export const Top = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        flex: 0 1 auto;
	`
);

export const SectionTitlePosition = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
	`
);

export const Heading = styled(H3)<StylesInterface>(
	() => css`
        ${headlineL}
        color: ${getGlobal('black')};
        margin: ${getGap('m')} 0;

        user-select: none;
        pointer-events: none;
        text-wrap: balance;

        ${bp.l`
            margin: ${getGap('m')} 0 ${getGap('xxl')};
        `}
	`
);

export const Desc = styled(P)<StylesInterface>(
	() => css`
        ${bodyL}
        color: ${getGlobal('black', 50)};

        user-select: none;
        pointer-events: none;
	`
);

export const Bottom = styled(Section)<StylesInterface>(
	() => css`
		position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;

        waffl-grid {
            flex: 1;
            min-height: 0;
            display: grid;
            grid-template-rows: 1fr;
            align-content: stretch;
        }
	`
);

export const Graph = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
        min-height: 0;
        align-self: stretch;
        display: flex;
        flex-direction: column;
	`
);
