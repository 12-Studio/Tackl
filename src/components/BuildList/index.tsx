import Link from 'next/link';

import SanityImage from '@parts/SanityImage';
import type { BuildCard } from '@/types/sanity';

type BuildListProps = {
	builds: BuildCard[];
	heading?: string;
};

const BuildList = ({ builds, heading }: BuildListProps) => {
	if (!builds.length) {
		return null;
	}

	return (
		<section>
			{heading ? <h2>{heading}</h2> : null}
			<ul>
				{builds.map((build) => (
					<li key={build._id}>
						<Link href={`/builds/${build.slug}/`}>
							{build.coverImage ? (
								<SanityImage
									image={build.coverImage}
									alt={build.title}
									width={640}
									height={400}
								/>
							) : null}
							<h3>{build.title}</h3>
							{build.excerpt ? <p>{build.excerpt}</p> : null}
							{build.publishedAt ? (
								<time dateTime={build.publishedAt}>
									{new Date(build.publishedAt).toLocaleDateString()}
								</time>
							) : null}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

BuildList.displayName = 'BuildList';
export default BuildList;
