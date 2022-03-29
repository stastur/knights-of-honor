import { Resource } from "./shared";
import { RuralArea } from "./rural-area";
import { BonusResources } from "./bonus";
import { Building } from "./building";

import { buildings } from "../collections/buildings";

import { has, merge, negate } from "../../utils";

type Feature =
	| "pasture"
	| "fishery"
	| "gameLand"
	| "silverOre"
	| "fertileSoil"
	| "marbleDeposits"
	| "mineralDeposits"
	| "brineDeposits";

export class Province {
	areas: RuralArea[] = [];
	features: Feature[] = [];

	buildings: Building[] = [];
	development: { progress: number; building: Building }[] = [];

	private _gold = 1;
	private _food = 1;
	private _piety = 0;
	private _workers = 1;

	private _foodStorage = 100;

	constructor(public name: string) {}

	private getAreaResource(resource: Resource): number {
		const resourceMap: Record<Resource, RuralArea["type"]> = {
			gold: "coastalVillage",
			food: "farm",
			piety: "monastery",
			workers: "village",
		};

		return this.areas
			.filter((v) => v.type === resourceMap[resource])
			.reduce((sum, v) => v.value + sum, 0);
	}

	private getBonusResource(resource: keyof BonusResources): number {
		return this.buildings
			.map((b) => b.combineBonuses(this))
			.reduce((acc, rb) => {
				return merge(acc, rb);
			}, {} as BonusResources)[resource];
	}

	private getResource(resource: Resource): number {
		return (
			this[`_${resource}`] +
			this.getAreaResource(resource) +
			this.getBonusResource(resource)
		);
	}

	get gold(): number {
		return this.getResource("gold");
	}

	get food(): number {
		return this.getResource("food");
	}

	get piety(): number {
		return this.getResource("piety");
	}

	get workers(): number {
		return this.getResource("workers");
	}

	get foodStorage(): { limit: number; value: number } {
		const limit = 100 + this.getBonusResource("foodStorage");
		const value = this._foodStorage;

		return { limit, value };
	}

	/**
	 * Buildings
	 */
	startBuilding(name: Building["name"]): void {
		const building = buildings[name];

		if (building.checkRequirements(this)) {
			this.development.push({ progress: 0, building });
		}
	}

	destroyBuilding(name: Building["name"]): void {
		this.buildings = this.buildings.filter(negate(has({ name })));
	}

	/**
	 * Game loop
	 */
	update(): void {
		// update food storage
		const foodStorageLimit = this.foodStorage.limit;

		this._foodStorage = Math.min(
			this._foodStorage + this.food,
			foodStorageLimit
		);

		// update development queue and buildings
		this.development.forEach((project, index) => {
			project.progress = Math.min(
				project.building.workers,
				project.progress + this.workers
			);

			if (project.progress === project.building.workers) {
				this.development.splice(index, 1);
				this.buildings.push(project.building);
			}
		});
	}
}
