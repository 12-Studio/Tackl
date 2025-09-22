// Type declarations for vendor-prefixed requestAnimationFrame
// ------------

export interface TracePoint {
	x: number;
	y: number;
}

export interface HeartParticle {
	vx: number;
	vy: number;
	R: number;
	speed: number;
	q: number;
	D: number;
	force: number;
	f: string;
	trace: TracePoint[];
}

export type PointsOrigin = [number, number][];

export type TargetPoints = [number, number][];

export type ScaleAndTranslate = (
	pos: [number, number],
	sx: number,
	sy: number,
	dx: number,
	dy: number
) => [number, number];

export type HeartPosition = (rad: number) => [number, number];

export type Pulse = (kx: number, ky: number) => void;

declare global {
	interface Window {
		isDevice?: boolean;
		opera?: any;
		__requestAnimationFrame?: (callback: FrameRequestCallback) => number;
		webkitRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
		mozRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
		oRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
		msRequestAnimationFrame?: (callback: FrameRequestCallback) => number;
	}
}