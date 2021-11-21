import {
	BuildingId,
	GlobalResource,
	LocalResource,
	Product,
	ProvinceFeature,
} from "./enums";
import { AdditionalBonus, Building } from "./types";

export const admiralty: Readonly<Building> = {
	id: BuildingId.Admiralty,

	cost: 6000,
	workers: 1500,

	requirements: [BuildingId.Harbour],
	bonuses: [],

	products: [],
};

export const armoury: Readonly<Building> = {
	id: BuildingId.Armoury,

	cost: 2000,
	workers: 300,

	requirements: [BuildingId.TrainingGrounds],
	bonuses: [],

	products: [],
};

export const axeSmith: Readonly<Building> = {
	id: BuildingId.AxeSmith,

	cost: 1000,
	workers: 300,

	requirements: [BuildingId.TrainingGrounds],
	bonuses: [],

	products: [],
};

export const bakery: Readonly<Building> = {
	id: BuildingId.Bakery,

	cost: 2000,
	workers: 500,

	requirements: [BuildingId.Granary],
	bonuses: [
		{ id: AdditionalBonus.FoodStorage, value: 200 },
		{ id: LocalResource.Food, value: 1 },
	],

	products: [],
};

export const ballistaTowers: Readonly<Building> = {
	id: BuildingId.BallistaTowers,

	cost: 5000,
	workers: 1200,

	requirements: [BuildingId.StoneWall],
	bonuses: [],

	products: [],
};

export const beeYard: Readonly<Building> = {
	id: BuildingId.BeeYard,

	cost: 1000,
	workers: 200,

	requirements: [ProvinceFeature.FertileSoil],
	bonuses: [],

	products: [Product.Honey],
};

export const bulwark: Readonly<Building> = {
	id: BuildingId.Bulwark,

	cost: 8000,
	workers: 3000,

	requirements: [BuildingId.StoneWall],
	bonuses: [],

	products: [],
};

export const butcher: Readonly<Building> = {
	id: BuildingId.Butcher,

	cost: 2000,
	workers: 500,

	requirements: [
		BuildingId.SaltMine,
		BuildingId.ToolSmithy,
		BuildingId.CattleFarm,
	],
	bonuses: [
		{ id: AdditionalBonus.FoodStorage, value: 200 },
		{ id: LocalResource.Food, value: 3 },
	],

	products: [],
};

export const catapults: Readonly<Building> = {
	id: BuildingId.Catapults,

	cost: 8000,
	workers: 1000,

	requirements: [
		BuildingId.ToolSmithy,
		BuildingId.StoneWall,
		BuildingId.DrumTowers,
	],
	bonuses: [],

	products: [],
};

export const cathedral: Readonly<Building> = {
	id: BuildingId.Cathedral,

	cost: 10000,
	workers: 3000,

	requirements: [
		BuildingId.Church,
		BuildingId.WaxMaker,
		BuildingId.DyesWorkshop,
		BuildingId.SculptorsGuild,
	],
	bonuses: [{ id: GlobalResource.Piety, value: 5 }],

	products: [],
};

export const cattleFarm: Readonly<Building> = {
	id: BuildingId.CattleFarm,

	cost: 1000,
	workers: 200,

	requirements: [ProvinceFeature.Pasture],
	bonuses: [],

	products: [Product.Meat],
};

export const cauldrons: Readonly<Building> = {
	id: BuildingId.Cauldrons,

	cost: 3000,
	workers: 1000,

	requirements: [BuildingId.StoneWall, BuildingId.ToolSmithy],
	bonuses: [],

	products: [],
};

export const chainMailWorkshop: Readonly<Building> = {
	id: BuildingId.ChainMailWorkshop,

	cost: 2000,
	workers: 300,

	requirements: [BuildingId.Armoury],
	bonuses: [],

	products: [],
};

export const church: Readonly<Building> = {
	id: BuildingId.Church,

	cost: 3000,
	workers: 700,

	requirements: [],
	bonuses: [{ id: GlobalResource.Piety, value: 2 }],

	products: [],
};

export const coastGuard: Readonly<Building> = {
	id: BuildingId.CoastGuard,

	cost: 5000,
	workers: 2000,

	requirements: [BuildingId.Stonemason, BuildingId.TownWatchHouse],
	bonuses: [{ id: GlobalResource.Gold, value: 5 }],

	products: [],
};

export const cornerTowers: Readonly<Building> = {
	id: BuildingId.CornerTowers,

	cost: 8000,
	workers: 1200,

	requirements: [BuildingId.StoneWall],
	bonuses: [],

	products: [],
};

export const docks: Readonly<Building> = {
	id: BuildingId.Docks,

	cost: 2000,
	workers: 500,

	requirements: [BuildingId.Fishmongery],
	bonuses: [{ id: GlobalResource.Gold, value: 2 }],

	products: [],
};

export const drumTowers: Readonly<Building> = {
	id: BuildingId.DrumTowers,

	cost: 3000,
	workers: 1200,

	requirements: [BuildingId.StoneWall],
	bonuses: [],

	products: [],
};

export const dyesWorkshop: Readonly<Building> = {
	id: BuildingId.DyesWorkshop,

	cost: 2000,
	workers: 500,

	requirements: [ProvinceFeature.MineralDeposits],
	bonuses: [],

	products: [Product.Dyes],
};

export const fishmongery: Readonly<Building> = {
	id: BuildingId.Fishmongery,

	cost: 300,
	workers: 200,

	requirements: [ProvinceFeature.Fishery],
	bonuses: [{ id: LocalResource.Food, value: 1 }],

	products: [],
};

export const fletcher: Readonly<Building> = {
	id: BuildingId.Fletcher,

	cost: 1000,
	workers: 300,

	requirements: [BuildingId.TrainingGrounds],
	bonuses: [],

	products: [],
};

export const gateTowers: Readonly<Building> = {
	id: BuildingId.GateTowers,

	cost: 8000,
	workers: 1500,

	requirements: [BuildingId.StoneWall],
	bonuses: [],

	products: [],
};

export const granary: Readonly<Building> = {
	id: BuildingId.Granary,

	cost: 300,
	workers: 200,

	requirements: [],
	bonuses: [{ id: AdditionalBonus.FoodStorage, value: 100 }],

	products: [],
};

export const halberdMastersmithy: Readonly<Building> = {
	id: BuildingId.HalberdMastersmithy,

	cost: 5000,
	workers: 500,

	requirements: [BuildingId.SpearMaker],
	bonuses: [],

	products: [],
};

export const harbour: Readonly<Building> = {
	id: BuildingId.Harbour,

	cost: 3000,
	workers: 800,

	requirements: [BuildingId.Docks],
	bonuses: [{ id: GlobalResource.Gold, value: 3 }],

	products: [],
};

export const hempField: Readonly<Building> = {
	id: BuildingId.HempField,

	cost: 2000,
	workers: 200,

	requirements: [ProvinceFeature.FertileSoil],
	bonuses: [],

	products: [],
};

export const hostel: Readonly<Building> = {
	id: BuildingId.Hostel,

	cost: 2000,
	workers: 500,

	requirements: [BuildingId.Inn],
	bonuses: [
		{ id: LocalResource.Workers, value: 3 },
		{ id: AdditionalBonus.Happiness, value: 5 },
	],

	products: [],
};

export const huntersHuts: Readonly<Building> = {
	id: BuildingId.HuntersHuts,

	cost: 300,
	workers: 200,

	requirements: [ProvinceFeature.GameLand],
	bonuses: [{ id: GlobalResource.Gold, value: 1 }],

	products: [Product.Hides],
};

export const inkMaker: Readonly<Building> = {
	id: BuildingId.InkMaker,

	cost: 2000,
	workers: 500,

	requirements: [ProvinceFeature.MineralDeposits],
	bonuses: [],

	products: [Product.Ink],
};

export const inn: Readonly<Building> = {
	id: BuildingId.Inn,

	cost: 300,
	workers: 100,

	requirements: [],
	bonuses: [
		{ id: LocalResource.Workers, value: 1 },
		{ id: AdditionalBonus.Happiness, value: 3 },
	],

	products: [],
};

export const library: Readonly<Building> = {
	id: BuildingId.Library,

	cost: 5000,
	workers: 1500,

	requirements: [BuildingId.ParchmentMaker],
	bonuses: [{ id: GlobalResource.Books, value: 1 }],

	products: [],
};

export const market: Readonly<Building> = {
	id: BuildingId.Market,

	cost: 3000,
	workers: 400,

	requirements: [BuildingId.TaxCollectorsOffice],
	bonuses: [{ id: GlobalResource.Gold, value: 2 }],

	products: [],
};

export const merchantGuild: Readonly<Building> = {
	id: BuildingId.MerchantGuild,

	cost: 10000,
	workers: 3000,

	requirements: [BuildingId.Tailor, BuildingId.Winery],
	bonuses: [{ id: GlobalResource.Gold, value: 3 }],

	products: [],
};

export const moat: Readonly<Building> = {
	id: BuildingId.Moat,

	cost: 3000,
	workers: 1000,

	requirements: [],
	bonuses: [],

	products: [],
};

export const palisade: Readonly<Building> = {
	id: BuildingId.Palisade,

	cost: 4000,
	workers: 600,

	requirements: [],
	bonuses: [],

	products: [],
};

export const parchmentMaker: Readonly<Building> = {
	id: BuildingId.ParchmentMaker,

	cost: 1000,
	workers: 500,

	requirements: [BuildingId.SheepFarm],
	bonuses: [],

	products: [Product.Parchment],
};

export const pickler: Readonly<Building> = {
	id: BuildingId.Pickler,

	cost: 1000,
	workers: 500,

	requirements: [BuildingId.Fishmongery, BuildingId.SaltMine],
	bonuses: [
		{ id: AdditionalBonus.FoodStorage, value: 50 },
		{ id: LocalResource.Food, value: 2 },
	],

	products: [],
};

export const plateArmourer: Readonly<Building> = {
	id: BuildingId.PlateArmourer,

	cost: 5000,
	workers: 500,

	requirements: [BuildingId.Armoury],
	bonuses: [],

	products: [],
};

export const quarry: Readonly<Building> = {
	id: BuildingId.Quarry,

	cost: 1000,
	workers: 200,

	requirements: [ProvinceFeature.MarbleDeposits],
	bonuses: [
		{ id: LocalResource.Workers, value: 1 },
		{ id: AdditionalBonus.Happiness, value: -3 },
	],

	products: [],
};

export const riggersStore: Readonly<Building> = {
	id: BuildingId.RiggersStore,

	cost: 3000,
	workers: 500,

	requirements: [
		BuildingId.HempField,
		BuildingId.WaxMaker,
		BuildingId.ToolSmithy,
	],
	bonuses: [],

	products: [Product.Tackling],
};

export const saltMine: Readonly<Building> = {
	id: BuildingId.SaltMine,

	cost: 500,
	workers: 200,

	requirements: [ProvinceFeature.BrineDeposits, BuildingId.ToolSmithy],
	bonuses: [],

	products: [Product.Salt],
};

export const scaleArmourer: Readonly<Building> = {
	id: BuildingId.ScaleArmourer,

	cost: 3000,
	workers: 500,

	requirements: [BuildingId.Armoury],
	bonuses: [],

	products: [],
};

export const scribesOffice: Readonly<Building> = {
	id: BuildingId.ScribesOffice,

	cost: 3000,
	workers: 800,

	requirements: [BuildingId.InkMaker, BuildingId.ParchmentMaker],
	bonuses: [],

	products: [],
};

export const sculptorsGuild: Readonly<Building> = {
	id: BuildingId.SculptorsGuild,

	cost: 3000,
	workers: 500,

	requirements: [BuildingId.Quarry],
	bonuses: [{ id: AdditionalBonus.Happiness, value: 5 }],

	products: [Product.Statues],
};

export const sheepFarm: Readonly<Building> = {
	id: BuildingId.SheepFarm,

	cost: 800,
	workers: 200,

	requirements: [ProvinceFeature.Pasture],
	bonuses: [],

	products: [],
};

export const siegeWorkshop: Readonly<Building> = {
	id: BuildingId.SiegeWorkshop,

	cost: 500,
	workers: 200,

	requirements: [BuildingId.TrainingGrounds, BuildingId.ToolSmithy],
	bonuses: [],

	products: [],
};

export const silverMine: Readonly<Building> = {
	id: BuildingId.SilverMine,

	cost: 3000,
	workers: 400,

	requirements: [ProvinceFeature.SilverOre, BuildingId.ToolSmithy],
	bonuses: [
		{ id: GlobalResource.Gold, value: 5 },
		{ id: AdditionalBonus.Happiness, value: -5 },
	],

	products: [Product.Silver],
};

export const spearMaker: Readonly<Building> = {
	id: BuildingId.SpearMaker,

	cost: 1000,
	workers: 300,

	requirements: [BuildingId.TrainingGrounds],
	bonuses: [],

	products: [],
};

export const spinningMill: Readonly<Building> = {
	id: BuildingId.SpinningMill,

	cost: 1000,
	workers: 500,

	requirements: [BuildingId.SheepFarm],
	bonuses: [],

	products: [Product.Wool],
};

export const stable: Readonly<Building> = {
	id: BuildingId.Stable,

	cost: 2000,
	workers: 500,

	requirements: [BuildingId.Granary],
	bonuses: [],

	products: [],
};

export const stoneWall: Readonly<Building> = {
	id: BuildingId.StoneWall,

	cost: 3000,
	workers: 500,

	requirements: [BuildingId.Palisade],
	bonuses: [],

	products: [],
};

export const stonemason: Readonly<Building> = {
	id: BuildingId.Stonemason,

	cost: 5000,
	workers: 1500,

	requirements: [BuildingId.Quarry],
	bonuses: [],

	products: [Product.Columns],
};

export const stud: Readonly<Building> = {
	id: BuildingId.Stud,

	cost: 1000,
	workers: 200,

	requirements: [ProvinceFeature.Pasture],
	bonuses: [],

	products: [Product.Horses],
};

export const swordMastersmithy: Readonly<Building> = {
	id: BuildingId.SwordMastersmithy,

	cost: 5000,
	workers: 500,

	requirements: [BuildingId.Swordsmith],
	bonuses: [],

	products: [],
};

export const swordsmith: Readonly<Building> = {
	id: BuildingId.Swordsmith,

	cost: 1000,
	workers: 300,

	requirements: [BuildingId.TrainingGrounds],
	bonuses: [],

	products: [],
};

export const tailor: Readonly<Building> = {
	id: BuildingId.Tailor,

	cost: 3000,
	workers: 500,

	requirements: [BuildingId.WeavingMill, BuildingId.DyesWorkshop],
	bonuses: [],

	products: [Product.Clothes],
};

export const tannery: Readonly<Building> = {
	id: BuildingId.Tannery,

	cost: 2000,
	workers: 500,

	requirements: [BuildingId.CattleFarm, BuildingId.ToolSmithy],
	bonuses: [],

	products: [Product.Leather],
};

export const taxCollectorsOffice: Readonly<Building> = {
	id: BuildingId.TaxCollectorsOffice,

	cost: 800,
	workers: 200,

	requirements: [],
	bonuses: [
		{ id: GlobalResource.Gold, value: 1 },
		{ id: AdditionalBonus.Happiness, value: -3 },
	],

	products: [],
};

export const toolSmithy: Readonly<Building> = {
	id: BuildingId.ToolSmithy,

	cost: 500,
	workers: 200,

	requirements: [],
	bonuses: [{ id: LocalResource.Workers, value: 1 }],

	products: [],
};

export const townWatchHouse: Readonly<Building> = {
	id: BuildingId.TownWatchHouse,

	cost: 300,
	workers: 100,

	requirements: [],
	bonuses: [],

	products: [],
};

export const trainingGrounds: Readonly<Building> = {
	id: BuildingId.TrainingGrounds,

	cost: 500,
	workers: 200,

	requirements: [],
	bonuses: [],

	products: [],
};

export const university: Readonly<Building> = {
	id: BuildingId.University,

	cost: 10000,
	workers: 2000,

	requirements: [BuildingId.Library, BuildingId.ScribesOffice],
	bonuses: [{ id: GlobalResource.Books, value: 6 }],

	products: [],
};

export const vineyard: Readonly<Building> = {
	id: BuildingId.Vineyard,

	cost: 2000,
	workers: 200,

	requirements: [ProvinceFeature.FertileSoil],
	bonuses: [{ id: LocalResource.Food, value: 2 }],

	products: [],
};

export const waxMaker: Readonly<Building> = {
	id: BuildingId.WaxMaker,

	cost: 2000,
	workers: 500,

	requirements: [BuildingId.BeeYard],
	bonuses: [],

	products: [Product.Wax],
};

export const weavingMill: Readonly<Building> = {
	id: BuildingId.WeavingMill,

	cost: 3000,
	workers: 500,

	requirements: [BuildingId.HempField, BuildingId.ToolSmithy],
	bonuses: [],

	products: [Product.Linen],
};

export const winery: Readonly<Building> = {
	id: BuildingId.Winery,

	cost: 3000,
	workers: 500,

	requirements: [BuildingId.Vineyard],
	bonuses: [{ id: AdditionalBonus.Happiness, value: 5 }],

	products: [Product.Wine],
};
