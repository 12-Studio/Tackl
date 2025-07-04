'use client';

// Imports
// ------------
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Styles
// ------------
import { Jacket, Svg } from './styles';

// Component
// ------------
const CurvedMarqueeText = ({ example }) => {
    // The text that will be repeated in the marquee animation
    const marqueeText = 'Designer ✦ Developer ✦ Director ✦ ';

    // Unique identifier for the curved path that the text will follow
    const pathId = 'customCurve';

    // Distance between each repeated text instance (in pixels)
    const textSpacing = 2480;

    // Refs to store references to each text span element for animation control
    const tspansRef = useRef([]);

    // State to store the total length of the curved path
    const [pathLength, setPathLength] = useState(1000);

    // Ref to access the SVG path element
    const pathRef = useRef(null);

    // Effect to calculate and store the actual length of the curved path
    useEffect(() => {
        if (pathRef.current) {
            // getTotalLength() returns the total length of the SVG path
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
        }
    }, []);

    // Effect to create the continuous marquee animation
    useEffect(() => {
        let animationFrame;

        // Function that moves each text span to create the scrolling effect
        const move = () => {
            tspansRef.current.forEach((tspan, i) => {
                if (!tspan) return; // Skip if ref is not set

                // Get current x position and move it left by 1 pixel
                let x = parseFloat(tspan.getAttribute('x'));
                x -= 1; // Controls animation speed

                // If text has moved too far left, reset it to the right end
                if (x < -textSpacing) {
                    // Calculate position at the end of the line
                    x = (tspansRef.current.length - 1) * textSpacing;
                }

                // Update the x position of the text span
                tspan.setAttribute('x', x);
            });

            // Schedule the next frame for smooth animation
            animationFrame = requestAnimationFrame(move);
        };

        // Start the animation
        move();

        // Cleanup: cancel animation when component unmounts
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Calculate how many times to repeat the text to fill the entire path
    // Add 2 extra repeats to ensure smooth looping
    const repeats = Math.ceil(pathLength / textSpacing) + 2;

    return (
        <Jacket>
            <Svg viewBox="0 0 1440 120">
                <defs>
                    <path ref={pathRef} id={pathId} d="M-100,40 Q720, 300 1540,40" fill="none" stroke="transparent" />
                </defs>

                {/* Text element that will follow the curved path */}
                <text>
                    {/* textPath makes the text follow the defined path */}
                    <textPath href={`#${pathId}`}>
                        {/* Create multiple instances of the text for seamless looping */}
                        {Array.from({ length: repeats }).map((_, i) => (
                            <tspan
                                key={i}
                                x={i * textSpacing} // Position each text instance
                                ref={el => (tspansRef.current[i] = el)} // Store ref for animation
                                style={{ fontFamily: '"Sequel 100 Wide", sans-serif' }}
                            >
                                {marqueeText}
                            </tspan>
                        ))}
                    </textPath>
                </text>
            </Svg>
        </Jacket>
    );
};

// PropTypes
// ------------
CurvedMarqueeText.propTypes = {
    example: PropTypes.string,
};

// Exports
// ------------
CurvedMarqueeText.displayName = 'CurvedMarqueeText';
export default CurvedMarqueeText;
