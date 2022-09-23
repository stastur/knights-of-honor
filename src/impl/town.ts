import { Boundary, Entity } from "./types";
import { Game } from "./game";
import { Position } from "./components";
import { Sprite } from "./sprite";
import { Unit } from "./unit";
import { toCanvasPosition } from "./utils";

export class Town implements Entity<"position"> {
	position: Position = { x: 400, y: 500 };

	sprite = new Sprite({
		default: {
			src: "images/town.png",
			frames: 1,
		},
	});
	box = document.createElement("div");

	// game data
	marshal: Unit | null = null;
	boundary: Boundary = { x: 0, y: 0, w: 0, h: 0 };

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

		if (this.marshal) {
			const text = `${this.marshal.name} in town`;
			ctx.fillStyle = "blue";
			ctx.fillText(
				text,
				position.x - ctx.measureText(text).width * 0.5,
				position.y - 45
			);
		}
	}
}
