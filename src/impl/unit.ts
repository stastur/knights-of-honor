import { Position, Movement } from "./components";
import { drawPath, findPath } from "./path-finding";
import { positionToTile, move, tileToPosition, setStyles } from "./utils";
import { Entity } from "./types";
import { Game } from "./game";
import { Sprite } from "./sprite";

export class Unit implements Entity {
	position: Position = { x: 0, y: 0 };
	movement: Movement = { speed: 50, state: "idle", angle: 0 };

	focused = false;

	box = document.createElement("div");

	target: Position | null = null;
	path: Position[] | null = null;

	constructor(public name: string, public sprite: Sprite<Movement["state"]>) {
		setStyles(this.box, {
			width: "50px",
			height: "50px",
			position: "absolute",
			transform: "translate(-50%, -50%)",
		});

		document.body.append(this.box);

		document.addEventListener("click", (event) => {
			this.focused = this.box.contains(event.target as Node);
		});

		document.addEventListener("contextmenu", (event) => {
			event.preventDefault();

			if (this.focused) {
				this.path = null;
				this.target = { x: event.clientX, y: event.clientY };
			}
		});
	}

	update(ctx: Game): void {
		if (this.target) {
			const { size, tiles } = ctx.map;

			if (!this.path) {
				this.path = findPath(
					positionToTile(this.position, size),
					positionToTile(this.target, size),
					{ tiles, isWalkable: (t: number) => t >= 0.5 }
				).map((t) => tileToPosition(t, size));
			}

			if (!this.path.length) {
				move(this, this.position);
				this.target = null;
				this.path = null;
				return;
			}

			drawPath(ctx.context, this.path);

			const isPointReached = move(this, this.path[0], ctx.frameInfo.elapsed);
			isPointReached && this.path.shift();
		}

		this.render(ctx);
	}

	render({ context: ctx, frameInfo }: Game): void {
		setStyles(this.box, {
			left: this.position.x + "px",
			top: this.position.y + "px",
		});

		this.sprite.draw(ctx, {
			state: this.movement.state,
			position: this.position,
			framesElapsed: frameInfo.framesElapsed,
			flip: Math.abs(this.movement.angle) > 0.5 * Math.PI,
		});
	}
}
