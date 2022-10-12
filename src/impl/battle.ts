import { Position } from "./components";
import { Game } from "./game";
import { Sprite } from "./sprite";
import { Entity } from "./types";
import { Unit } from "./unit";
import { toCanvasPosition } from "./utils";

export class Battle implements Entity<"position"> {
	position: Position;

	focusable = true;

	sprite = new Sprite({
		default: {
			src: "images/explosion.png",
			frames: 10,
			scale: 0.5,
			framesHold: 5,
		},
	});

	constructor(public sideA: Unit, public sideB: Unit) {
		this.position = { ...sideB.position };

		sideA.locked = true;
		sideB.locked = true;
	}

	update(ctx: Game): void {
		if (ctx.frameInfo.framesElapsed % 20 === 0) {
			this.sideA.stats.health = Math.max(
				this.sideA.stats.health -
					Math.max(this.sideB.stats.damage - this.sideA.stats.defense, 0),
				0
			);

			this.sideB.stats.health = Math.max(
				this.sideB.stats.health -
					Math.max(this.sideA.stats.damage - this.sideB.stats.defense, 0),
				0
			);

			if (this.sideA.stats.health === 0) {
				this.sideA.movement.state = "dead";
				this.sideA.locked = false;
			}

			if (this.sideB.stats.health === 0) {
				this.sideB.movement.state = "dead";
				this.sideB.locked = false;
			}

			if (!this.sideB.stats.health || !this.sideB.stats.health) {
				ctx.entities.delete(this);
			}
		}

		this.render(ctx);
	}

	render({ camera, context, frameInfo: { framesElapsed } }: Game): void {
		this.sprite.draw(context, {
			state: "default",
			position: toCanvasPosition(camera, this.position),
			framesElapsed,
		});
	}
}
