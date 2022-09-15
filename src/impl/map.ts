import { createNoise } from "../utils/createNoise";

import { Entity } from "./types";
import { Game } from "./game";

export class Map implements Entity {
	size = 20;
	tiles: number[][] = [];
	noise = createNoise("PhysicalMap");

	columns = Math.floor(document.body.clientWidth / this.size);
	rows = Math.floor(document.body.clientHeight / this.size);

	constructor() {
		for (let i = 0; i < this.rows; i++) {
			this.tiles.push(new Array(this.columns).fill(0));
		}

		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.columns; col++) {
				this.tiles[row][col] = this.noise({
					x: col / this.columns,
					y: row / this.rows,
					layers: 20,
					smoothing: 2,
					details: 2,
				});
			}
		}
	}

	shade(ctx: CanvasRenderingContext2D, x: number, y: number): void {
		const w = this.size;
		const h = this.size;

		const intersectionPoints = 3;
		const distanceCoefficient = 1 / intersectionPoints;

		ctx.beginPath();
		for (let i = 1; i < intersectionPoints * 2; i++) {
			const c1 = Math.max(i * distanceCoefficient - 1, 0);
			const c2 = Math.min(i * distanceCoefficient, 1);

			ctx.lineTo(c1 * w + x, c2 * h + y);
			ctx.lineTo(c2 * w + x, c1 * h + y);
		}
		ctx.stroke();
	}

	update({ context: ctx }: Game): void {
		ctx.strokeStyle = "#03a9f4";

		const width = document.body.clientWidth;
		const height = document.body.clientHeight;

		ctx.beginPath();

		// draw horizontal lines
		for (let i = 1; i <= this.rows; i++) {
			ctx.moveTo(0, i * this.size);
			ctx.lineTo(width, i * this.size);
		}

		// draw vertical lines
		for (let i = 1; i <= this.columns; i++) {
			ctx.moveTo(i * this.size, 0);
			ctx.lineTo(i * this.size, height);
		}

		ctx.stroke();

		// shade cells as a water
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.columns; col++) {
				this.tiles[row][col] < 0.5 &&
					this.shade(ctx, col * this.size, row * this.size);
			}
		}
	}
}
