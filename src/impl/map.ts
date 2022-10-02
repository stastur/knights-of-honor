import { Position } from "./components";
import { Game } from "./game";
import { Boundary, Entity, TileMap } from "./types";

const SEGMENT_W = 3840;
const SEGMENT_H = 3200;

const SEGMENT_ROWS = 10;
const SEGMENT_COLUMNS = 10;

const worldSegments = new Array(SEGMENT_COLUMNS * SEGMENT_ROWS).fill(
	"images/map/0-3.png"
);

interface Segment {
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

	segments: Segment[] = [];
	tiles: number[][] = [];

	constructor() {
		for (let i = 0; i < this.rows; i++) {
			this.tiles.push(new Array(this.cols).fill(0));
		}
	}

	isWalkable(_r: number, _c: number): boolean {
		// TODO: Introduce collision layer
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
		this.segments = await Promise.all(
			worldSegments.map(async (src, i) => {
				const image = await this.loadImage(src);

				return {
					image,
					x: SEGMENT_W * (i % SEGMENT_COLUMNS),
					y: SEGMENT_H * Math.floor(i / SEGMENT_ROWS),
				};
			})
		);
	}

	drawViewport(ctx: CanvasRenderingContext2D, cameraBounds: Boundary): void {
		const startCol = Math.floor(cameraBounds.x / SEGMENT_W);
		const endCol = Math.floor((cameraBounds.x + cameraBounds.w) / SEGMENT_W);

		const startRow = Math.floor(cameraBounds.y / SEGMENT_H);
		const endRow = Math.floor((cameraBounds.y + cameraBounds.h) / SEGMENT_H);

		const visibleSegments: Segment[] = [];

		for (let r = startRow; r <= endRow; r++) {
			for (let c = startCol; c <= endCol; c++) {
				const segment = this.segments[r * SEGMENT_ROWS + c];
				visibleSegments.push(segment);
			}
		}

		const viewportFragments: Boundary[] = visibleSegments.map((segment) => {
			const lt: Position = {
				x: Math.max(segment.x, cameraBounds.x),
				y: Math.max(segment.y, cameraBounds.y),
			};

			const rb: Position = {
				x: Math.min(segment.x + SEGMENT_W, cameraBounds.x + cameraBounds.w),
				y: Math.min(segment.y + SEGMENT_H, cameraBounds.y + cameraBounds.h),
			};

			return { ...lt, w: rb.x - lt.x, h: rb.y - lt.y };
		});

		let dx = 0;
		let dy = 0;

		for (let i = 0; i < viewportFragments.length; i++) {
			const fragment = visibleSegments[i];
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
}
