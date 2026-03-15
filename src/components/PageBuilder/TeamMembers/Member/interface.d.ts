// Imports
// ------------

// Exports
// ------------
export interface MemberProps {
	name: string;
	role: string;
	linkedinUrl: string;
	email: string;
	image: {
		url: string;
		alt: string;
		blur?: string;
	};
}
