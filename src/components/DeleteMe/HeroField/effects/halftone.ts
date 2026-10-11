// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • A halftone screen locked to the grid: every column holds a whole
// number of dots, and waves roll up through them a step apart. The pointer
// drops ripples into the field.
export const halftone: HeroEffect = {
	id: 'halftone',
	name: 'Halftone',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	Column column = columnAt(p.x);
	float t = uTime;
	float width = column.right - column.left;

	float count = max(3.0, floor(width / (14.0 * uDpr)));
	float pitch = width / count;
	float cellX = floor((p.x - column.left) / pitch);
	vec2 centre = vec2(column.left + (cellX + 0.5) * pitch, (floor(p.y / pitch) + 0.5) * pitch);
	vec2 cuv = centre / uResolution;

	float wave = 0.5 + 0.5 * sin(cuv.y * 7.0 - t * 1.1 + column.index * 0.55 + sin(cuv.x * 3.0 + t * 0.3) * 1.2);
	float reach = length(centre - uPointer) / uDpr;
	float ripple = (0.5 + 0.5 * sin(reach * 0.045 - t * 3.0)) * exp(-reach * 0.004);
	float value = clamp(wave * 0.7 + ripple * 0.55 - 0.15, 0.0, 1.0);

	float radius = value * 0.48 * pitch;
	float disc = smoothstep(radius + 0.75 * uDpr, radius - 0.75 * uDpr, length(p - centre));
	outColor = emit(ramp(value * 1.1) * disc * column.inside * (0.5 + 0.9 * value));
}`,
};
