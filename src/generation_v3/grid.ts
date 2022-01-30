import { Point } from "./point";
import { Hex } from "./hex";

import { range } from "../utils/range";

const SQRT_3 = Math.sqrt(3);
const COS_30 = 0.5 * SQRT_3;

const getCornerOffset = (corner: number): Point => {
	const startAngle = 0.5;
	const angle = ((2 * Math.PI) / 6) * (startAngle + corner);

	return new Point(Math.cos(angle), Math.sin(angle));
};

const CORNER_OFFSETS = range(0, 6).map(getCornerOffset);

interface Options {
	/** left top corner of grid */
	origin: Point;
	/** window dimension */
	window: Point;
	/** width of hexagon */
	size: number;
}

class Grid {
	origin: Point;
	window: Point;
	size: number;

	hexagons: Hex[] = [];

	constructor(options: Options) {
		this.size = options.size / SQRT_3;
		this.origin = options.origin;

		this.window = options.window;

		const columns = Math.floor(options.window.x / options.size);
		const rows = Math.floor(options.window.y / (COS_30 * options.size));

		for (let r = 0; r < rows; r++) {
			const rOffset = r >> 1;

			for (let q = 0 - rOffset; q < columns - rOffset; q++) {
				this.hexagons.push(new Hex(q, r));
			}
		}
	}

	hexToPoint(h: Hex): Point {
		const x = h.q * SQRT_3 + 0.5 * SQRT_3 * h.r;
		const y = h.q * 0 + 0.5 * 3 * h.r;

		return new Point(x, y).multiply(this.size).add(this.origin);
	}

	// https://justinpombrio.net/programming/2020/04/28/pixel-to-hex.html
	pointToHex(pt: Point): Hex {
		const { x, y } = pt.subtract(this.origin).divide(this.size);

		// find fractional coordinates
		const fx = (-2 / 3) * x;
		const fy = (1 / 3) * x + (1 / SQRT_3) * y;
		const fz = (1 / 3) * x - (1 / SQRT_3) * y;

		// convert to int triangle coordinates
		const a = Math.floor(fx - fy);
		const b = Math.floor(fy - fz);
		const c = Math.floor(fz - fx);

		const q = Math.round((a - c) / 3);
		const r = Math.round((b - a) / 3);

		return new Hex(q, r);
	}

	getHexCorners(h: Hex): Point[] {
		const center = this.hexToPoint(h);

		return CORNER_OFFSETS.map((offset) => {
			const sizedOffset = offset.multiply(this.size);

			return new Point(center.x, center.y).add(sizedOffset);
		});
	}
}

export { Grid };
