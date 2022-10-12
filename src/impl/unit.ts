import { drawPolyline } from "@app/utils/canvas";
import { angle } from "@app/utils/geometry";
import { setStyles } from "@app/utils/html";
import { isEqual } from "@app/utils/objects";

import { Battle } from "./battle";
import { Position, Movement } from "./components";
import { controls } from "./controls";
import { Game } from "./game";
import { newId } from "./ids";
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
	createOverlay,
	getOverlayStyles,
} from "./utils";

export class Unit implements Entity<"position" | "movement"> {
	id = newId();
	overlay = createOverlay(this.id);

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
		this.overlay.onclick = () => {
			ctx.activeEntityId = this.id;
		};

		controls.on("right-click", (pos, entityId) => {
			if (ctx.activeEntityId !== this.id || !this.kingdom?.playerControlled) {
				return;
			}

			if (!entityId) {
				this.currentJob = this.move(ctx, toMapPosition(ctx.camera, pos));
				return;
			}

			const entity = ctx.entities.get(entityId);
			if (!entity) {
				return;
			}

			if (entity instanceof Town) {
				this.currentJob = this.enterTown(ctx, entity);
				return;
			}

			if (entity instanceof Unit && !entity.kingdom?.playerControlled) {
				this.currentJob = this.attack(ctx, entity);
				return;
			}
		});

		document.body.append(this.overlay);
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

		const tile = positionToTile(to, size);
		if (!ctx.map.isWalkable(tile.y, tile.x)) {
			return false;
		}

		const path = findPath(
			positionToTile(position, size),
			positionToTile(to, size),
			ctx.map
		).map((t) => tileToPosition(t, size));

		this.town && this.leaveTown();
		movement.state = "moving";

		while (path.length) {
			drawPolyline(
				ctx.scene,
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
			const battle = new Battle(this, unit);
			ctx.entities.set(battle.id, battle);
		}
	}

	update(ctx: Game): void {
		if (!this.locked && this.currentJob) {
			const { done } = this.currentJob.next();

			if (done) {
				this.currentJob = undefined;
			}
		}

		setStyles(this.overlay, getOverlayStyles(this.sprite.boundary));

		this.render(ctx);
	}

	render({ scene, frameInfo, camera, activeEntityId }: Game): void {
		if (this.town) {
			return;
		}

		const position = toCanvasPosition(camera, this.position);

		if (activeEntityId === this.id) {
			scene.beginPath();
			scene.fillStyle = "rgba(0,0,0,0.3)";
			scene.ellipse(position.x, position.y + 20, 20, 10, 0, 0, Math.PI * 2);
			scene.fill();
		}

		this.sprite.draw(scene, {
			position,
			state: this.movement.state,
			framesElapsed: frameInfo.framesElapsed,
			flip: Math.abs(this.movement.angle) > 0.5 * Math.PI,
		});
	}
}
