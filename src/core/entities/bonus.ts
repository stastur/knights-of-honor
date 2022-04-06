import { has, merge } from "@app/utils";

import type { Province } from "./province";
import type {
	AreaResource,
	ProvinceResource,
	RuralAreaType,
	TownResource,
} from "./types";

export interface Bonus {
	target: Target;
	resource: TownResource | ProvinceResource | AreaResource;
	value: number;

	for: (province: Province) => BonusResources;
}

export type BonusResource = ProvinceResource | TownResource;

type BonusResources = {
	[K in BonusResource]: number;
};

type TargetToBonus = {
	town: TownResource | ProvinceResource;
	allAreas: ProvinceResource;
} & { [K in RuralAreaType]: AreaResource };

type Target = keyof TargetToBonus;

export class ResourceBonus<T extends Target> implements Bonus {
	target: T;
	resource: TargetToBonus[T];
	value: number;

	constructor(options: {
		target: T;
		resource: TargetToBonus[T];
		value: number;
	}) {
		this.target = options.target;
		this.resource = options.resource;
		this.value = options.value;
	}

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
			books: 0,
		};
	}

	for(province: Province): BonusResources {
		let affectedAreas = 0;

		switch (this.target) {
			case "town":
				affectedAreas = 1;
				break;
			case "allAreas":
				affectedAreas = province.areas.length;
				break;
			default:
				affectedAreas = province.areas.filter(
					has({ type: this.target })
				).length;
		}

		return {
			...ResourceBonus.getInitial(),
			[this.resource]: affectedAreas * this.value,
		};
	}
}
