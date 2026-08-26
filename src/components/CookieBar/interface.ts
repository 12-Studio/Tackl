// Imports
// ------------

// Exports
// ------------
export interface CookieBarProps {
	message?: string;
	acceptButtonText?: string;
	declineButtonText?: string;
	onAccept?: () => void;
	onDecline?: () => void;
	className?: string;
}

export type ConsentRecord = {
	accepted: boolean;
	at: string;
};

export type ConsentDetail = {
	accepted: boolean | null;
};
