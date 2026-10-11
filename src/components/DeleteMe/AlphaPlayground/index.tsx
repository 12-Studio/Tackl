'use client';

// Imports
// ------------
import { alpha } from '@tackl';
import { baseColors } from '@theme/colors';
import { useState } from 'react';
import Code from '../Code';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const TOKENS = Object.entries(baseColors).flatMap(([group, colors]) =>
	Object.entries(colors).map(([name, value]) => ({ token: `--${group}-${name}`, value }))
);

// Component
// ------------
// NOTE • Pick a token, drag the opacity — the swatch is painted with the
// kit's own alpha(), and the SCSS, JS and compiled CSS update together
const AlphaPlayground = () => {
	// State
	const [token, setToken] = useState(TOKENS[0].token);
	const [opacity, setOpacity] = useState(40);

	// Derived
	const color = alpha(token, opacity);

	// Render
	return (
		<div className={s.jacket}>
			<fieldset className={s.swatches}>
				<legend className={s.legend}>Colour token</legend>
				{TOKENS.map(({ token: name, value }) => (
					<button
						key={name}
						type='button'
						aria-pressed={token === name}
						aria-label={`${name} ${value}`}
						title={name}
						className={s.swatch}
						style={{ '--swatch': `var(${name})` }}
						onClick={() => setToken(name)}
					/>
				))}
			</fieldset>

			<label className={s.slider}>
				<span>
					Opacity <output>{opacity}</output>
				</span>
				<input
					type='range'
					min={0}
					max={100}
					value={opacity}
					onChange={event => setOpacity(Number(event.target.value))}
				/>
			</label>

			<div className={s.preview}>
				<span className={s.paint} style={{ '--paint': color }} />
			</div>

			<Code label='SCSS' code={`background: alpha(${token}, ${opacity});`} />
			<Code
				label='JS (GSAP, inline styles)'
				code={`import { alpha } from '@tackl';\n\nalpha('${token}', ${opacity});`}
			/>
			<Code label='Compiled CSS' code={`background: ${color};`} />
		</div>
	);
};

// Exports
// ------------
AlphaPlayground.displayName = 'AlphaPlayground';
export default AlphaPlayground;
