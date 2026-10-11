// Imports
// ------------
import type { HeroEffect } from '../interface';
import { COMMON } from './common';

// Effect
// ------------
// NOTE • A graphic equaliser: every column is a stack of LED segments
// bouncing to an imaginary beat. Wide columns (on phones) split into
// several bars. The pointer pumps the bars beneath it.
export const equalizer: HeroEffect = {
	id: 'equalizer',
	name: 'Equaliser',
	fragment: /* glsl */ `${COMMON}
void main() {
	vec2 p = gl_FragCoord.xy;
	Column column = columnAt(p.x);
	float t = uTime;
	float width = column.right - column.left;

	// Split wide columns into bars of roughly 80px
	float bars = max(1.0, floor(width / (80.0 * uDpr)));
	float barWidth = width / bars;
	float bar = floor((p.x - column.left) / barWidth);
	float barLocal = (p.x - column.left - bar * barWidth) / barWidth;
	float gap = 3.0 * uDpr / barWidth;
	float inBar = column.inside * step(gap, barLocal) * step(barLocal, 1.0 - gap);

	float segment = 11.0 * uDpr;
	float row = floor(p.y / segment);
	float inSegment = step(3.0 * uDpr, mod(p.y, segment));
	float rows = uResolution.y * 0.78 / segment;

	float id = column.index * 4.0 + bar;
	float beat = pow(0.5 + 0.5 * sin(t * 2.4 + hash1(id) * 6.2831), 4.0);
	float level = 0.12 + 0.55 * noise(vec2(id * 1.7, t * 1.1)) + 0.3 * beat;
	float near = abs(p.x - uPointer.x) / uResolution.x;
	level += smoothstep(0.12, 0.0, near) * 0.3;
	level = clamp(level, 0.0, 1.0);

	float lit = step(row, level * rows);
	float height = row / rows;
	// The top lit segment glows white, like a peak meter
	float peak = step(level * rows - 1.0, row) * lit;

	vec3 colour = ramp(0.2 + height * 0.85) * lit * 0.9 + uLight * peak * 0.35;
	colour += uAccent * 0.05 * (1.0 - lit) * step(row, rows);
	outColor = emit(colour * inBar * inSegment);
}`,
};
