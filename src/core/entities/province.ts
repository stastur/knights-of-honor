import { Building } from "./building";
import { RuralArea } from "./rural-area";
import { BonusResource, ResourceBonus } from "./bonus";
import { AreaResource, Feature, RuralAreaType } from "./types";

export class Province {
	areas: RuralArea[] = [];
	features: Feature[] = [];
	buildings = new Map<Building["name"], Building>();

	private _gold = 1;
	private _food = 1;
	private _piety = 1;
	private _workers = 1;
	private _books = 1;

	private _foodStorage = 100;

	constructor(public name: string) {}

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

	get books(): number {
		return this._books + this.getBonusResource("books");
	}

	get foodStorage(): { limit: number; value: number } {
		const limit = 100 + this.getBonusResource("foodStorage");
		const value = this._foodStorage;

		return { limit, value };
	}

	addBuilding(...buildings: Array<Building["name"]>): void {
		buildings.forEach((name) =>
			this.buildings.set(name, Building.resolve(name))
		);
	}

	removeBuilding(...buildings: Array<Building["name"]>): void {
		buildings.forEach((name) => this.buildings.delete(name));
	}

	update(): void {
		this.watchFoodStorage();
	}

	private getAreaResource(resource: AreaResource): number {
		const resourceMap: Record<AreaResource, RuralAreaType> = {
			gold: "coastalVillage",
			food: "farm",
			piety: "monastery",
			workers: "village",
		};

		return this.areas
			.filter((v) => v.type === resourceMap[resource])
			.reduce((sum, v) => v.value + sum, 0);
	}

	private getBonusResource(resource: BonusResource): number {
		const buildings = Array.from(this.buildings.values());

		return buildings
			.flatMap((b) => b.bonuses)
			.reduce(
				(resources, bonus) => ResourceBonus.combine(resources, bonus.for(this)),
				ResourceBonus.getInitial()
			)[resource];
	}

	private getResource(resource: AreaResource): number {
		return (
			this[`_${resource}`] +
			this.getAreaResource(resource) +
			this.getBonusResource(resource)
		);
	}

	private watchFoodStorage(): void {
		const foodStorageLimit = this.foodStorage.limit;

		this._foodStorage = Math.min(
			this._foodStorage + this.food,
			foodStorageLimit
		);
	}
}
