import { createCanvas, clearCanvas } from "@app/utils/canvas";
import { setStyles } from "@app/utils/html";

import { Camera } from "./camera";
import { Entity, TileMap } from "./types";

const TARGET_FPS = 60;
const ONE_SECOND = 1000;
const FRAME_INTERVAL = ONE_SECOND / TARGET_FPS;

interface FrameInfo {
	stopFrame?: number;
	timeElapsed: number;
	framesElapsed: number;
	fps: number;
}

export class Game {
	entities = new Set<Entity>();
	activeEntity: Entity | null = null;

	frameInfo: FrameInfo = {
		timeElapsed: 0,
		framesElapsed: 0,
		fps: 0,
	};

	isRunning = false;

	backgroundCanvas: HTMLCanvasElement;
	backgroundContext: CanvasRenderingContext2D;

	mainCanvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;

	constructor(public map: TileMap, public camera: Camera) {
		// TODO: clean up this part
		this.backgroundCanvas = createCanvas(
			document.body.clientWidth,
			document.body.clientHeight
		);

		this.mainCanvas = createCanvas(
			document.body.clientWidth,
			document.body.clientHeight
		);

		this.context = this.mainCanvas.getContext("2d")!;
		this.context.font = "1.5rem monospace";

		this.backgroundContext = this.backgroundCanvas.getContext("2d")!;

		setStyles(this.mainCanvas, {
			position: "absolute",
		});

		setStyles(this.backgroundCanvas, {
			position: "absolute",
		});

		document.body.append(this.backgroundCanvas, this.mainCanvas);
	}

	start = (): void => {
		this.isRunning = true;

		this.entities.forEach((e) => e.init?.(this));

		let then = performance.now();
		let lastMeasurement = then;
		let frames = 0;

		const loop = (now: number): void => {
			this.frameInfo.stopFrame = requestAnimationFrame(loop);

			const elapsed = now - then;

			if (elapsed >= FRAME_INTERVAL) {
				then = now - (elapsed % FRAME_INTERVAL);
				this.frameInfo.timeElapsed = elapsed;

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

		clearCanvas(this.backgroundContext);
		clearCanvas(this.context);

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
