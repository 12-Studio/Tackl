'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import { StructuredText } from 'react-datocms/structured-text';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const StandardContent = ({ heading, text }: I.StandardContentProps) => {
	return (
		<S.Jacket>
			<SideFrame isLight />
			<Frame className='top' isLight />

			<S.Content>
				<Grid>
					<S.Heading>{heading}</S.Heading>
				</Grid>

				{text && (
					<Grid>
						<S.TextBlock>
							<StructuredText data={text.value} />
						</S.TextBlock>
					</Grid>
				)}
			</S.Content>

			<Frame className='bottom' isLight />
		</S.Jacket>
	);
};

// Exports
// ------------
StandardContent.displayName = 'StandardContent';
export default StandardContent;
