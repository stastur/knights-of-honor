import { Point } from "@app/utils/geometry";

import { Game } from "./game";
import { Kingdom } from "./kingdom";
import { Town } from "./town";
import { Entity } from "./types";
import { toCanvasPosition } from "./utils";

class Province implements Entity {
	kingdom?: Kingdom;
	town?: Town;

	constructor(public border: Point[]) {}

	init(_ctx: Game): void {}

	update(ctx: Game): void {
		ctx.context.strokeStyle = "white";
		ctx.context.beginPath();
		this.border
			.map((p) => toCanvasPosition(ctx.camera, p))
			.forEach((p) => {
				ctx.context.lineTo(p.x, p.y);
			});
		ctx.context.stroke();

		ctx.context.fillStyle = "rgba(0,0,0,0.2)";
		ctx.context.fill();
	}
}

export { Province };
