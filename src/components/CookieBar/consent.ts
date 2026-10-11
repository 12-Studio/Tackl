// Property Documentation
// ------------

// NOTE • The consent store, shared by the CookieBar, ConsentGate, your own
// code and the root layout (server). Kept free of 'use client' so the layout
// can inline the head script below, and any module can gate on hasConsent().

// Imports
// ------------
import type * as I from './interface';

// Config
// ------------
// NOTE • Bump CONSENT_VERSION whenever the categories or the privacy policy
// change in a way visitors should re-consent to — older choices are ignored
// and the banner shows again.
export const CONSENT_KEY = 'tackl-cookie-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 365;

// NOTE • Optional categories — "necessary" is implicit and always granted.
// Add a category here, then give it a label in the CookieBar's CATEGORIES.
export const OPTIONAL_CATEGORIES = ['analytics', 'marketing'] as const;

// NOTE • Set on <html> once a valid choice exists: the granted categories,
// space-separated, or 'necessary' when only those are allowed. CSS can read
// it — html[data-cookie-consent~='analytics'] — and the CookieBar hides
// itself whenever it's present.
export const CONSENT_ATTRIBUTE = 'data-cookie-consent';

const CHANGE_EVENT = 'tackl:cookie-consent';
const SETTINGS_EVENT = 'tackl:cookie-settings';

// Helpers
// ------------
const NO_CONSENT: I.Consent = { analytics: false, marketing: false };

const toAttributeValue = (consent: I.Consent): string => {
	const granted = OPTIONAL_CATEGORIES.filter(category => consent[category]);
	return granted.length ? granted.join(' ') : 'necessary';
};

const isRecord = (value: unknown): value is I.ConsentRecord => {
	if (typeof value !== 'object' || value === null) return false;
	const record = value as Partial<I.ConsentRecord>;
	return record.version === CONSENT_VERSION && typeof record.at === 'string' && typeof record.consent === 'object';
};

// NOTE • The visitor's current choice per optional category, or null when
// they haven't chosen yet (never asked, expired, outdated or storage blocked)
export const getConsent = (): I.Consent | null => {
	if (typeof window === 'undefined') return null;

	try {
		const record: unknown = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? 'null');
		if (!isRecord(record)) return null;

		const at = Date.parse(record.at);
		if (!Number.isFinite(at) || Date.now() - at > CONSENT_TTL_MS) return null;

		return Object.fromEntries(
			OPTIONAL_CATEGORIES.map(category => [category, record.consent?.[category] === true])
		) as I.Consent;
	} catch {
		return null;
	}
};

// NOTE • The one check to gate anything non-essential on:
// if (hasConsent('analytics')) initAnalytics();
export const hasConsent = (category: I.ConsentCategory): boolean =>
	category === 'necessary' || getConsent()?.[category] === true;

export const saveConsent = (consent: I.Consent): void => {
	const record: I.ConsentRecord = { version: CONSENT_VERSION, at: new Date().toISOString(), consent };

	try {
		localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
	} catch {
		// NOTE • Storage blocked — the choice still applies for this page view
	}

	document.documentElement.setAttribute(CONSENT_ATTRIBUTE, toAttributeValue(consent));
	window.dispatchEvent(new CustomEvent<I.Consent>(CHANGE_EVENT, { detail: consent }));
};

// NOTE • Fires whenever the visitor saves a choice — returns an unsubscribe
export const onConsentChange = (callback: (consent: I.Consent) => void): (() => void) => {
	const handle = (event: Event) => callback((event as CustomEvent<I.Consent>).detail);
	window.addEventListener(CHANGE_EVENT, handle);
	return () => window.removeEventListener(CHANGE_EVENT, handle);
};

// NOTE • Reopens the CookieBar on its preferences — wire it to a "Cookie
// settings" link (e.g. in the footer) so changing your mind is as easy as
// choosing in the first place
export const openCookieSettings = (): void => {
	window.dispatchEvent(new Event(SETTINGS_EVENT));
};

export const onOpenCookieSettings = (callback: () => void): (() => void) => {
	window.addEventListener(SETTINGS_EVENT, callback);
	return () => window.removeEventListener(SETTINGS_EVENT, callback);
};

export const noConsent = (): I.Consent => ({ ...NO_CONSENT });

// Head script
// ------------
// NOTE • Runs in <head> before first paint. The banner is server-rendered so
// it paints with the page (instead of popping in after hydration and becoming
// a late LCP element); this marks <html> for returning visitors so it never
// flashes for them. Mirrors getConsent() and toAttributeValue() above.
export const consentScript = `(function(){try{var r=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_KEY)}));var t=r&&Date.parse(r.at);if(r&&r.version===${CONSENT_VERSION}&&r.consent&&isFinite(t)&&Date.now()-t<=${CONSENT_TTL_MS}){var g=${JSON.stringify(OPTIONAL_CATEGORIES)}.filter(function(c){return r.consent[c]===true});document.documentElement.setAttribute(${JSON.stringify(CONSENT_ATTRIBUTE)},g.length?g.join(' '):'necessary')}}catch(e){}})();`;
