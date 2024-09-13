// Imports
// ------
import { theme } from '@theme';
import { css } from 'styled-components';

// Exports
// ------
const sizes = theme.grid.breakpoints;
const keys = Object.keys(sizes);

export const breakpointUp = keys.reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (min-width: ${sizes[label]}) {
			${css(...args)}
		}
	`;
	return acc;
}, {});

export const breakpointDown = keys.reduce((acc, label) => {
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label]}) {
			${css(...args)}
		}
	`;
	return acc;
}, {});

// export const breakpointOnly = keys.reduce((acc, label) => {
// 	let nextIndex = keys.indexOf(label) + 1;

// 	acc[label] = (...args) => css`
// 		@media (min-width: ${sizes[label]}) and (max-width: ${sizes[
// 				keys[nextIndex]
// 			]}) {
// 			${css(...args)}
// 		}
// 	`;
// 	return acc;
// }, {});
