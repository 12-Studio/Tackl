'use client';

// Imports
// ------------
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
// Styles + Interfaces
// ------------
import type * as I from './interface';
import { FRAGMENT, MAX_COLUMNS, VERTEX } from './shaders';
import s from './styles.module.scss';

// Constants
// ------------
const GLYPHS = ' .:-+=*#%@';
const CELL_PX = 12;
const MAX_DPR = 1.5;

// NOTE • Software renderers draw on the CPU — every frame would block the
// main thread, so they get a still frame instead
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|software|basic render/i;

// NOTE • The watchdog: if the first frames average slower than ~20fps, the
// device can't afford the effect and it freezes on its current frame
const WATCHDOG_FRAMES = 30;
const SLOW_FRAME_MS = 50;

const INTERACTIONS = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown'] as const;

// Helpers
// ------------
const readColour = (token: string, fallback: [number, number, number]): [number, number, number] => {
	const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
	const hex = value.match(/^#([\da-f]{6})$/i)?.[1];
	if (!hex) return fallback;
	return [0, 2, 4].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255) as [
		number,
		number,
		number,
	];
};

// NOTE • One row of glyphs, white on transparent — the shader tints them
const createAtlas = (size: number): HTMLCanvasElement => {
	const canvas = document.createElement('canvas');
	canvas.width = size * GLYPHS.length;
	canvas.height = size;
	const context = canvas.getContext('2d');
	if (!context) return canvas;
	context.fillStyle = '#fff';
	context.font = `${Math.round(size * 0.82)}px ui-monospace, Menlo, Consolas, monospace`;
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	[...GLYPHS].forEach((glyph, index) => {
		context.fillText(glyph, index * size + size / 2, size / 2);
	});
	return canvas;
};

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
};

// Component
// ------------
// NOTE • A dithered ASCII field behind the hero, with a wave rising through
// the real grid columns (measured from the DOM, so it always lines up).
// Renders on GSAP's ticker — the one shared loop — once the visitor has
// interacted and only while on screen. Reduced-motion users, software
// renderers and devices that can't hold ~20fps get a still frame; without
// WebGL2 it doesn't draw at all and the CSS columns remain.
const AsciiField = ({ columnsRef, className }: I.AsciiFieldProps) => {
	// Refs
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Effects
	useEffect(() => {
		const canvas = canvasRef.current;
		const gl = canvas?.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false });
		if (!canvas || !gl) return;

		const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
		const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
		const program = gl.createProgram();
		if (!vertex || !fragment || !program) return;
		gl.attachShader(program, vertex);
		gl.attachShader(program, fragment);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
		// biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook
		gl.useProgram(program);

		// Full-screen triangle
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const position = gl.getAttribLocation(program, 'aPosition');
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

		const uniform = (name: string) => gl.getUniformLocation(program, name);
		const uResolution = uniform('uResolution');
		const uCell = uniform('uCell');
		const uTime = uniform('uTime');
		const uColumns = uniform('uColumns');
		const uColumnCount = uniform('uColumnCount');

		gl.uniform1f(uniform('uGlyphs'), GLYPHS.length);
		gl.uniform3fv(uniform('uInk'), readColour('--global-black', [0, 0, 0]));
		gl.uniform3fv(uniform('uAccent'), readColour('--brand-c1', [0.5, 0, 1]));
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		let texture: WebGLTexture | null = null;

		// NOTE • Size the canvas, rebuild the glyph atlas at the cell size,
		// and re-measure the columns (they move at every breakpoint)
		const measure = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			const bounds = canvas.getBoundingClientRect();
			canvas.width = Math.round(bounds.width * dpr);
			canvas.height = Math.round(bounds.height * dpr);
			gl.viewport(0, 0, canvas.width, canvas.height);

			const cell = Math.round(CELL_PX * dpr);
			gl.uniform2f(uResolution, canvas.width, canvas.height);
			gl.uniform1f(uCell, cell);

			if (texture) gl.deleteTexture(texture);
			texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, createAtlas(cell));
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

			const columns = [...(columnsRef.current?.querySelector('waffl-grid')?.children ?? [])]
				.map(child => child.getBoundingClientRect())
				.filter(rect => rect.width > 0)
				.slice(0, MAX_COLUMNS)
				.map(rect => [(rect.left - bounds.left) * dpr, (rect.right - bounds.left) * dpr]);
			const packed = new Float32Array(MAX_COLUMNS * 2);
			packed.set(columns.flat());
			gl.uniform2fv(uColumns, packed);
			gl.uniform1i(uColumnCount, columns.length);
		};

		const draw = (time: number) => {
			gl.uniform1f(uTime, time);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		};

		const debug = gl.getExtension('WEBGL_debug_renderer_info');
		const renderer = String(gl.getParameter(debug ? debug.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
		const canAnimate =
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !SOFTWARE_RENDERER.test(renderer);

		let isTicking = false;
		let isVisible = false;
		let hasInteracted = false;
		let isTooSlow = false;
		let frames = 0;
		let slowTotal = 0;

		const stop = () => {
			if (!isTicking) return;
			gsap.ticker.remove(tick);
			isTicking = false;
		};

		function tick(time: number, deltaTime: number) {
			draw(time);
			if (frames >= WATCHDOG_FRAMES) return;
			frames += 1;
			slowTotal += deltaTime;
			if (frames === WATCHDOG_FRAMES && slowTotal / frames > SLOW_FRAME_MS) {
				isTooSlow = true;
				stop();
			}
		}

		// NOTE • Animate only once the visitor has interacted, while the hero
		// is on screen, on a GPU that keeps up — until then it's a still frame
		const start = () => {
			if (!canAnimate || !hasInteracted || !isVisible || isTooSlow || isTicking) return;
			gsap.ticker.add(tick);
			isTicking = true;
		};

		const handleInteraction = () => {
			hasInteracted = true;
			for (const type of INTERACTIONS) window.removeEventListener(type, handleInteraction);
			start();
		};
		for (const type of INTERACTIONS) window.addEventListener(type, handleInteraction, { passive: true });

		measure();
		draw(0);
		canvas.dataset.ready = '';

		const resizeObserver = new ResizeObserver(() => {
			measure();
			draw(gsap.ticker.time);
		});
		resizeObserver.observe(canvas);

		const visibility = new IntersectionObserver(([entry]) => {
			isVisible = Boolean(entry?.isIntersecting);
			if (isVisible) start();
			else stop();
		});
		visibility.observe(canvas);

		return () => {
			stop();
			for (const type of INTERACTIONS) window.removeEventListener(type, handleInteraction);
			resizeObserver.disconnect();
			visibility.disconnect();
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		};
	}, [columnsRef]);

	// Render
	return <canvas ref={canvasRef} className={`${s.jacket} ${className ?? ''}`} />;
};

// Exports
// ------------
AsciiField.displayName = 'AsciiField';
export default AsciiField;
