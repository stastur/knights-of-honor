import { Bonus } from "./bonus";
import { Feature } from "./types";

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
	cost: number;

	next?: Name;
	previous?: Name;

	requiredFeatures: Feature[];
	requiredBuildings: Name[];
	bonuses: Bonus[];
}

export class Building {
	static collection = new Map<Name, Building>();

	static resolve(name: Name): Building {
		const building = Building.collection.get(name);

		if (!building) {
			throw Error(`Unknown building - ${name}`);
		}

		return building;
	}

	name!: Name;
	type!: Type;
	workers!: number;
	cost!: number;

	requiredFeatures!: Feature[];
	requiredBuildings!: Name[];

	bonuses!: Bonus[];

	next?: Name;
	previous?: Name;

	constructor(options: BuildingOptions) {
		Object.assign(this, options);

		Building.collection.set(this.name, this);
	}

	dependsOn(name: Name): boolean {
		if (this.requiredBuildings.includes(name)) {
			return true;
		}

		if (this.previous) {
			return Building.resolve(this.previous).dependsOn(name);
		}

		return false;
	}

	isUpgradeOf(name: Name): boolean {
		const building = Building.resolve(name);

		if (this.name === building.next) {
			return true;
		}

		return !!building.next && this.isUpgradeOf(building.next);
	}
}
