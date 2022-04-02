import { sumBy } from "../../utils";
import { Province } from "./province";

export class Country {
	provinces: Province[] = [];

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
