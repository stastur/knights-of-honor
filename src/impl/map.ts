import { Game } from "./game";
import { Entity } from "./types";

const WATER = 0;
const GROUND = 1;

export class Map implements Entity {
	size = 20;

	constructor() {
		const columns = Math.floor(document.body.clientWidth / this.size);
		const rows = Math.floor(document.body.clientHeight / this.size);

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d")!;

		// canvas normalization, prevent blur on retina
		{
			const scale = window.devicePixelRatio;
			const height = this.size * rows;
			const width = this.size * columns;

			canvas.height = height * scale;
			canvas.width = width * scale;

			canvas.style.height = height + "px";
			canvas.style.width = width + "px";

			ctx.scale(scale, scale);
		}

		canvas.style.border = "1px solid #03a9f4";
		ctx.strokeStyle = "#03a9f4";

		for (let i = 1; i < rows; i++) {
			ctx.moveTo(0, i * this.size);
			ctx.lineTo(canvas.width, i * this.size);
			ctx.stroke();
		}

		for (let i = 1; i < columns; i++) {
			ctx.moveTo(i * this.size, 0);
			ctx.lineTo(i * this.size, canvas.height);
			ctx.stroke();
		}

		document.body.appendChild(canvas);
	}

	shade(ctx: CanvasRenderingContext2D, x: number, y: number): void {
		const w = this.size;
		const h = this.size;
		const rect = new Path2D();

		const intersectionPoints = 4;
		const distanceCoefficient = 1 / intersectionPoints;
		for (let i = 1; i < intersectionPoints * 2; i++) {
			const c1 = Math.max(i * distanceCoefficient - 1, 0);
			const c2 = Math.min(i * distanceCoefficient, 1);

			rect.lineTo(c1 * w + x, c2 * h + y);
			rect.lineTo(c2 * w + x, c1 * h + y);
		}

		ctx.lineJoin = "round";
		ctx.stroke(rect);
	}

	render(_ctx: Game): void {}
	update(_ctx: Game): void {}
}
