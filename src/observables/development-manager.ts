import { action, makeObservable, observable } from "mobx";

import { Province } from "@app/core/entities/province";
import { DevelopmentManager } from "@app/core/managers/development-manager";

export class DevelopmentManagerObservable extends DevelopmentManager {
	constructor(province: Province) {
		super(province);

		makeObservable(this, {
			projects: observable,

			build: action,
			destroy: action,
			update: action,

			forceProject: action,
		});
	}
}
