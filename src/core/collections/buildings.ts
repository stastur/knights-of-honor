import { ResourceBonus } from "../entities/bonus";
import { Building } from "../entities/building";

const admiralty = new Building({
	name: "admiralty",
	type: "advanced",
	workers: 1500,
	requiredFeatures: [],
	requiredBuildings: ["harbour"],
	bonuses: [],
});

const armoury = new Building({
	name: "armoury",
	type: "military",
	workers: 300,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

const axeSmith = new Building({
	name: "axeSmith",
	type: "military",
	workers: 300,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

const bakery = new Building({
	name: "bakery",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["granary"],
	bonuses: [
		new ResourceBonus({ target: "farm", resource: "food", value: 1 }),
		new ResourceBonus({ target: "town", resource: "foodStorage", value: 200 }),
	],
});

const ballistaTowers = new Building({
	name: "ballistaTowers",
	type: "military",
	workers: 1200,
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

const beeYard = new Building({
	name: "beeYard",
	type: "civilian",
	workers: 200,
	requiredFeatures: ["fertileSoil"],
	requiredBuildings: [],
	bonuses: [],
});

const bulwark = new Building({
	name: "bulwark",
	type: "military",
	workers: 3000,
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

const butcher = new Building({
	name: "butcher",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["saltMine", "toolSmithy", "cattleFarm"],
	bonuses: [
		new ResourceBonus({ target: "farm", resource: "food", value: 1 }),
		new ResourceBonus({ target: "town", resource: "food", value: 2 }),
		new ResourceBonus({ target: "town", resource: "foodStorage", value: 200 }),
	],
});

const catapults = new Building({
	name: "catapults",
	type: "military",
	workers: 1000,
	requiredFeatures: [],
	requiredBuildings: ["toolSmithy", "stoneWall", "drumTowers"],
	bonuses: [],
});

const cathedral = new Building({
	name: "cathedral",
	type: "advanced",
	workers: 3000,
	requiredFeatures: [],
	requiredBuildings: ["church", "waxMaker", "dyesWorkshop", "sculptorsGuild"],
	bonuses: [
		new ResourceBonus({ target: "monastery", resource: "piety", value: 3 }),
		new ResourceBonus({ target: "town", resource: "piety", value: 2 }),
	],
});

const cattleFarm = new Building({
	name: "cattleFarm",
	type: "civilian",
	workers: 200,
	requiredFeatures: ["pasture"],
	requiredBuildings: [],
	bonuses: [],
});

const cauldrons = new Building({
	name: "cauldrons",
	type: "military",
	workers: 1000,
	requiredFeatures: [],
	requiredBuildings: ["stoneWall", "toolSmithy"],
	bonuses: [],
});

const chainMailWorkshop = new Building({
	name: "chainMailWorkshop",
	type: "military",
	workers: 300,
	requiredFeatures: [],
	requiredBuildings: ["armoury"],
	bonuses: [],
});

const church = new Building({
	name: "church",
	type: "civilian",
	workers: 700,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "monastery", resource: "piety", value: 1 }),
		new ResourceBonus({ target: "town", resource: "piety", value: 1 }),
	],
});

const coastGuard = new Building({
	name: "coastGuard",
	type: "advanced",
	workers: 2000,
	requiredFeatures: [],
	requiredBuildings: ["stonemason", "townWatchHouse"],
	bonuses: [new ResourceBonus({ target: "town", resource: "gold", value: 5 })],
});

const cornerTowers = new Building({
	name: "cornerTowers",
	type: "military",
	workers: 1200,
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

const docks = new Building({
	name: "docks",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["fishmongery"],
	bonuses: [
		new ResourceBonus({ target: "coastalVillage", resource: "gold", value: 1 }),
		new ResourceBonus({ target: "town", resource: "food", value: 2 }),
	],
});

const drumTowers = new Building({
	name: "drumTowers",
	type: "military",
	workers: 1200,
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

const dyesWorkshop = new Building({
	name: "dyesWorkshop",
	type: "advanced",
	workers: 500,
	requiredFeatures: ["mineralDeposits"],
	requiredBuildings: [],
	bonuses: [],
});

const fishmongery = new Building({
	name: "fishmongery",
	type: "advanced",
	workers: 200,
	requiredFeatures: ["fishery"],
	requiredBuildings: [],
	bonuses: [new ResourceBonus({ target: "farm", resource: "food", value: 1 })],
});

const fletcher = new Building({
	name: "fletcher",
	type: "military",
	workers: 300,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

const gateTowers = new Building({
	name: "gateTowers",
	type: "military",
	workers: 1500,
	requiredFeatures: [],
	requiredBuildings: ["stoneWall"],
	bonuses: [],
});

const granary = new Building({
	name: "granary",
	type: "civilian",
	workers: 200,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "town", resource: "foodStorage", value: 100 }),
	],
});

const halberdMastersmithy = new Building({
	name: "halberdMastersmithy",
	type: "military",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["spearMaker"],
	bonuses: [],
});

const harbour = new Building({
	name: "harbour",
	type: "advanced",
	workers: 800,
	requiredFeatures: [],
	requiredBuildings: ["docks"],
	bonuses: [
		new ResourceBonus({ target: "coastalVillage", resource: "gold", value: 3 }),
	],
});

const hempField = new Building({
	name: "hempField",
	type: "civilian",
	workers: 200,
	requiredFeatures: ["fertileSoil"],
	requiredBuildings: [],
	bonuses: [],
});

const hostel = new Building({
	name: "hostel",
	type: "civilian",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["inn"],
	bonuses: [
		new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
		new ResourceBonus({ target: "town", resource: "workers", value: 2 }),
	],
});

const huntersHuts = new Building({
	name: "huntersHuts",
	type: "civilian",
	workers: 200,
	requiredFeatures: ["gameLand"],
	requiredBuildings: [],
	bonuses: [new ResourceBonus({ target: "town", resource: "gold", value: 1 })],
});

const inkMaker = new Building({
	name: "inkMaker",
	type: "advanced",
	workers: 500,
	requiredFeatures: ["mineralDeposits"],
	requiredBuildings: [],
	bonuses: [],
});

const inn = new Building({
	name: "inn",
	type: "civilian",
	workers: 100,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
	],
});

const library = new Building({
	name: "library",
	type: "advanced",
	workers: 1500,
	requiredFeatures: [],
	requiredBuildings: ["parchmentMaker"],
	bonuses: [],
	// bonuses: [new BuildingBonus({ target: "town", resource: "books", value: 1 })],
});

const market = new Building({
	name: "market",
	type: "advanced",
	workers: 400,
	requiredFeatures: [],
	requiredBuildings: ["taxCollectorsOffice"],
	bonuses: [
		new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
		new ResourceBonus({ target: "town", resource: "gold", value: 1 }),
	],
});

const merchantGuild = new Building({
	name: "merchantGuild",
	type: "advanced",
	workers: 3000,
	requiredFeatures: [],
	requiredBuildings: ["tailor", "winery"],
	bonuses: [
		new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
		new ResourceBonus({ target: "town", resource: "gold", value: 2 }),
	],
});

const moat = new Building({
	name: "moat",
	type: "military",
	workers: 1000,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [],
});

const palisade = new Building({
	name: "palisade",
	type: "military",
	workers: 600,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [],
});

const parchmentMaker = new Building({
	name: "parchmentMaker",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["sheepFarm"],
	bonuses: [],
});

const pickler = new Building({
	name: "pickler",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["fishmongery", "saltMine"],
	bonuses: [
		new ResourceBonus({ target: "town", resource: "food", value: 2 }),
		new ResourceBonus({ target: "town", resource: "foodStorage", value: 50 }),
	],
});

const plateArmourer = new Building({
	name: "plateArmourer",
	type: "military",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["armoury"],
	bonuses: [],
});

const quarry = new Building({
	name: "quarry",
	type: "military",
	workers: 200,
	requiredFeatures: ["marbleDeposits"],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "village", resource: "workers", value: 1 }),
	],
});

const riggersStore = new Building({
	name: "riggersStore",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["hempField", "waxMaker", "toolSmithy"],
	bonuses: [],
});

const saltMine = new Building({
	name: "saltMine",
	type: "civilian",
	workers: 200,
	requiredFeatures: ["brineDeposits"],
	requiredBuildings: ["toolSmithy"],
	bonuses: [],
});

const scaleArmourer = new Building({
	name: "scaleArmourer",
	type: "military",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["armoury"],
	bonuses: [],
});

const scribesOffice = new Building({
	name: "scribesOffice",
	type: "advanced",
	workers: 800,
	requiredFeatures: [],
	requiredBuildings: ["inkMaker", "parchmentMaker"],
	bonuses: [],
});

const sculptorsGuild = new Building({
	name: "sculptorsGuild",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["quarry"],
	bonuses: [],
});

const sheepFarm = new Building({
	name: "sheepFarm",
	type: "civilian",
	workers: 200,
	requiredFeatures: ["pasture"],
	requiredBuildings: [],
	bonuses: [],
});

const siegeWorkshop = new Building({
	name: "siegeWorkshop",
	type: "military",
	workers: 200,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds", "toolSmithy"],
	bonuses: [],
});

const silverMine = new Building({
	name: "silverMine",
	type: "civilian",
	workers: 400,
	requiredFeatures: ["silverOre"],
	requiredBuildings: ["toolSmithy"],
	bonuses: [new ResourceBonus({ target: "town", resource: "gold", value: 5 })],
});

const spearMaker = new Building({
	name: "spearMaker",
	type: "military",
	workers: 300,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

const spinningMill = new Building({
	name: "spinningMill",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["sheepFarm"],
	bonuses: [],
});

const stable = new Building({
	name: "stable",
	type: "military",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["granary"],
	bonuses: [],
});

const stoneWall = new Building({
	name: "stoneWall",
	type: "military",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["palisade"],
	bonuses: [],
});

const stonemason = new Building({
	name: "stonemason",
	type: "civilian",
	workers: 1500,
	requiredFeatures: [],
	requiredBuildings: ["quarry"],
	bonuses: [
		new ResourceBonus({ target: "town", resource: "workers", value: 1 }),
	],
});

const stud = new Building({
	name: "stud",
	type: "civilian",
	workers: 200,
	requiredFeatures: ["pasture"],
	requiredBuildings: [],
	bonuses: [],
});

const swordMastersmithy = new Building({
	name: "swordMastersmithy",
	type: "military",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["swordsmith"],
	bonuses: [],
});

const swordsmith = new Building({
	name: "swordsmith",
	type: "military",
	workers: 300,
	requiredFeatures: [],
	requiredBuildings: ["trainingGrounds"],
	bonuses: [],
});

const tailor = new Building({
	name: "tailor",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["weavingMill", "dyesWorkshop"],
	bonuses: [],
});

const tannery = new Building({
	name: "tannery",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["cattleFarm", "toolSmithy"],
	bonuses: [],
});

const taxCollectorsOffice = new Building({
	name: "taxCollectorsOffice",
	type: "civilian",
	workers: 200,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "allAreas", resource: "gold", value: 1 }),
	],
});

const toolSmithy = new Building({
	name: "toolSmithy",
	type: "civilian",
	workers: 200,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [
		new ResourceBonus({ target: "town", resource: "workers", value: 1 }),
	],
});

const townWatchHouse = new Building({
	name: "townWatchHouse",
	type: "military",
	workers: 100,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [],
});

const trainingGrounds = new Building({
	name: "trainingGrounds",
	type: "military",
	workers: 200,
	requiredFeatures: [],
	requiredBuildings: [],
	bonuses: [],
});

const university = new Building({
	name: "university",
	type: "advanced",
	workers: 2000,
	requiredFeatures: [],
	requiredBuildings: ["library", "scribesOffice"],
	bonuses: [],
	// bonuses: [
	// 	new BuildingBonus({ target: "undefined", resource: "books", value: 3 }),
	// 	new BuildingBonus({ target: "town", resource: "books", value: 3 }),
	// ],
});

const vineyard = new Building({
	name: "vineyard",
	type: "civilian",
	workers: 200,
	requiredFeatures: ["fertileSoil"],
	requiredBuildings: [],
	bonuses: [new ResourceBonus({ target: "farm", resource: "food", value: 1 })],
});

const waxMaker = new Building({
	name: "waxMaker",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["beeYard"],
	bonuses: [],
});

const weavingMill = new Building({
	name: "weavingMill",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["hempField", "toolSmithy"],
	bonuses: [],
});

const winery = new Building({
	name: "winery",
	type: "advanced",
	workers: 500,
	requiredFeatures: [],
	requiredBuildings: ["vineyard"],
	bonuses: [],
});

export const buildings = {
	admiralty,
	armoury,
	axeSmith,
	bakery,
	ballistaTowers,
	beeYard,
	bulwark,
	butcher,
	catapults,
	cathedral,
	cattleFarm,
	cauldrons,
	chainMailWorkshop,
	church,
	coastGuard,
	cornerTowers,
	docks,
	drumTowers,
	dyesWorkshop,
	fishmongery,
	fletcher,
	gateTowers,
	granary,
	halberdMastersmithy,
	harbour,
	hempField,
	hostel,
	huntersHuts,
	inkMaker,
	inn,
	library,
	market,
	merchantGuild,
	moat,
	palisade,
	parchmentMaker,
	pickler,
	plateArmourer,
	quarry,
	riggersStore,
	saltMine,
	scaleArmourer,
	scribesOffice,
	sculptorsGuild,
	sheepFarm,
	siegeWorkshop,
	silverMine,
	spearMaker,
	spinningMill,
	stable,
	stoneWall,
	stonemason,
	stud,
	swordMastersmithy,
	swordsmith,
	tailor,
	tannery,
	taxCollectorsOffice,
	toolSmithy,
	townWatchHouse,
	trainingGrounds,
	university,
	vineyard,
	waxMaker,
	weavingMill,
	winery,
};
