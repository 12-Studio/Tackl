'use client';

// Imports
// ------------
import { useState } from 'react';
import Code from '../Code';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
// NOTE • Mirrors $type-styles in src/css/tackl/_type.scss
const TYPE_STYLES = [
	'displayL',
	'displayS',
	'headlineL',
	'headlineS',
	'titleL',
	'titleS',
	'bodyL',
	'bodyS',
	'captionL',
	'captionS',
];

// Component
// ------------
// NOTE • Type your own sample and switch styles — rendered with the real
// global t-* classes, so sizes step up with the viewport like the site does
const TypeTester = () => {
	// State
	const [style, setStyle] = useState('headlineL');
	const [text, setText] = useState('Built for motion');

	// Render
	return (
		<div className={s.jacket}>
			<fieldset className={s.styles}>
				<legend className={s.legend}>Type style</legend>
				{TYPE_STYLES.map(name => (
					<button
						key={name}
						type='button'
						aria-pressed={style === name}
						className={s.style}
						onClick={() => setStyle(name)}
					>
						{name}
					</button>
				))}
			</fieldset>

			<label className={s.field}>
				<span>Sample text</span>
				<input type='text' value={text} onChange={event => setText(event.target.value)} maxLength={80} />
			</label>

			<p className={`t-${style} ${s.preview}`}>{text || 'Type something'}</p>

			<Code
				label='Three ways to use it'
				code={`.title { @include ${style}; }      // a mixin, in a module

<h2 className='t-${style}'>…</h2>   // a global class
<p data-type='${style}'>…</p>        // a data attribute`}
			/>
		</div>
	);
};

// Exports
// ------------
TypeTester.displayName = 'TypeTester';
export default TypeTester;
