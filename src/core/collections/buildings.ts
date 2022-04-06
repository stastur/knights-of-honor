import { has } from "@app/utils";

import { Building } from "../entities/building";
import { ResourceBonus } from "../entities/bonus";

export const admiralty = new Building({
	name: "admiralty",
	type: "advanced",
	workers: 1500,
	cost: 6000,
	previous: "harbour",
	next: "coastGuard",
	requiredFeatures: [],
	requiredBuildings: ["harbour"],
	bonuses: [],
});

export const armoury = new Building({
	name: "armoury",
	type: "military",
	workers: 300,
	cost: 2000,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

export const axeSmith = new Building({
	name: "axeSmith",
	type: "military",
	workers: 300,
	cost: 1000,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

export const bakery = new Building({
	name: "bakery",
	type: "advanced",
	workers: 500,
	cost: 2000,
	requiredFeatures: [],
	requiredBuildings: ["granary"],
	bonuses: [
		new ResourceBonus({ target: "farm", resource: "food", value: 1 }),
		new ResourceBonus({ target: "town", resource: "foodStorage", value: 200 }),
	],
});

export const ballistaTowers = new Building({
	name: "ballistaTowers",
	type: "military",
	workers: 1200,
	cost: 5000,
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

export const beeYard = new Building({
	name: "beeYard",
	type: "civilian",
	workers: 200,
	cost: 1000,
	requiredFeatures: ["fertileSoil"],
	requiredBuildings: [],
	bonuses: [],
});

export const bulwark = new Building({
	name: "bulwark",
	type: "military",
	workers: 3000,
	cost: 8000,
	previous: "stoneWall",
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

export const butcher = new Building({
	name: "butcher",
	type: "advanced",
	workers: 500,
	cost: 2000,
	requiredFeatures: [],
	requiredBuildings: ["saltMine", "toolSmithy", "cattleFarm"],
	bonuses: [
		new ResourceBonus({ target: "farm", resource: "food", value: 1 }),
		new ResourceBonus({ target: "town", resource: "food", value: 2 }),
		new ResourceBonus({ target: "town", resource: "foodStorage", value: 200 }),
	],
});

export const catapults = new Building({
	name: "catapults",
	type: "military",
	workers: 1000,
	cost: 8000,
	previous: "drumTowers",
	requiredFeatures: [],
	requiredBuildings: ["toolSmithy", "stoneWall", "drumTowers"],
	bonuses: [],
});

export const cathedral = new Building({
	name: "cathedral",
	type: "advanced",
	workers: 3000,
	cost: 10000,
	previous: "church",
	requiredFeatures: [],
	requiredBuildings: ["church", "waxMaker", "dyesWorkshop", "sculptorsGuild"],
	bonuses: [
		new ResourceBonus({ target: "monastery", resource: "piety", value: 3 }),
		new ResourceBonus({ target: "town", resource: "piety", value: 2 }),
	],
});

export const cattleFarm = new Building({
	name: "cattleFarm",
	type: "civilian",
	workers: 200,
	cost: 1000,
	requiredFeatures: ["pasture"],
	requiredBuildings: [],
	bonuses: [],
});

export const cauldrons = new Building({
	name: "cauldrons",
	type: "military",
	workers: 1000,
	cost: 3000,
	previous: "gateTowers",
	requiredFeatures: [],
	requiredBuildings: ["toolSmithy", "gateTowers"],
	bonuses: [],
});

export const chainMailWorkshop = new Building({
	name: "chainMailWorkshop",
	type: "military",
	workers: 300,
	cost: 2000,
	requiredFeatures: [],
	requiredBuildings: ["armoury"],
	bonuses: [],
});

export const church = new Building({
	name: "church",
	type: "civilian",
	workers: 700,
	cost: 3000,
	next: "cathedral",
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "monastery", resource: "piety", value: 1 }),
		new ResourceBonus({ target: "town", resource: "piety", value: 1 }),
	],
});

export const coastGuard = new Building({
	name: "coastGuard",
	type: "advanced",
	workers: 2000,
	cost: 5000,
	previous: "harbour",
	requiredFeatures: [],
	requiredBuildings: ["stonemason", "townWatchHouse", "harbour"],
	bonuses: [new ResourceBonus({ target: "town", resource: "gold", value: 5 })],
});

export const cornerTowers = new Building({
	name: "cornerTowers",
	type: "military",
	workers: 1200,
	cost: 8000,
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

export const docks = new Building({
	name: "docks",
	type: "advanced",
	workers: 500,
	cost: 2000,
	previous: "fishmongery",
	requiredFeatures: [],
	requiredBuildings: ["fishmongery"],
	bonuses: [
		new ResourceBonus({ target: "coastalVillage", resource: "gold", value: 1 }),
		new ResourceBonus({ target: "town", resource: "food", value: 2 }),
	],
});

export const drumTowers = new Building({
	name: "drumTowers",
	type: "military",
	workers: 1200,
	cost: 3000,
	next: "catapults",
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

export const dyesWorkshop = new Building({
	name: "dyesWorkshop",
	type: "advanced",
	workers: 500,
	cost: 2000,
	requiredFeatures: ["mineralDeposits"],
	requiredBuildings: [],
	bonuses: [],
});

export const fishmongery = new Building({
	name: "fishmongery",
	type: "advanced",
	workers: 200,
	cost: 300,
	next: "docks",
	requiredFeatures: ["fishery"],
	requiredBuildings: [],
	bonuses: [new ResourceBonus({ target: "farm", resource: "food", value: 1 })],
});

export const fletcher = new Building({
	name: "fletcher",
	type: "military",
	workers: 300,
	cost: 1000,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

export const gateTowers = new Building({
	name: "gateTowers",
	type: "military",
	workers: 1500,
	cost: 8000,
	next: "cauldrons",
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

export const granary = new Building({
	name: "granary",
	type: "civilian",
	workers: 200,
	cost: 300,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "town", resource: "foodStorage", value: 100 }),
	],
});

export const halberdMastersmithy = new Building({
	name: "halberdMastersmithy",
	type: "military",
	workers: 500,
	cost: 5000,
	previous: "spearMaker",
	requiredFeatures: [],
	requiredBuildings: ["spearMaker"],
	bonuses: [],
});

export const harbour = new Building({
	name: "harbour",
	type: "advanced",
	workers: 800,
	cost: 3000,
	previous: "docks",
	next: "admiralty",
	requiredFeatures: [],
	requiredBuildings: ["docks"],
	bonuses: [
		new ResourceBonus({ target: "coastalVillage", resource: "gold", value: 3 }),
	],
});

export const hempField = new Building({
	name: "hempField",
	type: "civilian",
	workers: 200,
	cost: 2000,
	requiredFeatures: ["fertileSoil"],
	requiredBuildings: [],
	bonuses: [],
});

export const hostel = new Building({
	name: "hostel",
	type: "civilian",
	workers: 500,
	cost: 2000,
	previous: "inn",
	requiredFeatures: [],
	requiredBuildings: ["inn"],
	bonuses: [
		new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
		new ResourceBonus({ target: "town", resource: "workers", value: 2 }),
	],
});

export const huntersHuts = new Building({
	name: "huntersHuts",
	type: "civilian",
	workers: 200,
	cost: 300,
	requiredFeatures: ["gameLand"],
	requiredBuildings: [],
	bonuses: [new ResourceBonus({ target: "town", resource: "gold", value: 1 })],
});

export const inkMaker = new Building({
	name: "inkMaker",
	type: "advanced",
	workers: 500,
	cost: 2000,
	requiredFeatures: ["mineralDeposits"],
	requiredBuildings: [],
	bonuses: [],
});

export const inn = new Building({
	name: "inn",
	type: "civilian",
	workers: 100,
	cost: 300,
	next: "hostel",
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
	],
});

export const library = new Building({
	name: "library",
	type: "advanced",
	workers: 1500,
	cost: 5000,
	next: "university",
	requiredFeatures: [],
	requiredBuildings: ["parchmentMaker"],
	bonuses: [new ResourceBonus({ target: "town", resource: "books", value: 1 })],
});

export const market = new Building({
	name: "market",
	type: "advanced",
	workers: 400,
	cost: 3000,
	next: "merchantGuild",
	requiredFeatures: [],
	requiredBuildings: ["taxCollectorsOffice"],
	bonuses: [
		new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
		new ResourceBonus({ target: "town", resource: "gold", value: 1 }),
	],
});

export const merchantGuild = new Building({
	name: "merchantGuild",
	type: "advanced",
	workers: 3000,
	cost: 10000,
	previous: "market",
	requiredFeatures: [],
	requiredBuildings: ["tailor", "winery", "market"],
	bonuses: [
		new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
		new ResourceBonus({ target: "town", resource: "gold", value: 2 }),
	],
});

export const moat = new Building({
	name: "moat",
	type: "military",
	workers: 1000,
	cost: 3000,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [],
});

export const palisade = new Building({
	name: "palisade",
	type: "military",
	workers: 600,
	cost: 4000,
	next: "stoneWall",
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [],
});

export const parchmentMaker = new Building({
	name: "parchmentMaker",
	type: "advanced",
	workers: 500,
	cost: 1000,
	requiredFeatures: [],
	requiredBuildings: ["sheepFarm"],
	bonuses: [],
});

export const pickler = new Building({
	name: "pickler",
	type: "advanced",
	workers: 500,
	cost: 1000,
	requiredFeatures: [],
	requiredBuildings: ["fishmongery", "saltMine"],
	bonuses: [
		new ResourceBonus({ target: "town", resource: "food", value: 2 }),
		new ResourceBonus({ target: "town", resource: "foodStorage", value: 50 }),
	],
});

export const plateArmourer = new Building({
	name: "plateArmourer",
	type: "military",
	workers: 500,
	cost: 5000,
	requiredFeatures: [],
	requiredBuildings: ["armoury"],
	bonuses: [],
});

export const quarry = new Building({
	name: "quarry",
	type: "civilian",
	workers: 200,
	cost: 1000,
	requiredFeatures: ["marbleDeposits"],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
	],
});

export const riggersStore = new Building({
	name: "riggersStore",
	type: "advanced",
	workers: 500,
	cost: 3000,
	requiredFeatures: [],
	requiredBuildings: ["hempField", "waxMaker", "toolSmithy"],
	bonuses: [],
});

export const saltMine = new Building({
	name: "saltMine",
	type: "civilian",
	workers: 200,
	cost: 500,
	requiredFeatures: ["brineDeposits"],
	requiredBuildings: ["toolSmithy"],
	bonuses: [],
});

export const scaleArmourer = new Building({
	name: "scaleArmourer",
	type: "military",
	workers: 500,
	cost: 3000,
	requiredFeatures: [],
	requiredBuildings: ["armoury"],
	bonuses: [],
});

export const scribesOffice = new Building({
	name: "scribesOffice",
	type: "advanced",
	workers: 800,
	cost: 3000,
	requiredFeatures: [],
	requiredBuildings: ["inkMaker", "parchmentMaker"],
	bonuses: [],
});

export const sculptorsGuild = new Building({
	name: "sculptorsGuild",
	type: "advanced",
	workers: 500,
	cost: 3000,
	requiredFeatures: [],
	requiredBuildings: ["quarry"],
	bonuses: [],
});

export const sheepFarm = new Building({
	name: "sheepFarm",
	type: "civilian",
	workers: 200,
	cost: 800,
	requiredFeatures: ["pasture"],
	requiredBuildings: [],
	bonuses: [],
});

export const siegeWorkshop = new Building({
	name: "siegeWorkshop",
	type: "military",
	workers: 200,
	cost: 500,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds", "toolSmithy"],
	bonuses: [],
});

export const silverMine = new Building({
	name: "silverMine",
	type: "civilian",
	workers: 400,
	cost: 3000,
	requiredFeatures: ["silverOre"],
	requiredBuildings: ["toolSmithy"],
	bonuses: [new ResourceBonus({ target: "town", resource: "gold", value: 5 })],
});

export const spearMaker = new Building({
	name: "spearMaker",
	type: "military",
	workers: 300,
	cost: 1000,
	next: "halberdMastersmithy",
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

export const spinningMill = new Building({
	name: "spinningMill",
	type: "advanced",
	workers: 500,
	cost: 1000,
	requiredFeatures: [],
	requiredBuildings: ["sheepFarm"],
	bonuses: [],
});

export const stable = new Building({
	name: "stable",
	type: "military",
	workers: 500,
	cost: 2000,
	requiredFeatures: [],
	requiredBuildings: ["granary"],
	bonuses: [],
});

export const stoneWall = new Building({
	name: "stoneWall",
	type: "military",
	workers: 500,
	cost: 3000,
	previous: "palisade",
	next: "bulwark",
	requiredFeatures: [],
	requiredBuildings: ["palisade"],
	bonuses: [],
});

export const stonemason = new Building({
	name: "stonemason",
	type: "advanced",
	workers: 1500,
	cost: 5000,
	requiredFeatures: [],
	requiredBuildings: ["quarry"],
	bonuses: [
		new ResourceBonus({ target: "town", resource: "workers", value: 1 }),
	],
});

export const stud = new Building({
	name: "stud",
	type: "civilian",
	workers: 200,
	cost: 1000,
	requiredFeatures: ["pasture"],
	requiredBuildings: [],
	bonuses: [],
});

export const swordMastersmithy = new Building({
	name: "swordMastersmithy",
	type: "military",
	workers: 500,
	cost: 5000,
	previous: "swordsmith",
	requiredFeatures: [],
	requiredBuildings: ["swordsmith"],
	bonuses: [],
});

export const swordsmith = new Building({
	name: "swordsmith",
	type: "military",
	workers: 300,
	cost: 1000,
	next: "swordMastersmithy",
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

export const tailor = new Building({
	name: "tailor",
	type: "advanced",
	workers: 500,
	cost: 3000,
	requiredFeatures: [],
	requiredBuildings: ["weavingMill", "dyesWorkshop"],
	bonuses: [],
});

export const tannery = new Building({
	name: "tannery",
	type: "advanced",
	workers: 500,
	cost: 2000,
	requiredFeatures: [],
	requiredBuildings: ["cattleFarm", "toolSmithy"],
	bonuses: [],
});

export const taxCollectorsOffice = new Building({
	name: "taxCollectorsOffice",
	type: "civilian",
	workers: 200,
	cost: 800,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
	],
});

export const toolSmithy = new Building({
	name: "toolSmithy",
	type: "civilian",
	workers: 200,
	cost: 500,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "town", resource: "workers", value: 1 }),
	],
});

export const townWatchHouse = new Building({
	name: "townWatchHouse",
	type: "military",
	workers: 100,
	cost: 300,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [],
});

export const trainingGrounds = new Building({
	name: "trainingGrounds",
	type: "military",
	workers: 200,
	cost: 500,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [],
});

export const university = new Building({
	name: "university",
	type: "advanced",
	workers: 2000,
	cost: 10000,
	previous: "library",
	requiredFeatures: [],
	requiredBuildings: ["library", "scribesOffice"],
	bonuses: [
		new ResourceBonus({ target: "allAreas", resource: "books", value: 3 }),
		new ResourceBonus({ target: "town", resource: "books", value: 3 }),
	],
});

export const vineyard = new Building({
	name: "vineyard",
	type: "civilian",
	workers: 200,
	cost: 2000,
	requiredFeatures: ["fertileSoil"],
	requiredBuildings: [],
	bonuses: [new ResourceBonus({ target: "farm", resource: "food", value: 1 })],
});

export const waxMaker = new Building({
	name: "waxMaker",
	type: "advanced",
	workers: 500,
	cost: 2000,
	requiredFeatures: [],
	requiredBuildings: ["beeYard"],
	bonuses: [],
});

export const weavingMill = new Building({
	name: "weavingMill",
	type: "advanced",
	workers: 500,
	cost: 3000,
	requiredFeatures: [],
	requiredBuildings: ["hempField", "toolSmithy"],
	bonuses: [],
});

export const winery = new Building({
	name: "winery",
	type: "advanced",
	workers: 500,
	cost: 3000,
	requiredFeatures: [],
	requiredBuildings: ["vineyard"],
	bonuses: [],
});

export const allBuildings = Array.from(Building.collection.values());

export const mainBuildings = allBuildings.filter(has({ previous: undefined }));

export const baseBuildings = [
	taxCollectorsOffice,
	toolSmithy,
	trainingGrounds,
	inn,
	palisade,
	townWatchHouse,
];
