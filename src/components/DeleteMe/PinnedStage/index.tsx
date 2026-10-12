'use client';

// Imports
// ------------
import { useEffect, useRef } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Component
// ------------
// NOTE • Pins its child centre screen with plain position: sticky, then
// docks it: the stage is sized so the pin lets go exactly when the content
// after it has risen to --dock-gap below. The browser does all of this
// with the scroll, so nothing moves in JS. The only JS measures the child's
// height (--header-h), which centring and docking depend on.
const PinnedStage = ({ children }: I.PinnedStageProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);

	// Effects
	useEffect(() => {
		const jacket = jacketRef.current;
		const pinned = jacket?.firstElementChild;
		if (!jacket || !(pinned instanceof HTMLElement)) return;

		const measure = () => jacket.style.setProperty('--header-h', `${pinned.offsetHeight}px`);
		const resizeObserver = new ResizeObserver(measure);
		resizeObserver.observe(pinned);
		measure();
		return () => resizeObserver.disconnect();
	}, []);

	// Render
	return (
		<div ref={jacketRef} className={s.jacket}>
			{children}
			<div className={s.spacer} />
		</div>
	);
};

// Exports
// ------------
PinnedStage.displayName = 'PinnedStage';
export default PinnedStage;
