import { Game } from "./game";

export interface Entity {
	update(ctx: Game): void;
}
