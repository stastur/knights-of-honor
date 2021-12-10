import SimplexNoise from "simplex-noise";
import { getRandomColor } from "../utils/getRandomColor";
import { range } from "../utils/range";

interface Point {
	x: number;
	y: number;
}

const tan30 = Number(Math.tan(Math.PI / 6).toFixed(3));
const cos30 = Number(Math.cos(Math.PI / 6).toFixed(3));

const numRegions = 200;
const numCountries = 60;

const distance = (p1: Point, p2: Point) => {
	return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

const byY = (p1: Point, p2: Point) => p1.y - p2.y || p1.x - p2.x;

export class HexagonalMap {
	_points: Point[] = [];
	_rows = 0;
	_cols = 0;

	centers: number[] = [];
	meshPoints: number[] = [];

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

		this.initializeMesh();

		this.initializeTemperature();
		this.initializeElevation();

		this.initializeRegions();
		this.initializeCountries();

		this.distortMesh();

		console.log(this);
	}

	static isGround(elevation: number) {
		return elevation >= 0.5;
	}

	initializeElevation() {
		this.centers.forEach((cIndex) => {
			const p = this._points[cIndex];
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
		});
	}

	initializeTemperature() {
		this.centers.forEach((cIndex) => {
			const p = this._points[cIndex];
			const nx = p.x / this.options.w;
			const ny = p.y / this.options.h;

			const temperature =
				(2 * Math.sin(Math.PI * ny) + this.normalizedNoise({ x: nx, y: ny })) /
				3;

			this.temperature.push(temperature);
		});
	}

	initializeMesh() {
		const { points, rows, cols } = this.createCenters();

		this._points = points;
		this.centers = this._points.map((_, index) => index);

		const width = this.options.tileSize;
		const height = width / cos30;

		const r = 0.5 * width;
		const R = 0.5 * height;

		for (let row = 0; row < rows + 1; row++) {
			const isBound = row === 0 || row === rows;
			const shiftBound = isBound ? 0 : 1;
			const shiftLast = row === rows && rows % 2 === 0 ? 1 : 0;

			for (
				let col = shiftLast;
				col < cols * 2 + 1 + shiftBound + shiftLast;
				col++
			) {
				this._points.push({
					x: r * col,
					y: 1.5 * R * row + 0.25 * R + 0.25 * R * (-1) ** (col + row),
				});
			}
		}

		const mStart = this.centers.length;
		const n = cols * 2 + 2;

		for (let i = 0; i < this.centers.length; i++) {
			const row = Math.floor(i / cols);
			const col = i % cols;

			const topLine = range(
				mStart + (row === 0 ? 0 : -1) + row * n,
				mStart + (row === 0 ? 0 : -1) + row * n + n
			);

			const botLine = range(
				mStart + n - 1 + row * n,
				mStart + n - 1 + row * n + n
			);

			const tStart = col * 2 + (row % 2);
			const bStart = col * 2 + (row === rows - 1 ? 0 : row % 2);

			this.meshPoints.push(
				...topLine.slice(tStart, tStart + 3),
				...botLine.slice(bStart, bStart + 3).reverse()
			);
		}
	}

	initializeRegions() {
		const land: number[] = [];

		for (let i = 0; i < this.centers.length; i++) {
			HexagonalMap.isGround(this.elevation[i]) && land.push(i);
		}

		land.sort(
			(c1, c2) =>
				this.normalizedNoise(this._points[c1]) -
				this.normalizedNoise(this._points[c2])
		);

		const capitals = land.slice(-numRegions);
		const otherLand = land.slice(0, -numRegions);

		otherLand.forEach((centerIndex) => {
			const closestCapital = this.findClosest(
				this._points[centerIndex],
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
				this._points[this.getRegionCenter(rIndex)],
				baseRegions,
				this.getRegionCenter
			);

			const countryIndex = baseRegions.indexOf(closestBaseRegion);
			const country = this.countries[countryIndex];

			country.push(rIndex);
		});
	}

	oppositeEdge(e: number) {
		return (e + 3) % 6;
	}

	distortMesh() {
		this.meshPoints.forEach((pIndex) => {
			const mp = this._points[pIndex];

			const noise = this.normalizedNoise({
				x: mp.x,
				y: mp.y,
				layers: 2,
				details: 1,
			});

			const distortion = (noise - 0.5) * this.options.tileSize * tan30;

			mp.x += distortion;
			mp.y += distortion;
		});
	}

	findClosest<T extends number>(
		target: Point,
		figures: T[],
		getCenterIndex: (item: T) => number = (v) => v
	) {
		const [closest] = [...figures].sort(
			(c1, c2) =>
				distance(target, this._points[getCenterIndex(c1)]) -
				distance(target, this._points[getCenterIndex(c2)])
		);

		return closest;
	}

	getHexagonMeshIndices(index: number) {
		return [0, 1, 2, 3, 4, 5].map((vIndex) => 6 * index + vIndex);
	}

	getHexagonVertices(index: number) {
		return this.getHexagonMeshIndices(index).map(
			(i) => this._points[this.meshPoints[i]]
		);
	}

	createCenters() {
		const width = this.options.tileSize;
		const height = width / cos30;

		const r = 0.5 * width;
		const R = 0.5 * height;

		const maxX = this.options.w - 2 * r;
		const maxY = this.options.h - R;

		const points: Point[] = [];
		let cols = 0;

		for (let x = r; x < maxX; x += width) {
			cols++;
			for (let i = 0, y = R; y < maxY; y += 0.75 * height, i++) {
				points.push({ x: x + r * (i % 2), y });
			}
		}

		points.sort(byY);

		const rows = points.length / cols;

		return { points, rows, cols };
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

	getBounding(centers: number[]): Point[] {
		const pointOccurrences: Record<number, number> = Object.create(null);

		centers
			.flatMap((c) => this.getHexagonMeshIndices(c))
			.forEach((mp) => {
				pointOccurrences[mp] = (pointOccurrences[mp] || 0) + 1;
			});

		return Object.entries(pointOccurrences)
			.filter(([_, times]) => times <= 2)
			.map(([mp]) => this._points[Number(mp)])
			.sort((p1, p2) => p1.x - p2.x + p1.y - p2.y);
	}

	createSVGPath(points: Point[]) {
		return (
			points
				.map(({ x, y }, index) => {
					let path = "L " + [x, y].join();

					if (index === 0) {
						path = path.replace("L", "M");
					}

					return path;
				})
				.join("\n") + " Z"
		);
	}

	toSvg() {
		const root = document.createElement("svg");
		root.setAttribute("viewBox", `0 0 ${this.options.w} ${this.options.h}`);
		root.setAttribute(
			"style",
			`width:${this.options.w}px; height:${this.options.h}px`
		);

		const regions = this.regions.slice(-1).map((centers) => {
			const svgPath = this.createSVGPath(this.getBounding(centers));

			const regionSvg = document.createElement("path");
			regionSvg.setAttribute("d", svgPath);
			regionSvg.setAttribute("fill", getRandomColor());

			return regionSvg;
		});

		root.append(...regions);

		return root;
	}

	createCircle(p: Point) {
		const circle = new Path2D();
		circle.ellipse(p.x, p.y, 2, 2, Math.PI * 2, 0, Math.PI * 2);

		return circle;
	}

	createPolygon(vertices: Point[]) {
		return new Path2D(this.createSVGPath(vertices));
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

		ctx.fillStyle = "#00f";
		this.meshPoints.forEach((p) => {
			ctx.fill(this.createCircle(this._points[p]));
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

			r.forEach((centerIndex) => {
				const vertices = this.getHexagonVertices(centerIndex);

				ctx.fillStyle = color;
				ctx.fill(this.createPolygon(vertices));
				ctx.fill(this.createCircle(this._points[centerIndex]));
			});
		});
	}
}
