import { makeObservable, computed, observable } from "mobx";

import { Kingdom } from "@app/core/entities/kingdom";

export class KingdomObservable extends Kingdom {
	constructor(name: string) {
		super(name);

		makeObservable(this, {
			books: computed,
			gold: computed,
			piety: computed,

			provinces: observable,
		});
	}
}
