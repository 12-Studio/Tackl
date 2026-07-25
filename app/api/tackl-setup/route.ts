// Property Documentation
// ------------

// NOTE • Dev-only endpoint behind the TacklSetup wizard (src/components/TacklSetup).
// 'finish' writes the submitted tokens into the raw value objects in src/theme,
// then removes the wizard entirely — this route, the component folder and the
// marked lines in app/(site)/Providers.tsx. 'skip' removes the wizard and keeps
// the default theme. Either way this file deletes itself, so it never ships.

// Imports
// ------------
import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

// Types
// ------------
type TokenGroup = 'brand' | 'global' | 'feedback' | 'fonts' | 'space' | 'gap' | 'radius' | 'time' | 'easing';

type TokenValues = Record<TokenGroup, Record<string, string>>;

type GroupSpec = { keys: readonly string[]; kind: 'color' | 'text' };

// Constants
// ------------
const ROOT = process.cwd();

// NOTE • Mirrors the token keys in src/theme — safe to hardcode because this
// route only exists until first-run setup completes
const GROUPS: Record<TokenGroup, GroupSpec> = {
	brand: { keys: ['bc1', 'bc2', 'bc3', 'bc4', 'bc5'], kind: 'color' },
	global: { keys: ['white', 'black'], kind: 'color' },
	feedback: { keys: ['positive', 'negative', 'warning'], kind: 'color' },
	fonts: { keys: ['heading', 'body', 'mono', 'script'], kind: 'text' },
	space: { keys: ['s', 'm', 'l', 'xl', 'col'], kind: 'text' },
	gap: { keys: ['xxs', 'xs', 's', 'sm', 'm', 'l', 'xl', 'xxl', 'huge', 'uber'], kind: 'text' },
	radius: { keys: ['xs', 's', 'm', 'l', 'round'], kind: 'text' },
	time: { keys: ['s', 'm', 'l'], kind: 'text' },
	easing: { keys: ['bezzy', 'bezzy2', 'bezzy3'], kind: 'text' },
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
];

const WIZARD_PATHS = ['src/components/TacklSetup', 'app/api/tackl-setup'];
const GATE_FILE = 'app/(site)/Providers.tsx';
const GATE_MARKER_START = 'tackl:setup-start';
const GATE_MARKER_END = 'tackl:setup-end';

// Validation
// ------------
const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const UNSAFE_PATTERN = /[`\\\r\n]|\$\{/;

const parseTokens = (input: unknown): TokenValues | null => {
	if (typeof input !== 'object' || input === null) return null;
	const record = input as Record<string, unknown>;
	const result = {} as TokenValues;

	for (const [group, spec] of Object.entries(GROUPS) as [TokenGroup, GroupSpec][]) {
		const values = record[group];
		if (typeof values !== 'object' || values === null) return null;
		const valueRecord = values as Record<string, unknown>;
		const parsed: Record<string, string> = {};

		for (const key of spec.keys) {
			const value = valueRecord[key];
			if (typeof value !== 'string') return null;
			const trimmed = value.trim();
			if (!trimmed || UNSAFE_PATTERN.test(trimmed)) return null;
			if (spec.kind === 'color' && !HEX_PATTERN.test(trimmed)) return null;
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

// Handler
// ------------
export const POST = async (request: Request): Promise<NextResponse> => {
	if (process.env.NODE_ENV !== 'development') {
		return NextResponse.json({ error: 'Setup is only available in development' }, { status: 404 });
	}

	const body: unknown = await request.json().catch(() => null);
	const action =
		body !== null && typeof body === 'object' && 'action' in body ? (body as { action: unknown }).action : null;

	if (action !== 'finish' && action !== 'skip') {
		return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
	}

	try {
		if (action === 'finish') {
			const tokens = parseTokens((body as { tokens?: unknown }).tokens);
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
