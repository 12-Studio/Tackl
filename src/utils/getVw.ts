/**
 * Converts pixel values to viewport width (vw) units
 *
 * This utility function takes a pixel value and converts it to a responsive
 * viewport width unit based on a 1440px design width. This is commonly used
 * for creating responsive designs that scale proportionally with the viewport.
 *
 * @param {number} px - The pixel value to convert
 * @returns {string} The converted value in vw units (e.g., "6.94vw")
 *
 * @example
 * getVw(100) // Returns "6.94vw"
 * getVw(200) // Returns "13.89vw"
 *
 * @example Usage in styled-components
 * const StyledComponent = styled.div`
 *   font-size: ${getVw(48)}; // Responsive font size
 *   margin: ${getVw(24)};    // Responsive margin
 * `;
 */
export const getVw = (px: number): string => {
    const vw = (px / 1440) * 100;
    return `${vw.toFixed(2)}vw`;
};

export const getVwMobile = (px: number): string => {
    const vw = (px / 402) * 100;
    return `${vw.toFixed(2)}vw`;
};

export const getVwTablet = (px: number): string => {
    const vw = (px / 768) * 100;
    return `${vw.toFixed(2)}vw`;
};
