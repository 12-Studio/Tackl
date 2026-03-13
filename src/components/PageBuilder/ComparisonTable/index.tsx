'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import TableRow from './TableRow';
import Image from 'next/image';
import { use, useRef } from 'react';
import gsap from 'gsap';
import { useAnimation } from '@utils/useAnimation';
import { NestedLenisContext } from '@parts/NestedLenis';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Constants
// ------------
const ONYX_LOGO = '/onyx-logo.svg';
const COMPETITOR_LOGO = '/open-exchange-logo.png';

// Component
// ------------
const ComparisonTable = ({ heading, background, desc, table }: I.ComparisonTableProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const backgroundRef = useRef<HTMLElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Animations
	useAnimation(
		({ isDesktop }) => {
			if (
				!jacketRef.current ||
				!backgroundRef.current ||
				!scrollWrapper.current ||
				!lenisReady
			)
				return;

			gsap.set(backgroundRef.current, {
				yPercent: isDesktop ? -25 : -12,
			});

			gsap.to(backgroundRef.current, {
				yPercent: isDesktop ? 25 : 12,
				ease: 'none',
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: scrollWrapper.current,
					start: 'top 100%',
					end: 'bottom 0%',
					scrub: true,
					markers: false,
				},
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Background ref={backgroundRef}>
				{background && (
					<Image
						src={background.url}
						alt={background.alt}
						fill
						sizes='100vw, (min-width: 1024px) 66vw'
					/>
				)}
			</S.Background>

			<SideFrame isLight />

			<S.Top>
				<Frame isLight className='top' />

				<Grid>
					<S.Heading $l='1/13'>{heading}</S.Heading>
					<S.Description $l='1/12'>{desc}</S.Description>
				</Grid>

				<Frame isLight className='bottom' />
			</S.Top>

			<S.Bottom>
				<S.HeadingRow>
					<S.Logo>
						<Image src={ONYX_LOGO} alt='Onyx Logo' width={120} height={40} />
					</S.Logo>

					<span>Features</span>

					<S.Logo>
						<Image
							src={COMPETITOR_LOGO}
							alt='Competitor Logo'
							width={120}
							height={40}
						/>
					</S.Logo>
				</S.HeadingRow>

				<ul>
					{table.map(({ id, onyx, feature, competitor }) => {
						return (
							<TableRow
								key={id}
								onyx={onyx}
								feature={feature}
								competitor={competitor}
							/>
						);
					})}
				</ul>
				<Frame isLight />
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
ComparisonTable.displayName = 'ComparisonTable';
export default ComparisonTable;
