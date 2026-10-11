'use client';

// Imports
// ------------
import { theme } from '@theme';
import { startTransition, useState, ViewTransition } from 'react';
import Code from '../Code';
import CopyButton from '../CopyButton';
// Styles + Interfaces
// ------------
import type * as I from './interface';
import { clamp, columnsFor, DEVICES, resolve, toCode } from './placement';
import s from './styles.module.scss';

// Constants
// ------------
const DEVICE_NAMES: Record<string, string> = { s: 'Mobile', m: 'Tablet', l: 'Desktop' };
const MAX_ITEMS = 6;
const LABELS = 'ABCDEF';

const INITIAL_ITEMS: I.Item[] = [
	{ id: 1, label: 'A', spans: { m: { start: 1, span: 3 }, l: { start: 1, span: 4 } } },
	{ id: 2, label: 'B', spans: { m: { start: 4, span: 3 }, l: { start: 5, span: 4 } } },
	{ id: 3, label: 'C', spans: { l: { start: 9, span: 4 } } },
];

// Component
// ------------
// NOTE • A live, editable grid — pick a device, select a block and move it.
// The preview uses the real column counts and gutters from the grid tokens,
// and the code updates as you go.
const GridPlayground = () => {
	// State
	const [device, setDevice] = useState<I.Device>('l');
	const [items, setItems] = useState(INITIAL_ITEMS);
	const [selectedId, setSelectedId] = useState(INITIAL_ITEMS[0].id);
	const [hasGutter, setHasGutter] = useState(true);

	// Derived
	const columns = columnsFor(device);
	const selected = items.find(item => item.id === selectedId) ?? items[0];
	const placement = resolve(selected, device);
	const code = toCode(items, hasGutter);

	// Handlers
	// NOTE • Layout changes run inside a Transition, so <ViewTransition>
	// animates every block to its new place
	const update = (change: () => void) => startTransition(change);

	const setPlacement = (next: I.Placement | null) =>
		update(() =>
			setItems(current =>
				current.map(item => {
					if (item.id !== selected.id) return item;
					const spans = { ...item.spans };
					if (next) spans[device] = clamp(next, columns);
					else delete spans[device];
					return { ...item, spans };
				})
			)
		);

	const nudge = (key: keyof I.Placement, by: number) =>
		setPlacement({ start: placement.start, span: placement.span, [key]: placement[key] + by });

	const addItem = () =>
		update(() => {
			const id = Math.max(...items.map(item => item.id)) + 1;
			setItems(current => [...current, { id, label: LABELS[current.length], spans: {} }]);
			setSelectedId(id);
		});

	const removeItem = () =>
		update(() => {
			const remaining = items.filter(item => item.id !== selected.id);
			setItems(remaining.map((item, index) => ({ ...item, label: LABELS[index] })));
			setSelectedId(remaining[0].id);
		});

	// Render
	return (
		<div className={s.jacket}>
			{/* SECTION • Toolbar */}
			<div className={s.toolbar}>
				<fieldset className={s.tabs}>
					<legend className={s.legend}>Preview device</legend>
					{DEVICES.map(key => (
						<button
							key={key}
							type='button'
							className={s.tab}
							aria-pressed={device === key}
							onClick={() => update(() => setDevice(key))}
						>
							{DEVICE_NAMES[key] ?? key} <span className={s.muted}>{columnsFor(key)} col</span>
						</button>
					))}
				</fieldset>

				<label className={s.toggle}>
					<input
						type='checkbox'
						checked={!hasGutter}
						onChange={() => update(() => setHasGutter(value => !value))}
					/>
					$noGutter
				</label>
			</div>

			{/* SECTION • Preview */}
			<div className={s.frame} data-device={device}>
				<div
					className={s.preview}
					style={{
						'--columns': columns,
						'--gutter': hasGutter ? theme.grid.gutter[device] : '0px',
					}}
				>
					<div className={s.overlay} aria-hidden='true'>
						{Array.from({ length: columns }, (_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: one identical cell per column
							<span key={index} />
						))}
					</div>

					{items.map(item => {
						const { start, span, isInherited } = resolve(item, device);

						return (
							<ViewTransition key={item.id} name={`playground-${item.id}`}>
								<button
									type='button'
									className={s.item}
									style={{ gridColumn: `${start} / span ${span}` }}
									aria-pressed={item.id === selected.id}
									data-inherited={isInherited || undefined}
									onClick={() => setSelectedId(item.id)}
								>
									<span className={s.itemLabel}>{item.label}</span>
									<span className={s.itemValue}>
										{start}/{start + span}
									</span>
								</button>
							</ViewTransition>
						);
					})}
				</div>
			</div>

			{/* SECTION • Controls */}
			<div className={s.controls}>
				<p className={s.selection}>
					Block <strong>{selected.label}</strong> on {DEVICE_NAMES[device]?.toLowerCase() ?? device}:{' '}
					{placement.isInherited ? (
						<span className={s.muted}>
							inherits {placement.start}/{placement.start + placement.span}
						</span>
					) : (
						<code>
							${device}='{placement.start}/{placement.start + placement.span}'
						</code>
					)}
				</p>

				<div className={s.steppers}>
					<Stepper
						label='Start line'
						value={placement.start}
						onDecrease={() => nudge('start', -1)}
						onIncrease={() => nudge('start', 1)}
						isMin={placement.start <= 1}
						isMax={placement.start >= columns}
					/>
					<Stepper
						label='Span'
						value={placement.span}
						onDecrease={() => nudge('span', -1)}
						onIncrease={() => nudge('span', 1)}
						isMin={placement.span <= 1}
						isMax={placement.start + placement.span > columns}
					/>
				</div>

				<div className={s.actions}>
					<button
						type='button'
						className={s.action}
						onClick={() => setPlacement(null)}
						disabled={placement.isInherited}
					>
						{device === DEVICES[0] ? 'Full width' : 'Inherit from smaller'}
					</button>
					<button type='button' className={s.action} onClick={addItem} disabled={items.length >= MAX_ITEMS}>
						Add block
					</button>
					<button type='button' className={s.action} onClick={removeItem} disabled={items.length <= 1}>
						Remove {selected.label}
					</button>
				</div>
			</div>

			{/* SECTION • Code */}
			<div className={s.code}>
				<Code label='Live code' code={code} />
				<CopyButton text={code} label='Copy code' />
			</div>
		</div>
	);
};

// NOTE • − value + control for one number
const Stepper = ({
	label,
	value,
	onDecrease,
	onIncrease,
	isMin,
	isMax,
}: {
	label: string;
	value: number;
	onDecrease: () => void;
	onIncrease: () => void;
	isMin: boolean;
	isMax: boolean;
}) => (
	<div className={s.stepper}>
		<span className={s.stepperLabel}>{label}</span>
		<div className={s.stepperControls}>
			<button type='button' onClick={onDecrease} disabled={isMin} aria-label={`Decrease ${label.toLowerCase()}`}>
				−
			</button>
			<output aria-live='polite'>{value}</output>
			<button type='button' onClick={onIncrease} disabled={isMax} aria-label={`Increase ${label.toLowerCase()}`}>
				+
			</button>
		</div>
	</div>
);

// Exports
// ------------
GridPlayground.displayName = 'GridPlayground';
export default GridPlayground;
