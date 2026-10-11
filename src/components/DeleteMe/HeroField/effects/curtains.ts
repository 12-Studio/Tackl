// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • Aurora curtains: a ribbon of light with rays rising off it. Every
// column is a pleat, folded and shifted, so the ribbon breaks at each
// column edge. The pointer lifts the curtain beneath it.
export const curtains: HeroEffect = {
	id: 'curtains',
	name: 'Curtains',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	vec2 uv = p / uResolution;
	Column column = columnAt(p.x);
	float t = uTime;

	float x = uv.x + column.index * 0.11;
	float base = 0.34 + 0.18 * fbm(vec2(x * 2.2 + t * 0.06, t * 0.05)) + 0.05 * sin(x * 9.0 + t * 0.4);
	float pointerX = (p.x - uPointer.x) / uResolution.x;
	base -= 0.1 * exp(-pointerX * pointerX * 40.0);

	float d = uv.y - base;
	float rays = 0.5 + 0.5 * noise(vec2(x * 70.0, t * 0.5));
	float curtain = d > 0.0 ? exp(-d * 2.2) * rays : exp(d * 24.0);

	float fold = 0.35 + 0.65 * sin(column.local * PI);
	float breathe = 0.75 + 0.25 * sin(t * 0.7 + column.index);
	float light = curtain * fold * breathe * column.inside;

	vec3 tint = mix(ramp(0.85), mix(uAccent, uDeep, 0.35), smoothstep(0.0, 0.35, d));
	outColor = emit(tint * light * 2.2);
}`,
};
