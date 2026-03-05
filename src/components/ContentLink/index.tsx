'use client';

import { createController } from '@datocms/content-link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ContentLink = () => {
	const router = useRouter();
	const pathname = usePathname();
	const controllerRef = useRef<ReturnType<typeof createController> | null>(null);

	useEffect(() => {
		// Controller scans stega-encoded text in the DOM and wires click-to-edit
		// overlays so editors can jump directly to DatoCMS fields.
		const controller = createController({
			stripStega: true,
			onNavigateTo: path => {
				// When Web Previews asks the iframe to navigate, sync with Next.js router.
				router.push(path);
			},
		});

		// Keep click-to-edit active while in draft mode.
		controller.enableClickToEdit();
		controllerRef.current = controller;

		return () => {
			controller.dispose();
			controllerRef.current = null;
		};
	}, [router]);

	useEffect(() => {
		if (!pathname) {
			return;
		}

		// Report current client-side path back to the plugin for route sync.
		controllerRef.current?.setCurrentPath(pathname);
	}, [pathname]);

	return null;
};

ContentLink.displayName = 'ContentLink';

export default ContentLink;
