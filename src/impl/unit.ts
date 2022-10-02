import { isEqual } from "@app/utils";

import { Camera } from "./camera";
import { Position, Movement, Health, Damage } from "./components";
import { controls } from "./controls";
import { Game } from "./game";
import { drawPath, findPath } from "./path-finding";
import { Sprite } from "./sprite";
import { Town } from "./town";
import { Entity } from "./types";
import {
	positionToTile,
	move,
	tileToPosition,
	enterTown,
	leaveTown,
	isInBounds,
	angle,
	toMapPosition,
	toCanvasPosition,
} from "./utils";

export class Unit
	implements Entity<"position" | "movement" | "health" | "damage">
{
	// components
	position: Position = { x: 0, y: 0 };
	movement: Movement = {
		speed: 50,
		state: "idle",
		angle: 0,
		target: null,
		path: null,
	};
	health: Health = { percentage: 100, regenerationRate: 1 };
	damage: Damage = { attack: 1 };

	// tags
	focusable = true;
	focused = false;
	dead = false;

	// data
	town: Town | null = null;

	constructor(public name: string, public sprite: Sprite<Movement["state"]>) {}

	init(ctx: Game): void {
		controls.on("left-click", (pos) => {
			const mapPosition = toMapPosition(ctx.camera, pos);

			const clickedTile = positionToTile(mapPosition, ctx.map.size);
			const unitTile = positionToTile(this.position, ctx.map.size);

			this.focused = isEqual(clickedTile, unitTile);
		});

		controls.on("right-click", (pos) => {
			const mapPosition = toMapPosition(ctx.camera, pos);

			if (this.focused) {
				this.movement.target = mapPosition;
				leaveTown(this);
			}
		});
	}

	update(ctx: Game): void {
		const { movement, position } = this;
		const { size } = ctx.map;

		if (movement.target && this.movement.state !== "dead") {
			const path = findPath(
				positionToTile(position, size),
				positionToTile(movement.target, size),
				ctx.map
			).map((t) => tileToPosition(t, size));

			if (path?.length) {
				drawPath(
					ctx.context,
					path.map((p) => toCanvasPosition(ctx.camera, p))
				);
				const nextPosition = move(this, path[0], ctx.frameInfo.timeElapsed);

				movement.state = "moving";
				movement.angle = angle(this.position, nextPosition);
				this.position = nextPosition;
			} else {
				for (const e of ctx.entities) {
					if (e instanceof Town && isInBounds(this.position, e.boundary)) {
						enterTown(this, e);
						break;
					}
				}

				movement.state = "idle";
				movement.target = null;
			}
		}

		this.render(ctx);
	}

	drawHealth(ctx: CanvasRenderingContext2D, camera: Camera): void {
		const { position, health } = this;

		const barWidth = 50;
		const barHeight = 8;

		// TODO: Revisit canvas-map coordinates conversion, might be a more convenient way
		const pos = toCanvasPosition(camera, position);

		const barPosition = {
			x: pos.x - 0.5 * barWidth,
			y: pos.y - 30,
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

	render({ context: ctx, frameInfo, camera }: Game): void {
		if (this.town) {
			return;
		}

		this.sprite.draw(ctx, {
			state: this.movement.state,
			position: toCanvasPosition(camera, this.position),
			framesElapsed: frameInfo.framesElapsed,
			flip: Math.abs(this.movement.angle) > 0.5 * Math.PI,
		});

		this.drawHealth(ctx, camera);
	}
}
