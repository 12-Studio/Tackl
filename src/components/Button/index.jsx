'use client';

/**
 * Button Component
 *
 * A custom Link component that adds page transition animations when navigating between pages.
 * This component wraps Next.js Link component and adds a smooth transition effect by:
 * 1. Preventing default navigation
 * 2. Adding a transition class to trigger animation
 * 3. Waiting for animation to complete
 * 4. Performing the navigation
 * 5. Cleaning up the transition class
 *
 * @component
 * @example
 * ```jsx
 * <Button to="/about">
 *   Go to About Page
 * </Button>
 * ```
 */

// Imports
// ------------
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import usePageTransition from '@utils/usePageTransition';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Button = ({ children, to, className, ...props }) => {
    // Hooks
    const router = useRouter();
    const pageTransition = usePageTransition(router);

    const handleClick = e => {
        e.preventDefault();
        pageTransition(to);
    };

    // Prepare link props
    const linkProps = {
        href: to,
        onClick: handleClick,
        className,
        ...props,
    };

    return <Jacket {...linkProps}>{children}</Jacket>;
};

// PropTypes
// ------------
Button.propTypes = {
    /** Target URL for navigation */
    to: PropTypes.string.isRequired,
    /** Content to be rendered inside the link */
    children: PropTypes.node.isRequired,
    /** Optional className for styling */
    className: PropTypes.string,
};

Button.defaultProps = {
    className: '',
};

// Exports
// ------------
export default React.memo(Button);
