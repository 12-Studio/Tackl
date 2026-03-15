// Imports
// ------------

// Exports
// ------------
export interface AnimatedHeadingProps {
	children: React.ReactNode;
	className?: string;
	/**
	 * When `true`, the animation logic is allowed to run.
	 * Useful for gating on things like loaders completing.
	 * Defaults to `true`.
	 */
	isReady?: boolean;
	/**
	 * When this value becomes `true`, the heading animates.
	 * You can toggle this from parent components (e.g. when a section enters view).
	 * Defaults to `true`.
	 */
	trigger?: boolean;
	/**
	 * Optional flag to reverse the animation when `true`
	 * and play it forward again when `false`.
	 */
	reverseWhen?: boolean;
}
