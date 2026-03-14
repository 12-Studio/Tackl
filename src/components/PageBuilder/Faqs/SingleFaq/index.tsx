'use client';

// Imports
// ------------
import { useRef, use } from 'react';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';
import { NestedLenisContext } from '@parts/NestedLenis';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const SingleFaq = ({ question, answer, isLast }: I.SingleFaqProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Animation Check
	const aniCheck = !jacketRef.current || !scrollWrapper.current || !lenisReady;

	// Animations
	useAnimation(
		({ isMobile }) => {
			if (!isMobile || aniCheck) return;

			if (!isLast) {
				gsap.to(jacketRef.current, {
					autoAlpha: 0,
					scale: 0.9,
					ease: 'none',
					scrollTrigger: {
						trigger: jacketRef.current,
						scroller: scrollWrapper.current,
						start: 'top top',
						end: 'bottom top',
						scrub: true,
					},
				});
			}
		},
		{
			scope: jacketRef,
			dependencies: [lenisReady],
		}
	);
	return (
		<S.Jacket ref={jacketRef}>
			<h3>{question}</h3>
			<p>{answer}</p>
		</S.Jacket>
	);
};

// Exports
// ------------
SingleFaq.displayName = 'SingleFaq';
export default SingleFaq;
