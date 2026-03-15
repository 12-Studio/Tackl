// Imports
// ------------

// Exports
// ------------
export interface RowProps {
	id?: string;
	heading: string;
	desc?: string;
	companyNames: CompanyName[];
	showCompanyNames: boolean;
	showDescription: boolean;
	iconImage: IconImage;
	isEven: boolean;
}

export interface CompanyName {
	heading: string;
}

export interface IconImage {
	url: string;
	alt: string;
	blur?: string;
}
