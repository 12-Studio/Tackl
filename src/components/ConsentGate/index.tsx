'use client';

/**
 * ConsentGate Component
 * ==================
 * Renders its children only once the visitor has consented to a cookie
 * category, and as soon as they do — no reload needed.
 *
 * <ConsentGate category='analytics'>
 * 	<Script src='https://www.googletagmanager.com/gtag/js?id=G-XXXX' />
 * </ConsentGate>
 *
 * <ConsentGate category='marketing' fallback={<p>Accept marketing cookies to watch this video.</p>}>
 * 	<iframe src='https://www.youtube.com/embed/…' title='…' />
 * </ConsentGate>
 */

// Imports
// ------------
import { hasConsent, onConsentChange } from '@parts/CookieBar/consent';
import { useSyncExternalStore } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Helpers
// ------------
// NOTE • Never granted on the server — gated content is client-only, so it
// can't run before the stored choice has been read
const getServerSnapshot = () => false;

// Component
// ------------
const ConsentGate = ({ category, children, fallback = null }: I.ConsentGateProps) => {
	// State
	const isGranted = useSyncExternalStore(onConsentChange, () => hasConsent(category), getServerSnapshot);

	// Render
	return isGranted ? children : fallback;
};

// Exports
// ------------
ConsentGate.displayName = 'ConsentGate';
export default ConsentGate;
