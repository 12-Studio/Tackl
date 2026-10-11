'use client';

// Imports
// ------------
import Grid from '@waffl';
import { useEffect, useRef, useState } from 'react';
import EffectPicker from '../EffectPicker';
import HeroField from '../HeroField';
import { DEFAULT_EFFECT, EFFECTS } from '../HeroField/effects';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • One cell per column of the widest grid — CSS shows 2, 6 or 12
const COLUMNS = Array.from({ length: 12 }, (_, index) => index);

// NOTE • The chosen effect lives in the URL (?fx=glass), so a link opens it
const PARAM = 'fx';

const findEffect = (id: string | null) => EFFECTS.find(effect => effect.id === id);

// Component
// ------------
// NOTE • The hero's backdrop: the real grid drawn as hairline columns, the
// WebGL field measuring those same columns, and — while the effects are on
// trial — a picker to switch between them
const HeroBackdrop = () => {
	// Refs
	const columnsRef = useRef<HTMLDivElement>(null);

	// State
	const [effectId, setEffectId] = useState(DEFAULT_EFFECT);

	// Derived
	const effect = findEffect(effectId) ?? EFFECTS[0];

	// Handlers
	const select = (id: string) => {
		setEffectId(id);
		const url = new URL(window.location.href);
		url.searchParams.set(PARAM, id);
		window.history.replaceState(null, '', url);
	};

	// Effects
	useEffect(() => {
		const fromUrl = findEffect(new URLSearchParams(window.location.search).get(PARAM));
		if (fromUrl) setEffectId(fromUrl.id);
	}, []);

	// Render
	return (
		<>
			<div ref={columnsRef} className={s.jacket} aria-hidden='true'>
				{effect && <HeroField columnsRef={columnsRef} effect={effect} />}
				<Grid $isFixed className={s.grid}>
					{COLUMNS.map(column => (
						<span key={column} className={s.column} style={{ '--index': column }} />
					))}
				</Grid>
			</div>
			<EffectPicker effects={EFFECTS} selectedId={effect?.id ?? ''} onSelect={select} />
		</>
	);
};

// Exports
// ------------
HeroBackdrop.displayName = 'HeroBackdrop';
export default HeroBackdrop;
