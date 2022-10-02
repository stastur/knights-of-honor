export interface Point {
	x: number;
	y: number;
}

export interface Boundary {
	x: number;
	y: number;
	w: number;
	h: number;
}

export function add(a: Point, b: Point): Point {
	return { x: a.x + b.x, y: a.y + b.y };
}

export function subtract(a: Point, b: Point): Point {
	return { x: a.x - b.x, y: a.y - b.y };
}

export function angle(from: Point, to: Point): number {
	return Math.atan2(to.y - from.y, to.x - from.x);
}

export function distance(from: Point, to: Point): number {
	return Math.hypot(to.x - from.x, to.y - from.y);
}

export function isInBounds(pos: Point, boundary: Boundary): boolean {
	const lt = { x: boundary.x, y: boundary.y };
	const rb = add(lt, { x: boundary.w, y: boundary.h });

	return pos.x >= lt.x && pos.x <= rb.x && pos.y >= lt.y && pos.y <= rb.y;
}

export function simplifyPath(path: Point[]): Point[] {
	const simplified = [path[0]];

	let prevPoint = simplified[0];
	let prevAngle: number | undefined;

	for (const point of path.slice(1)) {
		const curAngle = angle(prevPoint, point);

		if (curAngle === prevAngle) {
			simplified.pop();
		}

		prevAngle = curAngle;
		prevPoint = point;

		simplified.push(point);
	}

	return simplified;
}
