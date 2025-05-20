'use client';

// Imports
// ------------
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UnicornStudio from '@utils/unicornStudio.umd.js';

// Styles
// ------------
import { Jacket, Background } from './styles';

// Component
// ------------
const DeleteMe = ({ logoSrc = './logo-alt.svg', logoAlt = 'Tackl Logo' }) => {
    const sceneId = 'unicorn-studio';

    useEffect(() => {
        UnicornStudio.addScene({
            elementId: sceneId, // id of the HTML element to render your scene in (the scene will use its dimensions)
            fps: 120, // frames per second (0-120) [optional]
            scale: 1, // rendering scale, use smaller values for performance boost (0.25-1) [optional]
            dpi: 1, // pixel ratio [optional]
            projectId: 'p3qwmwgkcE3DmuIEtPzz', // the id string for your embed (get this from "embed" export)
            lazyLoad: true, // will not initialize the scene until it scrolls into view
            filePath: '../animated-bg.json', // if youre hosting your own exported json code, point to it here (do not use both filePath and projectId, only one is required)
            altText: 'Tackl Animated Background', // optional text for SEO, going inside the <canvas> tag
            ariaLabel: 'Tackl Animated Background', // optional text for the aria-label attribute on the <canvas> element
            production: false, // when true, will hit the global edge CDN, learn more in the help docs
            interactivity: {
                // [optional]
                mouse: {
                    disableMobile: true, // disable touch movement on mobile
                },
            },
        })
            .then(scene => {
                // scene is ready
                // To remove a scene, you can use:
                // scene.destroy()
                // if the scenes container changes size and you need to resize the scene
                // scene.resize()
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <Jacket>
            <Background id={sceneId} />
            {/* 
            <picture>
                <img src={logoSrc} alt={logoAlt} />
            </picture>

            <span>Welcome to Tackl</span> */}
        </Jacket>
    );
};

// Prop Types
// ------------
DeleteMe.propTypes = {
    /** Source URL for the logo image */
    logoSrc: PropTypes.string,
    /** Alt text for the logo image */
    logoAlt: PropTypes.string,
};

// Exports
// ------------
export default DeleteMe;
