// Imports
// ------
import { theme } from '@theme';
import { css } from 'styled-components';

// Exports
// ------
const sizes = theme.grid.breakpoints;
const keys = Object.keys(sizes);

// Pre-compute media query strings for better performance
const upQueries = keys.reduce((acc, label) => {
	acc[label] = `@media (min-width: ${sizes[label]})`;
	return acc;
}, {});

const downQueries = keys.reduce((acc, label) => {
	acc[label] = `@media (max-width: ${sizes[label]})`;
	return acc;
}, {});

// Create breakpoint functions using pre-computed queries
export const breakpointUp = keys.reduce((acc, label) => {
	acc[label] = (...args) => css`
		${upQueries[label]} {
			${css(...args)}
		}
	`;
	return acc;
}, {});

export const breakpointDown = keys.reduce((acc, label) => {
	acc[label] = (...args) => css`
		${downQueries[label]} {
			${css(...args)}
		}
	`;
	return acc;
}, {});
