// Imports
// ------------
import { CustomEase } from 'gsap/CustomEase';

// Exports
// ------------
// CustomEase should be registered in AnimationPlugins before these are created
// If you see errors, ensure AnimationPlugins is imported/rendered first
export const slow = CustomEase.create('slow', 'M0,0 C0,0 0,1 1,1');
export const smooth = CustomEase.create('smooth', 'M0,0 C0.8,0 0.2,1 1,1');
export const bezzy = CustomEase.create('bezzy', 'M0,0 C0.8,0 0.2,1 1,1');
export const bezzy2 = CustomEase.create('bezzy2', 'M0,0 C0.43,0 0.02,1 1,1');
export const bezzy3 = CustomEase.create('bezzy3', 'M0,0 C0.5,0 0,1 1,1');
export const bezzy4 = CustomEase.create('bezzy4', '0.625, 0.05, 0, 1');
