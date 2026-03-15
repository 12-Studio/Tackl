'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const HeadingDescription = ({ heading, desc }: I.HeadingDescriptionProps) => {
	return (
		<S.Jacket>
			<SideFrame />
			<Frame className='top' />
			<Grid $pad>
				<S.Heading $l='1/8'>{heading}</S.Heading>
				{desc && <S.Description $l='1/7'>{desc}</S.Description>}
			</Grid>
			<Frame className='bottom' />
		</S.Jacket>
	);
};

// Exports
// ------------
HeadingDescription.displayName = 'HeadingDescription';
export default HeadingDescription;
