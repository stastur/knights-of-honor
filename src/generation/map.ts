import SimplexNoise from "simplex-noise";
import { Geopolitics } from "./geopolitics";
import { Terraform } from "./terraform";

export class Map {
	terraform: Terraform;
	geopolitics: Geopolitics;

	constructor(
		private options: {
			w: number;
			h: number;
			tile: number;
			seed: string;
		}
	) {
		const noise = new SimplexNoise(this.options.seed);

		this.terraform = new Terraform({
			noise,
			size: {
				width: this.options.w,
				height: this.options.h,
				tile: this.options.tile,
			},
		}).init();

		const centerIndices = this.terraform.centers.filter((index) =>
			Terraform.isGround(this.terraform.elevation[index])
		);
		const centers = centerIndices.map(
			(pIndex) => this.terraform.points[pIndex]
		);

		const vertices = centerIndices.flatMap((pIndex) =>
			this.terraform.getHexagonVertices(pIndex)
		);

		this.geopolitics = new Geopolitics({
			centers,
			vertices,
			noise,
		}).init();
	}
}
