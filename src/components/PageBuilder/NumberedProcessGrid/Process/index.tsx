'use client';

// Imports
// ------------
import gsap from 'gsap';
import { use, useRef } from 'react';
import { NestedLenisContext } from '@parts/NestedLenis';
import { useAnimation } from '@/utils/useAnimation';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Process = ({ heading, description, itemIndex }: I.ProcessProps) => {
	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const numberRef = useRef<HTMLSpanElement>(null);

	useAnimation(
		({ isDesktop }) => {
			if (!jacketRef.current || !numberRef.current || !scrollWrapper.current || !lenisReady)
				return;

			gsap.set(numberRef.current, {
				autoAlpha: 0,
				scale: isDesktop ? 0.5 : 1,
				yPercent: 50,
			});

			gsap.to(numberRef.current, {
				autoAlpha: 1,
				scale: 1,
				yPercent: 0,
				scrollTrigger: {
					trigger: jacketRef.current,
					scroller: scrollWrapper.current,
					start: 'center 100%',
					end: 'center 70%',
					scrub: 0.5,
				},
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<S.ProcessNumber>
				<span ref={numberRef}>{itemIndex}</span>
			</S.ProcessNumber>

			<S.Vertical />

			<S.ProcessContent>
				<h4>{heading}</h4>
				<p>{description}</p>
			</S.ProcessContent>
		</S.Jacket>
	);
};

// Exports
// ------------
Process.displayName = 'Process';
export default Process;
