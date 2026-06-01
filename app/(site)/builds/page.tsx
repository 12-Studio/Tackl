import Link from 'next/link';
import type { Metadata } from 'next';

import BuildList from '@parts/BuildList';
import { fetchSanity } from '@sanity/lib/fetch.server';
import { buildsIndexQuery } from '@sanity/lib/queries';
import type { BuildCard } from '@/types/sanity';

export const metadata: Metadata = {
	title: 'Builds',
	description: 'All builds',
};

export const dynamic = 'force-dynamic';

const BuildsPage = async () => {
	const builds = await fetchSanity<BuildCard[]>(buildsIndexQuery);

	return (
		<main>
			<h1>Builds</h1>
			{(builds ?? []).length ? (
				<BuildList builds={builds ?? []} />
			) : (
				<p>
					No builds yet. Add one in <Link href='/studio/'>Sanity Studio</Link> under Builds.
				</p>
			)}
		</main>
	);
};

BuildsPage.displayName = 'BuildsPage';
export default BuildsPage;
