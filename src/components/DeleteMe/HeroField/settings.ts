// Settings
// ------------
// NOTE • Every tunable value of the hero field, in one place. The tweak
// panel (HeroTweaks) edits a live copy and its "Copy" button exports this
// DEFAULTS object — paste it back here to keep a look.
export const DEFAULTS = {
	torchRadius: 0.41,
	torchHeight: 0,
	torchStrength: 0.75,
	followEase: 250,
	idleDelay: 2500,
	swayAmount: 0.3,
	swaySpeed: 0.31,
	pulseDuration: 2.6,
	pulseReach: 0.95,
	pulseWidthStart: 600,
	pulseWidthEnd: 5,
	crestWidth: 0.08,
	wakeLength: 1.8,
	wakeStrength: 0.6,
	pulseFade: 2.85,
	pulseIntensity: 1.6,
	hazeStrength: 1.5,
	hazeFade: 4.1,
	edgeWidth: 0.5,
	edgeBase: 0.51,
	edgeLit: 0.4,
	dotPitch: 9,
	dotSize: 1,
	dotBase: 0.29,
	dotLit: 0.55,
	fillBase: 0.46,
	fillNoise: 0.03,
	noiseScale: 140,
	noiseSpeed: 0.15,
	fillLit: 1.6,
	rampBase: 0,
	rampRange: 0.59,
	veilStrength: 0.54,
	veilY: 0.52,
	veilWidth: 1.4,
	veilHeight: 2.4,
	maxDpr: 1.5,
	timeOffset: 8,
};

// NOTE • The three brand colours the field is drawn in — null follows the
// token, a hex value overrides it
export const COLOUR_DEFAULTS: Record<ColourKey, string | null> = {
	deep: null,
	accent: null,
	light: null,
};

export const COLOURS = [
	{ key: 'deep', label: 'Deep', token: '--brand-c2' },
	{ key: 'accent', label: 'Accent', token: '--brand-c1' },
	{ key: 'light', label: 'Light', token: '--global-white' },
] as const;

// Types
// ------------
export type SettingKey = keyof typeof DEFAULTS;
export type Settings = Record<SettingKey, number>;
export type ColourKey = 'deep' | 'accent' | 'light';
export type Colours = Record<ColourKey, string | null>;

type Control = { key: SettingKey; label: string; min: number; max: number; step: number };

// Schema
// ------------
// NOTE • How the panel presents each value. Lengths in pixels are CSS
// pixels (scaled by the device pixel ratio in the shader).
export const GROUPS: { title: string; controls: Control[] }[] = [
	{
		title: 'Torch',
		controls: [
			{ key: 'torchRadius', label: 'Radius (× height)', min: 0.05, max: 1.5, step: 0.01 },
			{ key: 'torchHeight', label: 'Height (from bottom)', min: 0, max: 1, step: 0.01 },
			{ key: 'torchStrength', label: 'Strength', min: 0, max: 4, step: 0.05 },
		],
	},
	{
		title: 'Pointer',
		controls: [
			{ key: 'followEase', label: 'Follow ease (ms)', min: 0, max: 2000, step: 10 },
			{ key: 'idleDelay', label: 'Idle after (ms)', min: 0, max: 10000, step: 100 },
			{ key: 'swayAmount', label: 'Idle sway (× width)', min: 0, max: 0.5, step: 0.01 },
			{ key: 'swaySpeed', label: 'Idle sway speed', min: 0, max: 2, step: 0.01 },
		],
	},
	{
		title: 'Pulse',
		controls: [
			{ key: 'pulseDuration', label: 'Duration (s)', min: 0.2, max: 10, step: 0.1 },
			{ key: 'pulseReach', label: 'Reach (× diagonal)', min: 0.1, max: 2, step: 0.01 },
			{ key: 'pulseWidthStart', label: 'Width at start (px)', min: 5, max: 600, step: 1 },
			{ key: 'pulseWidthEnd', label: 'Width at end (px)', min: 5, max: 1200, step: 1 },
			{ key: 'crestWidth', label: 'Crest sharpness', min: 0.05, max: 2, step: 0.01 },
			{ key: 'wakeLength', label: 'Wake length', min: 0, max: 6, step: 0.05 },
			{ key: 'wakeStrength', label: 'Wake strength', min: 0, max: 2, step: 0.01 },
			{ key: 'pulseFade', label: 'Fade curve', min: 0.1, max: 5, step: 0.05 },
			{ key: 'pulseIntensity', label: 'Intensity', min: 0, max: 5, step: 0.05 },
			{ key: 'hazeStrength', label: 'Haze strength', min: 0, max: 2, step: 0.01 },
			{ key: 'hazeFade', label: 'Haze fade curve', min: 0.1, max: 5, step: 0.05 },
		],
	},
	{
		title: 'Column edges',
		controls: [
			{ key: 'edgeWidth', label: 'Width (px)', min: 0, max: 6, step: 0.1 },
			{ key: 'edgeBase', label: 'Unlit brightness', min: 0, max: 1, step: 0.01 },
			{ key: 'edgeLit', label: 'Lit brightness', min: 0, max: 4, step: 0.05 },
		],
	},
	{
		title: 'Dots',
		controls: [
			{ key: 'dotPitch', label: 'Spacing (px)', min: 6, max: 96, step: 1 },
			{ key: 'dotSize', label: 'Size (px)', min: 0, max: 8, step: 0.1 },
			{ key: 'dotBase', label: 'Unlit brightness', min: 0, max: 1, step: 0.01 },
			{ key: 'dotLit', label: 'Lit brightness', min: 0, max: 4, step: 0.05 },
		],
	},
	{
		title: 'Column fill',
		controls: [
			{ key: 'fillBase', label: 'Base', min: 0, max: 1, step: 0.01 },
			{ key: 'fillNoise', label: 'Noise amount', min: 0, max: 1, step: 0.01 },
			{ key: 'noiseScale', label: 'Noise scale (px)', min: 10, max: 600, step: 5 },
			{ key: 'noiseSpeed', label: 'Noise speed', min: 0, max: 2, step: 0.01 },
			{ key: 'fillLit', label: 'Lit brightness', min: 0, max: 5, step: 0.05 },
		],
	},
	{
		title: 'Colour ramp',
		controls: [
			{ key: 'rampBase', label: 'Unlit position', min: 0, max: 1, step: 0.01 },
			{ key: 'rampRange', label: 'Lit range', min: 0, max: 1, step: 0.01 },
		],
	},
	{
		title: 'Headline veil',
		controls: [
			{ key: 'veilStrength', label: 'Strength', min: 0, max: 1, step: 0.01 },
			{ key: 'veilY', label: 'Centre (from bottom)', min: 0, max: 1, step: 0.01 },
			{ key: 'veilWidth', label: 'Tightness x', min: 0.1, max: 6, step: 0.05 },
			{ key: 'veilHeight', label: 'Tightness y', min: 0.1, max: 6, step: 0.05 },
		],
	},
	{
		title: 'Render',
		controls: [
			{ key: 'maxDpr', label: 'Max pixel ratio', min: 0.5, max: 3, step: 0.25 },
			{ key: 'timeOffset', label: 'Still-frame time (s)', min: 0, max: 60, step: 1 },
		],
	},
];

// NOTE • Values the JS side uses; every other setting is a shader uniform
const JS_ONLY: SettingKey[] = [
	'torchHeight',
	'followEase',
	'idleDelay',
	'swayAmount',
	'swaySpeed',
	'maxDpr',
	'timeOffset',
];

export const UNIFORM_SETTINGS = (Object.keys(DEFAULTS) as SettingKey[]).filter(key => !JS_ONLY.includes(key));

// NOTE • torchRadius → uTorchRadius
export const uniformName = (key: SettingKey) => `u${key[0].toUpperCase()}${key.slice(1)}`;
