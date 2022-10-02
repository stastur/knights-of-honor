import { add } from "@app/utils/geometry";

import { Game } from "./game";
import { Entity, Size } from "./types";

export class Camera implements Entity<"position"> {
	position = { x: 0, y: 0 };

	dx = 0;
	dy = 0;

	constructor(public viewport: Size) {}

	init(): void {
		document.addEventListener("mousemove", (ev) => {
			const shift = 50;
			const triggerZone = 5;

			this.dx = 0;
			this.dy = 0;

			if (ev.clientX >= this.viewport.w - triggerZone) {
				this.dx += shift;
			}

			if (ev.clientX <= triggerZone) {
				this.dx -= shift;
			}

			if (ev.clientY <= triggerZone) {
				this.dy -= shift;
			}

			if (ev.clientY >= this.viewport.h - triggerZone) {
				this.dy += shift;
			}
		});
	}

	update(ctx: Game): void {
		const { w, h } = this.viewport;

		const newPosition = add(this.position, { x: this.dx, y: this.dy });

		const maxX = ctx.map.width - w - 1;
		const maxY = ctx.map.height - h - 1;

		newPosition.x = Math.max(Math.min(newPosition.x, maxX), 0);
		newPosition.y = Math.max(Math.min(newPosition.y, maxY), 0);

		this.position = newPosition;
	}
}
