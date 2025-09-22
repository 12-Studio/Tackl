// Imports
// ------------

// Exports
// ------------
export interface HomeProps extends Hero{
    data: {
        page: PageProps;    
    }
}

export interface PageProps extends
    HeroProps
{};

export interface HeroProps {
    pageTitle: string;
    subtext: string;
}