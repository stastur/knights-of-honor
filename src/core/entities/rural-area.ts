type AreaType = "coastalVillage" | "farm" | "monastery" | "village";

export class RuralArea {
	readonly value = 1;

	constructor(public readonly type: AreaType) {}
}
