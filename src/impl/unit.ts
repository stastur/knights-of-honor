import { Position, Movement, Appearance } from "./components";
import { drawPath, findPath } from "./path-finding";
import { positionToTile, move, tileToPosition } from "./utils";
import { Entity } from "./types";
import { Game } from "./game";

const runningSprite = new Image();
runningSprite.src = "images/run.png";

const idleSprite = new Image();
idleSprite.src = "images/idle.png";

export class Unit implements Entity {
	position: Position = { x: 50, y: 100 };
	movement: Movement = { speed: 50, state: "idle", angle: 0 };
	appearance: Appearance = {
		sprite: idleSprite,
		height: 78,
		width: 58,
		offset: 0,
	};

	focused = false;

	box = document.createElement("div");

	movingTo: Position | null = null;
	path: Position[] | null = null;

	constructor(public name: string) {
		this.box = document.createElement("div");

		Object.assign(this.box.style, {
			width: "58px",
			height: "78px",
			position: "absolute",
		});

		document.body.append(this.box);

		document.addEventListener("click", (event) => {
			this.focused = this.box.contains(event.target as Node);
		});

		document.addEventListener("contextmenu", (event) => {
			event.preventDefault();

			if (this.focused) {
				this.path = null;
				this.movingTo = { x: event.clientX, y: event.clientY };
			}
		});
	}

	update(ctx: Game): void {
		if (this.movingTo) {
			const { size, tiles } = ctx.map;

			if (!this.path) {
				this.path = findPath(
					positionToTile(this.position, size),
					positionToTile(this.movingTo, size),
					{ tiles, isWalkable: (t: number) => t >= 0.5 }
				).map((t) => tileToPosition(t, size));
			}

			if (!this.path.length) {
				move(this, this.position);
				this.movingTo = null;
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
		this.box.style.transform = `translate(${this.position.x - 0.5 * 58}px, ${
			this.position.y - 0.5 * 78
		}px)`;

		if (this.movement.state === "moving") {
			this.appearance.sprite = runningSprite;
		}

		if (this.movement.state === "idle") {
			this.appearance.sprite = idleSprite;
		}

		if (frameInfo.currentFrame % 5 === 0) {
			this.appearance.offset =
				(this.appearance.offset + 78) % (this.appearance.sprite.width || 78);
		}

		ctx.drawImage(
			this.appearance.sprite,
			this.appearance.offset,
			0,
			58,
			78,
			this.position.x - 0.5 * 58,
			this.position.y - 0.5 * 78,
			58,
			78
		);

		// 	const flip = Math.abs(angle) > 0.5 * Math.PI ? -1 : 1;
		// 	this.box.style.transform = `translate(-50%, -50%) scaleX(${flip})`;
		// }
	}
}
