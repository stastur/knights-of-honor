import { range } from "./../utils/range";
class Point {
	constructor(public x: number, public y: number) {}
}

class Hex {
	constructor(public q: number, public r: number) {}
}

const SQRT_3 = Math.sqrt(3);

const getCornerOffset = (corner: number): Point => {
	const startAngle = 0.5;
	const angle = ((2 * Math.PI) / 6) * (startAngle + corner);

	return new Point(Math.cos(angle), Math.sin(angle));
};

const CORNER_OFFSETS = range(0, 6).map(getCornerOffset);

class Grid {
	rows = 20;
	columns = 50;

	hexagons: Hex[] = [];

	constructor() {
		for (let r = 0; r < this.rows; r++) {
			const rOffset = r >> 1;

			for (let q = 0 - rOffset; q < this.columns - rOffset; q++) {
				this.hexagons.push(new Hex(q, r));
			}
		}
	}

	hexToPoint(h: Hex): Point {
		const x = h.q * SQRT_3 + 0.5 * SQRT_3 * h.r;
		const y = h.q * 0 + 0.5 * 3 * h.r;

		return new Point(x, y);
	}

	// https://justinpombrio.net/programming/2020/04/28/pixel-to-hex.html
	pointToHex({ x, y }: Point): Hex {
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

	getCornerOffset(corner: number): Point {
		const startAngle = 0.5;
		const angle = ((2 * Math.PI) / 6) * (startAngle + corner);

		return new Point(Math.cos(angle), Math.sin(angle));
	}

	getHexCorners(h: Hex): Point[] {
		const center = this.hexToPoint(h);

		return CORNER_OFFSETS.map(
			({ x: dx, y: dy }) => new Point(center.x + dx, center.y + dy)
		);
	}
}

export { Grid };
