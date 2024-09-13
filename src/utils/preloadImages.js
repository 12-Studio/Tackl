/**
 * Load image via XHR as blob
 */
export const preloadImage = (src) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const xhr = new XMLHttpRequest();

		xhr.open('GET', src, true);
		xhr.responseType = 'blob';
		xhr.onload = () => {
			img.src = URL.createObjectURL(xhr.response);
			img.onload = () => resolve(img);
		};
		xhr.onerror = () => reject();
		xhr.send();
	});
};

/**
 * Batch load images via XHR as blob
 */
export const preloadImages = (urls) => {
	return Promise.all(urls.map((src) => preloadImage(src)));
};

export default preloadImages;
