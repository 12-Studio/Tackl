import React from 'react';

// Register the custom element only on the client
if (typeof window !== 'undefined' && !customElements.get('waffl-grid')) {
    class WafflGridElement extends window.HTMLElement {
        constructor() {
            super();
        }
    }
    customElements.define('waffl-grid', WafflGridElement);
}

// React wrapper component
const Grid = ({ children, ...props }) => {
    return React.createElement('waffl-grid', props, children);
};

export default Grid;
