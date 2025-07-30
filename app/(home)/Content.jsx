'use client';

// Imports
// ------------
import React from 'react';
import PropTypes from 'prop-types';
import DeleteMe from '@parts/DeleteMe';

// Component
// ------------
const Content = ({ data }) => {
    return (
        <>
            <DeleteMe />
        </>
    );
};

// PropTypes
// ------------
Content.propTypes = {
    data: PropTypes.object,
};

// Exports
// ------------
Content.displayName = 'Page Content';
export default Content;
