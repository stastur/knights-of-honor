import { sumBy } from "@app/utils";

import { Province } from "./province";

export class Kingdom {
	provinces: Province[] = [];

	constructor(public name: string) {}

	get gold(): number {
		return sumBy(this.provinces, "gold");
	}

	get piety(): number {
		return sumBy(this.provinces, "piety");
	}

	get books(): number {
		return sumBy(this.provinces, "books");
	}
}
