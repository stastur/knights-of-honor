import { action, computed, makeObservable, observable } from "mobx";

import { Province } from "@app/core/entities/province";

export class ProvinceObservable extends Province {
	constructor(name: string) {
		super(name);

		makeObservable(this, {
			books: computed,
			gold: computed,
			piety: computed,
			food: computed,
			workers: computed,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			_foodStorage: observable,
			foodStorage: computed.struct,

			buildings: observable,

			update: action,
			addBuilding: action,
			removeBuilding: action,
		});
	}
}
