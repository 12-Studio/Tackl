// Imports
// ------------
import { UNIFORM_SETTINGS, uniformName } from './settings';

// Shaders
// ------------
export const MAX_COLUMNS = 24;

// NOTE • How many click pulses can be in flight at once
export const MAX_PULSES = 8;

// NOTE • A full-screen triangle; the fragment shader does all the work
export const VERTEX = /* glsl */ `#version 300 es
in vec2 aPosition;
void main() {
	gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// NOTE • The grid as a blueprint in the dark: hairline column edges and a
// dot lattice inside the columns, lit by a torch on the bottom edge that
// follows the pointer sideways.
// Each click sends a wave of light rolling out from the pointer: a bright
// crest lights the grid as it passes, with a fading glow in its wake. Waves
// from several clicks overlap and add up.
export const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;

// Every length is in canvas pixels, origin bottom-left
uniform vec2 uResolution;
uniform float uDpr;
uniform float uTime;
// The grid's columns, measured from the DOM: (left, right) per column
uniform vec2 uColumns[${MAX_COLUMNS}];
uniform int uColumnCount;
// The torch — on the bottom edge by default, eased after the pointer's x, and swaying on
// its own while the visitor is idle
uniform vec2 uPointer;
// Recent clicks: (x, y, seconds since) — large when the slot is unused
uniform vec3 uPulses[${MAX_PULSES}];
uniform vec3 uDeep;
uniform vec3 uAccent;
uniform vec3 uLight;
// The tunable values from settings.ts — one float uniform each
${UNIFORM_SETTINGS.map(key => `uniform float ${uniformName(key)};`).join('\n')}

out vec4 outColor;

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
	float radius = uTorchRadius * uResolution.y;
	vec2 toPointer = p - uPointer;
	float torch = exp(-dot(toPointer, toPointer) / (radius * radius)) * uTorchStrength;

	// The waves: a crest rolling out from each click, widening and fading as
	// it travels, with a softer glow left in its wake
	float wave = 0.0;
	vec3 haze = vec3(0.0);
	for (int i = 0; i < ${MAX_PULSES}; i++) {
		float progress = clamp(uPulses[i].z / max(uPulseDuration, 0.01), 0.0, 1.0);
		if (progress >= 1.0) continue;
		float front = length(uResolution) * uPulseReach * easeOut(progress);
		float behind = front - length(p - uPulses[i].xy);
		float width = mix(uPulseWidthStart, uPulseWidthEnd, progress) * uDpr;
		float crest = exp(-pow(behind / (width * uCrestWidth), 2.0));
		float wake = behind > 0.0 ? exp(-behind / max(width * uWakeLength, 1e-3)) * uWakeStrength : 0.0;
		float fade = 1.0 - progress;
		wave += (crest + wake) * pow(fade, uPulseFade);
		// The wave is light, not just lit lines — a faint haze rides the crest
		haze += mix(uAccent, uLight, crest * crest) * (crest + wake * 0.5) * pow(fade, uHazeFade) * uHazeStrength;
	}
	float light = torch + wave * uPulseIntensity;

	float edge = smoothstep(max(uEdgeWidth, 0.01) * uDpr, 0.0, edgeDistance(p.x));
	float pitch = max(uDotPitch, 1.0) * uDpr;
	vec2 lattice = (fract(p / pitch) - 0.5) * pitch;
	float dotSize = max(uDotSize, 0.01) * uDpr;
	float dots = smoothstep(dotSize, dotSize * 0.375, length(lattice)) * inside;
	float fill = inside * (uFillBase + uFillNoise * noise(p / (uNoiseScale * uDpr) + uTime * uNoiseSpeed));

	float value = edge * (uEdgeBase + light * uEdgeLit) + dots * (uDotBase + light * uDotLit) + fill * light * uFillLit;
	vec3 colour = ramp(uRampBase + min(light, 1.0) * uRampRange) * value;
	colour += haze;

	// NOTE • Emit light over the page's own background: colour becomes alpha,
	// so black stays transparent. The veil dims the field behind the headline.
	vec2 uv = p / uResolution;
	vec2 veil = (uv - vec2(0.5, uVeilY)) * vec2(uVeilWidth, uVeilHeight);
	colour *= 1.0 - uVeilStrength * exp(-dot(veil, veil) * 2.0);
	float alpha = clamp(max(colour.r, max(colour.g, colour.b)), 0.0, 1.0);
	outColor = vec4(colour / max(alpha, 1e-4), alpha);
}`;
