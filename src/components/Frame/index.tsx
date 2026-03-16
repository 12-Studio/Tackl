'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Frame = ({
	dir = 'h',
	className,
	isLight,
	lineRef,
	firstPlusRef,
	lastPlusRef,
}: I.FrameProps) => {
	return (
		<S.Jacket $dir={dir} $isLight={isLight} className={`frame ${className}`}>
			<S.Line ref={lineRef} $isLight={isLight} className='line' />
			<S.Plus $isLight={isLight} $dir={dir} ref={firstPlusRef} className='plus' />
			<S.Plus $isEnd $isLight={isLight} $dir={dir} ref={lastPlusRef} className='plus' />
		</S.Jacket>
	);
};

// Exports
// ------------
Frame.displayName = 'Frame';
export default Frame;
