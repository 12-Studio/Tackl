'use client';

// Imports
// ------------
import { theme } from '@theme';
import Grid from '@waffl';
import { useRef } from 'react';
import HeroField from '../HeroField';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • One cell per column of the widest grid in the tokens — extras wrap
// into a clipped second row, so only the current breakpoint's columns show
const COLUMNS = Array.from({ length: Math.max(...Object.values(theme.grid.columns)) }, (_, index) => index);

// Component
// ------------
// NOTE • The hero's backdrop: the real grid drawn as hairline columns, and
// the WebGL field measuring those same columns
const HeroBackdrop = () => {
	// Refs
	const columnsRef = useRef<HTMLDivElement>(null);

	// Render
	return (
		<div ref={columnsRef} className={s.jacket} aria-hidden='true'>
			<HeroField columnsRef={columnsRef} />
			<Grid $isFixed className={s.grid}>
				{COLUMNS.map(column => (
					<span key={column} className={s.column} style={{ '--index': column }} />
				))}
			</Grid>
		</div>
	);
};

// Exports
// ------------
HeroBackdrop.displayName = 'HeroBackdrop';
export default HeroBackdrop;
