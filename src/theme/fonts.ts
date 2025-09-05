// Imports
// ------------
import { Inter } from 'next/font/google';
// import localFont from 'next/font/local';

// Inter font configuration optimized with swap display for better loading performance
export const inter = Inter({
    subsets: ['latin'],
    display: 'swap', // Uses fallback font until Inter loads
    weight: ['400', '500', '700'],
    variable: '--inter',
    preload: true,
});

// Local font configuration
// export const customFont = localFont({
//     src: [
//         {
//             path: '../public/fonts/CustomFont-Regular.woff2',
//             weight: '400',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/CustomFont-Medium.woff2',
//             weight: '500',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/CustomFont-Bold.woff2',
//             weight: '700',
//             style: 'normal',
//         }
//     ],
//     display: 'swap',
//     variable: '--custom-font',
//     preload: true,
// });
