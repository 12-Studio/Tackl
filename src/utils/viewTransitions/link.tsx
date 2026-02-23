import NextLink from 'next/link';
import { useCallback } from 'react';
import { useTransitionRouter } from './use-transition-router';

// copied from https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
	const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
	const target = eventTarget.getAttribute('target');
	return (
		(target && target !== '_self') ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey || // triggers resource download
		(event.nativeEvent && event.nativeEvent.which === 2)
	);
}

// copied from https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L204-L217
function shouldPreserveDefault(e: React.MouseEvent<HTMLAnchorElement>): boolean {
	const { nodeName } = e.currentTarget;

	// anchors inside an svg have a lowercase nodeName
	const isAnchorNodeName = nodeName.toUpperCase() === 'A';

	if (isAnchorNodeName && isModifiedEvent(e)) {
		// ignore click for browser’s default behavior
		return true;
	}

	return false;
}

// This is a wrapper around next/link that explicitly uses the router APIs
// to navigate, and trigger a view transition.

type LinkProps = React.ComponentProps<typeof NextLink>;

/** Props type NextLink accepts (narrow Key to avoid @types/react vs Next.js mismatch) */
type NextLinkPropsSafe = Omit<LinkProps, 'key'> & { key?: string | number | null | undefined };

export function Link(props: LinkProps) {
	const router = useTransitionRouter();

	const { href, replace, scroll } = props;
	const onClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>) => {
			if (props.onClick) {
				props.onClick(e);
			}

			if ('startViewTransition' in document) {
				if (shouldPreserveDefault(e)) {
					return;
				}

				e.preventDefault();

				// Convert href to string (handle both string and UrlObject)
				const hrefString =
					typeof href === 'string' ? href : href.pathname + (href.search || '') + (href.hash || '');

				const navigate = replace ? router.replace : router.push;
				navigate(hrefString, { scroll: scroll ?? true });
			}
		},
		[props.onClick, href, replace, scroll, router]
	);

	// Cast key to string | number to avoid React.Key (unique symbol) mismatch with Next.js internals
	return <NextLink {...(props as NextLinkPropsSafe)} onClick={onClick} />;
}
