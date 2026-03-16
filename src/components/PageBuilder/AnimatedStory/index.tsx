'use client';

// Imports
// ------------
import { StructuredText } from 'react-datocms/structured-text';
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import { use, useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import { NestedLenisContext } from '@parts/NestedLenis';
import { GlobalContext } from '@parts/Contexts';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import Button from '@parts/Button';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const AnimatedStory = ({ desc, animatedText, buttonLabel, contactTitle }: I.AnimatedStoryProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const animatedTextRef = useRef<HTMLDivElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);
	const { setModalActive } = use(GlobalContext);

	// ANimation Check
	const aniCheck =
		!animatedTextRef.current || !scrollWrapper.current || !lenisReady || !jacketRef.current;

	// Animations
	useAnimation(
		() => {
			if (aniCheck) return;

			const split = SplitText.create(animatedTextRef.current, {
				type: 'words,chars',
				wordsClass: 'word',
				charsClass: 'char',
				aria: 'none',
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

	// Handle Contact
	const handleContact = () => {
		setModalActive(contactTitle);
	};

	return (
		<S.Jacket ref={jacketRef}>
			<SideFrame />
			<Frame className='top' />
			<Grid $pad>
				<S.AnimatedText ref={animatedTextRef}>
					<StructuredText data={animatedText.value} />
				</S.AnimatedText>

				<S.Desc $l='1/10'>{desc}</S.Desc>

				<S.Button>
					<Button
						label={buttonLabel ?? 'Get in Touch'}
						ariaLabel={buttonLabel ?? 'Get in Touch'}
						onClick={handleContact}
						onLight
					/>
				</S.Button>
			</Grid>
			<Frame className='bottom' />
		</S.Jacket>
	);
};

// Exports
// ------------
AnimatedStory.displayName = 'AnimatedStory';
export default AnimatedStory;
