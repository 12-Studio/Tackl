// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • A topographic map, faulted along the grid: each column's strata
// slide up and down on their own, so the contour lines step at every
// column edge. The pointer raises a hill.
export const strata: HeroEffect = {
	id: 'strata',
	name: 'Strata',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	vec2 uv = p / uResolution;
	Column column = columnAt(p.x);
	float t = uTime;
	float aspect = uResolution.x / uResolution.y;

	float fault = column.inside * sin(column.index * 1.7 + t * 0.25) * 0.06;
	float height = fbm(uv * vec2(aspect, 1.0) * 1.6 + vec2(0.0, t * 0.04)) + fault;
	vec2 pointer = (p - uPointer) / uResolution.y;
	height += 0.22 * exp(-dot(pointer, pointer) * 18.0);

	float bands = height * 22.0;
	float f = fract(bands);
	float w = fwidth(bands);
	float line = 1.0 - smoothstep(0.0, w * 2.4, min(f, 1.0 - f));
	float isMajor = 1.0 - step(0.5, mod(floor(bands + 0.5), 5.0));

	float intensity = line * (0.35 + 0.65 * isMajor) * (0.45 + 0.55 * smoothstep(0.2, 0.7, height));
	intensity *= mix(0.3, 1.0, column.inside) * 1.8;
	outColor = emit(ramp(0.25 + height) * intensity);
}`,
};
