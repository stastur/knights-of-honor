import { Bonus, BonusResources, initialBonusResources } from "./bonus";
import { Province } from "./province";

import { has, merge } from "../../utils";

type Type = "military" | "civilian" | "advanced";

type Name =
	| "admiralty"
	| "armoury"
	| "axeSmith"
	| "bakery"
	| "ballistaTowers"
	| "beeYard"
	| "bulwark"
	| "butcher"
	| "catapults"
	| "cathedral"
	| "cattleFarm"
	| "cauldrons"
	| "chainMailWorkshop"
	| "church"
	| "coastGuard"
	| "cornerTowers"
	| "docks"
	| "drumTowers"
	| "dyesWorkshop"
	| "fishmongery"
	| "fletcher"
	| "gateTowers"
	| "granary"
	| "halberdMastersmithy"
	| "harbour"
	| "hempField"
	| "hostel"
	| "huntersHuts"
	| "inkMaker"
	| "inn"
	| "library"
	| "market"
	| "merchantGuild"
	| "moat"
	| "palisade"
	| "parchmentMaker"
	| "pickler"
	| "plateArmourer"
	| "quarry"
	| "riggersStore"
	| "saltMine"
	| "scaleArmourer"
	| "scribesOffice"
	| "sculptorsGuild"
	| "sheepFarm"
	| "siegeWorkshop"
	| "silverMine"
	| "spearMaker"
	| "spinningMill"
	| "stable"
	| "stoneWall"
	| "stonemason"
	| "stud"
	| "swordMastersmithy"
	| "swordsmith"
	| "tailor"
	| "tannery"
	| "taxCollectorsOffice"
	| "toolSmithy"
	| "townWatchHouse"
	| "trainingGrounds"
	| "university"
	| "vineyard"
	| "waxMaker"
	| "weavingMill"
	| "winery";

interface BuildingOptions {
	name: Name;
	type: Type;
	workers: number;

	requiredFeatures: Province["features"];
	requiredBuildings: Name[];
	bonuses: Bonus[];
}

export class Building {
	name: Name;
	type: Type;
	workers: number;

	requiredFeatures: Province["features"];
	requiredBuildings: Name[];

	bonuses: Bonus[];

	constructor({
		name,
		type,
		requiredFeatures,
		requiredBuildings,
		bonuses,
		workers,
	}: BuildingOptions) {
		this.name = name;
		this.type = type;
		this.bonuses = bonuses;
		this.workers = workers;
		this.requiredFeatures = requiredFeatures;
		this.requiredBuildings = requiredBuildings;
	}

	checkRequirements(province: Province): boolean {
		if (province.buildings.includes(this)) {
			return false;
		}

		const hasBuildings = this.requiredBuildings.every((name) =>
			province.buildings.find(has({ name }))
		);

		const hasFeatures = this.requiredFeatures.every((f) =>
			province.features.includes(f)
		);

		return hasBuildings && hasFeatures;
	}

	combineBonuses(province: Province): BonusResources {
		return this.bonuses.reduce(
			(combined, bonus) => merge(combined, bonus.for(province)),
			initialBonusResources
		);
	}
}
