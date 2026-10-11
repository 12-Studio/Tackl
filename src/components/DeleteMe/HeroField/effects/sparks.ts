// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • Sparks rising through the columns: lanes of particles at their own
// speeds, swaying, twinkling and burning out near the top, over embers
// glowing at the base.
export const sparks: HeroEffect = {
	id: 'sparks',
	name: 'Sparks',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	vec2 uv = p / uResolution;
	Column column = columnAt(p.x);
	float t = uTime;
	float width = column.right - column.left;

	float lanes = max(1.0, floor(width / (22.0 * uDpr)));
	float laneWidth = width / lanes;
	float lane = floor((p.x - column.left) / laneWidth);
	float id = column.index * 16.0 + lane;
	float speed = (40.0 + hash1(id) * 80.0) * uDpr;
	float cellHeight = (60.0 + hash1(id + 1.0) * 90.0) * uDpr;
	float cell = floor((p.y - t * speed) / cellHeight);

	vec3 colour = vec3(0.0);
	for (int k = -1; k <= 1; k++) {
		float c = cell + float(k);
		float seed = hash(vec2(id, c));
		float x = column.left + (lane + 0.2 + 0.6 * hash(vec2(c, id + 5.0))) * laneWidth;
		x += sin(t * 1.3 + seed * 6.2831) * laneWidth * 0.25;
		float y = (c + hash(vec2(id + 3.0, c))) * cellHeight + t * speed;
		vec2 d = p - vec2(x, y);
		float size = (1.8 + 2.6 * seed) * uDpr;
		float spark = exp(-dot(d, d) / (size * size)) + exp(-length(d) / (size * 4.0)) * 0.35;
		float life = smoothstep(0.0, 0.12, y / uResolution.y) * smoothstep(1.0, 0.4, y / uResolution.y);
		float twinkle = 0.6 + 0.4 * sin(t * 6.0 + seed * 40.0);
		colour += ramp(0.4 + seed * 0.6) * spark * life * twinkle * step(0.15, seed) * 1.8;
	}

	colour += uAccent * exp(-uv.y * 12.0) * 0.6 * (0.5 + 0.5 * noise(vec2(p.x / (30.0 * uDpr), t)));
	outColor = emit(colour * column.inside);
}`,
};
