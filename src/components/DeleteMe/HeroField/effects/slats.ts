// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • Venetian louvres: every column is a slat turning on its vertical
// axis, a wave of rotation rolling across the grid. The slats' fronts carry
// one glowing image that only lines up when they face you — and the pointer
// opens the blinds where it is.
export const slats: HeroEffect = {
	id: 'slats',
	name: 'Slats',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	vec2 uv = p / uResolution;
	Column column = columnAt(p.x);
	float t = uTime;
	float width = column.right - column.left;
	float aspect = uResolution.x / uResolution.y;

	float centreX = (column.left + column.right) * 0.5;
	float near = (centreX - uPointer.x) / uResolution.x;
	float angle = 1.2 * sin(t * 0.6 - column.index * 0.45) * (1.0 - exp(-near * near * 30.0));

	float face = cos(angle);
	float halfWidth = 0.5 * abs(face);
	float offset = column.local - 0.5;
	float onSlat = step(abs(offset), halfWidth) * column.inside;

	// Where on the slat's face this pixel lands, across the whole image
	float u = offset / max(abs(face), 1e-3) + 0.5;
	vec2 image = vec2((column.left + u * width) / uResolution.x, uv.y);
	vec2 d = (image - vec2(0.5, 0.48)) * vec2(aspect * 0.7, 1.3);
	float glow = 0.12 + exp(-dot(d, d) * 2.2) * 0.95;

	float lambert = 0.3 + 0.7 * max(0.0, cos(angle - 0.55));
	vec3 front = ramp(glow) * glow * lambert;
	vec3 back = uDeep * 0.5 * lambert;
	vec3 colour = face > 0.0 ? front : back;

	float rim = smoothstep(0.08, 0.0, (halfWidth - abs(offset)) / max(halfWidth, 1e-3));
	colour += uLight * rim * 0.25 * abs(sin(angle));
	outColor = emit(colour * onSlat);
}`,
};
