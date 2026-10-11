// Imports
// ------------
import { COLOUR_DEFAULTS, type ColourKey, type Colours, DEFAULTS, type SettingKey, type Settings } from './settings';

// Types
// ------------
export type HeroSettings = { values: Settings; colours: Colours };

// Store
// ------------
// NOTE • The live settings, shared by the field (which reads them every
// frame) and the tweak panel (which edits them). A plain external store —
// each change replaces the snapshot, so useSyncExternalStore sees it.
let state: HeroSettings = { values: { ...DEFAULTS }, colours: { ...COLOUR_DEFAULTS } };
const listeners = new Set<() => void>();

const emit = (next: HeroSettings) => {
	state = next;
	for (const listener of listeners) listener();
};

export const heroSettings = {
	get: () => state,
	subscribe: (listener: () => void) => {
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	},
	setValue: (key: SettingKey, value: number) => emit({ ...state, values: { ...state.values, [key]: value } }),
	setColour: (key: ColourKey, value: string | null) =>
		emit({ ...state, colours: { ...state.colours, [key]: value } }),
	reset: () => emit({ values: { ...DEFAULTS }, colours: { ...COLOUR_DEFAULTS } }),
};
