'use client';

// Imports
// ------------
import Image from 'next/image';
import IconButton from '@parts/IconButton';
import Frame from '@parts/Frame';
import { use, useRef } from 'react';
import { NestedLenisContext } from '@parts/NestedLenis';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Member = ({ name, role, linkedinUrl, email, image }: I.MemberProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const pictureRef = useRef<HTMLDivElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Check if all refs are ready
	const aniCheck =
		!jacketRef.current || !pictureRef.current || !scrollWrapper.current || !lenisReady;

	// Animations
	useAnimation(
		({ isMobile }) => {
			if (!isMobile || aniCheck) return;

			gsap.set(pictureRef.current, {
				yPercent: 0,
			});

			gsap.to(pictureRef.current, {
				yPercent: 25,
				ease: 'none',
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: scrollWrapper.current,
					start: 'bottom 100%',
					end: 'bottom 0%',
					scrub: true,
				},
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.Picture ref={pictureRef}>
				<Image
					src={image.url}
					alt={image.alt}
					fill
					sizes='100vw, (min-width: 1024px) 66vw'
				/>
			</S.Picture>

			<S.Details>
				<S.Left>
					<h3>{name}</h3>
					<h4>{role}</h4>
				</S.Left>

				{(linkedinUrl || email) && (
					<S.Right>
						{linkedinUrl && <IconButton icon='linkedin' to={linkedinUrl} />}
						{email && <IconButton icon='mail' to={`mailto:${email}`} />}
					</S.Right>
				)}
			</S.Details>

			<Frame className='bottom' isLight />
		</S.Jacket>
	);
};

// Exports
// ------------
Member.displayName = 'Member';
export default Member;
