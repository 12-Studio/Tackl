'use client';

// Imports
// ------------
import SVG from 'react-inlinesvg';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const LogoMarquee = ({ logos }: I.LogoMarqueeProps) => {
	// DRY - Render logos
	const renderLogos = (data: I.Logo[]) => {
		return data.map(({ id, url, alt }) => {
			return (
				<li key={id}>
					<SVG src={url} role='img' aria-label={alt} title={alt} />
				</li>
			);
		});
	};

	return (
		<S.Jacket>
			<ul>{renderLogos(logos)}</ul>
			<ul aria-hidden='true'>{renderLogos(logos)}</ul>
		</S.Jacket>
	);
};

// Exports
// ------------
LogoMarquee.displayName = 'LogoMarquee';
export default LogoMarquee;
