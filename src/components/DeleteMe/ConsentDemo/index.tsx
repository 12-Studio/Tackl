'use client';

// Imports
// ------------
import ConsentGate from '@parts/ConsentGate';
import { getConsent, onConsentChange, openCookieSettings } from '@parts/CookieBar/consent';
import type { Consent } from '@parts/CookieBar/interface';
import { useEffect, useState } from 'react';
import Code from '../Code';

// Styles
// ------------
import s from './styles.module.scss';

// Constants
// ------------
const IS_DEV = process.env.NODE_ENV === 'development';

// Component
// ------------
// NOTE • The real consent manager, live: the state below is this visitor's
// stored choice, the button reopens the real banner, and the gated box
// appears the moment marketing cookies are allowed
const ConsentDemo = () => {
	// State
	const [consent, setConsent] = useState<Consent | null>(null);

	// Effects
	useEffect(() => {
		setConsent(getConsent());
		return onConsentChange(setConsent);
	}, []);

	// Render
	return (
		<div className={s.jacket}>
			<ul className={s.state} aria-live='polite'>
				<li data-granted>Necessary</li>
				<li data-granted={consent?.analytics || undefined}>Analytics</li>
				<li data-granted={consent?.marketing || undefined}>Marketing</li>
			</ul>

			<button type='button' className={s.button} onClick={openCookieSettings}>
				Change cookie settings
			</button>

			{IS_DEV && (
				<p className={s.note}>
					The cookie banner only renders in production builds — run bun run build &amp;&amp; bun run start to
					try it.
				</p>
			)}

			<ConsentGate
				category='marketing'
				fallback={
					<p className={s.gate}>Gated: allow marketing cookies and this box unlocks instantly — no reload.</p>
				}
			>
				<p className={s.gate} data-open>
					Unlocked. This is where a YouTube embed or ad pixel would load.
				</p>
			</ConsentGate>

			<Code
				label='index.tsx'
				code={`<ConsentGate category='marketing' fallback={<Placeholder />}>
  <iframe src='https://www.youtube-nocookie.com/embed/…' title='Showreel' />
</ConsentGate>`}
			/>
		</div>
	);
};

// Exports
// ------------
ConsentDemo.displayName = 'ConsentDemo';
export default ConsentDemo;
