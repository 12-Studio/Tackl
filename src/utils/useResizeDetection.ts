import { useEffect, useRef, useState } from 'react';

/**
 * Represents the width and height of the window.
 */
export interface WindowDimensions {
    width: number;
    height: number;
}

/**
 * Options for the useResizeDetection hook.
 */
export interface UseResizeDetectionOptions {
    /**
     * Debounce time in milliseconds for resize events.
     * @default 100
     */
    debounceMs?: number;
    /**
     * If true, ignores mobile scroll events that trigger resize due to address bar hiding/showing.
     * @default true
     */
    ignoreMobileScroll?: boolean;
}

/**
 * Callback type for useResizeDetection.
 * @param newDimensions The new window dimensions.
 * @param prevDimensions The previous window dimensions.
 */
export type ResizeCallback = (
    newDimensions: WindowDimensions,
    prevDimensions: WindowDimensions
) => void;

/**
 * Custom hook to detect browser resizes while ignoring mobile scroll events
 * that trigger resize events due to address bar hiding/showing.
 *
 * @param callback Optional callback to be called on significant resize.
 * @param options Optional configuration for debounce and mobile scroll handling.
 * @returns The current window dimensions.
 */
export function useResizeDetection(
    callback?: ResizeCallback,
    options: UseResizeDetectionOptions = {}
): WindowDimensions {
    const { debounceMs = 100, ignoreMobileScroll = true } = options;
    const [dimensions, setDimensions] = useState<WindowDimensions>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastDimensionsRef = useRef<WindowDimensions>(dimensions);
    const isMobileRef = useRef<boolean>(false);

    useEffect(() => {
        /**
         * Checks if the current device is considered mobile (width <= 768px).
         */
        const checkMobile = () => {
            isMobileRef.current = window.innerWidth <= 768;
        };

        checkMobile();

        /**
         * Handles the resize event, debouncing and filtering out mobile scroll-induced resizes.
         */
        const handleResize = () => {
            const newDimensions: WindowDimensions = {
                width: window.innerWidth,
                height: window.innerHeight,
            };

            // On mobile, check if this is likely a scroll event (height change only)
            if (ignoreMobileScroll && isMobileRef.current) {
                const widthChanged =
                    Math.abs(newDimensions.width - lastDimensionsRef.current.width) > 5;
                const heightChanged =
                    Math.abs(newDimensions.height - lastDimensionsRef.current.height) > 5;

                // If only height changed significantly, it's likely a scroll event
                if (!widthChanged && heightChanged) {
                    // Update height but don't trigger callback
                    setDimensions(newDimensions);
                    lastDimensionsRef.current = newDimensions;
                    return;
                }
            }

            // Clear existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Debounce the resize event
            timeoutRef.current = setTimeout(() => {
                const hasSignificantChange =
                    Math.abs(newDimensions.width - lastDimensionsRef.current.width) > 10 ||
                    Math.abs(newDimensions.height - lastDimensionsRef.current.height) > 10;

                if (hasSignificantChange) {
                    const prevDimensions = lastDimensionsRef.current;
                    setDimensions(newDimensions);
                    lastDimensionsRef.current = newDimensions;

                    if (callback) {
                        callback(newDimensions, prevDimensions);
                    }
                }
            }, debounceMs);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [callback, debounceMs, ignoreMobileScroll]);

    return dimensions;
}

/**
 * Possible orientation values.
 */
export type Orientation = 'portrait' | 'landscape';

/**
 * Callback type for useOrientationChange.
 * @param newOrientation The new orientation.
 * @param prevOrientation The previous orientation.
 */
export type OrientationChangeCallback = (
    newOrientation: Orientation,
    prevOrientation: Orientation
) => void;

/**
 * Hook to detect orientation changes specifically.
 *
 * @param callback Optional callback to be called when orientation changes.
 * @returns The current orientation ('portrait' or 'landscape').
 */
export function useOrientationChange(
    callback?: OrientationChangeCallback
): Orientation {
    const getOrientation = (): Orientation =>
        typeof window !== 'undefined'
            ? window.innerWidth > window.innerHeight
                ? 'landscape'
                : 'portrait'
            : 'portrait';

    const [orientation, setOrientation] = useState<Orientation>(getOrientation);

    useEffect(() => {
        /**
         * Handles orientation change, calling the callback if provided.
         */
        const handleOrientationChange = () => {
            const newOrientation = getOrientation();

            if (newOrientation !== orientation) {
                setOrientation(newOrientation);
                if (callback) {
                    callback(newOrientation, orientation);
                }
            }
        };

        // Use resize event with debouncing for orientation detection
        let timeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleOrientationChange, 300);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeout);
        };
    }, [orientation, callback]);

    return orientation;
}
