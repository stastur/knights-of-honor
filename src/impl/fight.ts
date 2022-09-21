import { Entity } from "./types";
import { Game } from "./game";
import { Position } from "./components";
import { Sprite } from "./sprite";
import { attack } from "./utils";

export class Fight implements Entity<"position"> {
	position: Position;

	sprite = new Sprite({
		default: {
			src: "images/explosion.png",
			frames: 10,
			scale: 0.5,
			framesHold: 5,
		},
	});

	constructor(
		public sideA: Entity<"position" | "health" | "damage" | "movement">,
		public sideB: Entity<"position" | "health" | "damage" | "movement">
	) {
		this.position = { ...sideA.position };
	}

	update(ctx: Game): void {
		this.render(ctx);

		if (ctx.frameInfo.framesElapsed % 60 === 0) {
			attack(this.sideA, this.sideB);
		}

		if (this.sideB.health.percentage === 0) {
			ctx.entities.delete(this);
		}
	}

	render({ context: ctx, frameInfo: { framesElapsed } }: Game): void {
		this.sprite.draw(ctx, {
			state: "default",
			position: this.position,
			framesElapsed,
		});
	}
}
