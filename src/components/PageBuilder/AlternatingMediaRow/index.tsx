'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import Row from './Row';
import { Fragment } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const AlternatingMediaRow = ({ heading, desc, rows }: I.AlternatingMediaRowProps) => {
	return (
		<S.Jacket>
			<SideFrame />

			<S.Top>
				<Frame className='top' />
				<Grid>
					<S.Heading $l='1/10'>{heading}</S.Heading>
					<S.Description $l='1/9'>{desc}</S.Description>
				</Grid>
				<Frame className='bottom' />
			</S.Top>

			<S.Bottom>
				{rows.map(
					(
						{
							heading,
							desc,
							id,
							companyNames,
							showCompanyNames,
							showDescription,
							iconImage,
						},
						index
					) => {
						return (
							<Fragment key={heading + id}>
								<Row
									isEven={index % 2 === 0}
									key={heading + id}
									heading={heading}
									desc={desc}
									companyNames={companyNames}
									showCompanyNames={showCompanyNames}
									showDescription={showDescription}
									iconImage={iconImage}
								/>
								<Frame />
							</Fragment>
						);
					}
				)}
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
AlternatingMediaRow.displayName = 'AlternatingMediaRow';
export default AlternatingMediaRow;
