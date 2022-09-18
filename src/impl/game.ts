import { createCanvas } from "./utils";
import { Entity } from "./types";
import { Map } from "./map";

const TARGET_FPS = 60;
const ONE_SECOND = 1000;
const FRAME_INTERVAL = ONE_SECOND / TARGET_FPS;

interface FrameInfo {
	stopFrame?: number;
	elapsed: number;
	framesElapsed: number;
	fps: number;
}

export class Game {
	entities = new Set<Entity>();
	map = new Map();

	frameInfo: FrameInfo = {
		elapsed: 0,
		framesElapsed: 0,
		fps: 0,
	};

	isRunning = false;
	context: CanvasRenderingContext2D;

	constructor() {
		const canvas = createCanvas(
			document.body.clientWidth,
			document.body.clientHeight
		);

		this.context = canvas.getContext("2d")!;
		this.context.lineJoin = "round";
		this.context.font = "1.5rem monospace";

		canvas.style.position = "absolute";

		document.body.appendChild(canvas);
	}

	start = (): void => {
		this.isRunning = true;

		let then = performance.now();
		let lastMeasurement = then;
		let frames = 0;

		const loop = (now: number): void => {
			this.frameInfo.stopFrame = requestAnimationFrame(loop);

			const elapsed = now - then;

			if (elapsed >= FRAME_INTERVAL) {
				then = now - (elapsed % FRAME_INTERVAL);
				this.frameInfo.elapsed = elapsed;

				// count FPS
				{
					frames++;
					this.frameInfo.framesElapsed++;

					if (now - lastMeasurement >= 1000) {
						this.frameInfo.fps = frames;
						this.frameInfo.framesElapsed = 0;
						frames = 0;
						lastMeasurement = now;
					}
				}

				this.update(this);
			}
		};

		this.frameInfo.stopFrame = requestAnimationFrame(loop);
	};

	update(ctx: Game): void {
		if (!this.isRunning) {
			return;
		}

		this.context.clearRect(
			0,
			0,
			document.body.clientWidth,
			document.body.clientHeight
		);

		this.map.update(ctx);
		this.entities.forEach((e) => {
			e.update(ctx);
		});
	}

	stop(): void {
		const { stopFrame: frame } = this.frameInfo;

		if (frame === undefined) {
			return console.warn("Loop hasn't started");
		}

		cancelAnimationFrame(frame);
		this.isRunning = false;
	}
}
