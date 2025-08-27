'use client';

// Imports
// ------------
import React from 'react';
import { useRefs } from '@utils/useRefs';
import UnicornScene from 'unicornstudio-react/next';

// Styles
// ------------
import { Jacket, Background } from './styles';

// Component
// ------------
const DeleteMe = ({ projectId = 'p3qwmwgkcE3DmuIEtPzz' }) => {
    const [scott, joe] = useRefs();

    React.useEffect(() => {
        console.log(scott.current);
        console.log(joe.current);
    }, [scott, joe]);

    return (
        <Jacket ref={scott}>
            <Background style={{ '--unicorn-width': '100%', '--unicorn-height': '100%' }} ref={joe}>
                <UnicornScene
                    projectId={projectId}
                    width="100%"
                    height="100%"
                    scale={1}
                    dpi={1}
                    fps={120}
                    altText="Interactive 3D scene"
                    ariaLabel="Animated background scene"
                    lazyLoad={false}
                    production={true}
                />
            </Background>
        </Jacket>
    );
};

// Exports
// ------------
export default DeleteMe;
