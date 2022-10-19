// import { Bonus } from "./bonus";

export type Type = "military" | "civilian" | "advanced";

type Feature =
	| "pasture"
	| "fishery"
	| "gameLand"
	| "silverOre"
	| "fertileSoil"
	| "marbleDeposits"
	| "mineralDeposits"
	| "brineDeposits";

export type Name =
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

export interface Building {
	name: Name;
	type: Type;
	workers: number;
	cost: number;

	next?: Name;
	previous?: Name;

	requiredFeatures: Feature[];
	requiredBuildings: Name[];
}
