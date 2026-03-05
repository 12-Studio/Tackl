// Imports
// ------------
import styled, { css } from 'styled-components';
import { Div } from '@tackl';

// Interfaces
// ------------
type StylesInterface = {};

// Exports
// ------------
export const Jacket = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
		height: 100dvh;
		overflow: hidden;
	`
);

export const Content = styled(Div)<StylesInterface>(
	() => css`
		position: relative;
	`
);
