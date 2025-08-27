import React, { PropsWithChildren, HTMLAttributes } from 'react';

// Register the custom element only on the client
if (typeof window !== 'undefined' && !customElements.get('waffl-grid')) {
    console.log('Registering waffl-grid component');
    class WafflGridElement extends window.HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: grid;
                        contain: layout;
                        margin: 0 auto;
                    }
                </style>
                <slot></slot>
            `;
        }
    }
    customElements.define('waffl-grid', WafflGridElement);
    console.log('waffl-grid registered:', customElements.get('waffl-grid'));
}

// React wrapper component
type GridProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

const Grid: React.FC<GridProps> = ({ children, ...props }) => {
    return React.createElement('waffl-grid', props, children);
};

export default Grid;
