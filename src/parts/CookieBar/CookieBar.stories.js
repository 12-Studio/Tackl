import React from 'react';
import CookieBar from './';

export default {
    title: 'Components/CookieBar',
    component: CookieBar,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        onAccept: { action: 'accepted' },
        onDecline: { action: 'declined' },
        className: { control: 'text' },
    },
};

// Template for all stories
const Template = args => <CookieBar {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
    message: 'This website uses cookies to ensure you get the best experience.',
    acceptButtonText: 'Accept',
    declineButtonText: 'Decline',
};

// Story with custom message and button text
export const CustomText = Template.bind({});
CustomText.args = {
    message:
        'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience.',
    acceptButtonText: 'Got it',
    declineButtonText: 'No thanks',
};

// Story with long message
export const LongMessage = Template.bind({});
LongMessage.args = {
    message:
        'We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.',
    acceptButtonText: 'Accept All Cookies',
    declineButtonText: 'Reject Non-Essential',
};
