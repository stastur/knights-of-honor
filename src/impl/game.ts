import { action, makeAutoObservable } from "mobx";

import { createCanvas, clearCanvas } from "@app/utils/canvas";
import { setStyles } from "@app/utils/html";

import { Camera } from "./camera";
import { WorldMap } from "./map";
import { PoliticalMap } from "./political-map";
import { Entity } from "./types";

const TARGET_FPS = 60;
const ONE_SECOND = 1000;
const FRAME_INTERVAL = ONE_SECOND / TARGET_FPS;

const a = new PoliticalMap();

interface FrameInfo {
	stopFrame?: number;
	timeElapsed: number;
	currentFrame: number;
	fps: number;
}

interface Hooks {
	onStart: (ctx: Game) => void;
	onUpdate: (ctx: Game) => void;
	onStop: (ctx: Game) => void;
}

export class Game {
	entities = new Map<Entity["id"], Entity>();
	activeEntityId?: Entity["id"];

	frameInfo: FrameInfo = {
		timeElapsed: 0,
		currentFrame: 0,
		fps: 0,
	};

	isRunning = false;

	background: CanvasRenderingContext2D;
	foreground: CanvasRenderingContext2D;

	constructor(
		public map: WorldMap,
		public camera: Camera,
		public hooks: Partial<Hooks> = {}
	) {
		makeAutoObservable(this);

		// TODO: clean up this part
		const backgroundCanvas = createCanvas(
			document.body.clientWidth,
			document.body.clientHeight
		);

		const sceneCanvas = createCanvas(
			document.body.clientWidth,
			document.body.clientHeight
		);

		this.foreground = sceneCanvas.getContext("2d")!;
		this.foreground.font = "1.5rem monospace";

		this.background = backgroundCanvas.getContext("2d")!;

		setStyles(sceneCanvas, {
			position: "absolute",
			zIndex: "-1",
		});

		setStyles(backgroundCanvas, {
			position: "absolute",
			zIndex: "-1",
		});

		document.body.append(backgroundCanvas, sceneCanvas);
	}

	init(): void {
		this.entities.forEach((e) => e.init?.(this));
	}

	start = (): void => {
		this.init();
		this.isRunning = true;

		let then = performance.now();
		let lastMeasurement = then;
		let frames = 0;

		const loop = action((now: number): void => {
			this.frameInfo.stopFrame = requestAnimationFrame(loop);

			const elapsed = now - then;

			if (elapsed >= FRAME_INTERVAL) {
				then = now - (elapsed % FRAME_INTERVAL);
				this.frameInfo.timeElapsed = elapsed;

				// count FPS
				{
					frames++;
					this.frameInfo.currentFrame++;

					if (now - lastMeasurement >= 1000) {
						this.frameInfo.fps = frames;
						this.frameInfo.currentFrame = 0;
						frames = 0;
						lastMeasurement = now;
					}
				}

				this.update();
			}
		});

		this.frameInfo.stopFrame = requestAnimationFrame(loop);
		this.hooks.onStart?.(this);
	};

	update(): void {
		if (!this.isRunning) {
			return;
		}

		clearCanvas(this.background);
		clearCanvas(this.foreground);

		if (this.camera.scale >= 0.5) {
			this.map.draw(this.background, {
				...this.camera.position,
				...this.camera.getScaledViewport(),
			});
		} else {
			this.background.resetTransform();
			this.foreground.resetTransform();

			a.draw(this.background);
		}

		this.entities.forEach((e) => {
			e.update(this);
		});

		this.hooks.onUpdate?.(this);
	}

	stop(): void {
		const { stopFrame: frame } = this.frameInfo;

		if (frame === undefined) {
			return console.warn("Loop hasn't started");
		}

		cancelAnimationFrame(frame);
		this.isRunning = false;
		this.hooks.onStop?.(this);
	}
}
