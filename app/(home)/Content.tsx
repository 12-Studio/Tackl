'use client';

// Imports
// ------------
import DeleteMe from '@parts/DeleteMe';


// Interface
// ------------
interface ContentProps {
    data: object;
}

// Component
// ------------
const Content = ({ data }: ContentProps) => {
    return (
        <>
            <DeleteMe />
        </>
    );
};

// Exports
// ------------
Content.displayName = 'Page Content';
export default Content;
