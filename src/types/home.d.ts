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
    Introduction
{};

export interface Hero {
    pageTitle: string;
    subtext: string;
}

export interface Introduction {
    ethosText: string;
}