// Imports
// ------
import React from 'react';

// Exports
// ------
export const useScrollPerformance = () => {
	React.useEffect(() => {
		let timer;
		let body = document.body;

		const hoverScroll = () => {
			clearTimeout(timer);

			if (!body.classList.contains('disable-hover')) {
				body.classList.add('disable-hover');
			}

			timer = setTimeout(function () {
				body.classList.remove('disable-hover');
			}, 50);
		};

		window.addEventListener('scroll', hoverScroll, false);

		return () => {
			window.removeEventListener('scroll', hoverScroll);
		};
	}, []);

	return null;
};
