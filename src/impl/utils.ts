import { add, angle, Boundary, distance, subtract } from "@app/utils/geometry";

import { Camera } from "./camera";
import { Position, Movement, Components } from "./components";
import { Entity } from "./types";

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

	const vectorAngle = angle(position, to);

	const displacement: Position = {
		x: Math.cos(vectorAngle) * d,
		y: Math.sin(vectorAngle) * d,
	};

	return add(position, displacement);
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

export function createOverlay(id: number | string) {
	const overlay = document.createElement("div");
	overlay.dataset.id = String(id);

	return overlay;
}

export function getOverlayStyles(
	boundary: Boundary
): Partial<CSSStyleDeclaration> {
	return {
		position: "absolute",
		left: boundary.x + "px",
		top: boundary.y + "px",
		width: boundary.w + "px",
		height: boundary.h + "px",
	};
}
