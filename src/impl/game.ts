import { Map } from "./map";
import { Entity } from "./types";

const TARGET_FPS = 60;
const ONE_SECOND = 1000;
const FRAME_INTERVAL = ONE_SECOND / TARGET_FPS;

interface FrameInfo {
	stopFrame?: number;
	elapsed: number;
	currentFrame: number;
	fps: number;
}

export class Game {
	entities = new Set<Entity>();
	map = new Map();

	frameInfo: FrameInfo = {
		elapsed: 0,
		currentFrame: 0,
		fps: 0,
	};

	start = (): void => {
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
					this.frameInfo.currentFrame++;

					if (now - lastMeasurement >= 1000) {
						this.frameInfo.fps = frames;
						this.frameInfo.currentFrame = 0;
						frames = 0;
						lastMeasurement = now;
					}
				}

				this.update(this);
				this.render(this);
			}
		};

		this.frameInfo.stopFrame = requestAnimationFrame(loop);
	};

	update(ctx: Game): void {
		this.entities.forEach((e) => e.update(ctx));
	}

	render(ctx: Game): void {
		this.entities.forEach((e) => e.render(ctx));
	}

	stop(): void {
		const { stopFrame: frame } = this.frameInfo;

		if (frame === undefined) {
			return console.warn("Loop hasn't started");
		}

		cancelAnimationFrame(frame);
	}
}
