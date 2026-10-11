// Imports
// ------------
import ConsentGate from '@parts/ConsentGate';
import Script from 'next/script';

// Constants
// ------------
// NOTE • Off until NEXT_PUBLIC_GA_ID is set (e.g. G-XXXXXXX) — then GA4 loads
// only after the visitor accepts analytics cookies, and the CSP in
// next.config.js opens up to Google's domains automatically. GA4 tracks
// client-side navigations itself (enhanced measurement → page changes).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Component
// ------------
// NOTE • The pattern for any tracking script: wrap it in ConsentGate with
// its category, so it never runs before consent and starts the moment
// consent is given. See docs/Tackl/CookieConsent.md.
const Analytics = () => {
	if (!GA_ID) return null;

	return (
		<ConsentGate category='analytics'>
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy='afterInteractive' />
			<Script id='google-analytics' strategy='afterInteractive'>
				{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
			</Script>
		</ConsentGate>
	);
};

// Exports
// ------------
Analytics.displayName = 'Analytics';
export default Analytics;
