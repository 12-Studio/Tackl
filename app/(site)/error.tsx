'use client';

// Imports
// ------------
import StatusPage, { actionClass } from '@parts/StatusPage';
import { useEffect } from 'react';

// Interfaces
// ------------
type ErrorProps = {
	error: Error & { digest?: string };
	retry: () => void;
};

// Component
// ------------
// NOTE • Catches errors thrown while rendering a page — the site layout
// (header, smooth scroll) stays up around it. Errors in the layout itself
// fall through to app/global-error.tsx.
const ErrorPage = ({ error, retry }: ErrorProps) => {
	// Effects
	// NOTE • Swap for your error reporting (Sentry etc.). In production the
	// message is generic; error.digest matches the server log entry.
	useEffect(() => {
		console.error(error);
	}, [error]);

	// Render
	return (
		<StatusPage
			title='Something went wrong'
			message='Sorry — this page failed to load. Trying again usually fixes it.'
		>
			<title>Something went wrong — Tackl</title>
			<button type='button' className={actionClass} onClick={retry}>
				Try again
			</button>
		</StatusPage>
	);
};

// Exports
// ------------
export default ErrorPage;
