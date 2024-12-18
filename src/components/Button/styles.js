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
    `
);
