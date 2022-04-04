export class Point {
	constructor(public x: number, public y: number) {}

	add(pt: Point): Point {
		return new Point(this.x + pt.x, this.y + pt.y);
	}

	subtract(pt: Point): Point {
		return new Point(this.x - pt.x, this.y - pt.y);
	}

	multiply(n: number): Point {
		return new Point(this.x * n, this.y * n);
	}

	divide(n: number): Point {
		return new Point(this.x / n, this.y / n);
	}
}
