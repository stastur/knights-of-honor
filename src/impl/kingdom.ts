import { Game } from "./game";
import { Province } from "./province";
import { Entity } from "./types";
import { Unit } from "./unit";

class Kingdom implements Entity {
	units: Unit[] = [];
	provinces: Province[] = [];

	constructor(public playerControlled: boolean) {}

	init(_ctx: Game): void {}

	update(_ctx: Game): void {}
}

export { Kingdom };
