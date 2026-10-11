// Imports
// ------------
import { theme } from '@theme';
import type * as I from './interface';

// Exports
// ------------
export const DEVICES = Object.keys(theme.grid.columns) as I.Device[];

export const columnsFor = (device: I.Device): number => theme.grid.columns[device];

// NOTE • Mirrors the grid layer in global.scss: a breakpoint without its own
// value uses the closest smaller one, and with none at all a child spans the
// full grid
export const resolve = (item: I.Item, device: I.Device): I.Placement & { isInherited: boolean } => {
	const upTo = DEVICES.slice(0, DEVICES.indexOf(device) + 1);
	const own = item.spans[device];
	if (own) return { ...own, isInherited: false };

	const inherited = upTo
		.map(key => item.spans[key])
		.filter(Boolean)
		.at(-1);
	return inherited ? { ...inherited, isInherited: true } : { start: 1, span: columnsFor(device), isInherited: true };
};

// NOTE • Keeps a placement inside the grid when the start or span moves
export const clamp = ({ start, span }: I.Placement, columns: number): I.Placement => {
	const safeStart = Math.min(Math.max(1, start), columns);
	return { start: safeStart, span: Math.min(Math.max(1, span), columns - safeStart + 1) };
};

const toProp = (device: I.Device, { start, span }: I.Placement) => `$${device}='${start}/${start + span}'`;

export const toCode = (items: I.Item[], hasGutter: boolean): string => {
	const children = items.map(item => {
		const props = DEVICES.flatMap(device => {
			const placement = item.spans[device];
			return placement ? [toProp(device, placement)] : [];
		});
		return props.length
			? `  <Col ${props.join(' ')}>${item.label}</Col>`
			: `  <div>${item.label}</div> {/* full width by default */}`;
	});

	return [`<Grid $isFixed${hasGutter ? '' : ' $noGutter'}>`, ...children, '</Grid>'].join('\n');
};
