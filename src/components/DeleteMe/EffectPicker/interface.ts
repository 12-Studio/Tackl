// Imports
// ------------
import type { HeroEffect } from '../HeroField/interface';

// Exports
// ------------
export interface EffectPickerProps {
	effects: HeroEffect[];
	selectedId: string;
	onSelect: (id: string) => void;
}
