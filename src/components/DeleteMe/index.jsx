'use client';

// Imports
// ------------
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Styles
// ------------
import { Jacket, Background } from './styles';

// Dynamically import UnicornScene to prevent SSR issues
const UnicornScene = dynamic(() => import('unicornstudio-react/next'), {
    ssr: false,
    loading: () => <div>Loading scene...</div>,
});

// Component
// ------------
const DeleteMe = ({ projectId = 'p3qwmwgkcE3DmuIEtPzz' }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <Jacket>
                <Background style={{ '--unicorn-width': '100%', '--unicorn-height': '100%' }}>
                    <div>Loading...</div>
                </Background>
            </Jacket>
        );
    }

    return (
        <Jacket>
            <Background style={{ '--unicorn-width': '100%', '--unicorn-height': '100%' }}>
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
