// Imports
// ------------
import type { ConsentCategory } from '@parts/CookieBar/interface';

// Exports
// ------------
export interface ConsentGateProps {
	category: ConsentCategory;
	children: React.ReactNode;
	fallback?: React.ReactNode;
}
