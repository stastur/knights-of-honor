import { Building } from "./building";

export const buildings: Record<Building["name"], Building> = {
	admiralty: {
		name: "admiralty",
		type: "advanced",
		workers: 1500,
		cost: 6000,
		previous: "harbour",
		next: "coastGuard",
		requiredFeatures: [],
		requiredBuildings: ["harbour"],
		//bonuses: [],
	},

	armoury: {
		name: "armoury",
		type: "military",
		workers: 300,
		cost: 2000,
		requiredFeatures: [],
		requiredBuildings: ["trainingGrounds"],
		//bonuses: [],
	},

	axeSmith: {
		name: "axeSmith",
		type: "military",
		workers: 300,
		cost: 1000,
		requiredFeatures: [],
		requiredBuildings: ["trainingGrounds"],
		//bonuses: [],
	},

	bakery: {
		name: "bakery",
		type: "advanced",
		workers: 500,
		cost: 2000,
		requiredFeatures: [],
		requiredBuildings: ["granary"],
		//bonuses: [
		// 	new ResourceBonus({ target: "farm", resource: "food", value: 1 }),
		// 	new ResourceBonus({ target: "town", resource: "foodStorage", value: 200 }),
		// ],
	},

	ballistaTowers: {
		name: "ballistaTowers",
		type: "military",
		workers: 1200,
		cost: 5000,
		requiredFeatures: [],
		requiredBuildings: ["stoneWall"],
		//bonuses: [],
	},

	beeYard: {
		name: "beeYard",
		type: "civilian",
		workers: 200,
		cost: 1000,
		requiredFeatures: ["fertileSoil"],
		requiredBuildings: [],
		//bonuses: [],
	},

	bulwark: {
		name: "bulwark",
		type: "military",
		workers: 3000,
		cost: 8000,
		previous: "stoneWall",
		requiredFeatures: [],
		requiredBuildings: ["stoneWall"],
		//bonuses: [],
	},

	butcher: {
		name: "butcher",
		type: "advanced",
		workers: 500,
		cost: 2000,
		requiredFeatures: [],
		requiredBuildings: ["saltMine", "toolSmithy", "cattleFarm"],
		//bonuses: [
		// 	new ResourceBonus({ target: "farm", resource: "food", value: 1 }),
		// 	new ResourceBonus({ target: "town", resource: "food", value: 2 }),
		// 	new ResourceBonus({ target: "town", resource: "foodStorage", value: 200 }),
		// ],
	},

	catapults: {
		name: "catapults",
		type: "military",
		workers: 1000,
		cost: 8000,
		previous: "drumTowers",
		requiredFeatures: [],
		requiredBuildings: ["toolSmithy", "stoneWall", "drumTowers"],
		//bonuses: [],
	},

	cathedral: {
		name: "cathedral",
		type: "advanced",
		workers: 3000,
		cost: 10000,
		previous: "church",
		requiredFeatures: [],
		requiredBuildings: ["church", "waxMaker", "dyesWorkshop", "sculptorsGuild"],
		//bonuses: [
		// 	new ResourceBonus({ target: "monastery", resource: "piety", value: 3 }),
		// 	new ResourceBonus({ target: "town", resource: "piety", value: 2 }),
		// ],
	},

	cattleFarm: {
		name: "cattleFarm",
		type: "civilian",
		workers: 200,
		cost: 1000,
		requiredFeatures: ["pasture"],
		requiredBuildings: [],
		//bonuses: [],
	},

	cauldrons: {
		name: "cauldrons",
		type: "military",
		workers: 1000,
		cost: 3000,
		previous: "gateTowers",
		requiredFeatures: [],
		requiredBuildings: ["toolSmithy", "gateTowers"],
		//bonuses: [],
	},

	chainMailWorkshop: {
		name: "chainMailWorkshop",
		type: "military",
		workers: 300,
		cost: 2000,
		requiredFeatures: [],
		requiredBuildings: ["armoury"],
		//bonuses: [],
	},

	church: {
		name: "church",
		type: "civilian",
		workers: 700,
		cost: 3000,
		next: "cathedral",
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [
		//new ResourceBonus({ target: "monastery", resource: "piety", value: 1 }),
		//new ResourceBonus({ target: "town", resource: "piety", value: 1 }),
		//	],
	},

	coastGuard: {
		name: "coastGuard",
		type: "advanced",
		workers: 2000,
		cost: 5000,
		previous: "harbour",
		requiredFeatures: [],
		requiredBuildings: ["stonemason", "townWatchHouse", "harbour"],
		//bonuses: [//new ResourceBonus({ target: "town", resource: "gold", value: 5 })],
	},

	cornerTowers: {
		name: "cornerTowers",
		type: "military",
		workers: 1200,
		cost: 8000,
		requiredFeatures: [],
		requiredBuildings: ["stoneWall"],
		//bonuses: [],
	},

	docks: {
		name: "docks",
		type: "advanced",
		workers: 500,
		cost: 2000,
		previous: "fishmongery",
		requiredFeatures: [],
		requiredBuildings: ["fishmongery"],
		//bonuses: [
		//new ResourceBonus({ target: "coastalVillage", resource: "gold", value: 1 }),
		//new ResourceBonus({ target: "town", resource: "food", value: 2 }),
		//	],
	},

	drumTowers: {
		name: "drumTowers",
		type: "military",
		workers: 1200,
		cost: 3000,
		next: "catapults",
		requiredFeatures: [],
		requiredBuildings: ["stoneWall"],
		//bonuses: [],
	},

	dyesWorkshop: {
		name: "dyesWorkshop",
		type: "advanced",
		workers: 500,
		cost: 2000,
		requiredFeatures: ["mineralDeposits"],
		requiredBuildings: [],
		//bonuses: [],
	},

	fishmongery: {
		name: "fishmongery",
		type: "advanced",
		workers: 200,
		cost: 300,
		next: "docks",
		requiredFeatures: ["fishery"],
		requiredBuildings: [],
		//bonuses: [//new ResourceBonus({ target: "farm", resource: "food", value: 1 })],
	},

	fletcher: {
		name: "fletcher",
		type: "military",
		workers: 300,
		cost: 1000,
		requiredFeatures: [],
		requiredBuildings: ["trainingGrounds"],
		//bonuses: [],
	},

	gateTowers: {
		name: "gateTowers",
		type: "military",
		workers: 1500,
		cost: 8000,
		next: "cauldrons",
		requiredFeatures: [],
		requiredBuildings: ["stoneWall"],
		//bonuses: [],
	},

	granary: {
		name: "granary",
		type: "civilian",
		workers: 200,
		cost: 300,
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [
		//new ResourceBonus({ target: "town", resource: "foodStorage", value: 100 }),
		//	],
	},

	halberdMastersmithy: {
		name: "halberdMastersmithy",
		type: "military",
		workers: 500,
		cost: 5000,
		previous: "spearMaker",
		requiredFeatures: [],
		requiredBuildings: ["spearMaker"],
		//bonuses: [],
	},

	harbour: {
		name: "harbour",
		type: "advanced",
		workers: 800,
		cost: 3000,
		next: "admiralty",
		requiredFeatures: [],
		requiredBuildings: ["docks"],
		//bonuses: [
		//new ResourceBonus({ target: "coastalVillage", resource: "gold", value: 3 }),
		//	],
	},

	hempField: {
		name: "hempField",
		type: "civilian",
		workers: 200,
		cost: 2000,
		requiredFeatures: ["fertileSoil"],
		requiredBuildings: [],
		//bonuses: [],
	},

	hostel: {
		name: "hostel",
		type: "civilian",
		workers: 500,
		cost: 2000,
		previous: "inn",
		requiredFeatures: [],
		requiredBuildings: ["inn"],
		//bonuses: [
		//new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
		//new ResourceBonus({ target: "town", resource: "workers", value: 2 }),
		//	],
	},

	huntersHuts: {
		name: "huntersHuts",
		type: "civilian",
		workers: 200,
		cost: 300,
		requiredFeatures: ["gameLand"],
		requiredBuildings: [],
		//bonuses: [//new ResourceBonus({ target: "town", resource: "gold", value: 1 })],
	},

	inkMaker: {
		name: "inkMaker",
		type: "advanced",
		workers: 500,
		cost: 2000,
		requiredFeatures: ["mineralDeposits"],
		requiredBuildings: [],
		//bonuses: [],
	},

	inn: {
		name: "inn",
		type: "civilian",
		workers: 100,
		cost: 300,
		next: "hostel",
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [
		//new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
		//	],
	},

	library: {
		name: "library",
		type: "advanced",
		workers: 1500,
		cost: 5000,
		next: "university",
		requiredFeatures: [],
		requiredBuildings: ["parchmentMaker"],
		//bonuses: [//new ResourceBonus({ target: "town", resource: "books", value: 1 })],
	},

	market: {
		name: "market",
		type: "advanced",
		workers: 400,
		cost: 3000,
		next: "merchantGuild",
		requiredFeatures: [],
		requiredBuildings: ["taxCollectorsOffice"],
		//bonuses: [
		//new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
		//new ResourceBonus({ target: "town", resource: "gold", value: 1 }),
		//	],
	},

	merchantGuild: {
		name: "merchantGuild",
		type: "advanced",
		workers: 3000,
		cost: 10000,
		previous: "market",
		requiredFeatures: [],
		requiredBuildings: ["tailor", "winery", "market"],
		//bonuses: [
		//new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
		//new ResourceBonus({ target: "town", resource: "gold", value: 2 }),
		//	],
	},

	moat: {
		name: "moat",
		type: "military",
		workers: 1000,
		cost: 3000,
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [],
	},

	palisade: {
		name: "palisade",
		type: "military",
		workers: 600,
		cost: 4000,
		next: "stoneWall",
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [],
	},

	parchmentMaker: {
		name: "parchmentMaker",
		type: "advanced",
		workers: 500,
		cost: 1000,
		requiredFeatures: [],
		requiredBuildings: ["sheepFarm"],
		//bonuses: [],
	},

	pickler: {
		name: "pickler",
		type: "advanced",
		workers: 500,
		cost: 1000,
		requiredFeatures: [],
		requiredBuildings: ["fishmongery", "saltMine"],
		//bonuses: [
		//new ResourceBonus({ target: "town", resource: "food", value: 2 }),
		//new ResourceBonus({ target: "town", resource: "foodStorage", value: 50 }),
		//	],
	},

	plateArmourer: {
		name: "plateArmourer",
		type: "military",
		workers: 500,
		cost: 5000,
		requiredFeatures: [],
		requiredBuildings: ["armoury"],
		//bonuses: [],
	},

	quarry: {
		name: "quarry",
		type: "civilian",
		workers: 200,
		cost: 1000,
		requiredFeatures: ["marbleDeposits"],
		requiredBuildings: [],
		//bonuses: [
		//new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
		//	],
	},

	riggersStore: {
		name: "riggersStore",
		type: "advanced",
		workers: 500,
		cost: 3000,
		requiredFeatures: [],
		requiredBuildings: ["hempField", "waxMaker", "toolSmithy"],
		//bonuses: [],
	},

	saltMine: {
		name: "saltMine",
		type: "civilian",
		workers: 200,
		cost: 500,
		requiredFeatures: ["brineDeposits"],
		requiredBuildings: ["toolSmithy"],
		//bonuses: [],
	},

	scaleArmourer: {
		name: "scaleArmourer",
		type: "military",
		workers: 500,
		cost: 3000,
		requiredFeatures: [],
		requiredBuildings: ["armoury"],
		//bonuses: [],
	},

	scribesOffice: {
		name: "scribesOffice",
		type: "advanced",
		workers: 800,
		cost: 3000,
		requiredFeatures: [],
		requiredBuildings: ["inkMaker", "parchmentMaker"],
		//bonuses: [],
	},

	sculptorsGuild: {
		name: "sculptorsGuild",
		type: "advanced",
		workers: 500,
		cost: 3000,
		requiredFeatures: [],
		requiredBuildings: ["quarry"],
		//bonuses: [],
	},

	sheepFarm: {
		name: "sheepFarm",
		type: "civilian",
		workers: 200,
		cost: 800,
		requiredFeatures: ["pasture"],
		requiredBuildings: [],
		//bonuses: [],
	},

	siegeWorkshop: {
		name: "siegeWorkshop",
		type: "military",
		workers: 200,
		cost: 500,
		requiredFeatures: [],
		requiredBuildings: ["trainingGrounds", "toolSmithy"],
		//bonuses: [],
	},

	silverMine: {
		name: "silverMine",
		type: "civilian",
		workers: 400,
		cost: 3000,
		requiredFeatures: ["silverOre"],
		requiredBuildings: ["toolSmithy"],
		//bonuses: [//new ResourceBonus({ target: "town", resource: "gold", value: 5 })],
	},

	spearMaker: {
		name: "spearMaker",
		type: "military",
		workers: 300,
		cost: 1000,
		next: "halberdMastersmithy",
		requiredFeatures: [],
		requiredBuildings: ["trainingGrounds"],
		//bonuses: [],
	},

	spinningMill: {
		name: "spinningMill",
		type: "advanced",
		workers: 500,
		cost: 1000,
		requiredFeatures: [],
		requiredBuildings: ["sheepFarm"],
		//bonuses: [],
	},

	stable: {
		name: "stable",
		type: "military",
		workers: 500,
		cost: 2000,
		requiredFeatures: [],
		requiredBuildings: ["granary"],
		//bonuses: [],
	},

	stoneWall: {
		name: "stoneWall",
		type: "military",
		workers: 500,
		cost: 3000,
		previous: "palisade",
		next: "bulwark",
		requiredFeatures: [],
		requiredBuildings: ["palisade"],
		//bonuses: [],
	},

	stonemason: {
		name: "stonemason",
		type: "advanced",
		workers: 1500,
		cost: 5000,
		requiredFeatures: [],
		requiredBuildings: ["quarry"],
		//bonuses: [
		//new ResourceBonus({ target: "town", resource: "workers", value: 1 }),
		//	],
	},

	stud: {
		name: "stud",
		type: "civilian",
		workers: 200,
		cost: 1000,
		requiredFeatures: ["pasture"],
		requiredBuildings: [],
		//bonuses: [],
	},

	swordMastersmithy: {
		name: "swordMastersmithy",
		type: "military",
		workers: 500,
		cost: 5000,
		previous: "swordsmith",
		requiredFeatures: [],
		requiredBuildings: ["swordsmith"],
		//bonuses: [],
	},

	swordsmith: {
		name: "swordsmith",
		type: "military",
		workers: 300,
		cost: 1000,
		next: "swordMastersmithy",
		requiredFeatures: [],
		requiredBuildings: ["trainingGrounds"],
		//bonuses: [],
	},

	tailor: {
		name: "tailor",
		type: "advanced",
		workers: 500,
		cost: 3000,
		requiredFeatures: [],
		requiredBuildings: ["weavingMill", "dyesWorkshop"],
		//bonuses: [],
	},

	tannery: {
		name: "tannery",
		type: "advanced",
		workers: 500,
		cost: 2000,
		requiredFeatures: [],
		requiredBuildings: ["cattleFarm", "toolSmithy"],
		//bonuses: [],
	},

	taxCollectorsOffice: {
		name: "taxCollectorsOffice",
		type: "civilian",
		workers: 200,
		cost: 800,
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [
		//new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
		//	],
	},

	toolSmithy: {
		name: "toolSmithy",
		type: "civilian",
		workers: 200,
		cost: 500,
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [
		//new ResourceBonus({ target: "town", resource: "workers", value: 1 }),
		//	],
	},

	townWatchHouse: {
		name: "townWatchHouse",
		type: "military",
		workers: 100,
		cost: 300,
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [],
	},

	trainingGrounds: {
		name: "trainingGrounds",
		type: "military",
		workers: 200,
		cost: 500,
		requiredFeatures: [],
		requiredBuildings: [],
		//bonuses: [],
	},

	university: {
		name: "university",
		type: "advanced",
		workers: 2000,
		cost: 10000,
		previous: "library",
		requiredFeatures: [],
		requiredBuildings: ["library", "scribesOffice"],
		//bonuses: [
		//new ResourceBonus({ target: "allAreas", resource: "books", value: 3 }),
		//new ResourceBonus({ target: "town", resource: "books", value: 3 }),
		//	],
	},

	vineyard: {
		name: "vineyard",
		type: "civilian",
		workers: 200,
		cost: 2000,
		requiredFeatures: ["fertileSoil"],
		requiredBuildings: [],
		//bonuses: [new ResourceBonus({ target: "farm", resource: "food", value: 1 })],
	},

	waxMaker: {
		name: "waxMaker",
		type: "advanced",
		workers: 500,
		cost: 2000,
		requiredFeatures: [],
		requiredBuildings: ["beeYard"],
		//bonuses: [],
	},

	weavingMill: {
		name: "weavingMill",
		type: "advanced",
		workers: 500,
		cost: 3000,
		requiredFeatures: [],
		requiredBuildings: ["hempField", "toolSmithy"],
		//bonuses: [],
	},

	winery: {
		name: "winery",
		type: "advanced",
		workers: 500,
		cost: 3000,
		requiredFeatures: [],
		requiredBuildings: ["vineyard"],
		//bonuses: [],
	},
};
