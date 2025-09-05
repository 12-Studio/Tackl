'use client';

// Imports
// ------------
import PropTypes from 'prop-types';
import { use, useEffect } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Header = ({ data }) => {
    const { lenis } = use(GlobalContext);

    useEffect(() => {
        console.log(lenis);
    }, [lenis]);

    return (
        <Jacket>
            {/*  */}
            {/*  */}
            {/*  */}
        </Jacket>
    );
};

// PropTypes
// ------------
Header.propTypes = {
    data: PropTypes.object,
};

// Exports
// ------------
Header.displayName = 'Header';
export default Header;
