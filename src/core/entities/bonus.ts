import { Province } from "./province";
import { Resource, RuralAreaType } from "./shared";

import { has, merge } from "../../utils";

export type BonusResources = {
	[K in BonusResource]: number;
};

export interface Bonus {
	for: (province: Province) => BonusResources;
}

type TownSpecificBonus = "foodStorage" | "population" | "happiness";
type BonusResource = TownSpecificBonus | Resource;

type Target = "town" | "allAreas" | RuralAreaType;

export class ResourceBonus<T extends Target> implements Bonus {
	constructor(
		private options: {
			target: T;
			resource: T extends "town" ? BonusResource : Resource;
			value: number;
		}
	) {}

	static combine(...resourceCollection: BonusResources[]): BonusResources {
		return resourceCollection.reduce(merge, ResourceBonus.getInitial());
	}

	static getInitial(): BonusResources {
		return {
			foodStorage: 0,
			population: 0,
			happiness: 0,
			food: 0,
			gold: 0,
			piety: 0,
			workers: 0,
		};
	}

	for(province: Province): BonusResources {
		let affectedAreas = 0;

		switch (this.options.target) {
			case "town":
				affectedAreas = 1;
				break;
			case "allAreas":
				affectedAreas = province.areas.length;
				break;
			default: // rural areas
				affectedAreas = province.areas.filter(
					has({ type: this.options.target })
				).length;
		}

		return {
			...ResourceBonus.getInitial(),
			[this.options.resource]: affectedAreas * this.options.value,
		};
	}
}
