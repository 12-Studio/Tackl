'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SectionTitle = ({ text, isLight }: I.SectionTitleProps) => {
	return <S.Jacket $isLight={isLight}>{text}</S.Jacket>;
};

// Exports
// ------------
SectionTitle.displayName = 'SectionTitle';
export default SectionTitle;
