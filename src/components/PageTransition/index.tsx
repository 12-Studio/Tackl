// Imports
// ------------
import { ViewTransition } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Transition types
// ------------
// NOTE • Tag a navigation with a type to pick its animation:
// <Link href='/work' transitionTypes={[NAV_FORWARD]}> or
// router.push('/', { transitionTypes: [NAV_BACK] }). Untyped navigations —
// including the browser's back/forward buttons — crossfade.
export const NAV_FORWARD = 'nav-forward';
export const NAV_BACK = 'nav-back';

// Transition type → view-transition-class (the CSS lives in src/css/global.scss)
const pageAnimation = {
	[NAV_FORWARD]: 'navForward',
	[NAV_BACK]: 'navBack',
	default: 'pageFade',
};

// Component
// ------------
// NOTE • Wrap each page.tsx's content — not a layout. Layouts persist across
// navigations, so their enter/exit never fire. `default='none'` keeps the page
// still during transitions that aren't navigations (Suspense reveals,
// router.refresh()).
const PageTransition = ({ children }: I.PageTransitionProps) => (
	<ViewTransition enter={pageAnimation} exit={pageAnimation} default='none'>
		{children}
	</ViewTransition>
);

// Exports
// ------------
PageTransition.displayName = 'PageTransition';
export default PageTransition;
