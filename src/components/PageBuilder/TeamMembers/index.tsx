'use client';

// Imports
// ------------
import Grid from '@waffl';
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import { NestedLenisContext } from '@parts/NestedLenis';
import { use, useRef, useState, useEffect } from 'react';
import { useAnimation } from '@utils/useAnimation';
import gsap from 'gsap';
import { bezzy4 } from '@parts/AnimationPlugins/Curves';
import Member from './Member';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const TeamMembers = ({ heading, desc, teamMembers }: I.TeamMembersProps) => {
	// Refs
	const jacketRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	// Contexts
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	// States
	const [memberWidth, setMemberWidth] = useState(0);

	// Effect – Track dimensions for animation; only on desktop (matches useAnimation isDesktop: 1024px)
	const DESKTOP_MEDIA = '(min-width: 1024px)';

	useEffect(() => {
		const list = listRef.current;
		if (!list) return;

		const updateWidth = () => {
			const firstLi = list.querySelector('li');
			setMemberWidth(firstLi?.getBoundingClientRect().width ?? 0);
		};

		let observer: ResizeObserver | null = null;

		const startObserving = () => {
			updateWidth();
			observer = new ResizeObserver(updateWidth);
			observer.observe(list);
		};

		const stopObserving = () => {
			setMemberWidth(0);
			observer?.disconnect();
			observer = null;
		};

		const mq = window.matchMedia(DESKTOP_MEDIA);
		if (mq.matches) startObserving();

		const handleChange = (e: MediaQueryListEvent) => {
			if (e.matches) startObserving();
			else stopObserving();
		};

		mq.addEventListener('change', handleChange);
		return () => {
			mq.removeEventListener('change', handleChange);
			stopObserving();
		};
	}, []);

	// Animation Check
	const aniCheck =
		!bottomRef.current ||
		!listRef.current ||
		!scrollWrapper.current ||
		!lenisReady ||
		!teamMembers.length ||
		!memberWidth;

	// Animations
	useAnimation(
		({ isDesktop }) => {
			if (!isDesktop || aniCheck) return;

			const scrollDistance = (teamMembers.length - 1) * 100;
			const n = teamMembers.length;

			// Snap to nearest member: progress 0..1 maps to member 0..n-1
			const snapToNearestMember = (progress: number) => {
				if (n <= 1) return 0;
				const step = 1 / (n - 1);
				const index = Math.round(progress * (n - 1));
				return Math.max(0, Math.min(1, index * step));
			};

			gsap.to(listRef.current, {
				x: -(teamMembers.length - 1) * memberWidth,
				ease: 'none',
				scrollTrigger: {
					trigger: bottomRef.current,
					scroller: scrollWrapper.current,
					start: 'top top',
					end: `+=${scrollDistance}%`,
					pin: true,
					scrub: true,
					snap: {
						snapTo: snapToNearestMember,
						duration: { min: 0.5, max: 1 },
						delay: 0,
						ease: bezzy4,
						directional: false,
					},
				},
			});
		},
		{ scope: jacketRef, dependencies: [lenisReady, teamMembers.length, memberWidth] }
	);

	return (
		<S.Jacket ref={jacketRef}>
			<SideFrame isLight />

			<S.Top>
				<Frame className='top' isLight />
				<Grid>
					<S.Heading $l='3/11'>{heading}</S.Heading>
					<S.Desc $l='3/11'>{desc}</S.Desc>
				</Grid>
			</S.Top>

			<S.Bottom ref={bottomRef}>
				<Frame className='top' isLight />

				<ul ref={listRef}>
					{teamMembers.map(({ id, name, role, linkedinUrl, email, image }) => (
						<Member
							key={id}
							name={name}
							role={role}
							linkedinUrl={linkedinUrl}
							email={email}
							image={image}
						/>
					))}
				</ul>

				<Frame className='bottom' isLight />
			</S.Bottom>
		</S.Jacket>
	);
};

// Exports
// ------------
TeamMembers.displayName = 'TeamMembers';
export default TeamMembers;
