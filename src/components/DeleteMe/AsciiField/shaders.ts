// Shaders
// ------------
// NOTE • A full-screen triangle; the fragment shader does all the work
export const VERTEX = /* glsl */ `#version 300 es
in vec2 aPosition;
void main() {
	gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

// NOTE • Every cell of the screen picks one glyph from the atlas by
// brightness. Brightness = a soft noise field everywhere, plus a wave that
// rises through the grid columns (each column a little out of phase), run
// through a 4×4 Bayer matrix so the glyph steps dither instead of banding.
export const MAX_COLUMNS = 12;

export const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uCell;
uniform float uTime;
uniform vec2 uColumns[${MAX_COLUMNS}];
uniform int uColumnCount;
uniform sampler2D uAtlas;
uniform float uGlyphs;
uniform vec3 uInk;
uniform vec3 uAccent;

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
	float y = centre.y / uResolution.y; // 0 at the bottom, 1 at the top

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

	// A long wave travelling upwards, each column a step behind the last
	float phase = y * 1.6 - uTime * 0.22 + column * 0.06;
	float wave = pow(0.5 + 0.5 * sin(phase * 6.2831), 2.0);
	// Grain inside the wave so it breaks into glyphs rather than a solid band
	float grain = noise(centre / (uCell * 2.5) + vec2(column * 3.1, -uTime * 0.6));

	float field = noise(centre / (uCell * 10.0) + vec2(0.0, -uTime * 0.05));
	float rise = smoothstep(1.1, 0.15, y); // stronger towards the bottom

	float brightness = inColumn * wave * (0.55 + 0.45 * grain) + (1.0 - inColumn) * field * 0.18;
	brightness *= 0.35 + 0.65 * rise;
	brightness += (bayer4(cell) - 0.5) * 0.2;
	brightness = clamp(brightness, 0.0, 1.0);

	float glyph = floor(brightness * (uGlyphs - 1.0) + 0.5);
	vec2 atlasUv = vec2((glyph + local.x) / uGlyphs, 1.0 - local.y);
	float ink = texture(uAtlas, atlasUv).a;

	vec3 colour = mix(uInk, uAccent, inColumn * smoothstep(0.35, 0.9, wave));
	outColor = vec4(colour, ink * (0.1 + 0.75 * brightness));
}`;
