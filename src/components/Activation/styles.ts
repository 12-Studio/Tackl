// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, getBrand, getGlobal, getEase, getGap, getRadius } from '@tackl';
import {} from '@tackl/type';

// Interfaces
// ------------
interface StylesInterface {
	example?: boolean;
}

// Exports
// ------------
export const Jacket = styled(Section)<StylesInterface>(
	() => css`
    
      .example {
        width: 100%;
        height: 500dvh;
        background: linear-gradient(to bottom, ${getGlobal('luxuryWhite')}, ${getBrand('bc4')});
      }
    `
);
