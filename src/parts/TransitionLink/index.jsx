'use client';

/**
 * TransitionLink Component
 *
 * A custom Link component that adds page transition animations when navigating between pages.
 * This component wraps Next.js Link component and adds a smooth transition effect by:
 * 1. Preventing default navigation
 * 2. Adding a transition class to trigger animation
 * 3. Waiting for animation to complete
 * 4. Performing the navigation
 * 5. Cleaning up the transition class
 *
 * Performance optimizations:
 * - Memoized sleep function to prevent recreation on each render
 * - Cached body element reference using useRef
 * - Constant transition duration defined outside component
 */

// Imports
// ------------
import React, { useCallback, useRef } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

// Constants
// ------------
const TRANSITION_DURATION = 750; // Duration in milliseconds for transition animation

// Component
// ------------
const TransitionLink = ({ children, to, className, ...props }) => {
	// Hooks
	const router = useRouter();
	const bodyRef = useRef(null);

	// Memoized sleep function to prevent recreation on each render
	const sleep = useCallback(
		(ms) => new Promise((resolve) => setTimeout(resolve, ms)),
		[]
	);

	// Handle click with transition animation
	const handleClick = useCallback(
		async (e) => {
			e.preventDefault();

			// Cache body reference
			if (!bodyRef.current) {
				bodyRef.current = document.querySelector('body');
			}

			try {
				// Start transition
				bodyRef.current?.classList.add('page-transition');
				// Wait for initial animation
				await sleep(TRANSITION_DURATION);

				// Navigate to new page immediately after animation
				router.push(to);

				// Wait for exit animation to complete before cleanup
				// await sleep(TRANSITION_DURATION / 2);
			} finally {
				// Cleanup - ensure transition class is removed even if navigation fails
				bodyRef.current?.classList.remove('page-transition');
			}
		},
		[router, to, sleep]
	);

	// Prepare link props
	const linkProps = {
		href: to,
		className,
		onClick: handleClick,
		...props,
	};

	return <Link {...linkProps}>{children}</Link>;
};

// PropTypes
// ------------
TransitionLink.propTypes = {
	/** Target URL for navigation */
	to: PropTypes.string.isRequired,
	/** Content to be rendered inside the link */
	children: PropTypes.node.isRequired,
	/** Optional className for styling */
	className: PropTypes.string,
};

// Exports
// ------------
export default React.memo(TransitionLink);
