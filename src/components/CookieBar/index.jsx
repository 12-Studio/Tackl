'use client';

/**
 * CookieBar Component
 * ==================
 * A React component that displays a cookie consent banner to users and manages their cookie preferences.
 *
 * Features:
 * - Displays a cookie consent banner on first visit
 * - Allows users to accept or decline cookie usage
 * - Stores user preference in local storage
 * - Removes existing cookies if user declines
 * - Automatically hides if consent was previously given
 *
 * @component
 */

// Imports
// ------------
import { isDocument } from '@utils/isDocument';
import { storage } from '@utils/useLocalStorage';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Styles
// ------------
import { Jacket } from './styles';

// Constants
// ------------
const COOKIE_CONSENT_KEY = 'cookie-consent-given';

// Component
// ------------
const CookieBar = ({
	message = 'This website uses cookies to enhance your experience. By continuing to use this site, you agree to our use of cookies.',
	acceptButtonText = 'Accept',
	declineButtonText = 'Decline',
	onAccept = () => {},
	onDecline = () => {},
	className = '',
}) => {
	/** State to control visibility of the cookie banner */
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Check if user has already given consent
		const hasConsent = storage.get(COOKIE_CONSENT_KEY);
		if (hasConsent === null) {
			setIsVisible(true);
		}
	}, []);

	/**
	 * Handles the user accepting cookie usage
	 * Stores consent in local storage and hides the banner
	 */
	const handleAccept = () => {
		storage.set(COOKIE_CONSENT_KEY, true);
		setIsVisible(false);
		if (onAccept) onAccept();
	};

	/**
	 * Handles the user declining cookie usage
	 * Stores decline preference and removes any existing cookies
	 */
	const handleDecline = () => {
		storage.set(COOKIE_CONSENT_KEY, false);
		// Remove any existing tracking cookies
		if (isDocument()) {
			document.cookie.split(';').forEach(cookie => {
				const [name] = cookie.split('=');
				document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
			});
		}
		setIsVisible(false);
		if (onDecline) onDecline();
	};

	if (!isVisible) return null;

	return (
		<Jacket className={className}>
			<p>{message}</p>
			<div>
				<button onClick={handleAccept}>{acceptButtonText}</button>
				<button onClick={handleDecline}>{declineButtonText}</button>
			</div>
		</Jacket>
	);
};

// PropTypes
// ------------
CookieBar.propTypes = {
	message: PropTypes.string,
	acceptButtonText: PropTypes.string,
	declineButtonText: PropTypes.string,
	onAccept: PropTypes.func,
	onDecline: PropTypes.func,
	className: PropTypes.string,
};

// Exports
// ------------
export default CookieBar;
