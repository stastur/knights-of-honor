import { Game } from "./game";
import { newId } from "./ids";
import { Province } from "./province";
import { Entity } from "./types";
import { Unit } from "./unit";

type Resource = "gold" | "piety" | "books";

class Kingdom implements Entity {
	id = newId();

	units: Unit[] = [];
	provinces: Province[] = [];

	baseStats = {
		gold: 1000,
		piety: 1000,
		books: 1000,
		power: 0,
	};

	stats = {
		...this.baseStats,
	};

	constructor(public playerControlled: boolean) {}

	update(_ctx: Game): void {}

	// Army and territories
	addUnit = (unit: Unit): void => {
		this.units.push(unit);
		unit.kingdom = this;
	};

	addProvince = (province: Province): void => {
		this.provinces.push(province);
		province.kingdom = this;
	};

	// Resources
	spend(resource: Resource, value: number): void {
		if (!this.has(resource, value)) {
			console.warn(`not enough ${resource}`);
			return;
		}

		this.stats[resource] -= value;
	}

	refill(resource: Resource, value: number): void {
		this.stats[resource] += value;
	}

	has(resource: Resource, value: number): boolean {
		return this.stats[resource] >= value;
	}
}

export { Kingdom };
