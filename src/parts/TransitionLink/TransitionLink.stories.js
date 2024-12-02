import TransitionLink from './index';
import { createContext } from 'react';

// Create mock AppRouterContext since we can't import directly from Next.js internals
const AppRouterContext = createContext({
    push: () => {},
    replace: () => {},
    prefetch: () => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
});

export default {
    title: 'Components/TransitionLink',
    component: TransitionLink,
    parameters: {
        layout: 'centered',
        nextjs: {
            appDirectory: true,
            navigation: {
                push: () => {},
                replace: () => {},
                prefetch: () => {},
                back: () => {},
                forward: () => {},
                refresh: () => {},
            },
        },
    },
    decorators: [
        Story => (
            <AppRouterContext.Provider
                value={{
                    push: () => {},
                    replace: () => {},
                    prefetch: () => {},
                    back: () => {},
                    forward: () => {},
                    refresh: () => {},
                }}
            >
                <Story />
            </AppRouterContext.Provider>
        ),
    ],
    argTypes: {
        to: {
            control: 'text',
            description: 'Target URL for navigation',
        },
        className: {
            control: 'text',
            description: 'Optional className for styling',
        },
        children: {
            control: 'text',
            description: 'Content to be rendered inside the link',
        },
    },
};

// Default story
export const Default = {
    args: {
        to: '/about',
        children: 'Click to Navigate',
    },
};

// With custom className
export const WithCustomClass = {
    args: {
        to: '/contact',
        className: 'custom-link',
        children: 'Styled Link',
    },
};

// With long text content
export const WithLongText = {
    args: {
        to: '/services',
        children: 'This is a longer link text that demonstrates how the component handles extended content',
    },
};
