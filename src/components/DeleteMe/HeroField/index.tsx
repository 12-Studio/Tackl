'use client';

// Imports
// ------------
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
// Styles + Interfaces
// ------------
import type * as I from './interface';
import { FRAGMENT, MAX_COLUMNS, MAX_PULSES, VERTEX } from './shaders';
import s from './styles.module.scss';

// Constants
// ------------
const MAX_DPR = 1.5;

// NOTE • Starts a few seconds in, so the still frame shows it mid-flow
const TIME_OFFSET = 8;

// NOTE • The age of an unused pulse slot — far past the end of a pulse
const NO_CLICK = 1000;

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
	'uPulses',
	'uDeep',
	'uAccent',
	'uLight',
] as const;

type Uniform = (typeof UNIFORMS)[number];

// NOTE • Releasing the GPU context waits a tick: StrictMode (and Fast
// Refresh) unmount and remount straight away, and a lost context can't be
// reused — the remount cancels the pending release instead
const pendingRelease = new WeakMap<HTMLCanvasElement, number>();
type Colour = [number, number, number];

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

const link = (gl: WebGL2RenderingContext) => {
	const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
	const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
	const program = gl.createProgram();
	if (!vertex || !fragment || !program) return null;
	gl.attachShader(program, vertex);
	gl.attachShader(program, fragment);
	gl.bindAttribLocation(program, 0, 'aPosition');
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
	const uniforms = Object.fromEntries(UNIFORMS.map(name => [name, gl.getUniformLocation(program, name)])) as Record<
		Uniform,
		WebGLUniformLocation | null
	>;
	return { program, uniforms };
};

// Component
// ------------
// NOTE • The hero's WebGL backdrop: the grid as a blueprint in the dark, lit
// by a torch on the hero's bottom edge that follows the pointer sideways,
// with a pulse per click (see shaders.ts). It's fed the real grid columns —
// measured from the DOM, so it always lines up — the pointer, the recent
// clicks and the brand colours.
// Renders on GSAP's ticker — the one shared loop — once the visitor has
// interacted and only while on screen. Reduced-motion users, software
// renderers and devices that can't hold ~20fps get a still frame; without
// WebGL2 it doesn't draw at all and the CSS columns remain.
const HeroField = ({ columnsRef, className }: I.HeroFieldProps) => {
	// Refs
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Effects
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) window.clearTimeout(pendingRelease.get(canvas));
		const gl = canvas?.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: false });
		if (!canvas || !gl) return;

		// Full-screen triangle
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		gl.enableVertexAttribArray(0);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		const linked = link(gl);
		if (!linked) return;
		const { program, uniforms } = linked;
		// biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook
		gl.useProgram(program);

		const colours = {
			uDeep: readColour('--brand-c2', [0.22, 0.01, 0.47]),
			uAccent: readColour('--brand-c1', [0.5, 0, 1]),
			uLight: readColour('--global-white', [1, 1, 1]),
		};

		let dpr = 1;
		let columns = new Float32Array(MAX_COLUMNS * 2);
		let columnCount = 0;
		const pointer = { x: 0, y: 0 };
		const target = { x: 0 };
		// NOTE • One slot per pulse in flight: (x, y, clicked at). Each click
		// takes the oldest slot, so a fresh click adds a pulse rather than
		// restarting the last one
		const pulses = Array.from({ length: MAX_PULSES }, () => ({ x: 0, y: 0, at: Number.NEGATIVE_INFINITY }));
		const pulseData = new Float32Array(MAX_PULSES * 3);
		let lastMove = Number.NEGATIVE_INFINITY;

		// NOTE • Size the canvas and re-measure the columns (they move at
		// every breakpoint)
		const measure = () => {
			dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			const bounds = canvas.getBoundingClientRect();
			canvas.width = Math.round(bounds.width * dpr);
			canvas.height = Math.round(bounds.height * dpr);
			gl.viewport(0, 0, canvas.width, canvas.height);

			// NOTE • Columns past the current count wrap into a clipped,
			// zero-height row. offsetHeight is the layout size, so it ignores the
			// columns' scaleY draw-in — a bounding rect would read 0 mid-animation
			const measured = [...(columnsRef.current?.querySelectorAll<HTMLElement>('waffl-grid > *') ?? [])]
				.filter(child => child.offsetHeight > 0)
				.map(child => child.getBoundingClientRect())
				.filter(rect => rect.width > 0)
				.slice(0, MAX_COLUMNS)
				.map(rect => [(rect.left - bounds.left) * dpr, (rect.right - bounds.left) * dpr]);
			columns = new Float32Array(MAX_COLUMNS * 2);
			columns.set(measured.flat());
			columnCount = measured.length;

			// NOTE • The torch sits on the bottom edge, so only its top half shows —
			// the pointer only moves it sideways
			pointer.y = 0;
			if (lastMove === Number.NEGATIVE_INFINITY) pointer.x = target.x = canvas.width * 0.5;
		};

		const draw = (time: number) => {
			gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
			gl.uniform1f(uniforms.uDpr, dpr);
			gl.uniform1f(uniforms.uTime, time + TIME_OFFSET);
			gl.uniform2fv(uniforms.uColumns, columns);
			gl.uniform1i(uniforms.uColumnCount, columnCount);
			gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
			pulses.forEach((pulse, index) => {
				pulseData.set([pulse.x, pulse.y, Math.min(time - pulse.at, NO_CLICK)], index * 3);
			});
			gl.uniform3fv(uniforms.uPulses, pulseData);
			gl.uniform3fv(uniforms.uDeep, colours.uDeep);
			gl.uniform3fv(uniforms.uAccent, colours.uAccent);
			gl.uniform3fv(uniforms.uLight, colours.uLight);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		};

		// NOTE • Ease sideways towards the real pointer; when idle, sway
		// slowly from side to side so the torch still shows itself
		const followPointer = (time: number, deltaTime: number) => {
			if (performance.now() - lastMove > IDLE_MS) target.x = canvas.width * (0.5 + 0.3 * Math.sin(time * 0.31));
			const ease = 1 - Math.exp(-deltaTime / POINTER_EASE_MS);
			pointer.x += (target.x - pointer.x) * ease;
		};

		const handlePointer = (event: PointerEvent) => {
			const bounds = canvas.getBoundingClientRect();
			target.x = (event.clientX - bounds.left) * dpr;
			lastMove = performance.now();
		};

		// NOTE • A click (or tap) over the hero sends a pulse out from exactly
		// that point — unlike the torch, pulses go anywhere
		const handleClick = (event: PointerEvent) => {
			const bounds = canvas.getBoundingClientRect();
			if (event.clientY < bounds.top || event.clientY > bounds.bottom) return;
			handlePointer(event);
			const oldest = pulses.reduce((a, b) => (b.at < a.at ? b : a));
			oldest.x = target.x;
			oldest.y = (bounds.bottom - event.clientY) * dpr;
			oldest.at = gsap.ticker.time;
		};
		window.addEventListener('pointermove', handlePointer, { passive: true });
		window.addEventListener('pointerdown', handleClick, { passive: true });

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
			window.removeEventListener('pointermove', handlePointer);
			window.removeEventListener('pointerdown', handleClick);
			for (const type of INTERACTIONS) window.removeEventListener(type, handleInteraction);
			resizeObserver.disconnect();
			visibility.disconnect();
			const lose = gl.getExtension('WEBGL_lose_context');
			pendingRelease.set(
				canvas,
				window.setTimeout(() => lose?.loseContext())
			);
		};
	}, [columnsRef]);

	// Render
	return <canvas ref={canvasRef} className={`${s.jacket} ${className ?? ''}`} />;
};

// Exports
// ------------
HeroField.displayName = 'HeroField';
export default HeroField;
