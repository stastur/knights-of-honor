import { Components } from "./components";
import { Game } from "./game";

export type Entity<C extends keyof Components = never> = Pick<Components, C> & {
	init?(ctx: Game): void;
	update(ctx: Game): void;
};
