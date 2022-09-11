import { Game } from "./game";

export interface Entity {
	render(ctx: Game): void;
	update(ctx: Game): void;
}
