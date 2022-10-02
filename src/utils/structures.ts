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
