// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • A temporary switcher for trying the hero effects — remove it once
// one is chosen
const EffectPicker = ({ effects, selectedId, onSelect }: I.EffectPickerProps) => (
	<fieldset className={s.jacket}>
		<legend className={s.legend}>Hero effect</legend>
		{effects.map((effect, index) => (
			<button
				key={effect.id}
				type='button'
				className={s.option}
				aria-pressed={effect.id === selectedId}
				onClick={() => onSelect(effect.id)}
			>
				<span className={s.number}>{String(index + 1).padStart(2, '0')}</span>
				{effect.name}
			</button>
		))}
	</fieldset>
);

// Exports
// ------------
EffectPicker.displayName = 'EffectPicker';
export default EffectPicker;
