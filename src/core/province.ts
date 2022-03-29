import { AdditionalBonus, BuildingId } from "./enums";
import { GlobalResource, LocalResource, ProvinceFeature } from "./enums";
import { BuildingStatus, Building } from "./types";
import * as buildings from "./buildings";

export interface ProvinceState {
	production: Record<GlobalResource | LocalResource, number>;

	population: {
		limit: number;
		value: number;
		growthRate: number;
	};

	foodStorage: {
		limit: number;
		value: number;
	};

	// TBD
	// happiness: number;

	features: Set<ProvinceFeature>;

	buildings: Set<{
		status: BuildingStatus;
		progress?: number;

		building: Building;
	}>;
}

export class Province {
	id: string;
	private state: ProvinceState;

	constructor(id: string) {
		this.id = id;

		this.state = {
			buildings: new Set(),

			features: new Set(),

			production: {
				gold: 0,
				workers: 0,
				food: 0,
				piety: 0,
				books: 0,
			},

			population: {
				value: 100,
				limit: 100,
				growthRate: 0.05,
			},

			foodStorage: {
				value: 100,
				limit: 100,
			},
		};
	}

	build(buildingId: BuildingId): void {
		this.state.buildings.add({
			building: buildings[buildingId],
			progress: 0,
			status: BuildingStatus.UnderConstruction,
		});
	}

	destroy(buildingId: BuildingId): void {
		for (const b of this.state.buildings) {
			if (b.building.id === buildingId) {
				this.state.buildings.delete(b);
				break;
			}
		}
	}
}
