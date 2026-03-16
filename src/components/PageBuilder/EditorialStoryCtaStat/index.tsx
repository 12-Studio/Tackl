'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import Subheading from '@parts/Subheading';
import { useRef, use, useEffect } from 'react';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { NestedLenisContext } from '@parts/NestedLenis';
import { GlobalContext } from '@parts/Contexts';
import Button from '@parts/Button';
import Statistic from '@/components/PageBuilder/StatisticsGrid/Statistic';
import Image from 'next/image';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const EditorialStoryCtaStat = ({
	heading,
	animatedText,
	inlineCallToAction,
	statistics,
}: I.EditorialStoryCtaStatProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const animatedTextRef = useRef<HTMLDivElement>(null);
	const ctaBackgroundRef = useRef<HTMLPictureElement>(null);
	const middleRef = useRef<HTMLDivElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);
	const { setIsModalOpen, setModalActive } = use(GlobalContext);

	// Refs
	const contactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Handle Contact
	const handleContact = () => {
		setIsModalOpen(false);
		setModalActive('home');

		if (contactTimeoutRef.current) clearTimeout(contactTimeoutRef.current);
		contactTimeoutRef.current = setTimeout(() => {
			setIsModalOpen(true);
			setModalActive('Contact');
			contactTimeoutRef.current = null;
		}, 1100);
	};

	// Clear contact timeout on unmount to prevent state update on unmounted component
	useEffect(
		() => () => {
			if (contactTimeoutRef.current) clearTimeout(contactTimeoutRef.current);
		},
		[]
	);

	const aniCheck =
		!animatedTextRef.current ||
		!scrollWrapper.current ||
		!lenisReady ||
		!jacketRef.current ||
		!ctaBackgroundRef.current ||
		!middleRef.current;

	// Animations
	useAnimation(
		() => {
			if (aniCheck) return;

			const split = SplitText.create(animatedTextRef.current, {
				aria: 'none',
				type: 'words,chars',
				wordsClass: 'word',
				charsClass: 'char',
			});

			const chars = split.chars as HTMLElement[];
			if (!chars.length) {
				split.revert();
				return;
			}

			const tl = gsap.timeline({
				scrollTrigger: {
					scrub: true,
					trigger: animatedTextRef.current,
					scroller: scrollWrapper.current,
					start: 'top 90%',
					end: 'center 40%',
				},
			});

			tl.from(chars, {
				autoAlpha: 0.2,
				stagger: 0.1,
				ease: 'linear',
			});

			return () => {
				split.revert();
			};
		},
		{ scope: jacketRef, dependencies: [lenisReady, animatedText] }
	);

	useAnimation(
		() => {
			if (aniCheck) return;

			const amount = 10;

			gsap.set(ctaBackgroundRef.current, {
				yPercent: -amount,
			});

			gsap.to(ctaBackgroundRef.current, {
				yPercent: amount,
				ease: 'none',
				scrollTrigger: {
					trigger: middleRef.current,
					scroller: scrollWrapper.current,
					start: 'top 100%',
					end: 'bottom 0%',
					scrub: true,
				},
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<SideFrame />
			<Frame className='top' />

			<S.Top $pad>
				<Grid>
					<S.Texts>
						<Subheading>
							<h3>{heading}</h3>
						</Subheading>

						<S.AnimatedText ref={animatedTextRef}>{animatedText}</S.AnimatedText>
					</S.Texts>
				</Grid>
			</S.Top>

			<S.Middle ref={middleRef}>
				<picture ref={ctaBackgroundRef}>
					<Image
						src={
							inlineCallToAction?.backgroundImage?.url ?? '/inline-cta-background.jpg'
						}
						alt={inlineCallToAction?.backgroundImage?.alt ?? 'Inline CTA Background'}
						fill
						sizes='100vw, (min-width: 1024px) 66vw'
					/>
				</picture>
				<h4>{inlineCallToAction?.heading ?? 'Need More Granularity?'}</h4>
				<p>{inlineCallToAction?.description ?? 'Go with our custom audiences.'}</p>
				<Button
					label={inlineCallToAction?.buttonLabel ?? 'Get in Touch'}
					ariaLabel={inlineCallToAction?.buttonLabel ?? 'Get in Touch'}
					onClick={handleContact}
				/>
			</S.Middle>

			<Frame className='middle' />

			{statistics && (
				<>
					<S.Bottom>
						<ul>
							{statistics?.map(statistic => (
								<Statistic
									key={statistic.id}
									heading={statistic.heading ?? ''}
									hasSymbolBefore={statistic.hasSymbolBefore ?? false}
									symbolBeforeNumber={statistic.symbolBeforeNumber ?? ''}
									symbolAfterNumber={statistic.symbolAfterNumber ?? ''}
									number={statistic.number ?? ''}
								/>
							))}
						</ul>
					</S.Bottom>

					<Frame className='bottom' />
				</>
			)}
		</S.Jacket>
	);
};

// Exports
// ------------
EditorialStoryCtaStat.displayName = 'EditorialStoryCtaStat';
export default EditorialStoryCtaStat;
