// Imports
// ------------
// import type { Metadata } from 'next';

// SEO
// ------------
// NOTE • Site-wide defaults live in app/layout.tsx — only add what this route
// changes. With a CMS wired up, swap the static object for generateMetadata:
//
// export async function generateMetadata(): Promise<Metadata> {
// 	const data = await getHomeData();
//
// 	return {
// 		title: data?.seo?.title,
// 		description: data?.seo?.desc,
// 		openGraph: {
// 			images: [{ url: data?.seo?.image?.url, width: 1200, height: 630 }],
// 		},
// 	};
// }

// Component
// ------------
const Layout = ({ children }: { children: React.ReactNode }) => {
	return children;
};

// Exports
// ------------
Layout.displayName = 'Layout';
export default Layout;
