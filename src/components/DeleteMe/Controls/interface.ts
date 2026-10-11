// Exports
// ------------
export interface StepperProps {
	label: string;
	value: number;
	onDecrease: () => void;
	onIncrease: () => void;
	isMin: boolean;
	isMax: boolean;
}

export interface ToggleProps {
	// NOTE • Shown in monospace — usually the prop it switches, e.g. '$noGutter'
	label: string;
	isChecked: boolean;
	onChange: () => void;
}
