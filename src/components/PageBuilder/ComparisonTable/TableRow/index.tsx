'use client';

// Imports
// ------------

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const TableRow = ({ onyx, feature, competitor }: I.TableRowProps) => {
	return (
		<S.Jacket>
			<S.RadioContainer>
				<S.Radio $isActive={onyx} />
			</S.RadioContainer>

			<S.FeatureName>{feature}</S.FeatureName>

			<S.RadioContainer>
				<S.Radio $isActive={competitor} />
			</S.RadioContainer>
		</S.Jacket>
	);
};

// Exports
// ------------
TableRow.displayName = 'TableRow';
export default TableRow;
