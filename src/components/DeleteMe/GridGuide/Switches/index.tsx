'use client';

// Imports
// ------------
import Grid, { type GridProps } from '@waffl';
import { useState } from 'react';
import Code from '../../Code';
import { Toggle } from '../../Controls';
import { Cell } from '../../Demo';

// Styles + Interfaces
// ------------
import s from './styles.module.scss';

// Constants
// ------------
type Switch = '$isFixed' | '$noGutter' | '$noMargin' | '$isCenter' | '$isFullscreen';

const SWITCHES: { prop: Switch; comment: string }[] = [
	{ prop: '$isFixed', comment: 'max-width 1440px, centred' },
	{ prop: '$noGutter', comment: 'no gap between columns or rows' },
	{ prop: '$noMargin', comment: 'no margin at the sides' },
	{ prop: '$isCenter', comment: 'centre items vertically' },
	{ prop: '$isFullscreen', comment: 'fill the parent’s height' },
];

const INITIAL: Record<Switch, boolean> = {
	$isFixed: false,
	$noGutter: false,
	$noMargin: false,
	$isCenter: false,
	$isFullscreen: false,
};

// Component
// ------------
// NOTE • Every layout switch on <Grid>, live. The preview is a fixed-height
// frame, so $isFullscreen and $isCenter have room to show, and $isFixed's
// 1440px is scaled down to fit it.
const Switches = () => {
	// State
	const [switches, setSwitches] = useState(INITIAL);

	// Derived
	const active = SWITCHES.filter(({ prop }) => switches[prop]);
	const gridProps: GridProps = Object.fromEntries(active.map(({ prop }) => [prop, true]));
	// NOTE • The overlay only mirrors the columns — centring would collapse
	// them to zero height
	const { $isCenter: _, ...overlayProps } = gridProps;
	const code = [
		`<Grid${active.map(({ prop }) => ` ${prop}`).join('')}>`,
		'  …',
		'</Grid>',
		'',
		...SWITCHES.map(({ prop, comment }) => `// ${prop.padEnd(14)}${comment}`),
	].join('\n');

	// Handlers
	const toggle = (prop: Switch) => setSwitches(current => ({ ...current, [prop]: !current[prop] }));

	// Render
	return (
		<div className={s.jacket}>
			<fieldset className={s.toggles}>
				<legend className={s.legend}>Grid switches</legend>
				{SWITCHES.map(({ prop }) => (
					<Toggle key={prop} label={prop} isChecked={switches[prop]} onChange={() => toggle(prop)} />
				))}
			</fieldset>

			<div className={s.frame}>
				<Grid {...overlayProps} className={s.overlay} aria-hidden='true'>
					{Array.from({ length: 24 }, (_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: one identical cell per column
						<span key={index} className={s.column} />
					))}
				</Grid>
				<Grid {...gridProps} className={s.grid}>
					<Cell label='A' $m='span 2' $l='span 4' />
					<Cell label='B' $m='span 2' $l='span 4' tone='soft' />
					<Cell label='C' $m='span 2' $l='span 4' />
				</Grid>
			</div>

			<Code label='Live code' code={code} language='tsx' />
		</div>
	);
};

// Exports
// ------------
Switches.displayName = 'Switches';
export default Switches;
