'use client';

// Imports
// ------------
import { mq } from '@tackl';
import { useSyncExternalStore } from 'react';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const KEYS = Object.keys(mq.up) as (keyof typeof mq.up)[];

// Helpers
// ------------
// NOTE • The largest breakpoint whose min-width query matches — read with
// the same mq strings you'd hand to gsap.matchMedia
const getCurrent = () => KEYS.filter(key => window.matchMedia(mq.up[key]).matches).at(-1) ?? KEYS[0];

const subscribe = (onChange: () => void) => {
	const lists = KEYS.map(key => window.matchMedia(mq.up[key]));
	for (const list of lists) list.addEventListener('change', onChange);
	return () => {
		for (const list of lists) list.removeEventListener('change', onChange);
	};
};

const getServerSnapshot = () => null;

// Component
// ------------
// NOTE • Live — resize the window and watch it change
const BreakpointReadout = () => {
	// State
	const current = useSyncExternalStore(subscribe, getCurrent, getServerSnapshot);

	// Render
	return (
		<div className={s.jacket}>
			<ol className={s.scale} aria-label='Breakpoints'>
				{KEYS.map(key => (
					<li key={key} className={s.key} data-active={key === current || undefined}>
						{key}
					</li>
				))}
			</ol>
			<p className={s.status} aria-live='polite'>
				{current ? (
					<>
						Matching <code>mq.up.{current}</code> — <code>{mq.up[current]}</code>
					</>
				) : (
					'Resize the window to see the matching breakpoint.'
				)}
			</p>
		</div>
	);
};

// Exports
// ------------
BreakpointReadout.displayName = 'BreakpointReadout';
export default BreakpointReadout;
