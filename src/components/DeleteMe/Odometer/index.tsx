'use client';

// Imports
// ------------
import { cx } from '@utils/cx';
import { useEffect, useRef, useState } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// NOTE • Characters that roll in on a wheel of digits; anything else
// (spaces, units) stays still
const ROLLING = /[\d∞]/;

// NOTE • How far into view the number must be before it rolls
const THRESHOLD = 0.6;

// NOTE • Each column further right turns one more full revolution — the
// ones column spins fastest, like a real counter
const BASE_REVOLUTIONS = 1;

// Helpers
// ------------
// NOTE • The glyphs one column scrolls through: whole revolutions of 0–9,
// then on to its target (∞ follows a 9)
const wheelFor = (target: string, revolutions: number) => {
	const loops = Array.from({ length: revolutions }, () => DIGITS).flat();
	return target === '∞' ? [...loops, '∞'] : [...loops, ...DIGITS.slice(0, Number(target) + 1)];
};

// Component
// ------------
// NOTE • A number that rolls into place like an odometer when it scrolls
// into view. Server-rendered at its final value, so it reads correctly
// without JS and for reduced-motion users; on the client it resets to 0
// off screen, then rolls once.
const Odometer = ({ value, className }: I.OdometerProps) => {
	// Refs
	const jacketRef = useRef<HTMLSpanElement>(null);

	// State
	const [state, setState] = useState<'still' | 'armed' | 'rolling'>('still');

	// Derived
	const chars = [...value];
	const rollingCount = chars.filter(char => ROLLING.test(char)).length;

	// Effects
	useEffect(() => {
		const jacket = jacketRef.current;
		if (!jacket || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		setState('armed');
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				setState('rolling');
				observer.disconnect();
			},
			{ threshold: THRESHOLD }
		);
		observer.observe(jacket);
		return () => observer.disconnect();
	}, []);

	// Render
	let column = rollingCount;

	return (
		<span ref={jacketRef} className={cx(s.jacket, className)} data-state={state}>
			<span className={s.label}>{value}</span>
			<span className={s.digits} aria-hidden='true'>
				{chars.map((char, index) => {
					if (!ROLLING.test(char)) {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: characters are positional
							<span key={index} className={s.static}>
								{char}
							</span>
						);
					}

					column -= 1;
					const wheel = wheelFor(char, BASE_REVOLUTIONS + (rollingCount - 1 - column));

					return (
						// biome-ignore lint/suspicious/noArrayIndexKey: characters are positional
						<span key={index} className={s.column}>
							<span className={s.wheel} style={{ '--steps': wheel.length - 1, '--column': column }}>
								{wheel.map((glyph, step) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: glyphs repeat on the wheel
									<span key={step} className={s.glyph}>
										{glyph}
									</span>
								))}
							</span>
						</span>
					);
				})}
			</span>
		</span>
	);
};

// Exports
// ------------
Odometer.displayName = 'Odometer';
export default Odometer;
