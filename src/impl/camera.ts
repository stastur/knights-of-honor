import { subtract, Point, add } from "@app/utils/geometry";
import { clamp } from "@app/utils/util";

import { Size } from "./types";

const MAX_SCALE = 1;
const MIN_SCALE = 0.1;

export class Camera {
	scale = MAX_SCALE;
	position = { x: 0, y: 0 };

	constructor(public viewport: Size, public screen: Size) {}

	setScale(scale: number): void {
		this.scale = clamp(scale, MIN_SCALE, MAX_SCALE);
	}

	setPosition(point: Point): void {
		const { w, h } = this.viewport;

		const maxX = this.screen.w - w - 1;
		const maxY = this.screen.h - h - 1;

		this.position.x = clamp(point.x, 0, maxX);
		this.position.y = clamp(point.y, 0, maxY);
	}

	setCenter(point: Point): void {
		const { w, h } = this.viewport;

		this.setPosition(subtract(point, { x: 0.5 * w, y: 0.5 * h }));
	}

	move(dx: number, dy: number): void {
		this.setPosition(add(this.position, { x: dx, y: dy }));
	}

	getScaledViewport(): Size {
		return { w: this.viewport.w / this.scale, h: this.viewport.h / this.scale };
	}
}
