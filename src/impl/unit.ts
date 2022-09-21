import { Position, Movement, Health, Damage } from "./components";
import { drawPath, findPath } from "./path-finding";
import {
	positionToTile,
	move,
	tileToPosition,
	setStyles,
	hasComponents,
	getComponent,
} from "./utils";
import { Entity } from "./types";
import { Game } from "./game";
import { Sprite } from "./sprite";
import { Fight } from "./fight";

export class Unit
	implements Entity<"position" | "movement" | "health" | "damage">
{
	position: Position = { x: 0, y: 0 };
	movement: Movement = {
		speed: 50,
		state: "idle",
		angle: 0,
		target: null,
		path: null,
	};
	health: Health = { percentage: 100, regenerationRate: 1 };
	damage: Damage = { attack: 10 };

	focused = false;

	box = document.createElement("div");

	constructor(public name: string, public sprite: Sprite<Movement["state"]>) {
		setStyles(this.box, {
			width: "50px",
			height: "50px",
			position: "absolute",
			transform: "translate(-50%, -50%)",
		});
	}

	init(ctx: Game): void {
		document.body.append(this.box);

		document.addEventListener("click", (event) => {
			this.focused = this.box.contains(event.target as Node);
		});

		document.addEventListener("contextmenu", (event) => {
			event.preventDefault();

			if (this.focused) {
				let target: Position | null = { x: event.clientX, y: event.clientY };

				const targetedEntity = this.getEnemy(ctx, target);

				if (targetedEntity) {
					target = getComponent(targetedEntity, "position") || null;
				}

				this.movement.target = target;
			}
		});
	}

	getEnemy(
		ctx: Game,
		target: Position
	): Entity<"position" | "health" | "damage" | "movement"> | undefined {
		const { size } = ctx.map;

		const targetTile = positionToTile(target, size);

		const targetedEntity = [...ctx.entities].find((e) => {
			if (hasComponents(e, ["position", "health", "damage", "movement"])) {
				const tile = positionToTile(e.position, size);
				return e !== this && tile.x === targetTile.x && tile.y === targetTile.y;
			}

			return false;
		});

		return targetedEntity as
			| Entity<"position" | "health" | "damage" | "movement">
			| undefined;
	}

	update(ctx: Game): void {
		const { movement, position } = this;
		const { size, tiles } = ctx.map;

		if (movement.target && this.movement.state !== "dead") {
			const path = findPath(
				positionToTile(position, size),
				positionToTile(movement.target, size),
				{ tiles, isWalkable: (t: number) => t >= 0.5 }
			).map((t) => tileToPosition(t, size));

			if (path?.length) {
				drawPath(ctx.context, path);
				move(this, path[0], ctx.frameInfo.timeElapsed);
			} else {
				move(this, position);
				const enemy = this.getEnemy(ctx, this.position);

				enemy && ctx.entities.add(new Fight(this, enemy));

				movement.target = null;
			}
		}

		this.render(ctx);
	}

	drawHealth(ctx: CanvasRenderingContext2D): void {
		const { position, health } = this;

		const barWidth = 50;
		const barHeight = 8;

		const barPosition = {
			x: position.x - 0.5 * barWidth,
			y: position.y - 30,
		};

		ctx.fillStyle = "green";
		ctx.fillRect(
			barPosition.x,
			barPosition.y,
			(health.percentage / 100) * barWidth,
			barHeight
		);

		ctx.strokeStyle = "black";
		ctx.strokeRect(barPosition.x, barPosition.y, barWidth, barHeight);
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

		this.drawHealth(ctx);
	}
}
