import { fetchSanityPublished } from '@sanity/lib/fetch.server';
import { buildMetadata } from '@sanity/lib/metadata';
import { homePageQuery } from '@sanity/lib/queries';
import type { Metadata } from 'next';
import type { HomePage } from '@/types/sanity';

export const generateMetadata = async (): Promise<Metadata> => {
	const page = await fetchSanityPublished<HomePage | null>(homePageQuery);

	return buildMetadata(page?.seo, {
		title: page?.heroTitle ?? 'Home',
		description: page?.heroText,
	});
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};

Layout.displayName = 'HomeLayout';
export default Layout;
