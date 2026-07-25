// Property Documentation
// ------------

// NOTE • Dev-only endpoint behind the TacklSetup wizard (src/components/TacklSetup).
// 'finish' writes the submitted tokens into the raw value objects in src/theme,
// then removes the wizard entirely — this route, the component folder and the
// marked lines in app/(site)/Providers.tsx. 'skip' removes the wizard and keeps
// the default theme. 'upload-font' saves a font file into src/theme/fonts/custom
// and generates its next/font wiring. The route deletes itself on finish/skip,
// so it never ships.

// Imports
// ------------
import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

// Types
// ------------
type TokenGroup =
	| 'brand'
	| 'global'
	| 'feedback'
	| 'fonts'
	| 'space'
	| 'gap'
	| 'radius'
	| 'time'
	| 'easing'
	| 'displayL'
	| 'displayS'
	| 'headlineL'
	| 'headlineS'
	| 'titleL'
	| 'titleS'
	| 'bodyL'
	| 'bodyS'
	| 'captionL'
	| 'captionS';

type TokenValues = Record<TokenGroup, Record<string, string>>;

type GroupSpec = { required: readonly string[]; optional?: readonly string[]; kind: 'color' | 'text' };

// Constants
// ------------
const ROOT = process.cwd();

const FONT_FAMILY_KEYS = ['heading', 'body', 'mono', 'script'];
const FONT_WEIGHT_KEYS = ['light', 'regular', 'medium', 'semi', 'bold', 'heavy', 'black'];
const TEXT_TRANSFORM_KEYS = ['uppercase', 'lowercase', 'capitalize', 'none'];

// NOTE • Type-scale entries nest per breakpoint (base/m/xl) — the wizard sends
// a flat record with M/Xl suffixes. Base needs family/weight/size/line-height;
// every other key is an override that may be absent (= inherited).
const TYPE_BREAKPOINT_KEYS = ['family', 'weight', 'size', 'lineHeight', 'letterSpacing', 'textTransform'];

const TYPE_SCALE_SPEC: GroupSpec = {
	required: ['family', 'weight', 'size', 'lineHeight'],
	optional: [
		'letterSpacing',
		'textTransform',
		...TYPE_BREAKPOINT_KEYS.map(key => `${key}M`),
		...TYPE_BREAKPOINT_KEYS.map(key => `${key}Xl`),
	],
	kind: 'text',
};

const GROUPS: Record<TokenGroup, GroupSpec> = {
	brand: { required: ['bc1', 'bc2', 'bc3', 'bc4', 'bc5'], kind: 'color' },
	global: { required: ['white', 'black'], kind: 'color' },
	feedback: { required: ['positive', 'negative', 'warning'], kind: 'color' },
	fonts: { required: ['heading', 'body', 'mono', 'script'], kind: 'text' },
	space: { required: ['s', 'm', 'l', 'xl', 'col'], kind: 'text' },
	gap: { required: ['xxs', 'xs', 's', 'sm', 'm', 'l', 'xl', 'xxl', 'huge', 'uber'], kind: 'text' },
	radius: { required: ['xs', 's', 'm', 'l', 'round'], kind: 'text' },
	time: { required: ['s', 'm', 'l'], kind: 'text' },
	easing: { required: ['bezzy', 'bezzy2', 'bezzy3'], kind: 'text' },
	displayL: TYPE_SCALE_SPEC,
	displayS: TYPE_SCALE_SPEC,
	headlineL: TYPE_SCALE_SPEC,
	headlineS: TYPE_SCALE_SPEC,
	titleL: TYPE_SCALE_SPEC,
	titleS: TYPE_SCALE_SPEC,
	bodyL: TYPE_SCALE_SPEC,
	bodyS: TYPE_SCALE_SPEC,
	captionL: TYPE_SCALE_SPEC,
	captionS: TYPE_SCALE_SPEC,
};

// NOTE • Regroup a flat wizard record ({family, sizeM, …}) into the nested
// typeScale shape ({base, m?, xl?}); empty breakpoint blocks are dropped
const nestTypeStyle = (flat: Record<string, string>): Record<string, unknown> => {
	const pick = (suffix: string) => {
		const block: Record<string, string> = {};
		for (const key of TYPE_BREAKPOINT_KEYS) {
			const value = flat[`${key}${suffix}`];
			if (value) block[key] = value;
		}
		return block;
	};

	const entry: Record<string, unknown> = { base: pick('') };
	const m = pick('M');
	const xl = pick('Xl');
	if (Object.keys(m).length > 0) entry.m = m;
	if (Object.keys(xl).length > 0) entry.xl = xl;
	return entry;
};

const TOKEN_TARGETS: {
	file: string;
	exportName: string;
	build: (tokens: TokenValues) => Record<string, unknown>;
}[] = [
	{
		file: 'src/theme/colors/index.ts',
		exportName: 'baseColors',
		build: tokens => ({ brand: tokens.brand, global: tokens.global, feedback: tokens.feedback }),
	},
	{ file: 'src/theme/fonts/index.ts', exportName: 'fontFamilies', build: tokens => tokens.fonts },
	{ file: 'src/theme/space/index.ts', exportName: 'spaceValues', build: tokens => tokens.space },
	{ file: 'src/theme/gap/index.ts', exportName: 'gapValues', build: tokens => tokens.gap },
	{
		file: 'src/theme/borderRadius/index.ts',
		exportName: 'borderRadiusValues',
		build: tokens => tokens.radius,
	},
	{ file: 'src/theme/time/index.ts', exportName: 'timeValues', build: tokens => tokens.time },
	{ file: 'src/theme/easing/index.ts', exportName: 'easingValues', build: tokens => tokens.easing },
	{
		file: 'src/theme/tackl/type/index.ts',
		exportName: 'typeScale',
		build: tokens => ({
			displayL: nestTypeStyle(tokens.displayL),
			displayS: nestTypeStyle(tokens.displayS),
			headlineL: nestTypeStyle(tokens.headlineL),
			headlineS: nestTypeStyle(tokens.headlineS),
			titleL: nestTypeStyle(tokens.titleL),
			titleS: nestTypeStyle(tokens.titleS),
			bodyL: nestTypeStyle(tokens.bodyL),
			bodyS: nestTypeStyle(tokens.bodyS),
			captionL: nestTypeStyle(tokens.captionL),
			captionS: nestTypeStyle(tokens.captionS),
		}),
	},
];

const WIZARD_PATHS = ['src/components/TacklSetup', 'app/api/tackl-setup'];
const GATE_FILE = 'app/(site)/Providers.tsx';
const GATE_MARKER_START = 'tackl:setup-start';
const GATE_MARKER_END = 'tackl:setup-end';

const FONTS_FILE = 'src/theme/fonts/index.ts';
const FONTS_DIR = 'src/theme/fonts/custom';
const LAYOUT_FILE = 'app/(site)/layout.tsx';
const FONT_EXTENSIONS = ['.woff2', '.woff', '.ttf', '.otf'];
const FONT_SIZE_LIMIT = 5 * 1024 * 1024;

// Validation
// ------------
const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const UNSAFE_PATTERN = /[`\\\r\n]|\$\{/;
const FONT_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9]*$/;

// NOTE • family/weight/textTransform values are token keys, validated
// against the theme's own lists
const validTypeValue = (key: string, value: string): boolean => {
	if (key.startsWith('family')) return FONT_FAMILY_KEYS.includes(value);
	if (key.startsWith('weight')) return FONT_WEIGHT_KEYS.includes(value);
	if (key.startsWith('textTransform')) return TEXT_TRANSFORM_KEYS.includes(value);
	return true;
};

const parseTokens = (input: unknown): TokenValues | null => {
	if (typeof input !== 'object' || input === null) return null;
	const record = input as Record<string, unknown>;
	const result = {} as TokenValues;

	for (const [group, spec] of Object.entries(GROUPS) as [TokenGroup, GroupSpec][]) {
		const values = record[group];
		if (typeof values !== 'object' || values === null) return null;
		const valueRecord = values as Record<string, unknown>;
		const parsed: Record<string, string> = {};

		for (const key of spec.required) {
			const value = valueRecord[key];
			if (typeof value !== 'string') return null;
			const trimmed = value.trim();
			if (!trimmed || UNSAFE_PATTERN.test(trimmed)) return null;
			if (spec.kind === 'color' && !HEX_PATTERN.test(trimmed)) return null;
			if (spec === TYPE_SCALE_SPEC && !validTypeValue(key, trimmed)) return null;
			parsed[key] = trimmed;
		}

		// NOTE • Optional keys may be absent or empty (= omitted from the output),
		// but when present they get the same safety checks
		for (const key of spec.optional ?? []) {
			const value = valueRecord[key];
			if (value === undefined) continue;
			if (typeof value !== 'string') return null;
			const trimmed = value.trim();
			if (!trimmed) continue;
			if (UNSAFE_PATTERN.test(trimmed)) return null;
			if (spec === TYPE_SCALE_SPEC && !validTypeValue(key, trimmed)) return null;
			parsed[key] = trimmed;
		}

		result[group] = parsed;
	}

	return result;
};

// Serialisation
// ------------
const quote = (value: string): string => (value.includes("'") ? `"${value}"` : `'${value}'`);

const serialize = (obj: Record<string, unknown>, indent = 1): string => {
	const tabs = '\t'.repeat(indent);
	const isNested = Object.values(obj).some(value => typeof value === 'object');
	const lines = Object.entries(obj).map(([key, value]) =>
		typeof value === 'object' && value !== null
			? `${tabs}${key}: ${serialize(value as Record<string, unknown>, indent + 1)},`
			: `${tabs}${key}: ${quote(String(value))},`
	);

	return `{\n${lines.join(isNested ? '\n\n' : '\n')}\n${'\t'.repeat(indent - 1)}}`;
};

// NOTE • Replaces the object literal of `export const <name> = {…}` in place,
// brace-matching while skipping string contents so values with braces are safe
const replaceExport = (source: string, exportName: string, literal: string): string => {
	const marker = `export const ${exportName} = {`;
	const start = source.indexOf(marker);
	if (start === -1) throw new Error(`Could not find "${exportName}" to update`);

	let index = start + marker.length - 1;
	let depth = 0;

	for (; index < source.length; index++) {
		const char = source[index];

		if (char === "'" || char === '"' || char === '`') {
			index++;
			while (index < source.length && source[index] !== char) {
				if (source[index] === '\\') index++;
				index++;
			}
			continue;
		}

		if (char === '{') depth++;
		if (char === '}') {
			depth--;
			if (depth === 0) break;
		}
	}

	if (depth !== 0) throw new Error(`Could not parse "${exportName}" — unbalanced braces`);

	return `${source.slice(0, start)}export const ${exportName} = ${literal}${source.slice(index + 1)}`;
};

// Filesystem
// ------------
const writeTokens = (tokens: TokenValues): void => {
	for (const target of TOKEN_TARGETS) {
		const filePath = path.join(ROOT, target.file);
		const source = fs.readFileSync(filePath, 'utf8');
		fs.writeFileSync(filePath, replaceExport(source, target.exportName, serialize(target.build(tokens))));
	}
};

const removeWizard = (): void => {
	const gatePath = path.join(ROOT, GATE_FILE);
	const lines = fs.readFileSync(gatePath, 'utf8').split('\n');
	const kept: string[] = [];
	let skipping = false;

	for (const line of lines) {
		if (line.includes(GATE_MARKER_START)) {
			skipping = true;
			continue;
		}
		if (line.includes(GATE_MARKER_END)) {
			skipping = false;
			continue;
		}
		if (!skipping) kept.push(line);
	}

	fs.writeFileSync(gatePath, kept.join('\n').replace(/\n{3,}/g, '\n\n'));

	for (const wizardPath of WIZARD_PATHS) {
		fs.rmSync(path.join(ROOT, wizardPath), { recursive: true, force: true });
	}
};

// Font upload
// ------------
const kebabCase = (name: string): string => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const installFont = (name: string, fileName: string, data: string): { exportName: string; cssVariable: string } => {
	if (!FONT_NAME_PATTERN.test(name)) {
		throw new Error('Font name must be a simple identifier, e.g. myFont');
	}

	const extension = path.extname(fileName).toLowerCase();
	if (!FONT_EXTENSIONS.includes(extension)) {
		throw new Error(`Font file must be one of: ${FONT_EXTENSIONS.join(', ')}`);
	}

	const buffer = Buffer.from(data, 'base64');
	if (buffer.length === 0 || buffer.length > FONT_SIZE_LIMIT) {
		throw new Error('Font file is empty or larger than 5MB');
	}

	const fontsPath = path.join(ROOT, FONTS_FILE);
	let fontsSource = fs.readFileSync(fontsPath, 'utf8');
	if (fontsSource.includes(`export const ${name} `) || fontsSource.includes(`export const ${name} =`)) {
		throw new Error(`"${name}" is already used in src/theme/fonts`);
	}

	// NOTE • Save the file under a name derived from the variable, keeping it 1:1
	const safeFileName = `${name}${extension}`;
	fs.mkdirSync(path.join(ROOT, FONTS_DIR), { recursive: true });
	fs.writeFileSync(path.join(ROOT, FONTS_DIR, safeFileName), buffer);

	// NOTE • Uncomment the localFont import on first use
	if (!/^import localFont from 'next\/font\/local';$/m.test(fontsSource)) {
		fontsSource = fontsSource.replace(
			"// import localFont from 'next/font/local';",
			"import localFont from 'next/font/local';"
		);
		if (!fontsSource.includes("import localFont from 'next/font/local';")) {
			fontsSource = `import localFont from 'next/font/local';\n${fontsSource}`;
		}
	}

	const cssVariable = `--${kebabCase(name)}`;
	const fontExport = [
		'// SECTION • Uploaded via Tackl setup — adjust weights/styles as needed',
		`export const ${name} = localFont({`,
		`\tsrc: [{ path: './custom/${safeFileName}', weight: '400', style: 'normal' }],`,
		"\tdisplay: 'swap',",
		`\tvariable: '${cssVariable}',`,
		'\tpreload: true,',
		'});',
		'',
		'',
	].join('\n');

	const stacksMarker = '// SECTION • Raw Font Stacks';
	if (!fontsSource.includes(stacksMarker)) throw new Error('Could not find the font stacks section to update');
	fontsSource = fontsSource.replace(stacksMarker, `${fontExport}${stacksMarker}`);
	fs.writeFileSync(fontsPath, fontsSource);

	// NOTE • The variable class must be on <html> for the CSS var to exist
	const layoutPath = path.join(ROOT, LAYOUT_FILE);
	let layoutSource = fs.readFileSync(layoutPath, 'utf8');

	layoutSource = layoutSource.replace(/import \{ ([^}]+) \} from '@theme\/fonts';/, (match, names: string) =>
		names.includes(name) ? match : `import { ${names.trim()}, ${name} } from '@theme/fonts';`
	);

	if (layoutSource.includes('className={inter.variable}')) {
		layoutSource = layoutSource.replace(
			'className={inter.variable}',
			`className={\`\${inter.variable} \${${name}.variable}\`}`
		);
	} else {
		layoutSource = layoutSource.replace(
			/className=\{`([^`]*)`\}/,
			(_match, existing: string) => `className={\`${existing} \${${name}.variable}\`}`
		);
	}

	fs.writeFileSync(layoutPath, layoutSource);

	return { exportName: name, cssVariable };
};

// Handler
// ------------
export const POST = async (request: Request): Promise<NextResponse> => {
	if (process.env.NODE_ENV !== 'development') {
		return NextResponse.json({ error: 'Setup is only available in development' }, { status: 404 });
	}

	const body: unknown = await request.json().catch(() => null);
	const record = body !== null && typeof body === 'object' ? (body as Record<string, unknown>) : {};
	const action = record.action;

	try {
		if (action === 'upload-font') {
			const { name, fileName, data } = record;
			if (typeof name !== 'string' || typeof fileName !== 'string' || typeof data !== 'string') {
				return NextResponse.json({ error: 'Invalid font upload' }, { status: 400 });
			}
			const font = installFont(name.trim(), fileName, data);
			return NextResponse.json({ ok: true, ...font, varRef: `var(${font.cssVariable})` });
		}

		if (action !== 'finish' && action !== 'skip') {
			return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
		}

		if (action === 'finish') {
			const tokens = parseTokens(record.tokens);
			if (tokens === null) {
				return NextResponse.json({ error: 'Invalid token values' }, { status: 400 });
			}
			writeTokens(tokens);
		}

		removeWizard();
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Setup failed';
		return NextResponse.json({ error: message }, { status: 500 });
	}

	return NextResponse.json({ ok: true });
};
