import { drawPolyline } from "@app/utils/canvas";
import { angle, isInBounds } from "@app/utils/geometry";
import { isEqual } from "@app/utils/objects";

import { Battle } from "./battle";
import { Position, Movement } from "./components";
import { controls } from "./controls";
import { Game } from "./game";
import { Kingdom } from "./kingdom";
import { findPath } from "./path-finding";
import { Sprite } from "./sprite";
import { Town } from "./town";
import { Entity } from "./types";
import {
	move,
	positionToTile,
	tileToPosition,
	toMapPosition,
	toCanvasPosition,
} from "./utils";

export class Unit implements Entity<"position" | "movement"> {
	// components
	position: Position = { x: 0, y: 0 };
	movement: Movement = {
		speed: 50,
		state: "idle",
		angle: 0,
	};

	// tags
	focusable = true;
	locked = false;

	// data
	town?: Town;
	kingdom?: Kingdom;

	baseStats = {
		health: 100,
		damage: 5,
		defense: 1,
	};

	stats = {
		health: this.baseStats.health,
		damage: this.baseStats.damage,
		defense: this.baseStats.defense,
	};

	currentJob?: Generator;

	constructor(public name: string, public sprite: Sprite<Movement["state"]>) {}

	init(ctx: Game): void {
		controls.on("left-click", (pos) => {
			const mapPosition = toMapPosition(ctx.camera, pos);

			const clickedTile = positionToTile(mapPosition, ctx.map.size);
			const unitTile = positionToTile(this.position, ctx.map.size);

			if (isEqual(clickedTile, unitTile)) {
				ctx.activeEntity = this;
			}
		});

		controls.on("right-click", (pos) => {
			const moveTo = toMapPosition(ctx.camera, pos);

			if (ctx.activeEntity === this && this.kingdom?.playerControlled) {
				const tile = positionToTile(moveTo, ctx.map.size);

				if (ctx.map.isWalkable(tile.y, tile.x)) {
					// TODO: proper click target identification
					for (const e of ctx.entities) {
						if (e instanceof Town && isInBounds(pos, e.boundary)) {
							this.currentJob = this.enterTown(ctx, e);
							return;
						}

						if (
							e instanceof Unit &&
							isEqual(tile, positionToTile(e.position, ctx.map.size)) &&
							!e.kingdom?.playerControlled
						) {
							this.currentJob = this.attack(ctx, e);
							return;
						}
					}

					this.currentJob = this.move(ctx, moveTo);
				}
			}
		});
	}

	leaveTown(): void {
		if (this.town) {
			const { x, y } = this.town.position;

			this.position = { x, y: y + 50 };
			this.town.marshal = undefined;
		}

		this.town = undefined;
	}

	*enterTown(ctx: Game, town: Town) {
		const atPosition = yield* this.move(ctx, town.position);

		if (atPosition) {
			this.town = town;

			if (town.marshal) {
				town.marshal.leaveTown();
			}

			town.marshal = this;
		}
	}

	*follow(ctx: Game, unit: Unit) {
		const initialPosition = { ...unit.position };

		let follow = this.move(ctx, initialPosition);

		while (!follow.next().done) {
			if (!isEqual(unit.position, initialPosition)) {
				follow = this.move(ctx, unit.position);
			}

			yield false;
		}

		return true;
	}

	*move(ctx: Game, to: Position) {
		const { movement, position } = this;
		const { size } = ctx.map;

		const path = findPath(
			positionToTile(position, size),
			positionToTile(to, size),
			ctx.map
		).map((t) => tileToPosition(t, size));

		this.town && this.leaveTown();
		movement.state = "moving";

		while (path.length) {
			drawPolyline(
				ctx.context,
				path.map((p) => toCanvasPosition(ctx.camera, p))
			);

			const nextPoint = path[0];
			const nextPosition = move(this, nextPoint, ctx.frameInfo.timeElapsed);

			if (isEqual(nextPosition, nextPoint)) {
				path.shift();
			}

			movement.angle = angle(this.position, nextPosition);
			this.position = nextPosition;

			yield false;
		}

		movement.state = "idle";

		return true;
	}

	*attack(ctx: Game, unit: Unit) {
		const isWithinReach = yield* this.follow(ctx, unit);

		if (isWithinReach) {
			ctx.entities.add(new Battle(this, unit));
		}
	}

	update(ctx: Game): void {
		if (!this.locked && this.currentJob) {
			const { done } = this.currentJob.next();

			if (done) {
				this.currentJob = undefined;
			}
		}

		this.render(ctx);
	}

	render({ context: ctx, frameInfo, camera, activeEntity }: Game): void {
		if (this.town) {
			return;
		}

		const position = toCanvasPosition(camera, this.position);

		if (activeEntity === this) {
			ctx.beginPath();
			ctx.fillStyle = "rgba(0,0,0,0.3)";
			ctx.ellipse(position.x, position.y + 20, 20, 10, 0, 0, Math.PI * 2);
			ctx.fill();
		}

		this.sprite.draw(ctx, {
			position,
			state: this.movement.state,
			framesElapsed: frameInfo.framesElapsed,
			flip: Math.abs(this.movement.angle) > 0.5 * Math.PI,
		});
	}
}
