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
    Hero
{};

export interface Hero {
    pageTitle: string;
    subtext: string;
}