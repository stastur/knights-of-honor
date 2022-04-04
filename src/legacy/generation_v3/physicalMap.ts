import { createNoise } from "./../utils/createNoise";
import { Grid } from "./grid";

export class PhysicalMap {
	noise = createNoise("PhysicalMap");

	elevation: number[] = [];
	temperature: number[] = [];

	constructor(private grid: Grid) {
		this.initializeTemperature();
		this.initializeElevation();
	}

	initializeElevation(): void {
		this.grid.hexagons.forEach((h) => {
			const pt = this.grid.hexToPoint(h);

			const nx = pt.x / this.grid.window.x;
			const ny = pt.y / this.grid.window.y;

			const elevation = this.noise({
				x: nx,
				y: ny,
				layers: 20,
				smoothing: 2,
				details: 2,
			});

			this.elevation.push(elevation);
		});
	}

	initializeTemperature(): void {
		this.grid.hexagons.forEach((h) => {
			const pt = this.grid.hexToPoint(h);

			const nx = pt.x / this.grid.window.x;
			const ny = pt.y / this.grid.window.y;

			const temperature =
				(2 * Math.sin(Math.PI * ny) + this.noise({ x: nx, y: ny })) / 3;

			this.temperature.push(temperature);
		});
	}
}
