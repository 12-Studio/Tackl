'use client';

import { createController } from '@datocms/content-link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ContentLink = () => {
	const router = useRouter();
	const pathname = usePathname();
	const controllerRef = useRef<ReturnType<typeof createController> | null>(null);

	useEffect(() => {
		const controller = createController({
			stripStega: true,
			onNavigateTo: path => {
				router.push(path);
			},
		});

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

		controllerRef.current?.setCurrentPath(pathname);
	}, [pathname]);

	return null;
};

ContentLink.displayName = 'ContentLink';

export default ContentLink;
