import { makeAutoObservable } from "mobx";

import { add, Point } from "@app/utils/geometry";

import { newId } from "./ids";
import { Entity, Size } from "./types";

export class Camera implements Entity<"position"> {
	id = newId();

	position = { x: 0, y: 0 };

	dx = 0;
	dy = 0;

	constructor(public viewport: Size, public screen: Size) {
		makeAutoObservable(this);
	}

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

	setPosition(point: Point) {
		const { w, h } = this.viewport;

		const maxX = this.screen.w - w - 1;
		const maxY = this.screen.h - h - 1;

		this.position.x = Math.max(Math.min(point.x, maxX), 0);
		this.position.y = Math.max(Math.min(point.y, maxY), 0);
	}

	update(): void {
		const newPosition = add(this.position, { x: this.dx, y: this.dy });
		this.setPosition(newPosition);
	}
}
