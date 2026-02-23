// Property Documentation
// ------------

// NOTE • This file exports the easing object, the easing object is used to store all the easing values for the application.

// REVIEW — Usage: ${getEase('bezzy3')}

// Imports
// ------------
import type { Easing } from './interface';

// Exports
// ------------
export const easing: Easing = {
	bezzy: 'cubic-bezier(0.8, 0, 0, 1)',
	bezzy2: 'cubic-bezier(0.430, 0.195, 0.020, 1)',
	bezzy3: 'cubic-bezier(0.5, 0, 0, 1)',
	ease: '0.3s ease-in-out',
};
