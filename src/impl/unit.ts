import { Position, Movement, Appearance } from "./components";
import { Game } from "./game";
import { coordinatesToTilePosition, move } from "./utils";
import { drawPath, findPath } from "./path-finding";
import { Entity } from "./types";

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
				this.movingTo = { x: event.clientX, y: event.clientY };
			}
		});
	}

	update(ctx: Game): void {
		if (this.movingTo) {
			const path = findPath(
				coordinatesToTilePosition(this.position, ctx.map.size),
				coordinatesToTilePosition(this.movingTo, ctx.map.size),
				{ tiles: ctx.map.tiles, isWalkable: (t: number) => t >= 0.5 }
			).map(({ x, y }) => ({ x: x * ctx.map.size, y: y * ctx.map.size }));

			if (!path.length) {
				move(this, this.position);
				this.movingTo = null;
				return;
			}

			drawPath(ctx.context, path);
			move(this, path[0], ctx.frameInfo.elapsed);
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

		/** @todo flip */
		// 	const flip = Math.abs(angle) > 0.5 * Math.PI ? -1 : 1;
		// 	this.box.style.transform = `translate(-50%, -50%) scaleX(${flip})`;
		// }
	}
}
