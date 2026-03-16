'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import SectionGrid from './SectionGrid';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const BigIconTextGrid = ({ heading, desc, sections }: I.BigIconTextGridProps) => {
	return (
		<S.Jacket>
			<SideFrame />
			<Frame className='top' />

			<S.Top>
				<Grid>
					<S.Heading $l='1/9'>{heading}</S.Heading>
					<S.Description $l='1/10'>{desc}</S.Description>
				</Grid>
			</S.Top>

			<Frame className='bottom' />

			<S.Bottom>
				<ul>
					{sections.map(({ id, subHeading, heading, desc, icon }) => (
						<SectionGrid
							key={id}
							subHeading={subHeading}
							heading={heading}
							desc={desc}
							icon={icon}
						/>
					))}
				</ul>
			</S.Bottom>
		</S.Jacket>
	);
};
// Exports
// ------------
BigIconTextGrid.displayName = 'BigIconTextGrid';
export default BigIconTextGrid;
