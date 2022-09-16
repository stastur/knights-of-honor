import { Position } from "./components";
import { PriorityQueue } from "./utils";

export function drawPath(
	ctx: CanvasRenderingContext2D,
	path: Position[]
): void {
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
}

type PositionKey = `${number}x${number}`;

function toKey(p: Position): PositionKey {
	return `${p.x}x${p.y}`;
}

function toPosition(key: PositionKey) {
	const [xString, yString] = key.split("x");

	return { x: Number(xString), y: Number(yString) };
}

function add(a: Position, b: Position) {
	return { x: a.x + b.x, y: a.y + b.y };
}

function manhattanDistance(a: Position, b: Position) {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

interface TileMap {
	tiles: number[][];
	isWalkable: (tile: number) => boolean;
}

const directions: Position[] = [
	// orthogonal
	{ x: 0, y: 1 },
	{ x: 1, y: 0 },
	{ x: -1, y: 0 },
	{ x: 0, y: -1 },
	// diagonal
	{ x: -1, y: -1 },
	{ x: 1, y: -1 },
	{ x: -1, y: 1 },
	{ x: 1, y: 1 },
];

function neighbors(tileMap: TileMap, tilePos: Position): Position[] {
	return directions
		.map((direction) => add(tilePos, direction))
		.filter((p) => {
			const tile = tileMap.tiles[p.y]?.[p.x];

			return tile !== undefined && tileMap.isWalkable(tile);
		});
}

export function findPath(
	from: Position,
	to: Position,
	tileMap: TileMap
): Position[] {
	const frontier = new PriorityQueue<{
		key: PositionKey;
		distance: number;
	}>((item) => item.distance);

	const cameFrom = new Map<PositionKey, PositionKey>(); // Map<To, From>
	const distances = new Map([[toKey(from), 0]]);

	frontier.push({ key: toKey(from), distance: 0 });

	while (frontier.length > 0) {
		const { key: current } = frontier.pop()!;

		if (current === toKey(to)) {
			break;
		}

		for (const n of neighbors(tileMap, toPosition(current))) {
			const relativeDistance =
				manhattanDistance(toPosition(current), n) % 2 === 0 ? Math.SQRT2 : 1;
			const d = distances.get(current)! + relativeDistance;
			const key = toKey(n);

			if (d < (distances.get(key) ?? Infinity)) {
				distances.set(key, d);
				cameFrom.set(key, current);

				frontier.push({
					key,
					distance: d + manhattanDistance(n, to),
				});
			}
		}
	}

	let current = toKey(to);
	const path: Position[] = [];

	while (current !== toKey(from)) {
		const next = cameFrom.get(current);

		if (!next) {
			break;
		}

		path.push(toPosition(current));
		current = next;
	}

	return path.reverse();
}
