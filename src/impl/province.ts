import { Point } from "@app/utils/geometry";

import { Game } from "./game";
import { newId } from "./ids";
import { Kingdom } from "./kingdom";
import { Town } from "./town";
import { Entity } from "./types";
import { toCanvasPosition } from "./utils";

class Province implements Entity {
	id = newId();

	town?: Town;
	kingdom?: Kingdom;

	areas: unknown[] = [];

	constructor(public border: Point[]) {}

	init(_ctx: Game): void {}

	update(ctx: Game): void {
		ctx.scene.strokeStyle = "white";
		ctx.scene.beginPath();
		this.border
			.map((p) => toCanvasPosition(ctx.camera, p))
			.forEach((p) => {
				ctx.scene.lineTo(p.x, p.y);
			});
		ctx.scene.stroke();

		ctx.scene.fillStyle = "rgba(0,0,0,0.2)";
		ctx.scene.fill();
	}
}

export { Province };
