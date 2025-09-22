// Fonts Types / Interfaces
// ------------

// SECTION • Fonts
// NOTE — The main fonts object structure
export interface Fonts {
    family: Family;
    weight: Weight;
}


// SECTION • Family
// NOTE — The main family object structure
export interface Family {
    heading: string;
    body: string;
    mono: string;
    script: string;
}

// SECTION • Weight
// NOTE — The main weight object structure
export interface Weight {
    light: number;
    regular: number;
    medium: number;
    semi: number;
    bold: number;
    heavy: number;
    black: number;
}
