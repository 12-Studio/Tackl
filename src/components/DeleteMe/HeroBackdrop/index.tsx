'use client';

// Imports
// ------------
import Grid from '@waffl';
import { useRef } from 'react';
import AsciiField from '../AsciiField';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • One cell per column of the widest grid — CSS shows 2, 6 or 12
const COLUMNS = Array.from({ length: 12 }, (_, index) => index);

// Component
// ------------
// NOTE • The hero's backdrop: the real grid drawn as hairline columns, and
// the ASCII field measuring those same columns for its rising wave
const HeroBackdrop = () => {
	// Refs
	const columnsRef = useRef<HTMLDivElement>(null);

	// Render
	return (
		<div ref={columnsRef} className={s.jacket} aria-hidden='true'>
			<AsciiField columnsRef={columnsRef} />
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
