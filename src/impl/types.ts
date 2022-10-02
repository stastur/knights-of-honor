import { Components, Tags } from "./components";
import { Game } from "./game";

export type Entity<C extends keyof Components = never> = Pick<Components, C> &
	Tags & {
		init?(ctx: Game): void;
		update(ctx: Game): void;
	};

export interface Boundary {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface TileMap {
	size: number;
	rows: number;
	cols: number;

	width: number;
	height: number;

	tiles: number[][];

	isWalkable: (row: number, col: number) => boolean;
}

export interface Size {
	w: number;
	h: number;
}
