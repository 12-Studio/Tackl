'use client';

// Imports
// ------------
import Grid from '@waffl';
import Card from './Card';

// Styles
// ------------
import * as S from './styles';

// Data
// ------------
const cardData = [
	{
		id: 1,
		title: 'Card 1',
		desc: 'Card 1 description',
	},
	{
		id: 2,
		title: 'Card 2',
		desc: 'Card 2 description',
	},
	{
		id: 3,
		title: 'Card 3',
		desc: 'Card 3 description',
	},
	{
		id: 4,
		title: 'Card 4',
		desc: 'Card 4 description',
	},
];

// Component
// ------------
const CardGrid = ({}) => {
	return (
		<S.Jacket>
			<Grid $isFullscreen>
				<S.Content>
					{cardData.map(card => (
						<Card
							key={card.id}
							title={card.title}
							desc={card.desc}
						/>
					))}
				</S.Content>
			</Grid>
		</S.Jacket>
	);
};

// Exports
// ------------
CardGrid.displayName = 'CardGrid';
export default CardGrid;
