// Imports
// ------------
import StatusPage, { actionClass } from '@parts/StatusPage';
import Link from 'next/link';

// Component
// ------------
// NOTE • Shown inside the site layout when a page calls notFound() — URLs that
// match no route at all get app/global-not-found.tsx instead. A nested
// not-found can't export metadata, so the title is a React <title>; Next
// adds noindex to 404 responses itself.
const NotFound = () => (
	<StatusPage code='404' title='Page not found' message="The page you're looking for doesn't exist or has moved.">
		<title>Page not found — Tackl</title>
		<Link href='/' className={actionClass}>
			Back to home
		</Link>
	</StatusPage>
);

// Exports
// ------------
export default NotFound;
