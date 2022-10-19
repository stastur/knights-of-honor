import { Point } from "@app/utils/geometry";

import { Area } from "./area";
import { Game } from "./game";
import { newId } from "./ids";
import { Kingdom } from "./kingdom";
import { Town } from "./town";
import { Entity } from "./types";

class Province implements Entity {
	id = newId();
	// TODO: should be a parameter
	name = "province";

	kingdom?: Kingdom;

	areas: Area[] = [];

	constructor(public town: Town, public border: Point[]) {
		town.province = this;
	}

	update(_ctx: Game): void {}

	addArea(area: Area) {
		this.areas.push(area);
		area.province = this;
	}
}

export { Province };
