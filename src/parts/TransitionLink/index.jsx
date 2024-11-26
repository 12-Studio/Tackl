'use client';

// Imports
// ------------
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';

// Component
// ------------
const TransitionLink = ({ children, to, className, ...props }) => {
	// NOTE •  Router
	const router = useRouter();

	// NOTE • Sleep Time
	const sleepTime = 1000;

	// NOTE • Sleep Function
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	// async handle click function
	const handleClick = async (e) => {
		// Prevent Default Stuff
		e.preventDefault();

		// Grab the body element
		const body = document.querySelector('body');

		// Add the class to the body
		body?.classList.add('page-transition');

		// Wait for the sleep time
		await sleep(sleepTime);

		// Push the router to the new page
		router.push(to);

		// Wait for the sleep time
		await sleep(sleepTime);

		// Remove the class from the body
		body?.classList.remove('page-transition');
	};

	const linkProps = {
		href: to,
		className: className,
		onClick: handleClick,
		...props,
	};

	return <Link {...linkProps}>{children}</Link>;
};

// PropTypes
// ------------
TransitionLink.propTypes = {
	to: PropTypes.string,
	children: PropTypes.node,
};

// Exports
// ------------
export default TransitionLink;
