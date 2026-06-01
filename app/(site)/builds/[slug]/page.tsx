import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import PortableText from '@parts/PortableText';
import SanityImage from '@parts/SanityImage';
import { fetchSanity, fetchSanityPublished } from '@sanity/lib/fetch.server';
import { buildMetadata } from '@sanity/lib/metadata';
import { buildBySlugQuery, buildSlugsQuery } from '@sanity/lib/queries';
import type { BuildDetail } from '@/types/sanity';

type PageProps = {
	params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
	const slugs = await fetchSanityPublished<{ slug: string }[]>(buildSlugsQuery);
	return (slugs ?? []).map(({ slug }) => ({ slug }));
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
	const { slug } = await params;
	const build = await fetchSanityPublished<BuildDetail | null>(buildBySlugQuery, { slug });

	if (!build) {
		return { title: 'Build not found' };
	}

	return buildMetadata(build.seo, {
		title: build.title,
		description: build.excerpt,
	});
};

export const dynamic = 'force-dynamic';

const BuildPage = async ({ params }: PageProps) => {
	const { slug } = await params;
	const build = await fetchSanity<BuildDetail | null>(buildBySlugQuery, { slug });

	if (!build) {
		notFound();
	}

	return (
		<main>
			<p>
				<Link href='/builds/'>← All builds</Link>
			</p>
			<article>
				{build.coverImage ? (
					<SanityImage
						image={build.coverImage}
						alt={build.title}
						width={1400}
						height={900}
						priority
					/>
				) : null}
				<h1>{build.title}</h1>
				{build.publishedAt ? (
					<time dateTime={build.publishedAt}>
						{new Date(build.publishedAt).toLocaleDateString()}
					</time>
				) : null}
				{build.excerpt ? <p>{build.excerpt}</p> : null}
				<PortableText value={build.body} />
			</article>
		</main>
	);
};

BuildPage.displayName = 'BuildPage';
export default BuildPage;
