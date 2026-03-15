'use client';

// Imports
// ------------
import Grid from '@waffl';
import Image from 'next/image';
import Subheading from '@parts/Subheading';
import { StructuredText } from 'react-datocms';
import Frame from '@parts/Frame';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SectionGrid = ({ subHeading, heading, desc, icon }: I.SectionGridProps) => {
	return (
		<S.Jacket>
			<Grid>
				<S.Icon $l='3/11'>
					<Image
						src={icon.url}
						alt={icon.alt}
						blurDataURL={icon.blur}
						width={534}
						height={534}
					/>
				</S.Icon>
			</Grid>

			<Grid>
				<Subheading>
					<h3>{subHeading}</h3>
				</Subheading>
			</Grid>

			<Grid>
				<S.Heading $l='1/6'>{heading}</S.Heading>

				<S.Description $l='7/13'>
					<StructuredText data={desc.value} />
				</S.Description>
			</Grid>

			<Frame className='bottom' />
		</S.Jacket>
	);
};

// Exports
// ------------
SectionGrid.displayName = 'SectionGrid';
export default SectionGrid;
