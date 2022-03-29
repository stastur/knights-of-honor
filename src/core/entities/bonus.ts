import { Province } from "./province";
import { RuralArea } from "./rural-area";
import { Resource } from "./shared";

import { has } from "../../utils";

type Type = "town" | "ruralArea";

type TownSpecificBonus = "foodStorage" | "population" | "happiness";
type BonusResource = TownSpecificBonus | Resource;

type AreaType = RuralArea["type"] | "all";

export type BonusResources = {
	[K in BonusResource]: number;
};

export interface Bonus {
	type: Type;

	for: (province: Province) => BonusResources;
}

export const initialBonusResources: BonusResources = {
	foodStorage: 0,
	population: 0,
	happiness: 0,
	food: 0,
	gold: 0,
	piety: 0,
	workers: 0,
};

export class TownBonus implements Bonus {
	type: Type = "town";

	constructor(
		private options: {
			resource: BonusResource;
			value: number;
		}
	) {}

	for(_province: Province): BonusResources {
		return {
			...initialBonusResources,
			[this.options.resource]: this.options.value,
		};
	}
}

export class AreaBonus implements Bonus {
	type: Type = "ruralArea";

	constructor(
		private options: {
			target: AreaType;
			resource: Resource;
			value: number;
		}
	) {}

	for(province: Province): BonusResources {
		const affectedAreas =
			this.options.target === "all"
				? province.areas
				: province.areas.filter(has({ type: this.options.target }));

		return {
			...initialBonusResources,
			[this.options.resource]: affectedAreas.length * this.options.value,
		};
	}
}
