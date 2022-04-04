class Point {
	constructor(public x: number, public y: number) {}
}

class Hex {
	constructor(public q: number, public r: number) {}
}

class Grid {
	rows = 100;
	columns = 100;

	constructor() {
		const grid: Hex[] = [];

		for (let r = 0; r < this.rows; r++) {
			const rOffset = r >> 2;

			for (let q = 0 - rOffset; q < this.columns - rOffset; q++) {
				grid.push(new Hex(q, r));
			}
		}
	}
}

export { Grid };
