import { Position, Movement } from "./components";

export const angle = (from: Position, to: Position): number => {
	return Math.atan2(to.y - from.y, to.x - from.x);
};

export const reposition = (
	object: { position: Position; movement: Movement },
	to: Position
): void => {
	object.position = { ...to };
};

export const distance = (from: Position, to: Position): number => {
	return Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
};

export const move = (
	object: { position: Position; movement: Movement },
	to: Position,
	elapsed = 1000
): void => {
	const { position, movement } = object;
	const t = elapsed / 1000;
	const d = movement.speed * t;

	const isNearby = distance(position, to) <= d;

	if (isNearby) {
		reposition(object, to);
		movement.state = "idle";

		return;
	}

	movement.angle = angle(position, to);
	movement.state = "moving";

	position.x += Math.cos(movement.angle) * d;
	position.y += Math.sin(movement.angle) * d;

	return;
};

export const createCanvas = (
	width: number,
	height: number
): HTMLCanvasElement => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;

	const scale = window.devicePixelRatio;

	canvas.height = height * scale;
	canvas.width = width * scale;

	canvas.style.height = height + "px";
	canvas.style.width = width + "px";

	ctx.scale(scale, scale);

	return canvas;
};

export const coordinatesToTilePosition = (
	p: Position,
	size: number
): Position => ({
	x: (p.x / size) | 0,
	y: (p.y / size) | 0,
});

export const setStyles = (
	element: HTMLElement,
	styles: Partial<CSSStyleDeclaration>
): void => {
	Object.assign(element.style, styles);
};
