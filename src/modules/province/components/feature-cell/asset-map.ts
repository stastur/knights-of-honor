import { Feature } from "@app/core/entities/types";

export const assetMap: Record<Feature, { assetName: string }> = {
	pasture: { assetName: "pasture.webp" },
	fishery: { assetName: "fishery.webp" },
	gameLand: { assetName: "gameland.webp" },
	silverOre: { assetName: "silver_deposits.webp" },
	fertileSoil: { assetName: "fertile_soil.webp" },
	marbleDeposits: { assetName: "marble_deposits.webp" },
	mineralDeposits: { assetName: "minerals.webp" },
	brineDeposits: { assetName: "salt.webp" },
};
