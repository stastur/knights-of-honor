const TARGET_FPS = 60;
const ONE_SECOND = 1000;
const FRAME_INTERVAL = ONE_SECOND / TARGET_FPS;

export class Game {
	entities = new Set<{
		update: (ctx: Game) => void;
		render: (ctx: Game) => void;
	}>();

	state: { then: number; frame?: number; elapsed: number } = {
		then: performance.now(),
		elapsed: 0,
	};

	#loop = (now: number): void => {
		this.state.frame = requestAnimationFrame(this.#loop);

		const elapsed = now - this.state.then;

		if (elapsed >= FRAME_INTERVAL) {
			this.state.then = now - (elapsed % FRAME_INTERVAL);
			this.state.elapsed = elapsed;

			this.update(this);
			this.render(this);
		}
	};

	start = (): void => {
		this.state.frame = requestAnimationFrame(this.#loop);
	};

	update(ctx: Game): void {
		this.entities.forEach((e) => e.update(ctx));
	}

	render(ctx: Game): void {
		this.entities.forEach((e) => e.render(ctx));
	}

	stop(): void {
		const { frame } = this.state;

		if (frame === undefined) {
			return console.warn("Loop hasn't been started");
		}

		cancelAnimationFrame(frame);
	}
}
