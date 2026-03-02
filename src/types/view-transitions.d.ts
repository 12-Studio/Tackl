/**
 * View Transitions API (document.startViewTransition)
 * https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
 */
interface ViewTransition {
	readonly ready: Promise<void>;
	readonly finished: Promise<void>;
	readonly updateCallbackDone: Promise<void>;
	skipTransition(): void;
}

declare global {
	interface Document {
		startViewTransition?(callback: () => Promise<void> | void): ViewTransition;
	}
}

export {};
