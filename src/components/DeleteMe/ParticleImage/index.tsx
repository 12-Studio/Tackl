'use client';

// Imports
// ------------
import { cx } from '@utils/cx';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import { FRAGMENT, VERTEX } from './shaders';
import s from './styles.module.scss';

// Constants
// ------------
const MAX_DPR = 2;

// NOTE • The photo is sampled on a grid up to this many points wide; darker
// pixels than MIN_LUMINANCE are background and get no point
const SAMPLE_COLUMNS = 280;
const MIN_LUMINANCE = 0.09;

// NOTE • Points are drawn a touch larger than their grid cell, so they
// overlap into a continuous surface
const POINT_OVERLAP = 1.25;

const ASSEMBLE_SECONDS = 2.4;
const POINTER_EASE_MS = 180;

// NOTE • Software renderers draw on the CPU — they get the photo instead
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|software|basic render/i;

const ATTRIBUTES = [
	['aUv', 2],
	['aColor', 3],
	['aLuminance', 1],
	['aSeed', 1],
] as const;
const STRIDE = ATTRIBUTES.reduce((total, [, size]) => total + size, 0);

const UNIFORMS = [
	'uResolution',
	'uImageAspect',
	'uDpr',
	'uTime',
	'uPointSize',
	'uPointer',
	'uPointerStrength',
	'uTilt',
	'uAssemble',
] as const;

// NOTE • See HeroField: a StrictMode remount cancels the pending release
const pendingRelease = new WeakMap<HTMLCanvasElement, number>();

// Helpers
// ------------
const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
	console.error(gl.getShaderInfoLog(shader));
	return null;
};

const link = (gl: WebGL2RenderingContext) => {
	const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
	const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
	const program = gl.createProgram();
	if (!vertex || !fragment || !program) return null;
	gl.attachShader(program, vertex);
	gl.attachShader(program, fragment);
	ATTRIBUTES.forEach(([name], index) => {
		gl.bindAttribLocation(program, index, name);
	});
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
	const uniforms: Record<string, WebGLUniformLocation | null> = Object.fromEntries(
		UNIFORMS.map(name => [name, gl.getUniformLocation(program, name)])
	);
	return { program, uniforms };
};

// NOTE • One point per bright-enough pixel: uv, colour, luminance and a
// random seed, interleaved
const sample = (photo: HTMLImageElement) => {
	// NOTE • Portrait photos get fewer columns, so every photo ends up with
	// roughly the same number of points
	const aspect = photo.naturalWidth / photo.naturalHeight;
	const columns = Math.round(SAMPLE_COLUMNS * Math.min(1, Math.sqrt(aspect)));
	const rows = Math.round((columns * photo.naturalHeight) / photo.naturalWidth);
	const context = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
	if (!context) return null;
	context.canvas.width = columns;
	context.canvas.height = rows;
	context.drawImage(photo, 0, 0, columns, rows);
	const { data } = context.getImageData(0, 0, columns, rows);

	const points: number[] = [];
	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < columns; x++) {
			const index = (y * columns + x) * 4;
			const [r, g, b] = [data[index] / 255, data[index + 1] / 255, data[index + 2] / 255];
			const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
			if (luminance < MIN_LUMINANCE) continue;
			points.push((x + 0.5) / columns, (y + 0.5) / rows, r, g, b, luminance, Math.random());
		}
	}

	return { data: new Float32Array(points), count: points.length / STRIDE, columns };
};

// Component
// ------------
// NOTE • A photo rebuilt from particles in WebGL: they assemble as it scrolls
// into view, scatter away from the pointer and tilt with it in 3D. Renders on
// GSAP's ticker only while on screen. Reduced-motion users get a still,
// assembled frame; without WebGL2 (or on a software renderer) the photo
// itself stays.
const ParticleImage = ({ image, sizes = '100vw', className }: I.ParticleImageProps) => {
	// Refs
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Effects
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) window.clearTimeout(pendingRelease.get(canvas));
		const gl = canvas?.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false });
		if (!canvas || !gl) return;

		const debug = gl.getExtension('WEBGL_debug_renderer_info');
		const renderer = String(gl.getParameter(debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
		if (SOFTWARE_RENDERER.test(renderer)) return;
		const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const linked = link(gl);
		if (!linked) return;
		const { program, uniforms } = linked;
		// biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook
		gl.useProgram(program);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

		let isDisposed = false;
		let count = 0;
		let columns = SAMPLE_COLUMNS;
		let dpr = 1;
		const imageAspect = image.width / image.height;
		const pointer = { x: -1e5, y: -1e5, strength: 0, tiltX: 0, tiltY: 0 };
		const target = { x: -1e5, y: -1e5, strength: 0, tiltX: 0, tiltY: 0 };
		const state = { assemble: isReducedMotion ? 1 : 0 };
		let hasAssembled = isReducedMotion;
		let isTicking = false;
		let isVisible = false;

		// NOTE • Points sized to their grid cell at the current cover-fit
		const pointSize = () => {
			const coverWidth = Math.max(canvas.width, canvas.height * imageAspect);
			return (coverWidth / columns) * POINT_OVERLAP;
		};

		const measure = () => {
			dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			const bounds = canvas.getBoundingClientRect();
			canvas.width = Math.round(bounds.width * dpr);
			canvas.height = Math.round(bounds.height * dpr);
			gl.viewport(0, 0, canvas.width, canvas.height);
		};

		const draw = (time: number) => {
			if (!count) return;
			gl.uniform2f(uniforms.uResolution ?? null, canvas.width, canvas.height);
			gl.uniform1f(uniforms.uImageAspect ?? null, imageAspect);
			gl.uniform1f(uniforms.uDpr ?? null, dpr);
			gl.uniform1f(uniforms.uTime ?? null, time);
			gl.uniform1f(uniforms.uPointSize ?? null, pointSize());
			gl.uniform2f(uniforms.uPointer ?? null, pointer.x, pointer.y);
			gl.uniform1f(uniforms.uPointerStrength ?? null, pointer.strength);
			gl.uniform2f(uniforms.uTilt ?? null, pointer.tiltX, pointer.tiltY);
			gl.uniform1f(uniforms.uAssemble ?? null, state.assemble);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.POINTS, 0, count);
		};

		const tick = (time: number, deltaTime: number) => {
			const ease = 1 - Math.exp(-deltaTime / POINTER_EASE_MS);
			for (const key of ['x', 'y', 'strength', 'tiltX', 'tiltY'] as const) {
				pointer[key] += (target[key] - pointer[key]) * ease;
			}
			draw(time);
		};

		const start = () => {
			if (isReducedMotion || !isVisible || !count || isTicking) return;
			gsap.ticker.add(tick);
			isTicking = true;
			if (hasAssembled) return;
			hasAssembled = true;
			gsap.to(state, { assemble: 1, duration: ASSEMBLE_SECONDS, ease: 'power3.out' });
		};

		const stop = () => {
			if (!isTicking) return;
			gsap.ticker.remove(tick);
			isTicking = false;
		};

		// NOTE • Over the canvas the pointer disperses and tilts; anywhere
		// else both relax back to rest
		const handlePointer = (event: PointerEvent) => {
			const bounds = canvas.getBoundingClientRect();
			const x = event.clientX - bounds.left;
			const y = event.clientY - bounds.top;
			const isInside = x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height;
			target.strength = isInside ? 1 : 0;
			target.tiltX = isInside ? (x / bounds.width) * 2 - 1 : 0;
			target.tiltY = isInside ? (y / bounds.height) * 2 - 1 : 0;
			if (!isInside) return;
			target.x = x * dpr;
			target.y = y * dpr;
			// NOTE • Jump (don't ease) into place on entry, so the dispersion
			// doesn't sweep across from where the pointer last left
			if (pointer.strength < 0.01) {
				pointer.x = target.x;
				pointer.y = target.y;
			}
		};

		const resizeObserver = new ResizeObserver(() => {
			measure();
			draw(gsap.ticker.time);
		});
		const visibility = new IntersectionObserver(([entry]) => {
			isVisible = Boolean(entry?.isIntersecting);
			if (isVisible) start();
			else stop();
		});

		// NOTE • Sample the photo, upload the points, then start
		const photo = new window.Image();
		photo.src = image.src;
		photo
			.decode()
			.then(() => {
				if (isDisposed) return;
				const sampled = sample(photo);
				if (!sampled) return;
				({ count, columns } = sampled);

				gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
				gl.bufferData(gl.ARRAY_BUFFER, sampled.data, gl.STATIC_DRAW);
				let offset = 0;
				ATTRIBUTES.forEach(([, size], index) => {
					gl.enableVertexAttribArray(index);
					gl.vertexAttribPointer(index, size, gl.FLOAT, false, STRIDE * 4, offset * 4);
					offset += size;
				});

				measure();
				draw(0);
				canvas.dataset.ready = '';
				resizeObserver.observe(canvas);
				visibility.observe(canvas);
				if (!isReducedMotion) window.addEventListener('pointermove', handlePointer, { passive: true });
			})
			.catch(() => {
				// NOTE • The photo couldn't load — the fallback image stays
			});

		return () => {
			isDisposed = true;
			stop();
			gsap.killTweensOf(state);
			window.removeEventListener('pointermove', handlePointer);
			resizeObserver.disconnect();
			visibility.disconnect();
			const lose = gl.getExtension('WEBGL_lose_context');
			pendingRelease.set(
				canvas,
				window.setTimeout(() => lose?.loseContext())
			);
		};
	}, [image]);

	// Render
	return (
		<div className={cx(s.jacket, className)}>
			<canvas ref={canvasRef} className={s.canvas} />
			<Image src={image} alt='' sizes={sizes} placeholder='blur' className={s.fallback} />
		</div>
	);
};

// Exports
// ------------
ParticleImage.displayName = 'ParticleImage';
export default ParticleImage;
