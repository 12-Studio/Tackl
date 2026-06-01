'use client';

import { useIsPresentationTool } from 'next-sanity/hooks';

const DisableDraftMode = () => {
	const isPresentationTool = useIsPresentationTool();

	if (isPresentationTool) {
		return null;
	}

	return (
		<a
			href="/api/draft-mode/disable/"
			style={{
				position: 'fixed',
				bottom: 16,
				right: 16,
				zIndex: 9999,
				padding: '8px 16px',
				borderRadius: 9999,
				background: '#111',
				color: '#fff',
				fontSize: 14,
				textDecoration: 'none',
			}}
		>
			Exit draft preview
		</a>
	);
};

DisableDraftMode.displayName = 'DisableDraftMode';
export default DisableDraftMode;
