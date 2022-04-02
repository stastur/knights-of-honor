export type AreaResource = "food" | "workers" | "piety" | "gold";
export type TownResource = "foodStorage" | "population" | "happiness";
export type ProvinceResource = AreaResource | "books";

export type Feature =
	| "pasture"
	| "fishery"
	| "gameLand"
	| "silverOre"
	| "fertileSoil"
	| "marbleDeposits"
	| "mineralDeposits"
	| "brineDeposits";

export type RuralAreaType = "coastalVillage" | "farm" | "monastery" | "village";

export type Product =
	| "honey"
	| "meat"
	| "dyes"
	| "hides"
	| "ink"
	| "parchment"
	| "tackling"
	| "salt"
	| "statues"
	| "silver"
	| "wool"
	| "columns"
	| "horses"
	| "clothes"
	| "leather"
	| "illustratedBooks"
	| "wax"
	| "linen"
	| "wine";
