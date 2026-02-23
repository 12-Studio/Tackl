'use client';

/**
 * Registry for Styled Components in Next.js
 *
 * This component handles server-side rendering (SSR) of styled-components styles.
 * It ensures styles are properly extracted during SSR and injected into the page,
 * preventing flash of unstyled content (FOUC).
 *
 * How it works:
 * 1. Creates a style sheet instance to collect styles during SSR
 * 2. Injects collected styles into the page head via useServerInsertedHTML
 * 3. On client-side, renders children directly since styles are already injected
 * 4. On server-side, wraps children in StyleSheetManager to collect styles
 */

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({ children }) {
	// Initialize style sheet once using useState to maintain instance across renders
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

	// Hook to inject styles during SSR
	useServerInsertedHTML(() => {
		// Extract styles that were collected
		const styles = styledComponentsStyleSheet.getStyleElement();
		// Clean up the style tag to prevent memory leaks
		styledComponentsStyleSheet.instance.clearTag();
		return <>{styles}</>;
	});

	// On client-side, render children directly since styles are already injected
	if (typeof window !== 'undefined') {
		return <>{children}</>;
	}

	// On server-side, wrap children to collect styles during rendering
	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			{children}
		</StyleSheetManager>
	);
}
