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
        z-index: 999;
        inset: 0 0 auto 0;
    `
);
