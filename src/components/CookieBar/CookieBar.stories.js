/**
 * CookieBar Stories
 * ================
 * Storybook stories for the CookieBar component, demonstrating various use cases
 * and configurations of the cookie consent banner.
 *
 * The CookieBar component is used to display a cookie consent notice to users,
 * allowing them to accept or decline the use of cookies on the site.
 *
 * @component CookieBar
 */

import React from 'react';
import CookieBar from './';

export default {
    title: 'Components/CookieBar',
    component: CookieBar,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        /** Callback fired when user accepts cookies */
        onAccept: { action: 'accepted' },
        /** Callback fired when user declines cookies */
        onDecline: { action: 'declined' },
        /** Optional className for custom styling */
        className: { control: 'text' },
    },
};

/**
 * Template for all CookieBar stories
 * @param {Object} args - Story arguments
 */
const Template = args => <CookieBar {...args} />;

/**
 * Default story showing basic cookie notice configuration
 */
export const Default = Template.bind({});
Default.args = {
    message: 'This website uses cookies to ensure you get the best experience.',
    acceptButtonText: 'Accept',
    declineButtonText: 'Decline',
};

/**
 * Story demonstrating custom message and button text
 */
export const CustomText = Template.bind({});
CustomText.args = {
    message:
        'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience.',
    acceptButtonText: 'Got it',
    declineButtonText: 'No thanks',
};

/**
 * Story showing how the component handles a longer, more detailed message
 */
export const LongMessage = Template.bind({});
LongMessage.args = {
    message:
        'We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.',
    acceptButtonText: 'Accept All Cookies',
    declineButtonText: 'Reject Non-Essential',
};
