'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SectionTitle = ({ text }: I.SectionTitleProps) => {
	return <S.Jacket>{text}</S.Jacket>;
};

// Exports
// ------------
SectionTitle.displayName = 'SectionTitle';
export default SectionTitle;
