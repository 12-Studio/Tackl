// Exports
// ------------
export interface OdometerProps {
	// NOTE • The final text, e.g. '100' or '0 KB' — digits (and ∞) roll in,
	// everything else stays still
	value: string;
	className?: string;
}
