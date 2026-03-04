'use client';

// Imports
// ------------
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';
import SVG from 'react-inlinesvg';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const LogoMarquee = ({ logos }: I.LogoMarqueeProps) => {
	// Contexts
	const { isModalOpen, isLoaderFinished } = use(GlobalContext);

	// DRY - Render logos
	const renderLogos = (data: I.Logo[]) => {
		return data.map(({ id, url, alt }) => (
			<li key={id}>
				<SVG src={url} role='img' aria-label={alt} title={alt} />
			</li>
		));
	};
	return (
		<S.Jacket $isLoaderFinished={isLoaderFinished}>
			<S.Heading>
				<h2>Seamless activation with leading platforms</h2>
			</S.Heading>

			<S.Marquee $isModalOpen={isModalOpen} $isLoaderFinished={isLoaderFinished} $speed={2}>
				<ul>{renderLogos(logos)}</ul>
				<ul aria-hidden='true'>{renderLogos(logos)}</ul>
			</S.Marquee>
		</S.Jacket>
	);
};

// Exports
// ------------
LogoMarquee.displayName = 'LogoMarquee';
export default LogoMarquee;
