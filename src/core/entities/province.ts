import { Building } from "./building";
import { RuralArea } from "./rural-area";
import { BonusResources, ResourceBonus } from "./bonus";
import { Feature, Resource, RuralAreaType } from "./shared";

export class Province {
	areas: RuralArea[] = [];
	features: Feature[] = [];
	buildings: Building[] = [];

	private _gold = 1;
	private _food = 1;
	private _piety = 0;
	private _workers = 1;

	private _foodStorage = 100;

	constructor(public name: string) {}

	private getAreaResource(resource: Resource): number {
		const resourceMap: Record<Resource, RuralAreaType> = {
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
			.flatMap((b) => b.bonuses)
			.reduce(
				(resources, bonus) => ResourceBonus.combine(resources, bonus.for(this)),
				ResourceBonus.getInitial()
			)[resource];
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

	update(): void {
		this.watchFoodStorage();
	}

	private watchFoodStorage(): void {
		const foodStorageLimit = this.foodStorage.limit;

		this._foodStorage = Math.min(
			this._foodStorage + this.food,
			foodStorageLimit
		);
	}
}
