// Shaders
// ------------
export const MAX_COLUMNS = 12;

// NOTE • A full-screen triangle; the fragment shader does all the work
export const VERTEX = /* glsl */ `#version 300 es
in vec2 aPosition;
void main() {
	gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// NOTE • The grid as a blueprint in the dark: hairline column edges and a
// dot lattice inside the columns, lit by a torch that follows the pointer.
// A click sends a wave of light rolling out from the pointer: a bright crest
// lights the grid as it passes, with a fading glow in its wake.
export const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;

// Every length is in canvas pixels, origin bottom-left
uniform vec2 uResolution;
uniform float uDpr;
uniform float uTime;
// The grid's columns, measured from the DOM: (left, right) per column
uniform vec2 uColumns[${MAX_COLUMNS}];
uniform int uColumnCount;
// The torch — eased, and wandering on its own while the visitor is idle
uniform vec2 uPointer;
// The last click, and the seconds since it (large when there hasn't been one)
uniform vec2 uClick;
uniform float uClickAge;
uniform vec3 uDeep;
uniform vec3 uAccent;
uniform vec3 uLight;

out vec4 outColor;

// How long the wave takes to roll across the screen
const float WAVE_SECONDS = 2.6;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float insideColumn(float x) {
	for (int i = 0; i < ${MAX_COLUMNS}; i++) {
		if (i >= uColumnCount) break;
		if (x >= uColumns[i].x && x <= uColumns[i].y) return 1.0;
	}
	return 0.0;
}

// Distance in pixels to the nearest column edge
float edgeDistance(float x) {
	float nearest = 1e5;
	for (int i = 0; i < ${MAX_COLUMNS}; i++) {
		if (i >= uColumnCount) break;
		nearest = min(nearest, min(abs(x - uColumns[i].x), abs(x - uColumns[i].y)));
	}
	return nearest;
}

float easeOut(float t) {
	t = clamp(t, 0.0, 1.0);
	return 1.0 - (1.0 - t) * (1.0 - t);
}

// Brand ramp: deep brand → brand → white as t goes 0 → 1
vec3 ramp(float t) {
	vec3 colour = mix(uDeep, uAccent, smoothstep(0.0, 0.5, t));
	return mix(colour, uLight, smoothstep(0.6, 1.0, t));
}

void main() {
	vec2 p = gl_FragCoord.xy;
	float inside = insideColumn(p.x);

	// The torch
	float radius = 0.42 * uResolution.y;
	vec2 toPointer = p - uPointer;
	float torch = exp(-dot(toPointer, toPointer) / (radius * radius));

	// The wave: a crest rolling out from the click, widening and fading as it
	// travels, with a softer glow left in its wake
	float progress = clamp(uClickAge / WAVE_SECONDS, 0.0, 1.0);
	float front = length(uResolution) * 0.95 * easeOut(progress);
	float behind = front - length(p - uClick);
	float width = mix(90.0, 320.0, progress) * uDpr;
	float crest = exp(-pow(behind / (width * 0.45), 2.0));
	float wake = behind > 0.0 ? exp(-behind / (width * 1.8)) * 0.6 : 0.0;
	float wave = (crest + wake) * pow(1.0 - progress, 1.2);
	float light = torch + wave * 1.3;

	float edge = smoothstep(1.4 * uDpr, 0.0, edgeDistance(p.x));
	float pitch = 24.0 * uDpr;
	vec2 lattice = (fract(p / pitch) - 0.5) * pitch;
	float dots = smoothstep(1.6 * uDpr, 0.6 * uDpr, length(lattice)) * inside;
	float fill = inside * (0.16 + 0.1 * noise(p / (140.0 * uDpr) + uTime * 0.15));

	float value = edge * (0.14 + light * 1.2) + dots * (0.1 + light * 1.1) + fill * light * 1.6;
	vec3 colour = ramp(0.3 + min(light, 1.0) * 0.7) * value;
	// The wave is light, not just lit lines — a faint haze rides the crest
	colour += mix(uAccent, uLight, crest * crest) * (crest + wake * 0.5) * pow(1.0 - progress, 1.6) * 0.32;

	// NOTE • Emit light over the page's own background: colour becomes alpha,
	// so black stays transparent. The veil dims the field behind the headline.
	vec2 uv = p / uResolution;
	vec2 veil = (uv - vec2(0.5, 0.52)) * vec2(1.4, 2.4);
	colour *= 1.0 - 0.4 * exp(-dot(veil, veil) * 2.0);
	float alpha = clamp(max(colour.r, max(colour.g, colour.b)), 0.0, 1.0);
	outColor = vec4(colour / max(alpha, 1e-4), alpha);
}`;
