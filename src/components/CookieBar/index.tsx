'use client';

/**
 * CookieBar Component
 * ==================
 * A cookie consent banner with an explicit, revocable choice.
 *
 * Compliance notes:
 * - Consent is an active choice — Accept and Decline are equally prominent,
 *   and nothing non-essential should run until getCookieConsent() === true
 * - The stored choice expires after a year, so consent is re-requested
 * - resetCookieConsent() withdraws the choice and reopens the banner — wire
 *   it to a "Cookie settings" link (e.g. in the footer) so withdrawing is as
 *   easy as consenting
 *
 * Usage:
 * - Gate integrations on the stored choice or the change event:
 *   `if (getCookieConsent()) initAnalytics();`
 *   `window.addEventListener(COOKIE_CONSENT_EVENT, e => { … })`
 * - Or pass onAccept/onDecline — they re-fire on every visit with a stored
 *   choice, so analytics can initialise in one place
 *
 * @component
 */

// Imports
// ------------
import { isDocument } from '@utils/isDocument';
import { storage } from '@utils/useLocalStorage';
import { useCallback, useEffect, useRef, useState } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import { Jacket } from './styles';

// Constants
// ------------
const CONSENT_KEY = 'tackl-cookie-consent';
const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 365;

export const COOKIE_CONSENT_EVENT = 'tackl:cookie-consent';

// Helpers
// ------------
// NOTE • The current choice — true/false, or null for "not asked yet"
// (never asked, expired, or withdrawn). Gate anything non-essential on
// getCookieConsent() === true.
export const getCookieConsent = (): boolean | null => {
	if (!isDocument()) return null;
	const record = storage.get<I.ConsentRecord>(CONSENT_KEY);
	if (!record || typeof record.accepted !== 'boolean') return null;
	const at = Date.parse(record.at);
	if (!Number.isFinite(at) || Date.now() - at > CONSENT_TTL_MS) return null;
	return record.accepted;
};

// NOTE • Withdraw the stored choice and reopen the banner — call this from a
// "Cookie settings" link so withdrawing consent is as easy as giving it
export const resetCookieConsent = (): void => {
	if (!isDocument()) return;
	storage.remove(CONSENT_KEY);
	window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { accepted: null } }));
};

// NOTE • Best-effort clean-up on decline — expires every readable cookie on
// this path, including host/domain variants
const expireCookies = (): void => {
	if (!isDocument()) return;
	const domains = ['', window.location.hostname, `.${window.location.hostname}`];

	for (const cookie of document.cookie.split(';')) {
		const name = cookie.split('=')[0]?.trim();
		if (!name) continue;
		for (const domain of domains) {
			// biome-ignore lint/suspicious/noDocumentCookie: expiring a cookie is done by writing document.cookie directly
			document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domain ? `;domain=${domain}` : ''}`;
		}
	}
};

// Component
// ------------
const CookieBar = ({
	message = 'We use cookies to analyse traffic and improve your experience. The site works the same whichever you choose.',
	acceptButtonText = 'Accept',
	declineButtonText = 'Decline',
	onAccept = () => {},
	onDecline = () => {},
	className = '',
}: I.CookieBarProps) => {
	// Refs
	// NOTE • Kept in refs so the mount effect runs once but always calls the
	// latest callbacks
	const onAcceptRef = useRef(onAccept);
	const onDeclineRef = useRef(onDecline);
	onAcceptRef.current = onAccept;
	onDeclineRef.current = onDecline;

	// State
	const [isVisible, setIsVisible] = useState(false);

	// Handlers
	const storeChoice = useCallback((accepted: boolean) => {
		storage.set<I.ConsentRecord>(CONSENT_KEY, { accepted, at: new Date().toISOString() });
		window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { accepted } }));
		setIsVisible(false);
	}, []);

	const handleAccept = () => {
		storeChoice(true);
		onAcceptRef.current();
	};

	const handleDecline = () => {
		storeChoice(false);
		expireCookies();
		onDeclineRef.current();
	};

	// Effects
	// NOTE • On every visit: show the banner when there's no valid choice,
	// otherwise re-fire the stored choice so integrations initialise here
	useEffect(() => {
		const consent = getCookieConsent();
		if (consent === null) {
			setIsVisible(true);
			return;
		}
		if (consent) {
			onAcceptRef.current();
		} else {
			onDeclineRef.current();
		}
	}, []);

	// NOTE • Reopen when resetCookieConsent() withdraws the choice
	useEffect(() => {
		const handleConsentEvent = (event: Event) => {
			if ((event as CustomEvent<I.ConsentDetail>).detail?.accepted === null) setIsVisible(true);
		};

		window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentEvent);
		return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentEvent);
	}, []);

	// Render
	if (!isVisible) return null;

	return (
		<Jacket className={className} aria-label='Cookie consent'>
			<p>{message}</p>
			<div>
				<button type='button' onClick={handleAccept}>
					{acceptButtonText}
				</button>
				<button type='button' onClick={handleDecline}>
					{declineButtonText}
				</button>
			</div>
		</Jacket>
	);
};

// Exports
// ------------
export default CookieBar;
