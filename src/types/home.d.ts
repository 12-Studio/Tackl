// Imports
// ------------

// Exports
// ------------
export interface HomeProps {
    data: {
        page: PageProps;    
    }
}

export interface PageProps extends
    Hero,
    Introduction,
    WhatWeDo
{};

export interface Hero {
    pageTitle: string;
    subtext: string;
}

export interface Introduction {
    ethosText: string;
}

export interface WhatWeDo {
    strategyTitle: string;
    strategyText: {
        value: unknown;
    };
    insightsTitle: string;
    insightsText: {
        value: unknown;
    };
    evaluateTitle: string;
    evaluateText: {
        value: unknown;
    };
}