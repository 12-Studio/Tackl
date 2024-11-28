/**
 * Preloads images by fetching them as blobs and creating object URLs
 *
 * Why use this?
 * - Allows precise control over image loading and caching
 * - Reduces layout shifts by ensuring images are ready before display
 * - Improves perceived performance by preloading critical images
 *
 * @param {string} src - URL of the image to preload
 * @returns {Promise<HTMLImageElement>} Promise resolving to loaded image element
 */
export const preloadImage = (src) => {
	return new Promise((resolve, reject) => {
		// Create image element to load the blob URL
		const img = new Image();

		// Use modern Fetch API instead of XMLHttpRequest
		fetch(src)
			.then((response) => response.blob())
			.then((blob) => {
				// Create blob URL and assign to image
				const objectUrl = URL.createObjectURL(blob);
				img.src = objectUrl;

				// Clean up blob URL once image loads
				img.onload = () => {
					URL.revokeObjectURL(objectUrl);
					resolve(img);
				};
			})
			.catch(reject);
	});
};

/**
 * Preloads multiple images in parallel
 *
 * Performance notes:
 * - Uses Promise.all for concurrent loading
 * - Automatically handles cleanup of blob URLs
 * - Fails gracefully if any image fails to load
 *
 * @param {string[]} urls - Array of image URLs to preload
 * @returns {Promise<HTMLImageElement[]>} Promise resolving to array of loaded images
 */
export const preloadImages = (urls) => {
	return Promise.all(urls.map(preloadImage));
};

export default preloadImages;
