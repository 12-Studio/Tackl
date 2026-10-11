// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • The grid as a blueprint in the dark: hairline column edges and a
// dot lattice, lit by a torch that follows the pointer (and wanders on its
// own while you're idle).
export const spotlight: HeroEffect = {
	id: 'spotlight',
	name: 'Spotlight',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	Column column = columnAt(p.x);
	float t = uTime;

	float radius = 0.42 * uResolution.y;
	vec2 d = p - uPointer;
	float light = exp(-dot(d, d) / (radius * radius));

	float edge = smoothstep(1.4 * uDpr, 0.0, edgeDistance(p.x));
	float pitch = 24.0 * uDpr;
	vec2 lattice = (fract(p / pitch) - 0.5) * pitch;
	float dots = smoothstep(1.6 * uDpr, 0.6 * uDpr, length(lattice)) * column.inside;
	float fill = column.inside * (0.16 + 0.1 * noise(p / (140.0 * uDpr) + t * 0.15));

	float value = edge * (0.14 + light * 1.2) + dots * (0.1 + light * 1.1) + fill * light * 1.6;
	outColor = emit(ramp(0.3 + light * 0.7) * value);
}`,
};
