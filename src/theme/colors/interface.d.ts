// Color Types / Interfaces
// ------------

// SECTION • Colors
// NOTE — The main color object structure
export type Colors = {
    brand: BrandColorVariations;
    global: GlobalColors;
    social: SocialColors;
    feedback: FeedbackColors;
};

// SECTION • AlphaShades
// NOTE — Used for colors with alpha (opacity) variations and a solid value
export type AlphaShades = {
    [key: number]: string;
    solid: string;
};

// SECTION • Brand Colors
// NOTE — Each brand color, each with AlphaShades
export type BrandColorVariations = {
    bc1: AlphaShades;
    bc2: AlphaShades;
    bc3: AlphaShades;
    bc4?: AlphaShades;
    bc5?: AlphaShades;
    bc6?: AlphaShades;
};


// SECTION • Global Colors
// NOTE — White + Black, each with AlphaShades
export type GlobalColors = {
    white: AlphaShades;
    black: AlphaShades;
};

// SECTION • Social Colors
// NOTE — Each social color has AlphaShades
export type SocialColors = {
    facebook?: AlphaShades;
    twitter?: AlphaShades;
    creativeMarket?: AlphaShades;
    slack?: AlphaShades;
    instagram?: AlphaShades;
    dribbble?: AlphaShades;
    linkedin?: AlphaShades;
};


// SECTION • Feedback Colors
// NOTE — Each feedback color has AlphaShades
export type FeedbackColors = {
    positive: AlphaShades;
    negative: AlphaShades;
    warning: AlphaShades;
};





