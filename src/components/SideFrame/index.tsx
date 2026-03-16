'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SideFrame = ({ isLight, className }: I.SideFrameProps) => {
	return <S.Jacket $isLight={isLight} className={`side-frame ${className}`} />;
};

// Exports
// ------------
SideFrame.displayName = 'SideFrame';
export default SideFrame;
