// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius, P } from '@tackl';
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

export const SectionTitlePosition = styled(Div)(
	() => css`
		position: relative;
		z-index: 1;
        margin-bottom: ${getGap('l')};
	`
);

export const AnimatedText = styled(Div)(
	() => css`
        ${headlineS}
		position: relative;
		z-index: 1;
        color: ${getGlobal('black')};

		display: flex;
        flex-direction: column;
        gap: ${getGap('l')};
        text-wrap: balance;

        ${bp.l`
            gap: ${getGap('huge')};
        `}

        * {
            color: inherit;
        }
	`
);

export const Desc = styled(P)(
	() => css`
		${bodyL}
		position: relative;
		z-index: 1;
        color: ${getGlobal('black', 60)};
        text-wrap: balance;

        margin-block: ${getGap('l')};

        ${bp.l`
            margin-block: ${getGap('huge')} ${getGap('xxl')};
        `}
	`
);

export const Button = styled(Div)(
	() => css`
		position: relative;
		z-index: 1;
	`
);
