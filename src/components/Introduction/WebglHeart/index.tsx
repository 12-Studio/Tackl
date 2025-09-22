// Imports
// ------------
import { useEffect, useRef, useState } from 'react';

// Interfaces
// ------------
import {
	HeartParticle,
	HeartPosition,
	PointsOrigin,
	Pulse,
	ScaleAndTranslate,
	TargetPoints,
	TracePoint,
} from './interface';

// Styles
// ------------
import { Jacket } from './styles';

const WebglHeart: React.FC = () => {
	// NOTE • refs
	const heart = useRef<HTMLCanvasElement | null>(null);
	const [isClient, setIsClient] = useState(false);
	const animationFrameId = useRef<number | null>(null);
	const resizeListener = useRef<(() => void) | null>(null);
	const domContentLoadedListener = useRef<(() => void) | null>(null);

	// NOTE • Ensure we're on the client side
	useEffect(() => {
		setIsClient(true);
	}, []);

	// NOTE • Onload: Webgl
	useEffect(() => {
		if (!isClient) return;

		(window as Window).requestAnimationFrame =
			(window as Window).__requestAnimationFrame ||
			(window as Window).requestAnimationFrame ||
			(window as Window).webkitRequestAnimationFrame ||
			(window as Window).mozRequestAnimationFrame ||
			(window as Window).oRequestAnimationFrame ||
			(window as Window).msRequestAnimationFrame ||
			(function () {
				return function (callback: FrameRequestCallback): number {
					const element = heart.current as any;
					let lastTime = element?.__lastTime;
					if (lastTime === undefined) {
						lastTime = 0;
					}
					const currTime = Date.now();
					const timeToCall = Math.max(1, 33 - (currTime - lastTime));
					const timeoutId = window.setTimeout(callback, timeToCall);
					if (element) {
						element.__lastTime = currTime + timeToCall;
					}
					return timeoutId;
				};
			})();

		(window as any).isDevice =
			/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
				(
					navigator.userAgent ||
					(navigator as any).vendor ||
					(window as any).opera ||
					''
				).toLowerCase()
			);

		let loaded = false;

		const init = () => {
			if (loaded) return;
			loaded = true;
			const mobile = (window as any).isDevice;
			const koef = mobile ? 1 : 1;
			const scaleKoef = mobile ? 0.75 : 1; // <--- NEW: scale factor for heart size
			const canvas = heart.current;
			if (!canvas) return;
			const ctx = canvas.getContext('2d');
			if (!ctx) return;
			let width = (canvas.width = koef * window.innerWidth);
			let height = (canvas.height = koef * window.innerHeight);
			const rand = Math.random;
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fillRect(0, 0, width, height);

			const heartPosition: HeartPosition = rad => [
				Math.pow(Math.sin(rad), 3),
				-(
					15 * Math.cos(rad) -
					5 * Math.cos(2 * rad) -
					2 * Math.cos(3 * rad) -
					Math.cos(4 * rad)
				),
			];

			const scaleAndTranslate: ScaleAndTranslate = (
				pos,
				sx,
				sy,
				dx,
				dy
			) => [
				dx + pos[0] * sx * scaleKoef, // <--- scale heart horizontally
				dy + pos[1] * sy * scaleKoef, // <--- scale heart vertically
			];

			resizeListener.current = () => {
				if (!canvas || !ctx) return;
				width = canvas.width = koef * window.innerWidth;
				height = canvas.height = koef * window.innerHeight;
				ctx.fillStyle = 'rgba(0,0,0,1)';
				ctx.fillRect(0, 0, width, height);
			};
			window.addEventListener(
				'resize',
				resizeListener.current as EventListener
			);

			const traceCount = mobile ? 20 : 40;
			const pointsOrigin: PointsOrigin = [];
			let i: number;
			const dr = mobile ? 0.3 : 0.1;
			for (i = 0; i < Math.PI * 2; i += dr)
				pointsOrigin.push(
					scaleAndTranslate(heartPosition(i), 210, 13, 0, 0)
				);
			for (i = 0; i < Math.PI * 2; i += dr)
				pointsOrigin.push(
					scaleAndTranslate(heartPosition(i), 150, 9, 0, 0)
				);
			for (i = 0; i < Math.PI * 2; i += dr)
				pointsOrigin.push(
					scaleAndTranslate(heartPosition(i), 90, 5, 0, 0)
				);
			const heartPointsCount = pointsOrigin.length;

			const targetPoints: TargetPoints = [];
			const pulse: Pulse = (kx, ky) => {
				for (i = 0; i < pointsOrigin.length; i++) {
					targetPoints[i] = [
						kx * pointsOrigin[i][0] + width / 2,
						ky * pointsOrigin[i][1] + height / 2,
					];
				}
			};

			const e: HeartParticle[] = [];
			for (i = 0; i < heartPointsCount; i++) {
				const x = rand() * width;
				const y = rand() * height;
				const trace: TracePoint[] = [];
				for (let k = 0; k < traceCount; k++) {
					trace[k] = { x, y };
				}
				e[i] = {
					vx: 0,
					vy: 0,
					R: 2 * scaleKoef, // <--- scale particle radius
					speed: (rand() + 5) * scaleKoef, // <--- scale speed for mobile
					q: ~~(rand() * heartPointsCount),
					D: 2 * (i % 2) - 1,
					force: 0.2 * rand() + 0.7,
					f:
						'hsla(270,' +
						~~(100 * rand() + 20) +
						'%,' +
						~~(50 * rand() + 20) +
						'%,1)',
					trace,
				};
			}

			const config = {
				traceK: 0.4,
				timeDelta: 0.01,
			};

			let time = 0;
			const loop = () => {
				const n = -Math.cos(time);
				pulse((1 + n) * 0.5, (1 + n) * 0.5);
				time +=
					(Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) *
					config.timeDelta;
				ctx.fillStyle = 'rgba(1,0,13,1)';
				ctx.fillRect(0, 0, width, height);
				for (i = e.length; i--; ) {
					const u = e[i];
					const q = targetPoints[u.q];
					const dx = u.trace[0].x - q[0];
					const dy = u.trace[0].y - q[1];
					const length = Math.sqrt(dx * dx + dy * dy);
					if (10 > length) {
						if (0.95 < rand()) {
							u.q = ~~(rand() * heartPointsCount);
						} else {
							if (0.99 < rand()) {
								u.D *= -1;
							}
							u.q += u.D;
							u.q %= heartPointsCount;
							if (0 > u.q) {
								u.q += heartPointsCount;
							}
						}
					}
					u.vx += (-dx / length) * u.speed;
					u.vy += (-dy / length) * u.speed;
					u.trace[0].x += u.vx;
					u.trace[0].y += u.vy;
					u.vx *= u.force;
					u.vy *= u.force;
					let k = 0;
					for (; k < u.trace.length - 1; ) {
						const T = u.trace[k];
						const N = u.trace[++k];
						N.x -= config.traceK * (N.x - T.x);
						N.y -= config.traceK * (N.y - T.y);
					}
					ctx.fillStyle = u.f;
					for (k = 0; k < u.trace.length; k++) {
						ctx.fillRect(
							u.trace[k].x,
							u.trace[k].y,
							1 * scaleKoef,
							1 * scaleKoef
						); // <--- scale particle size
					}
				}

				animationFrameId.current = window.requestAnimationFrame(loop);
			};
			animationFrameId.current = window.requestAnimationFrame(loop);
		};

		const s = document.readyState;
		if (s === 'complete' || s === 'interactive') init();
		else {
			domContentLoadedListener.current = () => {
				init();
			};
			document.addEventListener(
				'DOMContentLoaded',
				domContentLoadedListener.current as EventListener,
				false
			);
		}

		return () => {
			// Remove resize listener
			if (resizeListener.current) {
				window.removeEventListener(
					'resize',
					resizeListener.current as EventListener
				);
			}
			// Remove DOMContentLoaded listener
			if (domContentLoadedListener.current) {
				document.removeEventListener(
					'DOMContentLoaded',
					domContentLoadedListener.current as EventListener,
					false
				);
			}
			// Cancel animation frame
			if (animationFrameId.current !== null) {
				window.cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [isClient]); // Only run when isClient is true

	// Only render the canvas when we're on the client side
	if (!isClient) {
		return null; // or return a placeholder/loading state
	}

	return <Jacket ref={heart} />;
};

export default WebglHeart;
