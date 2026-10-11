// Shared GLSL
// ------------
// NOTE • Every effect is one fragment shader over a full-screen triangle.
// They share these uniforms and helpers, so each effect file only holds
// its own main().
export const MAX_COLUMNS = 12;

export const VERTEX = /* glsl */ `#version 300 es
in vec2 aPosition;
void main() {
	gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

export const COMMON = /* glsl */ `#version 300 es
precision highp float;

// Canvas size and device pixel ratio — every length is in canvas pixels
uniform vec2 uResolution;
uniform float uDpr;
uniform float uTime;
// The grid's columns, measured from the DOM: (left, right) per column
uniform vec2 uColumns[${MAX_COLUMNS}];
uniform int uColumnCount;
// Pointer in canvas pixels, origin bottom-left — eased, and wandering on
// its own while the visitor is idle
uniform vec2 uPointer;
uniform vec3 uDeep;
uniform vec3 uAccent;
uniform vec3 uLight;

out vec4 outColor;

const float PI = 3.14159265;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash1(float n) {
	return fract(sin(n * 91.345) * 47453.5453);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
	float value = 0.0;
	float amplitude = 0.5;
	for (int i = 0; i < 4; i++) {
		value += amplitude * noise(p);
		p *= 2.03;
		amplitude *= 0.5;
	}
	return value;
}

// Which column a pixel sits in. index is -1 in the gutters and margins;
// local runs 0 → 1 across the column.
struct Column {
	float index;
	float local;
	float inside;
	float left;
	float right;
};

Column columnAt(float x) {
	for (int i = 0; i < ${MAX_COLUMNS}; i++) {
		if (i >= uColumnCount) break;
		vec2 bounds = uColumns[i];
		if (x >= bounds.x && x <= bounds.y) {
			return Column(float(i), (x - bounds.x) / (bounds.y - bounds.x), 1.0, bounds.x, bounds.y);
		}
	}
	return Column(-1.0, 0.0, 0.0, 0.0, 0.0);
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

float columnCount() {
	return max(float(uColumnCount), 1.0);
}

// Brand ramp: deep brand → brand → white as t goes 0 → 1
vec3 ramp(float t) {
	vec3 colour = mix(uDeep, uAccent, smoothstep(0.0, 0.5, t));
	return mix(colour, uLight, smoothstep(0.6, 1.0, t));
}

// NOTE • Emits light over the page's own background: colour becomes alpha,
// so black stays transparent. The veil dims the field behind the headline
// to keep it legible.
vec4 emit(vec3 colour) {
	vec2 uv = gl_FragCoord.xy / uResolution;
	vec2 d = (uv - vec2(0.5, 0.52)) * vec2(1.4, 2.4);
	colour *= 1.0 - 0.4 * exp(-dot(d, d) * 2.0);
	float alpha = clamp(max(colour.r, max(colour.g, colour.b)), 0.0, 1.0);
	return vec4(colour / max(alpha, 1e-4), alpha);
}
`;
