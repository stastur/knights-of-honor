import { Position } from "./components";

export const drawPath = (
	ctx: CanvasRenderingContext2D,
	path: Position[]
): void => {
	const goal = path.at(-1);

	ctx.fillStyle = ctx.strokeStyle = "red";

	ctx.beginPath();
	path.forEach(({ x, y }) => {
		ctx.lineTo(x, y);
	});
	ctx.stroke();

	ctx.beginPath();
	goal && ctx.arc(goal.x, goal.y, 10, 0, Math.PI * 2);
	ctx.fill();
};

const directions = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
];

type PositionKey = `${number}x${number}`;

const positionToKey = (p: Position): PositionKey => `${p.x}x${p.y}`;

const keyToPosition = (key: PositionKey) => {
	const [xString, yString] = key.split("x");

	return { x: Number(xString), y: Number(yString) };
};

/** @todo change algorithm to Dijkstra or A* */
export const findPath = (
	from: Position,
	to: Position,
	tileMap: {
		tiles: number[][];
		isWalkable: (tile: number) => boolean;
	}
): Position[] => {
	const { tiles, isWalkable } = tileMap;

	const _from = positionToKey(from);
	const _to = positionToKey(to);

	const getNeighbors = ({ x: tileX, y: tileY }: Position): Position[] => {
		const neighbors = directions
			.map(([dx, dy]) => ({ x: tileX + dx, y: tileY + dy }))
			.filter((p) => {
				const tile = tiles[p.y]?.[p.x];

				return tile !== undefined && isWalkable(tile);
			});

		(tileX + tileY) % 2 && neighbors.reverse();

		return neighbors;
	};

	const frontier: PositionKey[] = [_from];
	const cameFrom = new Map<PositionKey, PositionKey>();

	while (frontier.length > 0) {
		const p = frontier.shift()!;

		if (p === _to) {
			break;
		}

		for (const n of getNeighbors(keyToPosition(p))) {
			const _n = positionToKey(n);

			if (!cameFrom.has(_n)) {
				frontier.push(_n);
				cameFrom.set(_n, p);
			}
		}
	}

	let current = _to;
	const path: Position[] = [];

	while (positionToKey(from) !== current) {
		const next = cameFrom.get(current);

		if (!next) {
			break;
		}

		path.push(keyToPosition(current));
		current = next;
	}

	return path.reverse();
};
