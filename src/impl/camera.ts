import { Game } from "./game";
import { Entity } from "./types";
import { add } from "./utils";

export class Camera implements Entity<"position"> {
	position = { x: 0, y: 0 };

	dx = 0;
	dy = 0;

	constructor(public box: HTMLElement) {}

	init(): void {
		document.addEventListener("mousemove", (ev) => {
			const shift = 50;
			const threshold = 5;

			this.dx = 0;
			this.dy = 0;

			if (ev.clientX >= this.box.clientWidth - threshold) {
				this.dx += shift;
			}

			if (ev.clientX <= threshold) {
				this.dx -= shift;
			}

			if (ev.clientY <= threshold) {
				this.dy -= shift;
			}

			if (ev.clientY >= this.box.clientHeight - threshold) {
				this.dy += shift;
			}
		});
	}

	update(ctx: Game): void {
		const w = this.box.clientWidth;
		const h = this.box.clientHeight;

		const newPosition = add(this.position, { x: this.dx, y: this.dy });

		const maxX = ctx.map.cols * ctx.map.size - w - 1;
		const maxY = ctx.map.rows * ctx.map.size - h - 1;

		newPosition.x = Math.max(Math.min(newPosition.x, maxX), 0);
		newPosition.y = Math.max(Math.min(newPosition.y, maxY), 0);

		this.position = newPosition;
	}
}
