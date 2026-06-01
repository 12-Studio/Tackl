/**
 * Website root layout — theme, header, Sanity Live, and draft preview overlays.
 */
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';

import '@/theme/tackl/waffl/WebComponent';
import '@css/global.css';

import DisableDraftMode from '@parts/DisableDraftMode';
import { SanityLive } from '@sanity/lib/live.server';

import Client from './Client';
import Server from './Server';

const SiteLayout = async ({ children }: { children: React.ReactNode }) => {
	const { isEnabled: isDraftMode } = await draftMode();

	return (
		<Client
			sanityLive={
				<>
					<SanityLive />
					{isDraftMode ? (
						<>
							<VisualEditing />
							<DisableDraftMode />
						</>
					) : null}
				</>
			}
		>
			<Server>{children}</Server>
		</Client>
	);
};

SiteLayout.displayName = 'SiteLayout';
export default SiteLayout;
