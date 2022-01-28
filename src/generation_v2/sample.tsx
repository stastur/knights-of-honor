import React from "react";
import { Path, Svg } from "../svg";
import { HexGrid } from "./hexGrid";

export class Point {
	constructor(public x: number, public y: number) {}
}

export class Hex {
	s: number;

	constructor(public q: number, public r: number) {
		this.s = -q - r;
	}

	public add(b: Hex): Hex {
		return new Hex(this.q + b.q, this.r + b.r);
	}

	public subtract(b: Hex): Hex {
		return new Hex(this.q - b.q, this.r - b.r);
	}

	public scale(k: number): Hex {
		return new Hex(this.q * k, this.r * k);
	}

	public rotateLeft(): Hex {
		return new Hex(-this.s, -this.q);
	}

	public rotateRight(): Hex {
		return new Hex(-this.r, -this.s);
	}

	public static directions: Hex[] = [
		new Hex(1, 0),
		new Hex(1, -1),
		new Hex(0, -1),
		new Hex(-1, 0),
		new Hex(-1, 1),
		new Hex(0, 1),
	];

	public static direction(direction: number): Hex {
		return Hex.directions[direction];
	}

	public neighbor(direction: number): Hex {
		return this.add(Hex.direction(direction));
	}

	public static diagonals: Hex[] = [
		new Hex(2, -1),
		new Hex(1, -2),
		new Hex(-1, -1),
		new Hex(-2, 1),
		new Hex(-1, 2),
		new Hex(1, 1),
	];

	public diagonalNeighbor(direction: number): Hex {
		return this.add(Hex.diagonals[direction]);
	}

	public len(): number {
		return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
	}

	public distance(b: Hex): number {
		return this.subtract(b).len();
	}
}

export class Orientation {
	constructor(
		public f0: number,
		public f1: number,
		public f2: number,
		public f3: number,
		public b0: number,
		public b1: number,
		public b2: number,
		public b3: number,
		public startAngle: number
	) {}
}

const SQRT_3 = Math.sqrt(3);

export class Layout {
	constructor(
		public orientation: Orientation,
		public size: Point,
		public origin: Point
	) {}

	/**
	 *        q
	 * (0,0) --- (1,0)
	 *   \         \
	 *  r \         \
	 *     \         \
	 *    (0,1) --- (1,1)
	 *
	 * |x|           | sqrt(3)  sqrt(3) / 2 |   |q|
	 * | |  = size x |                      | x | |
	 * |y|           |    0        3 / 2    |   |r|
	 */
	public static pointy: Orientation = new Orientation(
		SQRT_3,
		SQRT_3 / 2,
		0,
		3 / 2,

		SQRT_3 / 3,
		-1 / 3,
		0,
		2 / 3,
		0.5
	);

	public hexToPixel(h: Hex): Point {
		const M = this.orientation;
		const size = this.size;
		const origin = this.origin;

		const x = (M.f0 * h.q + M.f1 * h.r) * size.x;
		const y = (M.f2 * h.q + M.f3 * h.r) * size.y;

		return new Point(x + origin.x, y + origin.y);
	}

	public pixelToHex(p: Point): Hex {
		const M = this.orientation;
		const size = this.size;
		const origin = this.origin;

		const pt = new Point((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);

		const q = M.b0 * pt.x + M.b1 * pt.y;
		const r = M.b2 * pt.x + M.b3 * pt.y;

		return new Hex(q, r);
	}

	public hexCornerOffset(corner: number): Point {
		const M = this.orientation;
		const size = this.size;
		const angle: number = (2.0 * Math.PI * (M.startAngle - corner)) / 6.0;

		return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
	}

	public polygonCorners(h: Hex): Point[] {
		const corners: Point[] = [];
		const center = this.hexToPixel(h);

		for (let i = 0; i < 6; i++) {
			const offset = this.hexCornerOffset(i);
			corners.push(new Point(center.x + offset.x, center.y + offset.y));
		}

		return corners;
	}
}

export const Map = () => {
	const grid = new HexGrid({ width: 500, height: 500, size: 5 });
	console.log(grid);

	return (
		<div>
			<Svg width={100} height={100}>
				{grid.hexes.map((h, i) => {
					const corners = grid.polygonCorners(h);

					return <Path key={i} points={corners}></Path>;
				})}
			</Svg>
		</div>
	);
};
