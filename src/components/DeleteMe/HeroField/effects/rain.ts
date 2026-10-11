// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • Digital rain on a dot matrix, falling only inside the columns.
// Every lane falls at its own speed with a white head and a brand trail;
// cells flicker like a display refreshing.
export const rain: HeroEffect = {
	id: 'rain',
	name: 'Rain',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	Column column = columnAt(p.x);
	float t = uTime;

	float size = 9.0 * uDpr;
	vec2 cell = floor(p / size);
	vec2 local = fract(p / size) - 0.5;
	float disc = smoothstep(0.36, 0.26, length(local));

	float lane = cell.x;
	float isActive = step(0.35, hash1(lane + 7.0));
	float speed = 0.25 + hash1(lane) * 0.6;
	float spacing = 0.6 + hash1(lane + 1.0) * 1.2;
	float fall = fract(cell.y * size / uResolution.y * spacing + t * speed * 0.35 + hash1(lane + 2.0));
	float trail = pow(1.0 - fall, 7.0);
	float head = smoothstep(0.985, 1.0, 1.0 - fall);
	float flicker = 0.75 + 0.25 * hash(cell + floor(t * 9.0));

	vec3 colour = ramp(0.15 + trail * 0.6) * trail * isActive * flicker + uLight * head * isActive;
	// A faint grid of unlit dots keeps the matrix visible
	colour += uAccent * 0.07;
	outColor = emit(colour * disc * column.inside);
}`,
};
