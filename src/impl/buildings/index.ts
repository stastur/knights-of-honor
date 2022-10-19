import { Building, Name } from "./building";
import { buildings } from "./buildings";

const resolve = (name: Name): Building => {
	return buildings[name];
};

export function hasDependency(b: Building, dep: Name): boolean {
	if (b.name === dep) {
		return false;
	}

	const isRequiredOrUpgradeOfRequired = b.requiredBuildings.some(
		(required) => required === dep || canBeUpgradedTo(resolve(required), dep)
	);

	if (isRequiredOrUpgradeOfRequired) {
		return true;
	}

	if (b.previous) {
		return hasDependency(resolve(b.previous), dep);
	}

	return false;
}

export function canBeUpgradedTo(current: Building, next: Name): boolean {
	if (!current.next) {
		return false;
	}

	if (current.next === next) {
		return true;
	}

	return canBeUpgradedTo(resolve(current.next), next);
}

export const baseBuildingsList = [
	buildings.taxCollectorsOffice,
	buildings.toolSmithy,
	buildings.trainingGrounds,
	buildings.inn,
	buildings.palisade,
	buildings.townWatchHouse,
];

export const buildingsList = Object.values(buildings);

export const mainBuildingsList = buildingsList.filter((b) => !b.previous);
