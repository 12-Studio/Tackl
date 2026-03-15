'use client';

// Imports
// ------------
import { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { NestedLenisContext } from '@parts/NestedLenis';
import SingleFaq from './SingleFaq';
import { useAnimation } from '@utils/useAnimation';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Faqs = ({ heading, desc, allFaqs, background }: I.FaqsProps) => {
	// Refs
	const pinWrapperRef = useRef<HTMLDivElement>(null);
	const jacketRef = useRef<HTMLDivElement>(null);
	const faqsListRef = useRef<HTMLUListElement>(null);
	const backgroundRef = useRef<HTMLPictureElement>(null);
	const progressBarRef = useRef<HTMLDivElement>(null);

	// States
	const [resizeKey, setResizeKey] = useState(0);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// Handle resize
	useEffect(() => {
		const handleResize = () => setResizeKey(k => k + 1);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Check if all refs are ready
	const animCheck =
		!pinWrapperRef.current || !faqsListRef.current || !scrollWrapper?.current || !lenisReady;

	useAnimation(
		({ isDesktop }) => {
			if (!isDesktop || animCheck) return;

			// Get refs
			const listEl = faqsListRef.current;
			const scroller = scrollWrapper.current;
			const parent = pinWrapperRef.current?.parentElement;
			const offsetTopPx = parent ? parseFloat(getComputedStyle(parent).paddingTop) || 0 : 0;

			// Kill all scroll triggers
			ScrollTrigger.getAll().forEach(st => {
				if (st.trigger === pinWrapperRef.current) st.kill();
			});

			// Reset list, background, and progress
			gsap.set(listEl, { y: 0 });
			if (backgroundRef.current) gsap.set(backgroundRef.current, { yPercent: 10 });
			if (progressBarRef.current) {
				gsap.set(progressBarRef.current, { y: 0 });
				const firstSpan = progressBarRef.current.querySelector('span:first-child');
				if (firstSpan) firstSpan.textContent = '01';
			}

			// Get total height of list
			const totalFaqHeight = listEl?.scrollHeight ?? 0;

			// If no height, return
			if (totalFaqHeight <= 0) return;

			// Get visible height of trigger
			const visibleHeight = pinWrapperRef.current?.getBoundingClientRect().height ?? 0;

			const scrollDistance = Math.max(0, totalFaqHeight - visibleHeight);
			const yEnd = -scrollDistance;
			const startPin = `top top+=${offsetTopPx}`;

			ScrollTrigger.create({
				trigger: pinWrapperRef.current,
				scroller,
				start: startPin,
				end: `+=${scrollDistance}`,
				pin: true,
			});

			gsap.to(listEl, {
				y: yEnd,
				ease: 'none',
				scrollTrigger: {
					trigger: pinWrapperRef.current,
					scroller,
					start: startPin,
					end: `+=${scrollDistance}`,
					scrub: true,
				},
			});

			if (backgroundRef.current) {
				gsap.to(backgroundRef.current, {
					yPercent: -10,
					ease: 'none',
					scrollTrigger: {
						trigger: pinWrapperRef.current,
						scroller,
						start: startPin,
						end: `+=${scrollDistance}`,
						scrub: 0.5,
					},
				});
			}

			if (progressBarRef.current && allFaqs.length > 0) {
				ScrollTrigger.create({
					trigger: pinWrapperRef.current,
					scroller,
					start: startPin,
					end: `+=${scrollDistance}`,
					onUpdate: self => {
						const progress = self.progress;
						const currentIndex = Math.min(
							allFaqs.length,
							Math.max(1, 1 + Math.floor(progress * allFaqs.length))
						);
						const firstSpan = progressBarRef.current?.querySelector('span:first-child');
						if (firstSpan)
							firstSpan.textContent = String(currentIndex).padStart(2, '0');
					},
				});

				const barHeight = progressBarRef.current.offsetHeight;
				const barYEnd = visibleHeight - barHeight - 2 * offsetTopPx;

				gsap.to(progressBarRef.current, {
					y: barYEnd,
					ease: 'none',
					scrollTrigger: {
						trigger: pinWrapperRef.current,
						scroller,
						start: startPin,
						end: `+=${scrollDistance}`,
						scrub: true,
					},
				});
			}

			ScrollTrigger.refresh();
		},
		{ scope: jacketRef, dependencies: [lenisReady, resizeKey], revertOnUpdate: true }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<SideFrame />
			<Frame className='top' />

			<S.Top>
				<Grid>
					<S.Heading $l='1/10'>{heading}</S.Heading>
					<S.Description $l='1/9'>{desc}</S.Description>
				</Grid>
			</S.Top>

			<S.Bottom>
				<S.PinWrapper ref={pinWrapperRef}>
					<S.Panel aria-hidden>
						<picture ref={backgroundRef}>
							<Image
								src={background?.url ?? '/red-onyx.jpg'}
								alt={background?.alt ?? `${heading} Background`}
								fill
								sizes='100vw, (min-width: 1024px) 66vw'
							/>
						</picture>

						<S.ProgressBar ref={progressBarRef}>
							<span>01</span>
							<hr />
							<span>
								{allFaqs.length < 10 ? `0${allFaqs.length}` : allFaqs.length}
							</span>
						</S.ProgressBar>
					</S.Panel>

					<S.FaqsListWrapper ref={faqsListRef} $pad>
						{allFaqs.map(({ id, question, answer }, index) => (
							<SingleFaq
								key={id}
								question={question}
								answer={answer}
								isLast={index === allFaqs.length - 1}
							/>
						))}
					</S.FaqsListWrapper>
				</S.PinWrapper>
			</S.Bottom>

			<Frame className='bottom' />
		</S.Jacket>
	);
};

// Exports
// ------------
Faqs.displayName = 'Faqs';
export default Faqs;
