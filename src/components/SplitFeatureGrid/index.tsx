'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import Image from 'next/image';
import { Fragment } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SplitFeatureGrid = ({ heading, features }: I.SplitFeatureGridProps) => {
	return (
		<S.Jacket>
			<SideFrame />

			<S.Top>
				<Frame className='top' />
				<Frame className='bottom' />

				<Grid>
					<S.Heading $l='1/10'>{heading}</S.Heading>
				</Grid>
			</S.Top>

			<S.Bottom>
				{features?.map((feature, index) => {
					// is Odd check
					const isEven = index % 2 === 0;

					return (
						<Fragment key={feature.heading}>
							<S.Feature $isEven={isEven}>
								<S.FeatureMedia $isEven={isEven}>
									<Image
										src={feature.media.url}
										alt={feature.media.alt}
										width={360}
										height={360}
									/>
								</S.FeatureMedia>

								<S.Vertical />

								<S.FeatureContent>
									<S.FeatureHeading>{feature.heading}</S.FeatureHeading>
									<S.FeatureDesc>{feature.desc}</S.FeatureDesc>
								</S.FeatureContent>
							</S.Feature>

							<Frame className='bottom' />
						</Fragment>
					);
				})}
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
SplitFeatureGrid.displayName = 'SplitFeatureGrid';
export default SplitFeatureGrid;
