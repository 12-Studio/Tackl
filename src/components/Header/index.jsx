'use client';

// Imports
// ------------
import { GlobalContext } from '@parts/Contexts';
import Logo from '@parts/Logo';
import { useResponsive } from '@utils/useResponsive';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';

// Styles
// ------------
import { CTA, Home, Jacket, Menu, MenuItem, MobileMenu, MobileMenuItem, MobileToggle } from './styles';

// Constants
const MENU_ITEMS = [
	{ href: '/', label: 'Home' },
	{ href: '/careers', label: 'Careers' },
	{ href: '/news', label: 'News' },
	{ href: '/contact', label: 'Chat to a strategist', mobileOnly: true },
];

// Component
// ------------
const Header = () => {
	// NOTE • Context
	const { lenis, setHeaderSize, menuOpen, setMenuOpen } = use(GlobalContext);

	// Note Responsive Hook
	const { isMobile } = useResponsive();

	// NOTE • Get the pathname
	const pathname = usePathname();

	// NOTE • States
	const [scrollPosition, setScrollPosition] = useState({
		upward: true,
		top: true,
	});

	// NOTE • refs
	const header = useRef();

	// NOTE • Globally Set the header size
	useEffect(() => {
		setHeaderSize(header.current.offsetHeight / 10);

		// Set the header size as a CSS variable on the body
		if (header.current) {
			document.body.style.setProperty('--header-size', `${header.current.offsetHeight / 10}rem`);
		}
	}, [setHeaderSize]);

	// NOTE • Handle Headroom mechanics
	useEffect(() => {
		if (!lenis.current) {
			return undefined;
		}

		const lenisInstance = lenis.current;

		let lastScrollY = 0;

		const handleScroll = ({ scroll }) => {
			const isScrollingUp = scroll < lastScrollY;
			lastScrollY = scroll;

			setScrollPosition({
				top: scroll < 40,
				upward: isScrollingUp,
			});
		};

		lenisInstance.on('scroll', handleScroll);

		return () => {
			lenisInstance.off('scroll', handleScroll);
		};
	}, [lenis]);

	// NOTE ª If menu is open stop lenis scrolling
	useEffect(() => {
		let timer;

		if (menuOpen) {
			lenis.current.stop();
		} else {
			timer = setTimeout(() => {
				lenis.current.start();
			}, 500);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [lenis, menuOpen]);

	// NOTE • Handle Menu mechanics
	const handleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	// ANCHOR ª It's safe to use the useResponsive hook here since our header and menus are position: fixed, so there's no risk of content layout shift (CLS) as nothing on the page moves.

	return (
		<>
			<Jacket ref={header} $isUpward={scrollPosition.upward} $isTop={scrollPosition.top}>
				<Home href='/'>
					<Logo />
				</Home>

				{isMobile ? (
					<MobileToggle onClick={handleMenu} $isOpen={menuOpen}>
						<span></span>
						<span></span>
						<span></span>
					</MobileToggle>
				) : (
					<>
						<Menu>
							<ul>
								{MENU_ITEMS.map(item => (
									<MenuItem
										key={item.href}
										$isActive={pathname === item.href}
										$isMobileOnly={item.mobileOnly}
									>
										<Link href={item.href} data-label={item.label}>
											{item.label}
										</Link>
									</MenuItem>
								))}
							</ul>
						</Menu>

						<CTA href='/contact' data-label='Chat to a strategist' $isActive={pathname === '/contact'}>
							Chat to a strategist
						</CTA>
					</>
				)}
			</Jacket>

			{isMobile && (
				<MobileMenu $isOpen={menuOpen}>
					{MENU_ITEMS.map(item => (
						<MobileMenuItem key={item.href} $isLast={item.href === '/contact'}>
							<Link href={item.href}>{item.label}</Link>
						</MobileMenuItem>
					))}
				</MobileMenu>
			)}
		</>
	);
};

export default Header;
