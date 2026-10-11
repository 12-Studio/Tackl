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
// A click sends two waves out from the pointer: the first lights the whole
// grid, the second follows it and puts the dark back, leaving the torch.
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

// The click pulse: the light wave's travel time, how long the dark wave
// waits before following, and its own travel time
const float REVEAL_SECONDS = 0.9;
const float DARK_DELAY = 0.7;
const float DARK_SECONDS = 1.2;

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
	return 1.0 - pow(1.0 - t, 3.0);
}

float easeInOut(float t) {
	t = clamp(t, 0.0, 1.0);
	return t * t * (3.0 - 2.0 * t);
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

	// The click: a light wave reveals everything inside it, a dark wave
	// follows and takes it back. Both fronts glow as they pass.
	float reach = length(uResolution) * 1.1;
	float soft = 60.0 * uDpr;
	float fromClick = length(p - uClick);
	float lightFront = reach * easeOut(uClickAge / REVEAL_SECONDS);
	float darkFront = reach * easeInOut((uClickAge - DARK_DELAY) / DARK_SECONDS);
	float revealed = smoothstep(darkFront - soft, darkFront + soft, fromClick) * (1.0 - smoothstep(lightFront - soft, lightFront + soft, fromClick));
	float isPulsing = step(uClickAge, DARK_DELAY + DARK_SECONDS);
	float fronts = exp(-pow((fromClick - lightFront) / (24.0 * uDpr), 2.0)) * (1.0 - easeOut(uClickAge / (REVEAL_SECONDS + 0.4)));
	fronts += 0.4 * exp(-pow((fromClick - darkFront) / (40.0 * uDpr), 2.0)) * step(DARK_DELAY, uClickAge);
	float light = max(torch, revealed * 0.85 * isPulsing) + fronts * isPulsing * 0.6;

	float edge = smoothstep(1.4 * uDpr, 0.0, edgeDistance(p.x));
	float pitch = 24.0 * uDpr;
	vec2 lattice = (fract(p / pitch) - 0.5) * pitch;
	float dots = smoothstep(1.6 * uDpr, 0.6 * uDpr, length(lattice)) * inside;
	float fill = inside * (0.16 + 0.1 * noise(p / (140.0 * uDpr) + uTime * 0.15));

	float value = edge * (0.14 + light * 1.2) + dots * (0.1 + light * 1.1) + fill * light * 1.6;
	vec3 colour = ramp(0.3 + min(light, 1.0) * 0.7) * value;

	// NOTE • Emit light over the page's own background: colour becomes alpha,
	// so black stays transparent. The veil dims the field behind the headline.
	vec2 uv = p / uResolution;
	vec2 veil = (uv - vec2(0.5, 0.52)) * vec2(1.4, 2.4);
	colour *= 1.0 - 0.4 * exp(-dot(veil, veil) * 2.0);
	float alpha = clamp(max(colour.r, max(colour.g, colour.b)), 0.0, 1.0);
	outColor = vec4(colour / max(alpha, 1e-4), alpha);
}`;
