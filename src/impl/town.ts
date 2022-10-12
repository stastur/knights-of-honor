import { Boundary } from "@app/utils/geometry";
import { isEqual } from "@app/utils/objects";

import { Position } from "./components";
import { controls } from "./controls";
import { Game } from "./game";
import { Province } from "./province";
import { Sprite } from "./sprite";
import { Entity } from "./types";
import { Unit } from "./unit";
import { positionToTile, toCanvasPosition, toMapPosition } from "./utils";

export class Town implements Entity<"position"> {
	position: Position = { x: 2000, y: 2500 };

	sprite = new Sprite({
		default: {
			src: "images/town.png",
			frames: 1,
		},
	});

	// game data
	marshal?: Unit;
	province?: Province;
	boundary: Boundary = { x: 0, y: 0, w: 0, h: 0 };

	init(ctx: Game) {
		controls.on("left-click", (pos) => {
			const mapPosition = toMapPosition(ctx.camera, pos);

			const clickedTile = positionToTile(mapPosition, ctx.map.size);
			const unitTile = positionToTile(this.position, ctx.map.size);

			if (isEqual(clickedTile, unitTile)) {
				ctx.activeEntity = this;
			}
		});
	}

	update(ctx: Game): void {
		this.render(ctx);
	}

	render({ context: ctx, frameInfo: { framesElapsed }, camera }: Game): void {
		const position = toCanvasPosition(camera, this.position);

		this.boundary = this.sprite.draw(ctx, {
			state: "default",
			position,
			framesElapsed,
		});
	}
}
