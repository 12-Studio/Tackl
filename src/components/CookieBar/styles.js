// Imports
// ------------
import styled, { css } from 'styled-components';
import { Aside, bp } from '@/theme/tackl';

// Exports
// ------------
export const Jacket = styled(Aside)(
    props => css`
        position: fixed;
        inset: 2.4rem;
        top: auto;
        z-index: 12;

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2.4rem;
        padding: 2.4rem;

        background: ${props.theme.colors.global.white[100]};
        border-radius: 2.4rem;
        height: 8.4rem;

        p {
            font-size: 1.4rem;
            line-height: 1.4;
            font-weight: 500;
            text-transform: uppercase;
            font-family: ${props.theme.font.family.heading};
        }

        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2.4rem;
        }

        button {
            border-radius: 1.2rem;
            color: ${props.theme.colors.global.white[100]};
            padding: 1.2rem 2.4rem;
            background: ${props.theme.colors.brand.bc1[100]};
        }
    `
);
