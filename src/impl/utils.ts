import { add, distance, subtract } from "@app/utils/geometry";

import { Camera } from "./camera";
import { Position, Movement, Components } from "./components";
import { Town } from "./town";
import { Entity } from "./types";
import { Unit } from "./unit";

export function reposition(
	object: { position: Position; movement: Movement },
	to: Position
): void {
	object.position = { ...to };
}

export function move(
	object: { position: Position; movement: Movement },
	to: Position,
	timeElapsed = 1000
): Position {
	const { position, movement } = object;
	const t = timeElapsed / 1000;
	const d = movement.speed * t;

	const isNearby = distance(position, to) <= d;

	if (isNearby) {
		return to;
	}

	const velocity: Position = {
		x: (to.x - position.x) / distance(position, to),
		y: (to.y - position.y) / distance(position, to),
	};

	const newPosition: Position = {
		x: position.x + velocity.x * d,
		y: position.y + velocity.y * d,
	};

	return newPosition;
}

export function attack(
	object: Pick<Components, "health" | "damage" | "movement">,
	target: Pick<Components, "health" | "movement">
): void {
	target.movement.path === null;
	target.movement.target === null;
	target.movement.state === "idle";

	target.health.percentage = Math.max(
		target.health.percentage - object.damage.attack,
		0
	);

	if (target.health.percentage === 0) {
		target.movement.state = "dead";
		target.health.regenerationRate = 0;
	}
}

export function toMapPosition(
	camera: Camera,
	onCanvasPosition: Position
): Position {
	return add(onCanvasPosition, camera.position);
}

export function toCanvasPosition(
	camera: Camera,
	onMapPosition: Position
): Position {
	return subtract(onMapPosition, camera.position);
}

export function positionToTile(p: Position, size: number): Position {
	return {
		x: (p.x / size) | 0,
		y: (p.y / size) | 0,
	};
}

export function tileToPosition(t: Position, size: number): Position {
	return {
		x: (t.x + 0.5) * size,
		y: (t.y + 0.5) * size,
	};
}

export function hasComponents<C extends keyof Components>(
	entity: Entity,
	components: C[]
): entity is Entity & Pick<Components, C> {
	return components.every((c) => Reflect.has(entity, c));
}

export function getComponent<C extends keyof Components>(
	entity: Entity,
	component: C
): Pick<Components, C>[C] | undefined {
	return Reflect.get(entity, component);
}

export function enterTown(unit: Unit, town: Town): void {
	unit.town = town;

	if (town.marshal) {
		leaveTown(town.marshal);
	}

	town.marshal = unit;
}

export function leaveTown(unit: Unit): void {
	if (unit.town) {
		const { x, y, w, h } = unit.town.boundary;

		unit.position = { x: x + 0.5 * w, y: y + h };
		unit.town.marshal = null;
	}

	unit.town = null;
}
