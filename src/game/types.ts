import {
	GlobalResource,
	LocalResource,
	BuildingId,
	ProvinceFeature,
	Product,
} from "./enums";

export enum AdditionalBonus {
	FoodStorage = "foodStorage",
	Population = "population",
	Happiness = "happiness",
}

export interface Bonus {
	id: GlobalResource | LocalResource | AdditionalBonus;

	value: number;
}

export interface Resource {
	amount: number;
	limit: number;
	restoration: number;
}

export interface Building {
	id: BuildingId;

	cost: number;
	workers: number;

	requirements: Array<ProvinceFeature | BuildingId>;

	bonuses: Bonus[];
	products: Product[];
}

export enum BuildingStatus {
	UnderConstruction = "underConstruction",
	ConstructionFinished = "constructionFinished",
}

export interface Province {
	id: string;

	baseProduction: Record<GlobalResource | LocalResource, number>;

	population: {
		limit: number;
		value: number;
		growthRate: number;
	};

	foodStorage: {
		limit: number;
		value: number;
	};

	happiness: number;

	features: ProvinceFeature[];

	buildings: Array<{
		status: BuildingStatus;
		progress?: number;

		building: Building;
	}>;
}

export interface Country {
	id: string;

	provinces: string[];
}
