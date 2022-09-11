import { Position, Movement } from "./components";
import { Game } from "./game";
import { move } from "./helpers";
import { Entity } from "./types";

export class Unit implements Entity {
	position: Position = { x: 30, y: 30 };
	movement: Movement = { speed: 50, state: "idle", angle: 0 };
	focused = false;

	box = document.createElement("div");
	pathCanvas = document.createElement("canvas");

	constructor(public name: string) {
		this.box = document.createElement("div");
		this.box.style.position = "absolute";

		Object.assign(this.box.style, {
			width: "58px",
			height: "78px",
			position: "absolute",
			backgroundRepeatY: "no-repeat",
			transform: "translate(-50%, -50%)",
			zIndex: 1,
		});

		this.pathCanvas.style.position = "absolute";
		document.body.append(this.box, this.pathCanvas);

		document.addEventListener("click", (event) => {
			this.focused = this.box.contains(event.target as Node);
		});

		document.addEventListener("contextmenu", (event) => {
			event.preventDefault();

			if (!this.focused) {
				return;
			}

			this.update = (ctx: Game) => {
				const { x, y } = this.position;
				const to = { x: event.clientX, y: event.clientY };

				move(this, to, ctx.frameInfo.elapsed);

				const tileX = Math.floor(this.position.x / ctx.map.size);
				const tileY = Math.floor(this.position.y / ctx.map.size);

				const tile = ctx.map.tiles[tileY][tileX];

				if (tile < 0.5) {
					this.position = { x, y };
					this.movement.state = "idle";
				}
				console.log(to);

				this.drawPath(ctx, to);
			};
		});
	}

	/**
	 * @todo implement path drawing
	 */
	drawPath({ map }: Game, to: Position): void {}

	render(ctx: Game): void {
		this.box.style.top = `${this.position.y}px`;
		this.box.style.left = `${this.position.x}px`;

		if (ctx.frameInfo.currentFrame % 5 === 0) {
			const { state, angle } = this.movement;

			const sprite = state === "moving" ? "images/run.png" : "images/idle.png";

			const [currentPosition] = this.box.style.backgroundPositionX.split("px");

			this.box.style.backgroundImage = `url(${sprite})`;
			this.box.style.backgroundPositionX =
				((+currentPosition + 78) % (78 * 20)) + "px";

			const flip = Math.abs(angle) > 0.5 * Math.PI ? -1 : 1;

			this.box.style.transform = `translate(-50%, -50%) scaleX(${flip})`;
		}
	}

	update(_ctx: Game): void {}
}
