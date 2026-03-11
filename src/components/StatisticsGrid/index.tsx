'use client';

// Imports
// ------------
import Grid from '@waffl';
import Statistic from './Statistic';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import { Fragment } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const StatisticsGrid = ({ heading, statistics }: I.StatisticsGridProps) => {
	return (
		<S.Jacket>
			<SideFrame />

			<S.Top>
				<Frame className='top' />
				<Grid>
					<S.Heading $l='1/10'>{heading}</S.Heading>
				</Grid>
				<Frame className='bottom' />
			</S.Top>

			<S.Statistics>
				<ul>
					{statistics?.map(
						(
							{
								id,
								heading,
								hasSymbolBefore,
								symbolBeforeNumber,
								symbolAfterNumber,
								number,
							},
							index
						) => {
							const isAfterPair = (index + 1) % 2 === 0;

							return (
								<Fragment key={id}>
									<Statistic
										id={id}
										heading={heading}
										hasSymbolBefore={hasSymbolBefore}
										symbolBeforeNumber={symbolBeforeNumber}
										symbolAfterNumber={symbolAfterNumber}
										number={number}
									/>
									<Frame className='mobile-only' />
									{isAfterPair && <Frame className='bottom' />}
								</Fragment>
							);
						}
					)}
				</ul>
			</S.Statistics>
		</S.Jacket>
	);
};

// Exports
// ------------
StatisticsGrid.displayName = 'StatisticsGrid';
export default StatisticsGrid;
