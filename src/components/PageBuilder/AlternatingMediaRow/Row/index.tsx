'use client';

// Imports
// ------------
import Image from 'next/image';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Row = ({
	heading,
	desc,
	companyNames,
	showCompanyNames,
	showDescription,
	iconImage,
	isEven,
}: I.RowProps) => {
	return (
		<S.Jacket>
			<S.Content $isEven={isEven}>
				<S.Media>
					<Image
						src={iconImage.url}
						alt={iconImage.alt}
						fill
						sizes='(max-width: 1023px) 100vw, 23vw'
					/>
				</S.Media>

				<S.Texts>
					<h3>{heading}</h3>
					{showDescription && <p>{desc}</p>}
					{showCompanyNames && (
						<ul>
							{companyNames.map(company => (
								<li key={company.heading}>{company.heading}</li>
							))}
						</ul>
					)}
				</S.Texts>
			</S.Content>
		</S.Jacket>
	);
};

// Exports
// ------------
Row.displayName = 'Row';
export default Row;
