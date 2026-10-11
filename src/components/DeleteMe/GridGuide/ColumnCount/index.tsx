'use client';

// Imports
// ------------
import { theme } from '@theme';
import Grid from '@waffl';
import { useState } from 'react';
import Code from '../../Code';
import { Stepper } from '../../Controls';
import Demo, { Cell, MAX_DEMO_COLUMNS } from '../../Demo';

// Styles + Interfaces
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const DEVICE_NAMES: Record<string, string> = { s: 'Mobile', m: 'Tablet', l: 'Desktop' };
const DEVICES = Object.keys(theme.grid.columns) as (keyof typeof theme.grid.columns)[];

// Component
// ------------
// NOTE • The column count is a token, not a fixed 12. The steppers override
// the demo grid's --grid-columns per breakpoint, exactly as changing
// `columns` in the grid tokens would for every grid.
const ColumnCount = () => {
	// State
	const [columns, setColumns] = useState({ ...theme.grid.columns });

	// Derived
	const widest = Math.max(...Object.values(columns));
	const code = `// src/theme/grid/index.ts\ncolumns: { ${DEVICES.map(key => `${key}: ${columns[key]}`).join(', ')} },`;

	// Handlers
	const change = (device: keyof typeof columns, by: number) =>
		setColumns(current => ({ ...current, [device]: current[device] + by }));

	// Render
	return (
		<>
			<Demo
				className={s.jacket}
				style={Object.fromEntries(DEVICES.map(key => [`--columns-${key}`, columns[key]]))}
			>
				<Grid $isFixed className={s.row}>
					{Array.from({ length: widest }, (_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: one numbered cell per column
						<Cell key={index} label={`${index + 1}`} $s='span 1' />
					))}
				</Grid>
			</Demo>

			<div className={s.steppers}>
				{DEVICES.map(key => (
					<Stepper
						key={key}
						label={`${DEVICE_NAMES[key] ?? key} (${key})`}
						value={columns[key]}
						onDecrease={() => change(key, -1)}
						onIncrease={() => change(key, 1)}
						isMin={columns[key] <= 1}
						isMax={columns[key] >= MAX_DEMO_COLUMNS}
					/>
				))}
			</div>

			<Code label='src/theme/grid/index.ts' code={code} language='tsx' />
		</>
	);
};

// Exports
// ------------
ColumnCount.displayName = 'ColumnCount';
export default ColumnCount;
