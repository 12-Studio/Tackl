// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Components
// ------------
// NOTE • − value + control for one number
export const Stepper = ({ label, value, onDecrease, onIncrease, isMin, isMax }: I.StepperProps) => (
	<div className={s.stepper}>
		<span className={s.stepperLabel}>{label}</span>
		<div className={s.stepperControls}>
			<button type='button' onClick={onDecrease} disabled={isMin} aria-label={`Decrease ${label.toLowerCase()}`}>
				−
			</button>
			<output aria-live='polite'>{value}</output>
			<button type='button' onClick={onIncrease} disabled={isMax} aria-label={`Increase ${label.toLowerCase()}`}>
				+
			</button>
		</div>
	</div>
);

// NOTE • A labelled checkbox for one boolean prop
export const Toggle = ({ label, isChecked, onChange }: I.ToggleProps) => (
	<label className={s.toggle}>
		<input type='checkbox' checked={isChecked} onChange={onChange} />
		{label}
	</label>
);

// Exports
// ------------
Stepper.displayName = 'Stepper';
Toggle.displayName = 'Toggle';
