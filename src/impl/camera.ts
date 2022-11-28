import { makeAutoObservable } from "mobx";

import { add, Point } from "@app/utils/geometry";

import { newId } from "./ids";
import { Entity, Size } from "./types";

export class Camera implements Entity<"position"> {
	id = newId();

	scale = 1;
	position = { x: 0, y: 0 };

	dx = 0;
	dy = 0;

	constructor(public viewport: Size, public screen: Size) {
		makeAutoObservable(this);
	}

	init(): void {
		this.initMoveHandlers(document as unknown as HTMLElement);
		this.initScaleHandlers(document as unknown as HTMLElement);
	}

	initMoveHandlers(el: HTMLElement): void {
		el.addEventListener("mousemove", (ev) => {
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

	initScaleHandlers(el: HTMLElement): void {
		el.addEventListener("wheel", (ev) => {
			this.setScale(this.scale + ev.deltaY * -0.0005);
		});
	}

	setScale(scale: number): void {
		this.scale = Math.min(Math.max(0.1, scale), 1);
	}

	setPosition(point: Point): void {
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
