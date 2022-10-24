import { createCanvas } from "@app/utils/canvas";
import { Boundary, Point } from "@app/utils/geometry";

const FRAGMENT_W = 3840;
const FRAGMENT_H = 3200;

const FRAGMENT_ROWS = 10;
const FRAGMENT_COLUMNS = 10;

const worldFragments = Array.from(
	{ length: FRAGMENT_COLUMNS * FRAGMENT_ROWS },
	(_, i) => {
		const row = Math.floor(i / 10);
		const col = i % 10;

		return `images/map/${row}-${col}.png`;
	}
);

export interface Fragment {
	image: HTMLImageElement;
	x: number;
	y: number;
}

export class WorldMap {
	size = 32;
	rows = 1000;
	cols = 1200;

	width = this.cols * this.size;
	height = this.rows * this.size;

	fragments: Fragment[] = [];
	tiles: number[][] = [];

	constructor() {
		for (let i = 0; i < this.rows; i++) {
			this.tiles.push(new Array(this.cols).fill(0));
		}
	}

	isWalkable(_r: number, _c: number): boolean {
		// TODO: collision layer
		return true;
	}

	loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve, _reject) => {
			const image = new Image();
			image.onload = () => {
				resolve(image);
			};

			image.onerror = (_err) => {
				image.src = "images/map/0-3.png";
			};

			image.src = src;
		});
	}

	async load(): Promise<void> {
		this.fragments = await Promise.all(
			worldFragments.map(async (src, i) => {
				const image = await this.loadImage(src);

				return {
					image,
					x: FRAGMENT_W * (i % FRAGMENT_COLUMNS),
					y: FRAGMENT_H * Math.floor(i / FRAGMENT_ROWS),
				};
			})
		);
	}

	draw(ctx: CanvasRenderingContext2D, visibleArea: Boundary): void {
		const startCol = Math.floor(visibleArea.x / FRAGMENT_W);
		const endCol = Math.floor((visibleArea.x + visibleArea.w) / FRAGMENT_W);

		const startRow = Math.floor(visibleArea.y / FRAGMENT_H);
		const endRow = Math.floor((visibleArea.y + visibleArea.h) / FRAGMENT_H);

		const visibleFragments: Fragment[] = [];

		for (let r = startRow; r <= endRow; r++) {
			for (let c = startCol; c <= endCol; c++) {
				const fragment = this.fragments[r * FRAGMENT_ROWS + c];
				visibleFragments.push(fragment);
			}
		}

		const viewportFragments: Boundary[] = visibleFragments.map((fragment) => {
			const lt: Point = {
				x: Math.max(fragment.x, visibleArea.x),
				y: Math.max(fragment.y, visibleArea.y),
			};

			const rb: Point = {
				x: Math.min(fragment.x + FRAGMENT_W, visibleArea.x + visibleArea.w),
				y: Math.min(fragment.y + FRAGMENT_H, visibleArea.y + visibleArea.h),
			};

			return { ...lt, w: rb.x - lt.x, h: rb.y - lt.y };
		});

		let dx = 0;
		let dy = 0;

		for (let i = 0; i < viewportFragments.length; i++) {
			const fragment = visibleFragments[i];
			const boundary = viewportFragments[i];

			ctx.drawImage(
				fragment.image,
				Math.max(boundary.x - fragment.x, 0),
				Math.max(boundary.y - fragment.y, 0),
				boundary.w,
				boundary.h,
				dx,
				dy,
				boundary.w,
				boundary.h
			);

			dx += boundary.w;

			if (dx >= visibleArea.w) {
				dx = 0;
				dy += boundary.h;
			}
		}
	}

	createMiniature(scale = 1): string {
		const canvas = createCanvas(this.width * scale, this.height * scale);
		const ctx = canvas.getContext("2d")!;

		this.fragments.forEach(({ image, x, y }) => {
			ctx.drawImage(
				image,
				0,
				0,
				image.width,
				image.height,
				x * scale,
				y * scale,
				image.width * scale,
				image.height * scale
			);
		});

		return canvas.toDataURL();
	}
}
