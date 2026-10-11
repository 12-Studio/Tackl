// Imports
// ------------
import type { Columns } from '@theme/grid/interface';

// Exports
// ------------
export type Device = keyof Columns;

export type Placement = {
	start: number;
	span: number;
};

export type Item = {
	id: number;
	label: string;
	// NOTE • Only the breakpoints set explicitly — the rest fall back, exactly
	// like the $s/$m/$l props on <Col>
	spans: Partial<Record<Device, Placement>>;
};
