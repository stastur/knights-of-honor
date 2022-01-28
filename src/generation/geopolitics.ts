import SimplexNoise from "simplex-noise";

import { range } from "../utils/range";

import { Point } from "./hexagonalMap";
import { filterByOccurrence } from "../utils/filterByOccurrence";

interface Region {
	town: Point;
	border: Point[];
}

interface GeopoliticsOptions {
	noise: SimplexNoise;

	centers: Point[];
	vertices: Point[];
}

const numRegions = 200;
// const numCountries = 60;

const distance = (p1: Point, p2: Point) => {
	return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

export class Geopolitics {
	noise: SimplexNoise;
	centers: Point[];
	vertices: Point[];

	regions: Region[] = [];
	countries: number[] = [];

	constructor({ centers, vertices, noise }: GeopoliticsOptions) {
		this.centers = centers;
		this.vertices = vertices;
		this.noise = noise;
	}

	init() {
		this.initializeRegions();

		return this;
	}

	initializeRegions() {
		const land = range(0, this.centers.length);

		land.sort(
			(a, b) =>
				this.normalizedNoise(this.centers[a]) -
				this.normalizedNoise(this.centers[b])
		);

		const capitals = land.slice(-numRegions);
		const otherLand = land.slice(0, -numRegions);

		const regions: number[][] = [];

		otherLand.forEach((index) => {
			const center = this.centers[index];
			const [mainTile] = [...capitals].sort(
				(a, b) =>
					distance(center, this.centers[a]) - distance(center, this.centers[b])
			);

			const regionIndex = capitals.indexOf(mainTile);
			const region = regions[regionIndex];

			if (region) {
				return region.push(index);
			}

			regions[regionIndex] = [mainTile, index];
		});

		const corners = this.vertices.length / this.centers.length;
		const touchPoints = 2;

		const rawRegions = regions.map(([town, ...tiles]) => {
			return {
				town,
				border: filterByOccurrence(
					tiles.flatMap((i) => range(corners * i, corners * i + corners)),
					touchPoints
				),
			};
		});

		this.regions = rawRegions.map(({ town, border }) => ({
			town: this.centers[town],
			border: border.map((i) => this.vertices[i]),
		}));
	}

	// initializeCountries() {}

	findClosest(target: Point, points: Point[]) {
		const [closest] = [...points].sort(
			(p1, p2) => distance(target, p1) - distance(target, p2)
		);

		return closest;
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
}
