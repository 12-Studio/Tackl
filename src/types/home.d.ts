// Imports
// ------------

// Exports
// ------------
export interface HomeProps {
    data: {
        page: any;
    }
}

<<<<<<< HEAD
export interface PageProps{};
=======
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
>>>>>>> cddad762b5a26cc10096c499ec4594a06e0818a2
