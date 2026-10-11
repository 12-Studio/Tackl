// Shaders
// ------------
// NOTE • A full-screen triangle; the fragment shader does all the work
export const VERTEX = /* glsl */ `#version 300 es
in vec2 aPosition;
void main() {
	gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

export const MAX_COLUMNS = 12;

// NOTE • Every cell of the screen picks one glyph from the atlas by
// brightness. Brightness = a soft glow drifting behind the headline, plus
// bands of light rising through the grid columns, run through a 4×4 Bayer
// matrix so the glyph steps dither instead of banding. Colour follows
// brightness: deep brand → brand → near-white at the hottest point.
export const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uCell;
uniform float uTime;
uniform vec2 uColumns[${MAX_COLUMNS}];
uniform int uColumnCount;
uniform sampler2D uAtlas;
uniform float uGlyphs;
uniform vec3 uDeep;
uniform vec3 uAccent;
uniform vec3 uLight;

out vec4 outColor;

float bayer4(vec2 p) {
	ivec2 i = ivec2(mod(p, 4.0));
	int index = i.x + i.y * 4;
	float m[16] = float[16](0.0, 8.0, 2.0, 10.0, 12.0, 4.0, 14.0, 6.0, 3.0, 11.0, 1.0, 9.0, 15.0, 7.0, 13.0, 5.0);
	return m[index] / 16.0;
}

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
	vec2 cell = floor(gl_FragCoord.xy / uCell);
	vec2 centre = (cell + 0.5) * uCell;
	vec2 local = fract(gl_FragCoord.xy / uCell);
	vec2 uv = centre / uResolution;
	float aspect = uResolution.x / uResolution.y;

	// Which column (if any) this cell sits in
	float inColumn = 0.0;
	float column = 0.0;
	for (int i = 0; i < ${MAX_COLUMNS}; i++) {
		if (i >= uColumnCount) break;
		if (centre.x >= uColumns[i].x && centre.x <= uColumns[i].y) {
			inColumn = 1.0;
			column = float(i);
		}
	}

	// The glow — an ellipse behind the headline, breathing and drifting
	vec2 drift = vec2(sin(uTime * 0.13), cos(uTime * 0.11)) * 0.04;
	vec2 offset = (uv - vec2(0.5, 0.42) - drift) * vec2(aspect, 1.0);
	float wobble = noise(uv * 3.0 + uTime * 0.07) * 0.35;
	// NOTE • Portrait screens put the headline across the whole glow, so it
	// tightens and dims there to keep the text legible
	float portrait = smoothstep(1.0, 0.55, aspect);
	float spread = (3.2 + wobble * 2.5) * mix(1.0, 2.2, portrait);
	float glow = exp(-dot(offset, offset) * spread) * mix(1.25, 0.6, portrait);
	glow *= 0.85 + 0.15 * sin(uTime * 0.6);

	// Light rising through the columns, each a step behind the last
	float phase = uv.y * 2.2 - uTime * 0.28 + column * 0.09;
	float band = pow(0.5 + 0.5 * sin(phase * 6.2831), 6.0);
	float rise = inColumn * band * smoothstep(1.0, 0.1, uv.y) * mix(0.85, 0.55, portrait);

	float grain = noise(centre / (uCell * 3.0) + vec2(0.0, -uTime * 0.4));
	float brightness = glow * (0.7 + 0.3 * grain) + rise * (0.6 + 0.4 * grain);
	brightness += (bayer4(cell) - 0.5) * 0.18;
	brightness = clamp(brightness, 0.0, 1.0);

	float glyph = floor(brightness * (uGlyphs - 1.0) + 0.5);
	vec2 atlasUv = vec2((glyph + local.x) / uGlyphs, 1.0 - local.y);
	float ink = texture(uAtlas, atlasUv).a;

	vec3 colour = mix(uDeep, uAccent, smoothstep(0.05, 0.5, brightness));
	colour = mix(colour, uLight, smoothstep(0.55, 1.0, brightness));
	outColor = vec4(colour, ink * smoothstep(0.0, 0.22, brightness));
}`;
