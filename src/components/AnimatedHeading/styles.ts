// Imports
// ------------
import styled, { css } from 'styled-components';
import { Div } from '@tackl';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
        color: inherit;

        * { 
            color: inherit;
        }
    `
);
