import { createCanvas } from "@app/utils/canvas";
import { Boundary, Point } from "@app/utils/geometry";

import { Game } from "./game";
import { Entity, TileMap } from "./types";

const FRAGMENT_W = 3840;
const FRAGMENT_H = 3200;

const FRAGMENT_ROWS = 10;
const FRAGMENT_COLUMNS = 10;

const worldFragments = new Array(FRAGMENT_COLUMNS * FRAGMENT_ROWS).fill(
	"images/map/0-3.png"
);

export interface Fragment {
	image: HTMLImageElement;
	x: number;
	y: number;
}

export class Map implements Entity, TileMap {
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
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => {
				resolve(image);
			};

			image.onerror = (err) => {
				reject(err.toString());
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

	drawViewport(ctx: CanvasRenderingContext2D, cameraBounds: Boundary): void {
		const startCol = Math.floor(cameraBounds.x / FRAGMENT_W);
		const endCol = Math.floor((cameraBounds.x + cameraBounds.w) / FRAGMENT_W);

		const startRow = Math.floor(cameraBounds.y / FRAGMENT_H);
		const endRow = Math.floor((cameraBounds.y + cameraBounds.h) / FRAGMENT_H);

		const visibleMapFragments: Fragment[] = [];

		for (let r = startRow; r <= endRow; r++) {
			for (let c = startCol; c <= endCol; c++) {
				const fragment = this.fragments[r * FRAGMENT_ROWS + c];
				visibleMapFragments.push(fragment);
			}
		}

		const viewportFragments: Boundary[] = visibleMapFragments.map(
			(fragment) => {
				const lt: Point = {
					x: Math.max(fragment.x, cameraBounds.x),
					y: Math.max(fragment.y, cameraBounds.y),
				};

				const rb: Point = {
					x: Math.min(fragment.x + FRAGMENT_W, cameraBounds.x + cameraBounds.w),
					y: Math.min(fragment.y + FRAGMENT_H, cameraBounds.y + cameraBounds.h),
				};

				return { ...lt, w: rb.x - lt.x, h: rb.y - lt.y };
			}
		);

		let dx = 0;
		let dy = 0;

		for (let i = 0; i < viewportFragments.length; i++) {
			const fragment = visibleMapFragments[i];
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

			if (dx >= cameraBounds.w) {
				dx = 0;
				dy += boundary.h;
			}
		}
	}

	update(ctx: Game): void {
		this.drawViewport(ctx.backgroundContext, {
			x: ctx.camera.position.x,
			y: ctx.camera.position.y,
			w: ctx.backgroundCanvas.clientWidth,
			h: ctx.backgroundCanvas.clientHeight,
		});
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
