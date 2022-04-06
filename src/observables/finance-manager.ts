import { makeObservable, observable, action } from "mobx";

import { Kingdom } from "@app/core/entities/kingdom";
import { FinanceManager } from "@app/core/managers/finance-manager";

export class FinanceManagerObservable extends FinanceManager {
	constructor(kingdom: Kingdom) {
		super(kingdom);

		makeObservable(this, {
			books: observable,
			gold: observable,
			piety: observable,

			update: action,
			spend: action,
			replenish: action,
		});
	}
}
