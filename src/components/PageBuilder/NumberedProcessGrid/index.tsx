'use client';

// Imports
// ------------
import { Fragment } from 'react';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import Grid from '@waffl';
import Process from './Process';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const NumberedProcessGrid = ({ heading, processes }: I.NumberedProcessGridProps) => {
	return (
		<S.Jacket>
			<SideFrame isLight />

			<S.Top>
				<Frame isLight className='top' />
				<Grid>
					<S.Heading $l='1/9'>{heading}</S.Heading>
				</Grid>
				<Frame isLight className='bottom' />
			</S.Top>

			<S.AllProcesses>
				{processes?.map((process, index) => {
					return (
						<Fragment key={process.heading}>
							<Process
								heading={process.heading}
								description={process.description}
								itemIndex={index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}
							/>
							<Frame isLight className='bottom' />
						</Fragment>
					);
				})}
			</S.AllProcesses>
		</S.Jacket>
	);
};

// Exports
// ------------
NumberedProcessGrid.displayName = 'NumberedProcessGrid';
export default NumberedProcessGrid;
