'use client';

import { useEffect, useState } from 'react';

/**
 * Device type string literal.
 */
export type DeviceType = 'desktop' | 'ios' | 'android';

/**
 * React hook to detect the current device type: `'desktop'`, `'ios'`, or `'android'`.
 *
 * This hook uses user agent sniffing, touch capability, and screen size to determine
 * the most likely device type. It is intended for client-side usage only.
 *
 * @returns {DeviceType} The detected device type:
 *   - `'desktop'` for non-mobile devices or unknown mobile devices
 *   - `'ios'` for iPhone, iPad, or iPod devices
 *   - `'android'` for Android devices
 *
 * @example
 * const deviceType = useDeviceDetection();
 * if (deviceType === 'ios') {
 *   // Show iOS-specific UI
 * }
 *
 * @remarks
 * - Detection is performed once on mount.
 * - Uses user agent, touch capability, and screen size for best-effort detection.
 * - Not 100% foolproof; use for UI hints, not security.
 */
export function useDeviceDetection(): DeviceType {
	const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

	useEffect(() => {
		const detectDevice = () => {
			const userAgent: string =
				typeof navigator !== 'undefined'
					? navigator.userAgent || (navigator as any).vendor || (window as any).opera
					: '';

			// Check if it's a mobile device by user agent
			const isMobileDevice: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				userAgent
			);

			// Check for touch capability
			const hasTouchScreen: boolean =
				typeof window !== 'undefined' &&
				('ontouchstart' in window || (typeof navigator !== 'undefined' && (navigator.maxTouchPoints ?? 0) > 0));

			// Check for small screen
			const isSmallScreen: boolean = typeof window !== 'undefined' && window.innerWidth <= 768;

			// If it's a mobile device with touch screen and small screen, it's mobile
			if (isMobileDevice && hasTouchScreen && isSmallScreen) {
				if (/iPhone|iPad|iPod/i.test(userAgent)) {
					setDeviceType('ios');
				} else if (/Android/i.test(userAgent)) {
					setDeviceType('android');
				} else {
					setDeviceType('desktop'); // Default to desktop for unknown mobile
				}
			} else {
				setDeviceType('desktop');
			}
		};

		detectDevice();
	}, []);

	return deviceType;
}
