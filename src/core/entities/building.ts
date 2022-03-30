import { Bonus } from "./bonus";
import { Feature } from "./shared";

import { buildings } from "../collections/buildings";

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

	requiredFeatures: Feature[];
	requiredBuildings: Name[];
	bonuses: Bonus[];
}

export class Building {
	name: Name;
	type: Type;
	workers: number;

	requiredFeatures: Feature[];
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

	static resolve(name: Name): Building {
		return buildings[name];
	}
}
