// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Header, getBrand, getGlobal } from '@tackl';
import {} from '@tackl/type';

// Exports
// ------------
export const Jacket = styled(Header)(
    props => css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100svh;
        background: ${getBrand('bc2')};
        overflow: hidden;
    `
);
