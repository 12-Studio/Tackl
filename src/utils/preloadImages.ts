/**
 * Preloads a single image by fetching it as a blob and creating an object URL.
 *
 * This function is useful for:
 * - Ensuring images are fully loaded before being displayed, reducing layout shifts.
 * - Gaining fine-grained control over image loading and caching.
 * - Improving perceived performance by preloading critical images.
 *
 * @example
 * // Preload an image and append it to the DOM when ready
 * preloadImage('https://example.com/image.jpg').then(img => {
 *   document.body.appendChild(img);
 * });
 *
 * @param {string} src - The URL of the image to preload.
 * @returns {Promise<HTMLImageElement>} A promise that resolves to the loaded HTMLImageElement.
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img = new Image();

		fetch(src)
			.then(response => response.blob())
			.then(blob => {
				const objectUrl = URL.createObjectURL(blob);
				img.src = objectUrl;

				img.onload = () => {
					URL.revokeObjectURL(objectUrl);
					resolve(img);
				};
			})
			.catch(reject);
	});
};

/**
 * Preloads multiple images in parallel.
 *
 * This function loads all provided image URLs concurrently and resolves when all images are loaded.
 * If any image fails to load, the returned promise will reject.
 *
 * @example
 * // Preload several images and use them when all are ready
 * preloadImages([
 *   'https://example.com/img1.jpg',
 *   'https://example.com/img2.jpg'
 * ]).then(images => {
 *   images.forEach(img => document.body.appendChild(img));
 * });
 *
 * @param {string[]} urls - An array of image URLs to preload.
 * @returns {Promise<HTMLImageElement[]>} A promise that resolves to an array of loaded HTMLImageElements.
 */
export const preloadImages = (urls: string[]): Promise<HTMLImageElement[]> => {
	return Promise.all(urls.map(preloadImage));
};

export default preloadImages;
