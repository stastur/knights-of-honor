import { Position, Movement } from "./components";

export function angle(from: Position, to: Position): number {
	return Math.atan2(to.y - from.y, to.x - from.x);
}

export function reposition(
	object: { position: Position; movement: Movement },
	to: Position
): void {
	object.position = { ...to };
}

export function distance(from: Position, to: Position): number {
	return Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
}

export function move(
	object: { position: Position; movement: Movement },
	to: Position,
	elapsed = 1000
): void {
	const { position, movement } = object;
	const t = elapsed / 1000;
	const d = movement.speed * t;

	const isNearby = distance(position, to) <= d;

	if (isNearby) {
		reposition(object, to);
		movement.state = "idle";

		return;
	}

	movement.angle = angle(position, to);
	movement.state = "moving";

	position.x += Math.cos(movement.angle) * d;
	position.y += Math.sin(movement.angle) * d;

	return;
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;

	const scale = window.devicePixelRatio;

	canvas.height = height * scale;
	canvas.width = width * scale;

	canvas.style.height = height + "px";
	canvas.style.width = width + "px";

	ctx.scale(scale, scale);

	return canvas;
}

export function positionToTile(p: Position, size: number): Position {
	return {
		x: (p.x / size) | 0,
		y: (p.y / size) | 0,
	};
}

export function tileToPosition(t: Position, size: number): Position {
	return {
		x: (t.x + 0.5) * size,
		y: (t.y + 0.5) * size,
	};
}

export function setStyles(
	element: HTMLElement,
	styles: Partial<CSSStyleDeclaration>
): void {
	Object.assign(element.style, styles);
}

/** @description Min array-based binary heap */
export class PriorityQueue<T> {
	data: T[] = [];

	constructor(public priority: (item: T) => number) {}

	#parent(pos: number): number {
		return (pos - 1) >> 1;
	}

	#left(pos: number): number {
		return 2 * pos + 1;
	}

	#right(pos: number): number {
		return this.#left(pos) + 1;
	}

	#at(pos: number): T {
		return this.data[pos];
	}

	#down(pos: number): void {
		let min = pos;
		const l = this.#left(pos);
		const r = this.#right(pos);

		if (l < this.length && this.#priorityAt(l) < this.#priorityAt(min)) {
			min = l;
		}

		if (r < this.length && this.#priorityAt(r) < this.#priorityAt(min)) {
			min = r;
		}

		if (this.#priorityAt(min) >= this.#priorityAt(pos)) {
			return;
		}

		this.#swap(pos, min);
		this.#down(min);
	}

	#swap(pos1: number, pos2: number): void {
		const temp = this.#at(pos1);
		this.data[pos1] = this.#at(pos2);
		this.data[pos2] = temp;
	}

	#up(pos: number): void {
		if (pos > 0) {
			const parent = this.#parent(pos);

			if (this.#priorityAt(parent) >= this.#priorityAt(pos)) {
				this.#swap(pos, parent);
				this.#up(parent);
			}
		}
	}

	#priorityAt(pos: number): number {
		return this.priority(this.#at(pos));
	}

	push = (item: T): void => {
		const length = this.data.push(item);
		this.#up(length - 1);
	};

	pop = (): T | undefined => {
		this.#swap(0, this.length - 1);
		const min = this.data.pop();

		if (this.length > 0) {
			this.#down(0);
		}

		return min;
	};

	get length(): number {
		return this.data.length;
	}
}
