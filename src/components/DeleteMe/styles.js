// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section } from '@tackl';
import {} from '@tackl/type';

// Exports
// ------------
export const Jacket = styled(Section)(
    props => css`
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100svh;
        background: ${props.theme.colors.brand.bc2[100]};
        overflow: hidden;
    `
);

export const Background = styled.div(
    props => css`
        position: absolute;
        inset: 0;
    `
);
