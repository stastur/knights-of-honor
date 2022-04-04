import * as buildings from "../../core/buildings";
import { ProvinceFeature } from "../../core/enums";
import { BuildingStatus, Province } from "../../core/types";

export const Brest: Province = {
	id: "brest",

	buildings: [
		{
			status: BuildingStatus.ConstructionFinished,
			building: buildings.taxCollectorsOffice,
		},
		{
			status: BuildingStatus.ConstructionFinished,
			building: buildings.townWatchHouse,
		},
	],

	features: [ProvinceFeature.Fishery],

	baseProduction: {
		gold: 4,
		workers: 3,
		food: 2,
		piety: 0,
		books: 0,
	},

	population: {
	
		value: 100,
		limit: 100,
		growthRate: 0.05,
	},

	foodStorage: {
		value: 100,
		limit: 100,
	},

	happiness: 3,
};
