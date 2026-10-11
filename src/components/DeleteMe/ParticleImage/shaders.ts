// Shaders
// ------------
// NOTE • One point per sampled pixel of the photo. Lengths are canvas
// pixels with the origin top-left, like the DOM. Each point:
//  • sits where its pixel lands when the photo is cover-fitted, anchored
//    top-right (the same crop as the <Image> fallback)
//  • gets depth from its brightness, so the object stands out in 3D
//  • flies in from a scattered position as uAssemble goes 0 → 1
//  • is pushed out of the pointer's way, with a little swirl and lift
//  • is tilted with the pointer and drawn in perspective
export const VERTEX = /* glsl */ `#version 300 es
in vec2 aUv;
in vec3 aColor;
in float aLuminance;
in float aSeed;

uniform vec2 uResolution;
uniform float uImageAspect;
uniform float uDpr;
uniform float uTime;
uniform float uPointSize;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform vec2 uTilt;
uniform float uAssemble;

out vec3 vColor;
out float vAlpha;

const float DISPERSE_RADIUS = 120.0;
const float DISPERSE_PUSH = 70.0;
const float DEPTH = 36.0;
const float FOCAL = 2400.0;
const float BRIGHTNESS = 1.45;

void main() {
	// Cover-fit, anchored top-right
	float canvasAspect = uResolution.x / uResolution.y;
	vec2 size = canvasAspect > uImageAspect
		? vec2(uResolution.x, uResolution.x / uImageAspect)
		: vec2(uResolution.y * uImageAspect, uResolution.y);
	vec2 p = vec2(uResolution.x - size.x, 0.0) + aUv * size;
	float z = (aLuminance - 0.4) * DEPTH * uDpr;

	// A faint shimmer, so it never sits completely still
	p += vec2(sin(uTime * 0.9 + aSeed * 40.0), cos(uTime * 0.7 + aSeed * 31.0)) * 0.8 * uDpr;

	// Disperse around the pointer
	vec2 away = p - uPointer;
	float radius = DISPERSE_RADIUS * uDpr;
	float force = exp(-dot(away, away) / (radius * radius)) * uPointerStrength;
	vec2 direction = length(away) > 0.001 ? normalize(away) : vec2(0.0, -1.0);
	vec2 swirl = vec2(-direction.y, direction.x) * (aSeed - 0.5);
	p += (direction + swirl) * DISPERSE_PUSH * uDpr * force * (0.6 + aSeed);
	z += force * DEPTH * 6.0 * uDpr * aSeed;

	// Assemble from a scattered cloud, each point on its own schedule
	float start = aSeed * 0.45;
	float assembled = smoothstep(start, start + 0.55, uAssemble);
	vec2 scatter = (vec2(fract(aSeed * 91.7), fract(aSeed * 53.3)) * 1.6 - 0.3) * uResolution;
	p = mix(scatter, p, assembled);
	z = mix((aSeed - 0.5) * FOCAL * 0.5 * uDpr, z, assembled);

	// Tilt with the pointer, then project in perspective
	vec2 centre = uResolution * 0.5;
	vec3 q = vec3(p - centre, z);
	float yaw = uTilt.x * 0.22;
	float pitch = uTilt.y * 0.16;
	q = vec3(q.x * cos(yaw) + q.z * sin(yaw), q.y, -q.x * sin(yaw) + q.z * cos(yaw));
	q = vec3(q.x, q.y * cos(pitch) - q.z * sin(pitch), q.y * sin(pitch) + q.z * cos(pitch));
	float focal = FOCAL * uDpr;
	float perspective = focal / max(focal - q.z, 1.0);
	vec2 screen = centre + q.xy * perspective;

	vec2 clip = screen / uResolution * 2.0 - 1.0;
	gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
	gl_PointSize = uPointSize * perspective * (0.9 + aLuminance * 0.3);

	// NOTE • Lifted a little, since a sparse point cloud reads darker than
	// the photo it came from
	vColor = aColor * (BRIGHTNESS + force * 1.2);
	vAlpha = assembled;
}`;

// NOTE • A soft round dot; points are blended additively, so dense,
// bright areas glow
export const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;

in vec3 vColor;
in float vAlpha;

out vec4 outColor;

void main() {
	float distance = length(gl_PointCoord - 0.5);
	if (distance > 0.5) discard;
	outColor = vec4(vColor, smoothstep(0.5, 0.15, distance) * vAlpha);
}`;
