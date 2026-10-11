// Imports
// ------------
import StatusPage, { actionClass } from '@parts/StatusPage';
import { inter } from '@theme/fonts';
import type { Metadata } from 'next';

// Styles
// ------------
// NOTE • This page skips every layout, so it brings its own styles and font
import '@css/tokens.css';
import '@css/global.scss';

// SEO
// ------------
export const metadata: Metadata = {
	title: 'Page not found — Tackl',
};

// Component
// ------------
// NOTE • Served for any URL that matches no route. The app has more than one
// root layout ((site) and, with Sanity, (studio)), so there's no single
// layout to build a 404 from — hence experimental.globalNotFound in
// next.config.js. A plain <a> on purpose: the site's router isn't mounted here.
const GlobalNotFound = () => (
	<html lang='en' className={inter.variable}>
		<body>
			<StatusPage
				code='404'
				title='Page not found'
				message="The page you're looking for doesn't exist or has moved."
			>
				<a href='/' className={actionClass}>
					Back to home
				</a>
			</StatusPage>
		</body>
	</html>
);

// Exports
// ------------
export default GlobalNotFound;
