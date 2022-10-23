import { makeAutoObservable } from "mobx";

import { Game } from "./game";
import { newId } from "./ids";
import { Marshal } from "./marshal";
import { Province } from "./province";
import { Entity } from "./types";

const baseStats = {
	gold: 1000,
	piety: 1000,
	books: 1000,

	power: 0,
};

type Resource = keyof Pick<typeof baseStats, "books" | "gold" | "piety">;

class Kingdom implements Entity {
	id = newId();

	royalFamily = {
		king: null,
		queen: null,

		children: [],
	};

	stats = { ...baseStats };

	economy = {
		taxRate: 0,
	};

	knights = new Set<Marshal["id"]>();
	provinces = new Set<Province["id"]>();

	diplomacy = new Map<
		string,
		{
			relationship: number;
		}
	>();

	constructor(public name: string, public playerControlled: boolean) {
		makeAutoObservable(this);
	}

	update(_ctx: Game): void {}

	// Power
	increasePower = () => {
		this.stats.power = Math.min(this.stats.power + 1, 5);
	};

	decreasePower = () => {
		this.stats.power = Math.max(this.stats.power - 1, 0);
	};

	// Army and territories
	// addUnit = (unit: Unit): void => {
	// 	this.units.push(unit);
	// 	unit.kingdom = this;
	// };

	// addProvince = (province: Province): void => {
	// 	this.provinces.push(province);
	// 	province.kingdom = this;
	// };

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
