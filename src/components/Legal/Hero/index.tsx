'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import SectionTitle from '@parts/SectionTitle';
import Subheading from '@parts/Subheading';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';
import { StructuredText } from 'react-datocms';

// Component
// ------------
const Hero = ({ title, heading, desc, lastUpdated }: I.HeroProps) => {
	const formatDate = (timestamp: string) => {
		const date = new Date(timestamp);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const formattedLastUpdated = formatDate(lastUpdated);

	return (
		<S.Jacket>
			<SideFrame isLight />
			<Frame className='top' isLight />
			<Frame className='bottom' isLight />

			<Grid>
				<S.TitlePosition>
					<SectionTitle text={title} isLight />
				</S.TitlePosition>
			</Grid>

			<Grid>
				<S.LastUpdated>
					<Subheading isLight>
						<h2>Last Updated:{formattedLastUpdated}</h2>
					</Subheading>
				</S.LastUpdated>

				<S.Heading $l='1/9'>{heading}</S.Heading>

				<S.Text $l='1/10'>
					<StructuredText data={desc.value} />
				</S.Text>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
Hero.displayName = 'Hero';
export default Hero;
