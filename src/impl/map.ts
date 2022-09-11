import { createNoise } from "../utils/createNoise";

export class Map {
	size = 20;
	tiles: number[][] = [];
	noise = createNoise("PhysicalMap");

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

		// draw grid lines
		{
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
		}

		// initialize and draw tile map
		{
			for (let i = 0; i < rows; i++) {
				this.tiles.push(new Array(columns).fill(0));
			}

			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < columns; col++) {
					this.tiles[row][col] = this.noise({
						x: col / columns,
						y: row / rows,
						layers: 20,
						smoothing: 2,
						details: 2,
					});

					this.tiles[row][col] < 0.5 &&
						this.shade(ctx, col * this.size, row * this.size);
				}
			}
		}

		canvas.style.position = "absolute";
		document.body.appendChild(canvas);
	}

	shade(ctx: CanvasRenderingContext2D, x: number, y: number): void {
		const w = this.size;
		const h = this.size;
		const rect = new Path2D();

		const intersectionPoints = 3;
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
}
