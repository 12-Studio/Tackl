'use client';

// Imports
// ------------
import { useEffect, useState, useSyncExternalStore } from 'react';
import CopyButton from '../CopyButton';
import { COLOURS, type ColourKey, DEFAULTS, GROUPS, type SettingKey } from '../HeroField/settings';
import { type HeroSettings, heroSettings } from '../HeroField/store';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • The panel shows in development, or anywhere with ?tweak in the URL
const QUERY_FLAG = 'tweak';
const IS_DEV = process.env.NODE_ENV === 'development';

// Helpers
// ------------
const decimalsOf = (step: number) => (String(step).split('.')[1] ?? '').length;

const tokenHex = (token: string) => getComputedStyle(document.documentElement).getPropertyValue(token).trim();

// NOTE • The current values as source — paste over the defaults in
// HeroField/settings.ts to keep a look
const toSource = ({ values, colours }: HeroSettings) => {
	const lines = (Object.keys(DEFAULTS) as SettingKey[]).map(key => `\t${key}: ${values[key]},`);
	const colourLines = COLOURS.map(({ key }) => `\t${key}: ${colours[key] ? `'${colours[key]}'` : 'null'},`);
	return [
		'export const DEFAULTS = {',
		...lines,
		'};',
		'',
		'export const COLOUR_DEFAULTS: Record<ColourKey, string | null> = {',
		...colourLines,
		'};',
	].join('\n');
};

// Component
// ------------
// NOTE • A tweak panel for every setting of the hero's WebGL field. Edits go
// straight to the shared store, so the field redraws as you drag.
const HeroTweaks = () => {
	// State
	const [isAvailable, setIsAvailable] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const settings = useSyncExternalStore(heroSettings.subscribe, heroSettings.get, heroSettings.get);

	// Derived
	const changed =
		(Object.keys(DEFAULTS) as SettingKey[]).filter(key => settings.values[key] !== DEFAULTS[key]).length +
		COLOURS.filter(({ key }) => settings.colours[key] !== null).length;

	// Effects
	// NOTE • Read the URL after hydration, so server and client agree
	useEffect(() => {
		setIsAvailable(IS_DEV || new URLSearchParams(window.location.search).has(QUERY_FLAG));
	}, []);

	// Handlers
	const handleColour = (key: ColourKey, value: string) => heroSettings.setColour(key, value);

	// Render
	if (!isAvailable) return null;

	return (
		<div className={s.jacket} data-hero-ignore data-state={isOpen ? 'open' : 'closed'}>
			<button type='button' className={s.toggle} aria-expanded={isOpen} onClick={() => setIsOpen(open => !open)}>
				{isOpen ? 'Close' : 'Tweak effect'}
				{changed > 0 && <span className={s.badge}>{changed}</span>}
			</button>

			{isOpen && (
				<div className={s.panel} data-lenis-prevent>
					<div className={s.header}>
						<p className={s.hint}>
							Changes apply live. Copy the values into HeroField/settings.ts to keep them.
						</p>
						<div className={s.actions}>
							<CopyButton text={toSource(settings)} label='Copy settings' />
							<button
								type='button'
								className={s.reset}
								onClick={heroSettings.reset}
								disabled={changed === 0}
							>
								Reset all
							</button>
						</div>
					</div>

					<details className={s.group} open>
						<summary className={s.summary}>Colours</summary>
						{COLOURS.map(({ key, label, token }) => {
							const override = settings.colours[key];

							return (
								<div key={key} className={s.row} data-changed={override !== null || undefined}>
									<label className={s.colourLabel}>
										<span>{label}</span>
										<input
											type='color'
											value={override ?? tokenHex(token)}
											onChange={event => handleColour(key, event.target.value)}
										/>
									</label>
									<button
										type='button'
										className={s.tokenButton}
										onClick={() => heroSettings.setColour(key, null)}
										disabled={override === null}
									>
										{override === null ? token : 'Use token'}
									</button>
								</div>
							);
						})}
					</details>

					{GROUPS.map(({ title, controls }) => (
						<details key={title} className={s.group}>
							<summary className={s.summary}>{title}</summary>
							{controls.map(({ key, label, min, max, step }) => {
								const value = settings.values[key];
								const isChanged = value !== DEFAULTS[key];

								return (
									<label key={key} className={s.row} data-changed={isChanged || undefined}>
										<span className={s.label}>
											{label}
											<output className={s.value}>{value.toFixed(decimalsOf(step))}</output>
										</span>
										<input
											type='range'
											min={min}
											max={max}
											step={step}
											value={value}
											onChange={event => heroSettings.setValue(key, Number(event.target.value))}
											onDoubleClick={() => heroSettings.setValue(key, DEFAULTS[key])}
										/>
									</label>
								);
							})}
						</details>
					))}

					<p className={s.hint}>Double-click a slider to reset it. Click the hero to send a pulse.</p>
				</div>
			)}
		</div>
	);
};

// Exports
// ------------
HeroTweaks.displayName = 'HeroTweaks';
export default HeroTweaks;
