import SimplexNoise from "simplex-noise";

import { range } from "../../utils/range";
import { Point } from "./hexagonalMap";

const cos30 = Math.sqrt(3) * 0.5;

const byY = (p1: Point, p2: Point) => p1.y - p2.y || p1.x - p2.x;

interface TerraformOptions {
	noise: SimplexNoise;

	size: {
		width: number;
		height: number;
		tile: number;
	};
}

export class Terraform {
	noise: SimplexNoise;
	size: TerraformOptions["size"];

	points: Point[] = [];

	centers: number[] = [];
	meshPoints: number[] = [];

	elevation: number[] = [];
	temperature: number[] = [];

	constructor({ noise, size }: TerraformOptions) {
		this.noise = noise;
		this.size = size;
	}

	init() {
		this.initializeMesh();
		this.initializeTemperature();
		this.initializeElevation();

		return this;
	}

	initializeMesh() {
		const { points, rows, cols } = this.createCenters();

		this.points = points;
		this.centers = this.points.map((_, index) => index);

		const width = this.size.tile;
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
				this.points.push({
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

	static isGround(elevation: number) {
		return elevation >= 0.5;
	}

	initializeElevation() {
		this.centers.forEach((cIndex) => {
			const p = this.points[cIndex];
			const nx = p.x / this.size.width;
			const ny = p.y / this.size.height;

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
			const p = this.points[cIndex];
			const nx = p.x / this.size.width;
			const ny = p.y / this.size.height;

			const temperature =
				(2 * Math.sin(Math.PI * ny) + this.normalizedNoise({ x: nx, y: ny })) /
				3;

			this.temperature.push(temperature);
		});
	}

	createCenters() {
		const width = this.size.tile;
		const height = width / cos30;

		const r = 0.5 * width;
		const R = 0.5 * height;

		const maxX = this.size.width - 2 * r;
		const maxY = this.size.height - R;

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

	getHexagonVertices(index: number) {
		return range(6 * index, 6 * index + 6).map(
			(i) => this.points[this.meshPoints[i]]
		);
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
