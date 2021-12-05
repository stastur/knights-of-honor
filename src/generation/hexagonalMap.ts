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
	centers: Point[];
	meshPoints: Point[] = [];

	elevation: number[] = [];
	temperature: number[] = [];

	/** @description indices of centers */
	regions: number[][] = [];
	/** @description indices of regions */
	countries: number[][] = [];

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
		this.centers = this.createCenters();

		this.initializeMesh();
		this.initializeTemperature();
		this.initializeElevation();

		this.initializeRegions();
		this.initializeCountries();
	}

	static isGround(elevation: number) {
		return elevation >= 0.5;
	}

	initializeElevation() {
		for (let i = 0; i < this.centers.length; i++) {
			const p = this.centers[i];
			const nx = p.x / this.options.w;
			const ny = p.y / this.options.h;

			const elevation = this.normalizedNoise({
				x: nx,
				y: ny,
				layers: 20,
				smoothing: 2,
				details: 2,
			});

			this.elevation.push(elevation);
		}
	}

	initializeTemperature() {
		for (let i = 0; i < this.centers.length; i++) {
			const p = this.centers[i];
			const nx = p.x / this.options.w;
			const ny = p.y / this.options.h;

			const temperature =
				(2 * Math.sin(Math.PI * ny) + this.normalizedNoise({ x: nx, y: ny })) /
				3;

			this.temperature.push(temperature);
		}
	}

	initializeMesh() {
		for (let i = 0; i < this.centers.length; i++) {
			this.addHexagonMeshPoints(i);
		}
	}

	initializeRegions() {
		const land: number[] = [];

		for (let i = 0; i < this.centers.length; i++) {
			HexagonalMap.isGround(this.elevation[i]) && land.push(i);
		}

		land.sort(
			(c1, c2) =>
				this.normalizedNoise(this.centers[c1]) -
				this.normalizedNoise(this.centers[c2])
		);

		const capitals = land.slice(-numRegions);
		const otherLand = land.slice(0, -numRegions);

		otherLand.forEach((centerIndex) => {
			const closestCapital = this.findClosest(
				this.centers[centerIndex],
				capitals
			);

			const regionIndex = capitals.indexOf(closestCapital);
			const region = this.regions[regionIndex];

			if (region) {
				return region.push(centerIndex);
			}

			this.regions[regionIndex] = [closestCapital, centerIndex];
		});
	}

	getRegionCenter = (rIndex: number) => this.regions[rIndex][0];

	initializeCountries() {
		const regionIndices = this.regions.map((_, i) => i);

		const baseRegions = regionIndices.slice(-numCountries);
		const otherRegions = regionIndices.slice(0, -numCountries);

		baseRegions.forEach((baseRegion, i) => (this.countries[i] = [baseRegion]));

		otherRegions.forEach((rIndex) => {
			const closestBaseRegion = this.findClosest(
				this.centers[this.getRegionCenter(rIndex)],
				baseRegions,
				this.getRegionCenter
			);

			const countryIndex = baseRegions.indexOf(closestBaseRegion);
			const country = this.countries[countryIndex];

			country.push(rIndex);
		});
	}

	addHexagonMeshPoints = (centerIndex: number) => {
		const side = this.options.tileSize * tan30;
		const center = this.centers[centerIndex];

		for (let i = 0; i < 6; i++) {
			this.meshPoints.push({
				x: center.x + side * Math.sin(angle * i),
				y: center.y + side * Math.cos(angle * i),
			});
		}
	};

	findClosest<T extends number>(
		target: Point,
		figures: T[],
		getCenterIndex: (item: T) => number = (v) => v
	) {
		const [closest] = [...figures].sort(
			(c1, c2) =>
				distance(target, this.centers[getCenterIndex(c1)]) -
				distance(target, this.centers[getCenterIndex(c2)])
		);

		return closest;
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

	getHexagonVertices(index: number) {
		return [0, 1, 2, 3, 4, 5].map(
			(vIndex) => this.meshPoints[6 * index + vIndex]
		);
	}

	createCenters() {
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

	createCircle(p: Point) {
		const circle = new Path2D();
		circle.ellipse(p.x, p.y, 2, 2, Math.PI * 2, 0, Math.PI * 2);

		return circle;
	}

	createPolygon(vertices: Point[]) {
		const hexagon = new Path2D(
			vertices
				.map(({ x, y }, index) => {
					let path = "L " + [x, y].join();

					if (index === 0) {
						path = path.replace("L", "M");
					}

					if (index === vertices.length - 1) {
						path += " z";
					}

					return path;
				})
				.join("\n")
		);

		return hexagon;
	}

	drawMesh(
		canvas: HTMLCanvasElement,
		options: {
			withPoints?: boolean;
			type?: "temperature" | "elevation";
		} = {}
	) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const ctx = canvas.getContext("2d")!;

		this.centers.forEach((_, index) => {
			const vertices = this.getHexagonVertices(index);
			const temperature = this.temperature[index];
			const elevation = this.elevation[index];

			const hexagon = this.createPolygon(vertices);

			switch (options.type) {
				case "temperature":
					ctx.fillStyle = `hsl(${200 - 200 * temperature}, 100%, 70%)`;
					ctx.fill(hexagon);
					break;
				case "elevation":
					ctx.fillStyle = `hsl(${
						HexagonalMap.isGround(elevation) ? 150 : 200
					}, 100%, 70%)`;
					ctx.fill(hexagon);
					break;
				default:
					ctx.strokeStyle = "hsl(200, 100%, 70%)";
					ctx.stroke(hexagon);
					break;
			}
		});

		options.withPoints && this.drawMeshPoints(canvas);
	}

	drawMeshPoints(canvas: HTMLCanvasElement) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const ctx = canvas.getContext("2d")!;

		ctx.fillStyle = "#f00";

		this.meshPoints.forEach((p) => {
			ctx.fill(this.createCircle(p));
		});
	}

	colorCountries(canvas: HTMLCanvasElement) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const ctx = canvas.getContext("2d")!;

		this.countries.forEach((c) => {
			ctx.fillStyle = getRandomColor();

			c.forEach((rIndex) => {
				const region = this.regions[rIndex];

				region.forEach((centerIndex) => {
					const vertices = this.getHexagonVertices(centerIndex);

					ctx.fill(this.createPolygon(vertices));
				});
			});
		});
	}

	colorRegions(canvas: HTMLCanvasElement) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const ctx = canvas.getContext("2d")!;

		this.regions.forEach((r) => {
			const color = getRandomColor();

			r.forEach((centerIndex, index) => {
				const vertices = this.getHexagonVertices(centerIndex);

				ctx.fillStyle = index === 0 ? "#f00" : color;
				ctx.fill(this.createPolygon(vertices));
			});
		});
	}
}
