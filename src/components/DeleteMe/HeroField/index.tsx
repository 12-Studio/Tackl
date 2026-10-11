'use client';

// Imports
// ------------
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { MAX_COLUMNS, VERTEX } from './effects/common';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import s from './styles.module.scss';

// Constants
// ------------
const MAX_DPR = 1.5;

// NOTE • Effects start a few seconds in, so the still frame shows them
// mid-flow rather than at their first frame
const TIME_OFFSET = 8;

// NOTE • Software renderers draw on the CPU — every frame would block the
// main thread, so they get a still frame instead
const SOFTWARE_RENDERER = /swiftshader|llvmpipe|software|basic render/i;

// NOTE • The watchdog: if the first frames average slower than ~20fps, the
// device can't afford the effect and it freezes on its current frame
const WATCHDOG_FRAMES = 30;
const SLOW_FRAME_MS = 50;

const INTERACTIONS = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown'] as const;

// NOTE • After this long without pointer movement the pointer wanders on
// its own; POINTER_EASE_MS is how quickly it catches up with its target
const IDLE_MS = 2500;
const POINTER_EASE_MS = 250;

const UNIFORMS = [
	'uResolution',
	'uDpr',
	'uTime',
	'uColumns',
	'uColumnCount',
	'uPointer',
	'uDeep',
	'uAccent',
	'uLight',
] as const;

type Uniform = (typeof UNIFORMS)[number];
type Colour = [number, number, number];

interface Program {
	program: WebGLProgram;
	uniforms: Record<Uniform, WebGLUniformLocation | null>;
}

// Helpers
// ------------
const readColour = (token: string, fallback: Colour): Colour => {
	const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
	const hex = value.match(/^#([\da-f]{6})$/i)?.[1];
	if (!hex) return fallback;
	return [0, 2, 4].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255) as Colour;
};

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
	console.error(gl.getShaderInfoLog(shader));
	return null;
};

const link = (gl: WebGL2RenderingContext, fragmentSource: string): Program | null => {
	const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
	const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
	const program = gl.createProgram();
	if (!vertex || !fragment || !program) return null;
	gl.attachShader(program, vertex);
	gl.attachShader(program, fragment);
	gl.bindAttribLocation(program, 0, 'aPosition');
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
	const uniforms = Object.fromEntries(
		UNIFORMS.map(name => [name, gl.getUniformLocation(program, name)])
	) as Program['uniforms'];
	return { program, uniforms };
};

// Component
// ------------
// NOTE • The hero's WebGL backdrop. Each effect is a fragment shader fed the
// real grid columns (measured from the DOM, so it always lines up), the
// pointer and the brand colours.
// Renders on GSAP's ticker — the one shared loop — once the visitor has
// interacted and only while on screen. Reduced-motion users, software
// renderers and devices that can't hold ~20fps get a still frame; without
// WebGL2 it doesn't draw at all and the CSS columns remain.
const HeroField = ({ columnsRef, effect, className }: I.HeroFieldProps) => {
	// Refs
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const effectRef = useRef(effect);
	const redrawRef = useRef<(() => void) | null>(null);

	// Effects
	useEffect(() => {
		const canvas = canvasRef.current;
		const gl = canvas?.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false });
		if (!canvas || !gl) return;

		// Full-screen triangle
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		// NOTE • Effects compile on first use, then stay cached
		const programs = new Map<string, Program | null>();
		const programFor = (id: string, source: string) => {
			if (!programs.has(id)) programs.set(id, link(gl, source));
			return programs.get(id) ?? null;
		};

		const colours = {
			uDeep: readColour('--brand-c2', [0.22, 0.01, 0.47]),
			uAccent: readColour('--brand-c1', [0.5, 0, 1]),
			uLight: readColour('--global-white', [1, 1, 1]),
		};

		let dpr = 1;
		let columns = new Float32Array(MAX_COLUMNS * 2);
		let columnCount = 0;
		const pointer = { x: 0, y: 0 };
		const target = { x: 0, y: 0 };
		let lastMove = Number.NEGATIVE_INFINITY;

		// NOTE • Size the canvas and re-measure the columns (they move at
		// every breakpoint)
		const measure = () => {
			dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			const bounds = canvas.getBoundingClientRect();
			canvas.width = Math.round(bounds.width * dpr);
			canvas.height = Math.round(bounds.height * dpr);
			gl.viewport(0, 0, canvas.width, canvas.height);

			const measured = [...(columnsRef.current?.querySelector('waffl-grid')?.children ?? [])]
				.map(child => child.getBoundingClientRect())
				.filter(rect => rect.width > 0)
				.slice(0, MAX_COLUMNS)
				.map(rect => [(rect.left - bounds.left) * dpr, (rect.right - bounds.left) * dpr]);
			columns = new Float32Array(MAX_COLUMNS * 2);
			columns.set(measured.flat());
			columnCount = measured.length;

			if (lastMove === Number.NEGATIVE_INFINITY) {
				pointer.x = target.x = canvas.width * 0.5;
				pointer.y = target.y = canvas.height * 0.45;
			}
		};

		const draw = (time: number) => {
			const { fragment, id } = effectRef.current;
			const current = programFor(id, fragment);
			if (!current) return;
			const { program, uniforms } = current;
			// biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook
			gl.useProgram(program);
			gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
			gl.uniform1f(uniforms.uDpr, dpr);
			gl.uniform1f(uniforms.uTime, time + TIME_OFFSET);
			gl.uniform2fv(uniforms.uColumns, columns);
			gl.uniform1i(uniforms.uColumnCount, columnCount);
			gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
			gl.uniform3fv(uniforms.uDeep, colours.uDeep);
			gl.uniform3fv(uniforms.uAccent, colours.uAccent);
			gl.uniform3fv(uniforms.uLight, colours.uLight);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		};

		// NOTE • Ease towards the real pointer; when idle, wander on a slow
		// figure-of-eight so pointer-driven effects still show themselves
		const followPointer = (time: number, deltaTime: number) => {
			if (performance.now() - lastMove > IDLE_MS) {
				target.x = canvas.width * (0.5 + 0.3 * Math.sin(time * 0.31));
				target.y = canvas.height * (0.45 + 0.18 * Math.sin(time * 0.47));
			}
			const ease = 1 - Math.exp(-deltaTime / POINTER_EASE_MS);
			pointer.x += (target.x - pointer.x) * ease;
			pointer.y += (target.y - pointer.y) * ease;
		};

		const handlePointer = (event: PointerEvent) => {
			const bounds = canvas.getBoundingClientRect();
			target.x = (event.clientX - bounds.left) * dpr;
			target.y = (bounds.bottom - event.clientY) * dpr;
			lastMove = performance.now();
		};
		window.addEventListener('pointermove', handlePointer, { passive: true });

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
			followPointer(time, deltaTime);
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

		// NOTE • Switching effect gives the new one a fresh watchdog, and a
		// still frame when it isn't animating
		redrawRef.current = () => {
			frames = 0;
			slowTotal = 0;
			isTooSlow = false;
			draw(gsap.ticker.time);
			start();
		};

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
			redrawRef.current = null;
			window.removeEventListener('pointermove', handlePointer);
			for (const type of INTERACTIONS) window.removeEventListener(type, handleInteraction);
			resizeObserver.disconnect();
			visibility.disconnect();
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		};
	}, [columnsRef]);

	useEffect(() => {
		effectRef.current = effect;
		redrawRef.current?.();
	}, [effect]);

	// Render
	return <canvas ref={canvasRef} className={`${s.jacket} ${className ?? ''}`} />;
};

// Exports
// ------------
HeroField.displayName = 'HeroField';
export default HeroField;
