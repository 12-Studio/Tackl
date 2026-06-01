import { fetchSanity } from '@sanity/lib/fetch.server';
import { homePageQuery } from '@sanity/lib/queries';
import Link from 'next/link';
import type { HomePage } from '@/types/sanity';

export const dynamic = 'force-dynamic';

const Page = async () => {
	const page = await fetchSanity<HomePage | null>(homePageQuery);

	if (!page) {
		return (
			<main>
				<h1>Homepage</h1>
				<p>
					No homepage content yet. Open <Link href='/studio/'>Sanity Studio</Link> and publish the Home
					document.
				</p>
			</main>
		);
	}

	return (
		<main>
			{page.heroTitle ? <h1>{page.heroTitle}</h1> : null}
			{page.heroText ? <p>{page.heroText}</p> : null}
			{/* Forge sections — wire up to design components as you build the page */}
		</main>
	);
};

Page.displayName = 'HomePage';
export default Page;
