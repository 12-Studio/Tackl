// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp } from '@tackl';
import Link from 'next/link';

// Exports
// ------------
export const Jacket = styled(Link)(
    props => css`
        color: white;
        padding: 1rem 2rem;
        background: ${props.theme.colors.brand.bc1[100]};
        border-radius: 0.5rem;
        font-family: ${props.theme.font.family.heading};
        font-size: 1.25rem;
        font-weight: ${props.theme.font.weight.bold};
        line-height: 1.25;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
            background: ${props.theme.colors.brand.bc1[50]};
        }
    `
);
