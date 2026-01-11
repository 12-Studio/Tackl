'use client';

// Imports
// ------------

// Styles
// ------------
import * as S from './styles';

// Component
// ------------
const Card = ({ title, desc }) => {
	return (
		<S.Jacket>
			<h3>{title}</h3>
			<p>{desc}</p>
		</S.Jacket>
	);
};
// Exports
// ------------
Card.displayName = 'Card';
export default Card;
