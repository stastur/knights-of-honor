import SimplexNoise from "simplex-noise";
import { getRandomColor } from "../utils/getRandomColor";

interface Point {
	x: number;
	y: number;
}

interface Cell {
	vertices: Point[];
	center: Point;
}

interface Hexagon extends Cell {
	temperature: number;
	elevation: number;
}

interface Region {
	center: Hexagon;
	land: Hexagon[];
}

const tan30 = Math.tan(Math.PI / 6);
const cos30 = Math.cos(Math.PI / 6);
const angle = Math.PI / 3;
const numRegions = 200;
const numCountries = 60;

const distance = (p1: Point, p2: Point) => {
	return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

export class HexagonalMap {
	meshPoints: Point[];
	hexagons: Hexagon[] = [];
	noise: SimplexNoise;

	constructor(
		private options: {
			w: number;
			h: number;
			tileSize: number;
			seed: string;
		}
	) {
		this.noise = new SimplexNoise(this.options.seed);
		this.meshPoints = this.generateMeshPoints();
		this.hexagons = this.assignElevation(
			this.assignTemperature(this.generateHexagons())
		);
	}

	static isGround(elevation: number) {
		return elevation >= 0.5;
	}

	assignElevation<T extends Cell>(hexagons: T[]) {
		const withElevation = hexagons.map((h) => {
			const x = h.center.x / this.options.w;
			const y = h.center.y / this.options.h;

			const elevation = this.normalizedNoise({
				x,
				y,
				layers: 20,
				smoothing: 2,
				details: 2,
			});

			return { ...h, elevation: Math.min(1, elevation + 0.005) };
		});

		return withElevation;
	}

	getClosestHexagon(target: Point, hexagons: Hexagon[]) {
		const [closestPoint] = [...hexagons].sort(
			(p1, p2) => distance(target, p1.center) - distance(target, p2.center)
		);

		return closestPoint;
	}

	getAdjacentRegions(r: Region, rs: Region[]) {
		const neighbors = [...rs]
			.sort(
				({ center: c1 }, { center: c2 }) =>
					distance(r.center.center, c1.center) -
					distance(r.center.center, c2.center)
			)
			.slice(0, 9);

		return neighbors.filter(({ land }) => land.some((h) => r.land.includes(h)));
	}

	getRegions() {
		const land = this.hexagons.filter((h) =>
			HexagonalMap.isGround(h.elevation)
		);

		const noises = land
			.map(({ center: { x, y } }, index) => ({
				index,
				noise: this.normalizedNoise({ x, y }),
			}))
			.sort((n1, n2) => n1.noise - n2.noise);

		const regionCenters = noises
			.slice(-numRegions)
			.map(({ index }) => land[index]);

		const regions: { center: Hexagon; land: Hexagon[] }[] = regionCenters.map(
			(center) => ({ center, land: [] })
		);

		for (const h of land) {
			const closestHexagon = this.getClosestHexagon(h.center, regionCenters);

			regions.find((h) => h.center === closestHexagon)?.land.push(h);
		}

		return regions;
	}

	getCountries(regions: Region[]) {
		const noises = regions
			.map((r, index) => {
				const { x, y } = r.center.center;

				return {
					index,
					noise: this.normalizedNoise({ x, y }),
				};
			})
			.sort((n1, n2) => n1.noise - n2.noise);

		const countries: { capital: Region; regions: Region[] }[] = noises
			.slice(-numCountries)
			.map(({ index }) => ({ capital: regions[index], regions: [] }));

		for (const r of regions) {
			const closestCapitalCenter = this.getClosestHexagon(
				r.center.center,
				countries.map(({ capital }) => capital.center)
			);

			countries
				.find((c) => c.capital.center === closestCapitalCenter)
				?.regions.push(r);
		}

		return countries;
	}

	assignTemperature<T extends Cell>(hexagons: T[]) {
		const withTemperature = hexagons.map((h) => {
			const x = h.center.x / this.options.w;
			const y = h.center.y / this.options.h;

			const temperature =
				(2 * Math.sin(Math.PI * y) + this.normalizedNoise({ x: x, y: y })) / 3;

			return { ...h, temperature };
		});

		return withTemperature;
	}

	generateHexagons() {
		return this.meshPoints.map(this.buildHexagon);
	}

	buildHexagon = (center: Point) => {
		const side = this.options.tileSize * tan30;

		const vertices: Point[] = Array.from({ length: 6 }, (_, i) => ({
			x: center.x + side * Math.sin(angle * i),
			y: center.y + side * Math.cos(angle * i),
		}));

		return {
			vertices,
			center,
		};
	};

	generateMeshPoints() {
		const { w, h, tileSize } = this.options;

		const r = tileSize / 2;
		const R = r / cos30;
		const points: Point[] = [];

		const shiftY = 2 * r * cos30;

		for (let x = r; x < w - 2 * r; x += 2 * r) {
			for (let y = R, i = 0; y < h - R; y += shiftY, i++) {
				points.push({ x: x + r * (i % 2), y });
			}
		}

		return points;
	}

	/** @returns value in [0, 1] */
	normalizedNoise({
		x,
		y,
		layers = 1,
		details = 2,
		smoothing = 0.5,
	}: {
		x: number;
		y: number;
		layers?: number;
		details?: number;
		smoothing?: number;
	}) {
		let noiseSum = 0;

		for (let i = 0; i < layers; i++) {
			const f = details ** i;
			const a = smoothing ** -i;

			noiseSum += a * this.noise.noise2D(x * f, y * f);
		}

		return 0.5 * (noiseSum / layers + 1);
	}

	drawHexagons(
		canvas: HTMLCanvasElement,
		hexagons: Hexagon[],
		getColor: (h: Hexagon) => string = () => "#000"
	) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const ctx = canvas.getContext("2d")!;

		hexagons.forEach((h) => {
			const cell = new Path2D(
				h.vertices
					.map(({ x, y }, index) => {
						let path = "L " + [x, y].join();

						if (index === 0) {
							path = path.replace("L", "M");
						}

						if (index === h.vertices.length - 1) {
							path += " z";
						}

						return path;
					})
					.join("\n")
			);

			ctx.lineWidth = 1;
			ctx.fillStyle = getColor(h);
			ctx.fill(cell);
		});
	}

	drawPoints(canvas: HTMLCanvasElement, points: Point[]) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const ctx = canvas.getContext("2d")!;

		points.forEach((p) => {
			const circle = new Path2D();
			circle.ellipse(p.x, p.y, 15, 15, Math.PI * 2, 0, Math.PI * 2);

			ctx.fillStyle = "#fff";
			ctx.fill(circle);
		});
	}

	strokePoints(canvas: HTMLCanvasElement, points: Point[]) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const ctx = canvas.getContext("2d")!;
		const cell = new Path2D(
			points
				.map(({ x, y }, index) => {
					let path = "L " + [x, y].join();

					if (index === 0) {
						path = path.replace("L", "M");
					}

					if (index === points.length - 1) {
						path += " z";
					}

					return path;
				})
				.join("\n")
		);

		ctx.lineWidth = 1;
		ctx.strokeStyle = "#fff";
		ctx.stroke(cell);
	}

	colorCountries(
		canvas: HTMLCanvasElement,
		countries: { capital: Region; regions: Region[] }[]
	) {
		countries.forEach((c) => {
			const color = getRandomColor();
			this.colorRegions(canvas, [c.capital, ...c.regions], () => color);
		});
	}

	colorRegions(
		canvas: HTMLCanvasElement,
		regions: Region[],
		getColor: () => string = getRandomColor
	) {
		regions.forEach((r) => {
			const color = getColor();
			this.drawHexagons(canvas, [r.center, ...r.land], () => color);
			this.drawPoints(canvas, [r.center.center]);
		});
	}
}
