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
import React, { useEffect, useState } from 'react';
import { storage } from '@utils/useLocalStorage';

// Styles
// ------------
import { Jacket } from './styles';

// Constants
// ------------
const COOKIE_CONSENT_KEY = 'cookie-consent-given';

// Component
// ------------
const CookieBar = () => {
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
    };

    /**
     * Handles the user declining cookie usage
     * Stores decline preference and removes any existing cookies
     */
    const handleDecline = () => {
        storage.set(COOKIE_CONSENT_KEY, false);
        // Remove any existing tracking cookies
        document.cookie.split(';').forEach(cookie => {
            const [name] = cookie.split('=');
            document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <Jacket>
            <p>
                This website uses cookies to enhance your experience. By continuing to use this site, you agree to our
                use of cookies.
            </p>
            <div>
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleDecline}>Decline</button>
            </div>
        </Jacket>
    );
};

// Exports
// ------------
export default CookieBar;
