// Property Documentation
// ------------

// NOTE • Consent storage shared by the CookieBar (client) and the root layout
// (server). Kept free of 'use client' so the layout can inline the head
// script below without pulling the component into the server bundle.

// Exports
// ------------
export const CONSENT_KEY = 'tackl-cookie-consent';
export const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 365;

// NOTE • The attribute set on <html> once a valid choice exists — the
// CookieBar's CSS hides the banner whenever it's present
export const CONSENT_ATTRIBUTE = 'data-cookie-consent';

// NOTE • Runs in <head> before first paint. The banner is server-rendered so
// it paints with the page (instead of popping in after hydration and
// becoming a late LCP element); this marks <html> for returning visitors so
// it never flashes for them. Mirrors getCookieConsent() in the CookieBar.
export const consentScript = `(function(){try{var r=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_KEY)}));var t=r&&Date.parse(r.at);if(r&&typeof r.accepted==='boolean'&&isFinite(t)&&Date.now()-t<=${CONSENT_TTL_MS}){document.documentElement.setAttribute(${JSON.stringify(CONSENT_ATTRIBUTE)},r.accepted?'accepted':'declined')}}catch(e){}})();`;
