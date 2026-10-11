// Imports
// ------------
import type * as I from './interface';

// Types
// ------------
export type TokenType =
	| 'comment'
	| 'string'
	| 'keyword'
	| 'tag'
	| 'type'
	| 'attr'
	| 'prop'
	| 'variable'
	| 'function'
	| 'number'
	| 'punctuation';

export type Token = { type: TokenType | null; text: string };

// Rules
// ------------
// NOTE • A small, dependency-free highlighter — enough for the snippets on
// this page, not a parser. Each rule is tried at the current position in
// order; the first match wins, and text no rule claims stays plain.
type Rule = [TokenType, RegExp];

const SHARED_HEAD: Rule[] = [
	['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
	['string', /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/y],
];

const SHARED_TAIL: Rule[] = [
	['variable', /--[\w-]+/y],
	['prop', /\$[A-Za-z_]\w*/y],
	['number', /#[\da-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:rem|px|ms|fr|vw|vh|s|%)?/y],
	['function', /[A-Za-z_][\w-]*(?=\()/y],
	['punctuation', /[{}()[\]<>/=;:,.]/y],
];

const RULES: Record<I.CodeLanguage, Rule[]> = {
	tsx: [
		...SHARED_HEAD,
		['tag', /<\/?[a-z][\w.-]*(?=[\s/>])/y],
		['type', /<\/?[A-Z][\w.]*|\b[A-Z][A-Za-z]+\b/y],
		[
			'keyword',
			/\b(?:import|from|export|default|const|let|return|type|interface|extends|if|else|function|async|await|new|as)\b/y,
		],
		['attr', /\b[a-zA-Z][\w-]*(?==)/y],
		...SHARED_TAIL,
	],
	scss: [
		...SHARED_HEAD,
		['keyword', /@[\w-]+/y],
		['tag', /<\/?[a-z][\w.-]*(?=[\s/>])/y],
		['attr', /\b[a-zA-Z][\w-]*(?==)/y],
		['type', /&|\.[A-Za-z][\w-]*(?=[\s{,:.[])/y],
		['attr', /\b[a-z][\w-]*(?=\s*:\s)/y],
		...SHARED_TAIL,
	],
	shell: [
		['comment', /#[^\n]*/y],
		...SHARED_HEAD,
		['function', /(?<=^|\n|&&\s*)[a-z][\w-]*/y],
		['attr', /(?<=\s)--?[\w-]+/y],
		...SHARED_TAIL,
	],
};

// NOTE • The snippet's language, from its label when not given — a terminal
// is shell, a stylesheet is SCSS, everything else reads as TSX
export const inferLanguage = (label = ''): I.CodeLanguage => {
	if (/terminal|shell|bash/i.test(label)) return 'shell';
	if (/s?css\b/i.test(label) && !/tsx|\bjs\b/i.test(label)) return 'scss';
	return 'tsx';
};

// NOTE • Unclaimed text moves on a whole word at a time, so no rule can
// start matching halfway through one
const PLAIN = /\w+|[\s\S]/y;

// Helpers
// ------------
const matchAt = (rules: Rule[], code: string, index: number): Token | null => {
	for (const [type, pattern] of rules) {
		pattern.lastIndex = index;
		const match = pattern.exec(code);
		if (match?.[0]) return { type, text: match[0] };
	}
	return null;
};

// Exports
// ------------
export const highlight = (code: string, language: I.CodeLanguage): Token[] => {
	const rules = RULES[language];
	const tokens: Token[] = [];
	let plain = '';
	let index = 0;

	while (index < code.length) {
		const token = matchAt(rules, code, index);
		if (token) {
			if (plain) tokens.push({ type: null, text: plain });
			plain = '';
			tokens.push(token);
			index += token.text.length;
		} else {
			PLAIN.lastIndex = index;
			const text = PLAIN.exec(code)?.[0] ?? code[index];
			plain += text;
			index += text.length;
		}
	}

	if (plain) tokens.push({ type: null, text: plain });
	return tokens;
};
