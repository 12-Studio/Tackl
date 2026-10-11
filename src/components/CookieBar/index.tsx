'use client';

/**
 * CookieBar Component
 * ==================
 * A cookie consent manager: Accept All, Accept Necessary, or choose per
 * category. Nothing optional is pre-selected, and rejecting is one click,
 * just like accepting.
 *
 * - Gate scripts and embeds with <ConsentGate category='analytics'> or
 *   hasConsent('analytics') from './consent'
 * - Let visitors change their mind: call openCookieSettings() from a
 *   "Cookie settings" link (e.g. in the footer)
 * - Withdrawing a category clears readable cookies and reloads the page, so
 *   scripts that already ran are unloaded
 *
 * @component
 */

// Imports
// ------------
import { cx } from '@utils/cx';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { getConsent, noConsent, OPTIONAL_CATEGORIES, onOpenCookieSettings, saveConsent } from './consent';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
const CATEGORIES: Record<I.ConsentCategory, { label: string; description: string }> = {
	necessary: {
		label: 'Necessary',
		description: 'Required for the site to work properly. Always on.',
	},
	analytics: {
		label: 'Analytics',
		description: 'Help us understand how visitors use the site, so we can improve it.',
	},
	marketing: {
		label: 'Marketing',
		description: 'Used to personalise ads and measure how well campaigns perform.',
	},
};

// NOTE • Cookies to keep when a category is withdrawn — add your necessary
// first-party cookies here (httpOnly cookies are out of reach anyway)
const NECESSARY_COOKIES: string[] = [];

// Helpers
// ------------
const allConsent = (): I.Consent =>
	Object.fromEntries(OPTIONAL_CATEGORIES.map(category => [category, true])) as I.Consent;

const isWithdrawn = (previous: I.Consent | null, next: I.Consent): boolean =>
	OPTIONAL_CATEGORIES.some(category => previous?.[category] && !next[category]);

// NOTE • Best-effort — expires every readable cookie except the necessary
// ones, across the host and its parent-domain variant
const expireCookies = (): void => {
	const domains = ['', window.location.hostname, `.${window.location.hostname}`];

	for (const cookie of document.cookie.split(';')) {
		const name = cookie.split('=')[0]?.trim();
		if (!name || NECESSARY_COOKIES.includes(name)) continue;
		for (const domain of domains) {
			// biome-ignore lint/suspicious/noDocumentCookie: expiring a cookie is done by writing document.cookie directly
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domain ? `;domain=${domain}` : ''}`;
		}
	}
};

// Component
// ------------
const CookieBar = ({
	title = 'We use cookies!',
	message = 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.',
	privacyHref = '/privacy-policy/',
	className,
}: I.CookieBarProps) => {
	// Refs
	const choicesRef = useRef<HTMLFieldSetElement>(null);

	// State
	// NOTE • Rendered on the server so the banner paints with the page; for
	// returning visitors the head script in app/(site)/layout.tsx has already
	// marked <html>, and CSS keeps it hidden until it's removed below
	const [isOpen, setIsOpen] = useState(true);
	const [isChoosing, setIsChoosing] = useState(false);
	const [isReopened, setIsReopened] = useState(false);
	const [choices, setChoices] = useState<I.Consent>(noConsent);

	// Derived
	const id = useId();
	const titleId = `${id}-title`;

	// Handlers
	const commit = (consent: I.Consent) => {
		const previous = getConsent();
		saveConsent(consent);
		setIsOpen(false);
		setIsChoosing(false);
		setIsReopened(false);

		// NOTE • Scripts that already ran can't be unloaded — clear what they
		// left behind and start the page fresh without them
		if (isWithdrawn(previous, consent)) {
			expireCookies();
			window.location.reload();
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		// NOTE • Only a reopened panel can be dismissed without choosing — a
		// first visit needs an answer
		if (event.key === 'Escape' && isReopened) {
			setIsOpen(false);
			setIsReopened(false);
		}
	};

	const toggleChoice = (category: I.OptionalCategory) => {
		setChoices(current => ({ ...current, [category]: !current[category] }));
	};

	// Effects
	// NOTE • Drop the server-rendered banner when a valid choice exists
	useEffect(() => {
		if (getConsent()) setIsOpen(false);
	}, []);

	// NOTE • openCookieSettings() reopens straight onto the preferences
	useEffect(
		() =>
			onOpenCookieSettings(() => {
				setChoices(getConsent() ?? noConsent());
				setIsChoosing(true);
				setIsReopened(true);
				setIsOpen(true);
			}),
		[]
	);

	// NOTE • "Let me choose" disappears once clicked, so hand focus to the
	// first choice rather than dropping it on <body>
	useEffect(() => {
		if (isChoosing) choicesRef.current?.querySelector<HTMLInputElement>('input:enabled')?.focus();
	}, [isChoosing]);

	// Render
	if (!isOpen) return null;

	return (
		<section
			className={cx(s.jacket, className)}
			aria-labelledby={titleId}
			data-reopened={isReopened || undefined}
			onKeyDown={handleKeyDown}
		>
			<h2 id={titleId} className={s.title}>
				{title}
			</h2>

			<p className={s.message}>
				{message}{' '}
				{!isChoosing && (
					<button type='button' className={s.link} onClick={() => setIsChoosing(true)}>
						Let me choose
					</button>
				)}
			</p>

			{isChoosing && (
				<fieldset ref={choicesRef} className={s.choices}>
					<legend className={s.legend}>Cookie preferences</legend>

					<label className={s.choice}>
						<input type='checkbox' checked disabled />
						<span className={s.label}>{CATEGORIES.necessary.label}</span>
						<span className={s.description}>{CATEGORIES.necessary.description}</span>
					</label>

					{OPTIONAL_CATEGORIES.map(category => (
						<label key={category} className={s.choice}>
							<input
								type='checkbox'
								checked={choices[category]}
								onChange={() => toggleChoice(category)}
							/>
							<span className={s.label}>{CATEGORIES[category].label}</span>
							<span className={s.description}>{CATEGORIES[category].description}</span>
						</label>
					))}
				</fieldset>
			)}

			<div className={s.actions}>
				<button type='button' className={s.primary} onClick={() => commit(allConsent())}>
					Accept All
				</button>

				{isChoosing ? (
					<button type='button' className={s.secondary} onClick={() => commit(choices)}>
						Save Choices
					</button>
				) : (
					<button type='button' className={s.secondary} onClick={() => commit(noConsent())}>
						Accept Necessary
					</button>
				)}
			</div>

			<Link href={privacyHref} className={s.link} prefetch={false}>
				Privacy policy
			</Link>
		</section>
	);
};

// Exports
// ------------
CookieBar.displayName = 'CookieBar';
export default CookieBar;
