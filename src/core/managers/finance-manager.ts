import { Kingdom } from "../entities/kingdom";
import { CountryResource } from "../entities/types";

export class FinanceManager {
	gold = 1000;
	piety = 1000;
	books = 1000;

	constructor(public kingdom: Kingdom) {}

	replenish(resource: CountryResource, value: number): void {
		this[resource] += value;
	}

	spend(resource: CountryResource, value: number): void {
		if (!this.has(resource, value)) {
			console.warn(`not enough ${resource}`);
			return;
		}

		this[resource] -= value;
	}

	has(resource: CountryResource, value: number): boolean {
		return this[resource] >= value;
	}

	update(): void {
		this.watchForGold();

		this.piety = Math.min(this.piety + this.kingdom.piety, 1000);
		this.books = Math.min(this.books + this.kingdom.books, 1000);
	}

	private watchForGold(): void {
		// TODO: inflation
		this.gold += this.kingdom.gold;
	}
}
