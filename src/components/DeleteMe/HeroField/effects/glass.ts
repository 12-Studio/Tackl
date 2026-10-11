// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • Fluted glass: every column is a vertical lens over a slow,
// glowing gradient. Each lens flips and squeezes what's behind it, with a
// highlight on one edge and shadow on the other — the light source follows
// the pointer.
export const glass: HeroEffect = {
	id: 'glass',
	name: 'Glass',
	fragment: /* glsl */ `${COMMON}
float blob(vec2 uv, vec2 centre, float size) {
	float aspect = uResolution.x / uResolution.y;
	vec2 d = (uv - centre) * vec2(aspect, 1.0);
	return exp(-dot(d, d) / (size * size));
}

float scene(vec2 uv) {
	float t = uTime;
	vec2 pointer = uPointer / uResolution;
	float light = 0.0;
	light += blob(uv, vec2(0.5 + 0.22 * sin(t * 0.27), 0.5 + 0.12 * cos(t * 0.35)), 0.32) * 0.95;
	light += blob(uv, vec2(0.5 + 0.3 * cos(t * 0.19 + 1.3), 0.35 + 0.18 * sin(t * 0.23)), 0.22) * 0.7;
	light += blob(uv, pointer, 0.16) * 0.6;
	return light;
}

void main() {
	vec2 p = gl_FragCoord.xy;
	Column column = columnAt(p.x);
	float width = column.right - column.left;

	// Inside a column, sample the scene through a lens: mirrored and squeezed
	float lens = column.local - 0.5;
	vec2 sampleAt = p;
	sampleAt.x = mix(p.x, column.left + width * 0.5 - lens * width * 1.6, column.inside);
	float light = scene(sampleAt / uResolution);
	float behind = scene(p / uResolution);

	// Shading across each flute: bright edge, darker body, shadowed far edge
	float highlight = smoothstep(0.16, 0.0, abs(column.local - 0.12));
	float shadow = smoothstep(0.55, 1.0, column.local);
	float shade = column.inside * (highlight * 0.5 - shadow * 0.45);

	float value = mix(behind * 0.35, light * (1.0 + shade), column.inside);
	value += column.inside * highlight * 0.12 * behind;
	outColor = emit(ramp(value) * clamp(value * 1.3, 0.0, 1.0));
}`,
};
