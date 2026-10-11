// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • Every column is a stage-light beam rising from the floor, each on
// its own pulse. Haze drifts up through the beams; the pointer brightens
// the columns it passes. Gutters stay dark, so the grid reads clearly.
export const pillars: HeroEffect = {
	id: 'pillars',
	name: 'Pillars',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	vec2 uv = p / uResolution;
	Column column = columnAt(p.x);
	float t = uTime;

	float centre = 1.0 - abs(column.local * 2.0 - 1.0);
	float beam = pow(centre, 1.6) * column.inside;

	float seed = hash1(column.index + 3.0) * 6.2831;
	float pulse = 0.3 + 0.7 * pow(0.5 + 0.5 * sin(t * 0.55 + column.index * 0.8 + seed), 3.0);
	float near = abs(p.x - uPointer.x) / uResolution.x;
	pulse += smoothstep(0.22, 0.0, near) * 0.7;

	float height = smoothstep(1.05, 0.0, uv.y);
	float haze = fbm(vec2(uv.x * 7.0, uv.y * 2.5 - t * 0.22));
	float light = beam * pulse * height * (0.6 + 0.8 * haze);

	// A pool of light where each beam meets the floor
	light += exp(-uv.y * 10.0) * 0.7 * pulse * column.inside * (0.4 + 0.6 * centre);

	outColor = emit(ramp(light) * clamp(light * 2.0, 0.0, 1.0));
}`,
};
