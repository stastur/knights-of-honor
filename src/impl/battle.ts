import { Position } from "./components";
import { Game } from "./game";
import { newId } from "./ids";
import { Marshal } from "./marshal";
import { Sprite } from "./sprite";
import { Entity } from "./types";
import { toCanvasPosition } from "./utils";

export class Battle implements Entity<"position"> {
	id = newId();

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

	constructor(public sideA: Marshal, public sideB: Marshal) {
		this.position = { ...sideB.position };

		sideA.locked = true;
		sideB.locked = true;
	}

	update(ctx: Game): void {
		if (ctx.frameInfo.currentFrame % 20 === 0) {
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
				ctx.entities.delete(this.id);
			}
		}

		this.render(ctx);
	}

	render({ camera, foreground: scene, frameInfo: { currentFrame: framesElapsed } }: Game): void {
		this.sprite.draw(scene, {
			state: "default",
			position: toCanvasPosition(camera, this.position),
			currentFrame: framesElapsed,
		});
	}
}
