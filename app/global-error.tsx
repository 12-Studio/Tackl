'use client';

// Imports
// ------------
import StatusPage, { actionClass } from '@parts/StatusPage';
import { inter } from '@theme/fonts';
import { useEffect } from 'react';

// Styles
// ------------
// NOTE • Replaces the root layout when it fails, so it brings its own
// document, styles and font
import '@css/tokens.css';
import '@css/global.scss';

// Interfaces
// ------------
type GlobalErrorProps = {
	error: Error & { digest?: string };
	retry: () => void;
};

// Component
// ------------
// NOTE • The last line of defence — only shown when the root layout itself
// throws. Page-level errors are handled by app/(site)/error.tsx.
const GlobalError = ({ error, retry }: GlobalErrorProps) => {
	// Effects
	useEffect(() => {
		console.error(error);
	}, [error]);

	// Render
	return (
		<html lang='en' className={inter.variable}>
			<body>
				<title>Something went wrong — Tackl</title>
				<StatusPage
					title='Something went wrong'
					message='Sorry — the site failed to load. Trying again usually fixes it.'
				>
					<button type='button' className={actionClass} onClick={retry}>
						Try again
					</button>
				</StatusPage>
			</body>
		</html>
	);
};

// Exports
// ------------
export default GlobalError;
