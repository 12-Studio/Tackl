'use client';

import Link from 'next/link';

import type * as I from './interface';
import * as S from './styles';

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/builds/', label: 'Builds' },
] as const;

const Header = (_props: I.HeaderProps) => {
	return (
		<S.Jacket>
			<nav aria-label='Main'>
				<ul>
					{navItems.map(({ href, label }) => (
						<li key={href}>
							<Link href={href}>{label}</Link>
						</li>
					))}
				</ul>
			</nav>
		</S.Jacket>
	);
};

Header.displayName = 'Header';
export default Header;
