const SQRT_3 = Math.sqrt(3);

export class Point {
	constructor(public x: number, public y: number) {}

	static fromHex(h: Hex): Point {
		const x = SQRT_3 * h.q + SQRT_3 * 0.5 * h.r;
		const y = 0 * h.q + 3 * 0.5 * h.r;

		return new Point(x, y);
	}
}

export class Hex {
	s: number;

	constructor(public q: number, public r: number) {
		this.s = -q - r;
	}

	add(b: Hex): Hex {
		return new Hex(this.q + b.q, this.r + b.r);
	}

	subtract(b: Hex): Hex {
		return new Hex(this.q - b.q, this.r - b.r);
	}

	scale(k: number): Hex {
		return new Hex(this.q * k, this.r * k);
	}

	rotateLeft(): Hex {
		return new Hex(-this.s, -this.q);
	}

	rotateRight(): Hex {
		return new Hex(-this.r, -this.s);
	}

	neighbor(direction: number): Hex {
		return this.add(Hex.direction(direction));
	}

	diagonalNeighbor(direction: number): Hex {
		return this.add(Hex.diagonals[direction]);
	}

	len(): number {
		return (Math.abs(this.q) + Math.abs(this.r) + Math.abs(this.s)) / 2;
	}

	distance(b: Hex): number {
		return this.subtract(b).len();
	}

	static directions: Hex[] = [
		new Hex(1, 0),
		new Hex(1, -1),
		new Hex(0, -1),
		new Hex(-1, 0),
		new Hex(-1, 1),
		new Hex(0, 1),
	];

	static direction(direction: number): Hex {
		return Hex.directions[direction];
	}

	static diagonals: Hex[] = [
		new Hex(2, -1),
		new Hex(1, -2),
		new Hex(-1, -1),
		new Hex(-2, 1),
		new Hex(-1, 2),
		new Hex(1, 1),
	];

	static fromPoint(pt: Point): Hex {
		const q = (SQRT_3 / 3) * pt.x - (1 / 3) * pt.y;
		const r = 0 * pt.x + (2 / 3) * pt.y;

		return new Hex(q, r);
	}
}

export class HexGrid {
	hexes: Hex[];

	constructor(
		public config: {
			width: number;
			height: number;
			size: number;
		},
		public origin: Point = new Point(0, 0)
	) {
		const rows = this.rows;
		const cols = this.columns;

		this.hexes = [];
		for (let r = 0; r < rows; r++) {
			const rOffset = r >> 2;

			for (let q = 0 - rOffset; q < cols - rOffset; q++) {
				this.hexes.push(new Hex(q, r));
			}
		}
	}

	orientation = {
		f0: SQRT_3,
		f1: SQRT_3 / 2,
		f2: 0,
		f3: 3 / 2,

		b0: SQRT_3 / 3,
		b1: -1 / 3,
		b2: 0,
		b3: 2 / 3,

		startAngle: 0.5,
	};

	hexToPixel(h: Hex): Point {
		const M = this.orientation;
		const size = this.config.size;
		const origin = this.origin;

		const x = (M.f0 * h.q + M.f1 * h.r) * size;
		const y = (M.f2 * h.q + M.f3 * h.r) * size;

		return new Point(x + origin.x, y + origin.y);
	}

	pixelToHex(p: Point): Hex {
		const M = this.orientation;
		const size = this.config.size;
		const origin = this.origin;

		const pt = new Point((p.x - origin.x) / size, (p.y - origin.y) / size);

		const q = M.b0 * pt.x + M.b1 * pt.y;
		const r = M.b2 * pt.x + M.b3 * pt.y;

		return new Hex(q, r);
	}

	hexCornerOffset(corner: number): Point {
		const M = this.orientation;
		const size = this.config.size;
		const angle = (2 * Math.PI * (M.startAngle - corner)) / 6;

		return new Point(size * Math.cos(angle), size * Math.sin(angle));
	}

	polygonCorners(h: Hex): Point[] {
		const corners: Point[] = [];
		const center = this.hexToPixel(h);

		for (let i = 0; i < 6; i++) {
			const offset = this.hexCornerOffset(i);
			corners.push(new Point(center.x + offset.x, center.y + offset.y));
		}

		return corners;
	}

	get rows(): number {
		const { size, height } = this.config;

		return Math.floor(height / size);
	}

	get columns(): number {
		const { size, width } = this.config;

		return Math.floor(width / size);
	}
}
