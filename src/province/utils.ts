import { ProvinceFeature } from "./../game/enums";
import { BuildingId } from "../game/enums";
import { Bonus, Building, Province } from "../game/types";

export const getConnectedBuildings = (
	buildings: Province["buildings"],
	targetBuilding: BuildingId
) =>
	buildings.filter(({ building }) =>
		building.requirements.includes(targetBuilding)
	);

export const getBuildingsBonus = (
	buildings: Province["buildings"],
	resource: Bonus["id"]
) =>
	buildings
		.flatMap(({ building }) => building.bonuses)
		.filter(({ id }) => id === resource)
		.reduce((total, { value }) => total + value, 0);

export const isConstructionAvailable = (
	b: Building,
	{
		availableWorkers,
		features,
		completedBuildings,
		buildingsUnderConstruction,
	}: {
		availableWorkers: number;
		features: ProvinceFeature[];
		completedBuildings: Province["buildings"];
		buildingsUnderConstruction: Province["buildings"];
	}
) => {
	const buildingIds = [
		...buildingsUnderConstruction,
		...completedBuildings,
	].map(({ building }) => building.id);

	if (
		buildingIds.includes(b.id) ||
		availableWorkers === 0 ||
		b.requirements.some(
			(r) =>
				![
					...features,
					...completedBuildings.map(({ building }) => building.id),
				].includes(r)
		)
	) {
		return false;
	}

	return true;
};
