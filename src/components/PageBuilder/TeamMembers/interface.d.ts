// Imports
// ------------

// Exports
// ------------
export interface TeamMembersProps {
	heading: string;
	desc?: string;
	teamMembers: TeamMember[];
}

export interface TeamMember {
	id: string;
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
